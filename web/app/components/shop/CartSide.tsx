"use client";
import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import { subscribe, unsubscribe } from "pubsub-js";
import clsx from "clsx";
import Qty from "./Qty";
import { loadStripe } from "@stripe/stripe-js";
import { _localizeField } from "@/app/utils/utils";

type Props = {};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const CartAside = (props: Props) => {
  const { cartItems, setCartItems } = useShop();
  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <div className={clsx("cart-aside", open && "is-open")}>
      <div className='header flex justify-between'>
        <div className='label'>Cart</div>
        <button onClick={() => setOpen(false)}>Close</button>
      </div>
      {cartItems.length > 0 && (
        <>
          <div className='body'>
            {cartItems.map((item, i) => (
              <div className='cart-item' key={i}>
                <div className='title'>{_localizeField(item.title)}</div>
                <button onClick={() => _delete(item._id)}>DELETE</button>
                {item.price && (
                  <div className='line-total flex justify-between'>
                    {/* <div>Qty: {item.quantity}</div> */}
                    <Qty input={item} />
                    <div className='value'>{item.price * item.quantity}€</div>
                  </div>
                )}
                {/* <Qty input={item} /> */}
              </div>
            ))}
          </div>
          <div className='footer'>
            <div className='total flex justify-between'>
              <div className='label'>Sous Total</div>
              <div className='price'>{totalPrice()}€</div>
            </div>
            <button className='btn' onClick={createCheckoutseesion}>
              Checkout
            </button>
          </div>
        </>
      )}
      {cartItems.length === 0 && <div className=''>Your cart is empty</div>}
    </div>
  );
};

export default CartAside;
