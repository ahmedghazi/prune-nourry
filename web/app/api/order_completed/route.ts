import { ProductExtend } from "@/app/types/extend";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { buffer } from "micro";
// import Cors from "micro-cors";
// const cors = Cors({
//   allowMethods: ["POST", "HEAD"],
// });

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-04-10",
//   typescript: true,
// });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    // const buf = await buffer(req);
    console.log(body);
    const signature = headers().get("stripe-signature") as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_CHECKOUT_COMPLETED_SECRET!;

    // console.log(signature);
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
    // console.log(event);
    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      stripe.checkout.sessions.listLineItems(
        session.id,
        {
          expand: ["data.price.product"],
          limit: 100,
        },
        async function (err: any, lineItems: any) {
          // Fulfill the purchase...
          console.log(lineItems);
          try {
            const updated = await _updateDatabase(session, lineItems);
            console.log("-- updated");
            console.log(updated);
            // TO DO send email
          } catch (err) {
            console.log(err.message);
            // return res.status(400).send(`Fulfillment Error: ${err.message}`);
            const error_response = {
              status: "error",
              message: err.message,
              raw: err,
            };
            return new NextResponse(JSON.stringify(error_response), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
        }
      );
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error.message,
        ok: false,
      },
      { status: 500 }
    );
  }
}

const _updateDatabase = async (session: any, lineItems: any) => {
  // let _session = await stripe.checkout.sessions.retrieve(session.id, {
  //   expand: ["line_items.data.price.product"],
  // });

  // let response: Array<any> = [];
  // console.log(lineItems.data);
  const promises = lineItems.data.map(async (lineItem: any) => {
    // console.log(lineItem);
    if (!lineItem.price.product.metadata.id) return;

    const mutations = {
      mutations: [
        {
          patch: {
            id: lineItem.price.product.metadata.id,
            dec: {
              quantity: lineItem.quantity,
            },
          },
        },
      ],
    };
    const result = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_API_READ_TOKEN}`,
        },
        body: JSON.stringify(mutations),
        method: "POST",
      }
    );

    const json = await result.json();
    // console.log(json);
    return json;
  });

  const response = await Promise.all(promises);

  // console.log(response);

  return response;
};

// const _sendEmail = (data, zoneName, cb) => {
//   const { first_name, email, last_name } = data
//   const date = new Date().toLocaleDateString("fr-FR")
//   console.log(first_name)

//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//       user: "romain.polarstation@fondationtaraocean.org",
//       pass: "FTO2020tps*",
//     },
//   })
//   // console.log(event.body);

//   transporter.sendMail(
//     {
//       from: "romain.polarstation@fondationtaraocean.org",
//       to: `${email}`,
//       subject: "Certificat Tara International Polar Station",
//       // text: event.body
//       html: createMailTemplate({
//         title: "Certificat Tara International Polar Station",
//         name: `${first_name} ${last_name}`,
//         zoneName: zoneName,
//       }),
//     },
//     function(error, info) {
//       if (error) {
//         cb(error)
//       } else {
//         cb({
//           status: "email Ok",
//           info,
//         })
//       }
//     }
//   )
// }
