import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "@/types/Product";

export async function POST(req: NextRequest): Promise<NextResponse | string> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const data = await req.json();
  let cartItems = data.cartItems;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1NBuEzLgXwjjTLxO4XRaxxOh" },
        { shipping_rate: "shr_1NBuG4LgXwjjTLxOQofGz9KY" },
      ],
      line_items: cartItems.map((item: Product) => {
        const img = item.images[0];
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/ic8uro0v/production/"
          )
          .replace("-webp", ".webp");

        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    });
    return NextResponse.json(session);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.log(message);
    return message;
  }
}
