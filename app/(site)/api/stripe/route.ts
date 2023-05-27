import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  let data = await req.json();
  console.log(data);

  // return NextResponse.redirect(
  //   "https://checkout.stripe.com/pay/cs_test_a1Y7Z1ZQZQ2ZQ2ZQ2ZQ2ZQ2ZQ2&uid=1234"
  // );

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1NBuEzLgXwjjTLxO4XRaxxOh" },
        { shipping_rate: "shr_1NBuG4LgXwjjTLxOQofGz9KY" },
      ],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "{{PRICE_ID}}",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers}/?success=true`,
      cancel_url: `${req.headers}/?canceled=true`,
    });
    // res.redirect(303, session.url);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.log(message);
  }
}
