"use client";
import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import { subscribe, unsubscribe } from "pubsub-js";
import clsx from "clsx";
import Qty from "./Qty";
import { loadStripe } from "@stripe/stripe-js";
import { _localizeField, _localizeText } from "@/app/utils/utils";
import Figure from "../ui/Figure";
import { useRouter } from "next/navigation";

type Props = {};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const Cart = (props: Props) => {
  // alert("here");
  const { cartItems, setCartItems } = useShop();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const tokenOpen = subscribe("CART_OPEN", () => {
      setOpen(true);
    });

    return () => {
      unsubscribe(tokenOpen);
    };
  });

  const totalPrice = () => {
    let total = 0;
    cartItems.forEach((el) => {
      const price = el.price || 0;
      const t = el.quantity > 1 ? el.quantity * price : price;
      total += t;
    });
    return total;
  };

  const createCheckoutseesion = async () => {
    try {
      // const body = { cartItems: cartItems };
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify({ cartItems: cartItems }),
      });
      const data = await response.json();
      console.log(data);
      if (data.ok) {
        window.location = data.url;
      } else {
        //
      }
    } catch (error) {
      console.log(error);
      //
    }
  };

  const _delete = (_id: string) => {
    const items = cartItems.filter((el) => el._id !== _id);
    if (items) {
      setCartItems(items);
    }
  };
  // console.log(router.back());
  return (
    <div className={clsx("cart pb-md")}>
      <div className='header flex justify-between'>
        <button onClick={() => router.back()}>{"< Back"}</button>
        {/* <div className='label'>Cart</div> */}
      </div>
      <div className='row'>
        <div className='col-md-6 col-md-offset-4'>
          {cartItems.length > 0 && (
            <>
              <div className='body '>
                <div className='items '>
                  {cartItems.map((item, i) => (
                    <div className='cart-item gap-md' key={i}>
                      <div className='media col-span-2'>
                        {item.imageCover && (
                          <Figure
                            asset={item.imageCover.asset}
                            width={600}
                            alt={_localizeField(item.title)}
                          />
                        )}
                      </div>

                      <div className='col-span-4'>
                        <div className='col-infos'>
                          <div>
                            <div className='title text-lg mb-md'>
                              {_localizeField(item.title)}
                            </div>

                            {item.price && (
                              <div className='line-total '>
                                {/* <div>Qty: {item.quantity}</div> */}
                                <Qty input={item} />
                                <div className='flex justify-between '>
                                  <div className='label'>
                                    {_localizeText("price")}:
                                  </div>
                                  <div className='value'>
                                    {item.price * item.quantity}€
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <button onClick={() => _delete(item._id)}>
                            DELETE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='footer'>
                <div className='inner'>
                  <div className='total flex justify-between'>
                    <div className='label'>{_localizeText("subTotal")}</div>
                    <div className='price'>{totalPrice()}€</div>
                  </div>
                  <button className='btn' onClick={createCheckoutseesion}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
          {cartItems.length === 0 && (
            <div className='cart-empty'>
              <div className='inner'>Your cart is empty</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
