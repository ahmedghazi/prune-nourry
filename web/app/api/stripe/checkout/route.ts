import { ProductExtend } from "@/app/types/extend";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  // export default async function handler(
  req: NextRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return new NextResponse(JSON.stringify({ message: "INVALID_METHOD" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = await req.json(); // res now contains payload
  const { cartItems } = payload;
  // console.log(req.headers.get("referer"));

  const transformItems = cartItems.map((item: ProductExtend) => {
    const unit_amount: number = item.price || 0;
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.title?.en,
          description: item.blurb?.en || item.title?.en || "",
          images: [item.imageCover?.asset.url],
          metadata: {
            slug: item.slug?.current,
            id: item._id,
          },
        },
        unit_amount: unit_amount * 100,
      },
      // amount: item.price || 0,
      // price: item.price,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10,
      },
      quantity: item.quantity,
    };
  });
  try {
    // Create Checkout Sessions from body params.
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        line_items: transformItems,
        shipping_options: [
          {
            shipping_rate: "shr_1PKzXrJIJCqsla6x9PXiRu1U",
          },
          {
            shipping_rate: "shr_1PKzUdJIJCqsla6x23rAGSAC",
          },
        ],

        mode: "payment",
        success_url: `${headers().get("referer")}/?success=true`,
        cancel_url: `${headers().get("referer")}/?canceled=true`,
        expires_at: Math.floor(Date.now() / 1000) + 3600 * 2,
      });
    // console.log("session", checkoutSession.url);
    // res.redirect(303, session.url);
    return NextResponse.json({
      result: checkoutSession,
      cartItems: cartItems,
      url: checkoutSession.url,
      origin: req.headers.get("origin"),
      ok: true,
    });
  } catch (error) {
    const error_response = {
      status: "error",
      message: error.message,
      raw: error,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
