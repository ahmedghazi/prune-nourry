import Stripe from "stripe";
import { NextRequest } from "next/server";
// import { OrderTable, db } from "@/lib/drizzleOrm";
import { headers } from "next/headers";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
});

//https://prune-nourry.vercel.app/api/stripe/webhook
export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = (await headers()).get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;

      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted: any = event.data.object;
      console.log(checkoutSessionCompleted);
      const result = await _handleEventCompleted(checkoutSessionCompleted.id);
      // const response1 = await db
      //   .insert(OrderTable)
      //   .values({
      //     userId: checkoutSessionCompleted?.metadata.userId,
      //     itemCount: 1,
      //     total: checkoutSessionCompleted?.amount_total as any,
      //     isComplete: true,
      //   })
      //   .returning();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}

const _handleEventCompleted = async (session_id: string) => {
  const lineItems = await stripe.checkout.sessions.listLineItems(session_id, {
    expand: ["data.price.product"],
    limit: 100,
  });
  console.log(lineItems);
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

  // stripe.checkout.sessions.listLineItems(
  //   session_id,
  //   {
  //     expand: ["data.price.product"],
  //     limit: 100,
  //   },
  //   async (err, lineItems) => {
  //     // Fulfill the purchase...
  //     console.log(lineItems);
  //     try {
  //       const updated = await _updateDatabase(lineItems);
  //       console.log("-- updated");
  //       console.log(updated);
  //       // TO DO send email
  //     } catch (err) {
  //       console.log(err.message);
  //       // return res.status(400).send(`Fulfillment Error: ${err.message}`);
  //       const error_response = {
  //         status: "error",
  //         message: err.message,
  //         raw: err,
  //       };
  //       return new Response(JSON.stringify(error_response), {
  //         status: 500,
  //         headers: { "Content-Type": "application/json" },
  //       });
  //     }
  //   }
  // );
};

const _updateDatabase = async (lineItems: any) => {
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
