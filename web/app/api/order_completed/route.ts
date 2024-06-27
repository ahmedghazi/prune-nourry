import { ProductExtend } from "@/app/types/extend";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
// import Cors from "micro-cors";
// const cors = Cors({
//   allowMethods: ["POST", "HEAD"],
// });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret =
  "whsec_2ba6762416d0bd96bb9f0680b3dfaa9c93086a25a9545ade095c2604aee82e31";

const updateDatabase = async (session: any, lineItems: any) => {
  let _session = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price.product"],
  });

  _session.line_items.data.forEach(async (lineItem: any) => {
    console.log(lineItem);
    console.log(lineItem.price.product.metadata);
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
    console.log(json);
    // TO DO send email
    // Access product metadata via lineItem.price.product.metadata
  });

  // throw new Error(`
  //   Given the Checkout Session ${session.id}, load your internal order from the database here.
  //   Then you can reconcile your order's quantities with the final line item quantity purchased. You can use \`checkout_session.metadata\` and \`price.metadata\` to store and later reference your internal order and item ids.`);
};

export async function POST(
  // export default async function handler(
  req: NextRequest,
  res: NextApiResponse
) {
  try {
    const body = await req.text();

    const signature = headers().get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    );

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 },
        function (err: any, lineItems: any) {
          // Fulfill the purchase...
          try {
            updateDatabase(session, lineItems);
          } catch (err) {
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
        message: "something went wrong",
        ok: false,
      },
      { status: 500 }
    );
  }
}

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
