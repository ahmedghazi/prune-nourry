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
import { useSearchParams } from "next/navigation";
import { ProductExtend } from "@/app/types/extend";
import Stripe from "stripe";
import useLocalStorage from "@/app/hooks/useLocalStorage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const totalPrice = (cartItems: ProductExtend[]) => {
  let total = 0;
  cartItems.forEach((el) => {
    const price = el.price || 0;
    const t = el.quantity > 1 ? el.quantity * price : price;
    total += t;
  });
  return total;
};

type CartSuccessProps = {};
const CartSuccess = (props: CartSuccessProps) => {
  const [cartItems] = useLocalStorage("cartItems", "");
  const [checkoutSession] = useLocalStorage("checkoutSession", "");

  console.log(cartItems);
  console.log(checkoutSession);
  return (
    <div className='cart-success'>
      {/* {checkoutSession && (
        <div className='status'>{checkoutSession.payment_status}</div>
      )} */}
      {cartItems && checkoutSession && (
        <div>
          <h2 className='mb-md text-lg'>Thx for your order</h2>

          <div className='body'>
            <div className='items'>
              {cartItems &&
                cartItems.map((item: ProductExtend, i: number) => (
                  <CartItem key={i} input={item} />
                ))}
            </div>
          </div>
        </div>
      )}

      {checkoutSession && checkoutSession.payment_status === "paid" && (
        <div className='footer'>
          <div className='inner'>
            <div className='sub-total flex justify-between'>
              <div className='label'>{_localizeText("subTotal")}</div>
              <div className='price'>
                {checkoutSession.amount_subtotal / 100}€
              </div>
            </div>
            <div className='shipping flex justify-between'>
              <div className='label'>{_localizeText("shipping")}</div>
              <div className='price'>
                {checkoutSession.shipping_cost.amount_total / 100}€
              </div>
            </div>
            <div className='total flex justify-between'>
              <div className='label'>{_localizeText("total")}</div>
              <div className='price'>{checkoutSession.amount_total / 100}€</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type CartItemProps = {
  input: ProductExtend;
  _delete?: Function;
};
const CartItem = ({ input, _delete }: CartItemProps) => (
  <div className='cart-item gap-md'>
    <div className='media col-span-2'>
      {input.imageCover && (
        <Figure
          asset={input.imageCover.asset}
          width={600}
          alt={_localizeField(input.title)}
        />
      )}
    </div>

    <div className='col-span-4'>
      <div className='col-infos'>
        <div>
          <div className='title text-lg mb-md'>
            {_localizeField(input.title)}
          </div>

          {input.price && (
            <div className='line-total '>
              <Qty input={input} />
              <div className='flex justify-between '>
                <div className='label'>{_localizeText("price")}:</div>
                <div className='value'>{input.price * input.quantity}€ HT</div>
              </div>
            </div>
          )}
        </div>

        {_delete && <button onClick={() => _delete(input._id)}>DELETE</button>}
      </div>
    </div>
  </div>
);

type Props = {};
const Cart = (props: Props) => {
  // alert("here");
  const { cartItems, setCartItems } = useShop();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    const tokenOpen = subscribe("CART_OPEN", () => {
      setOpen(true);
    });

    return () => {
      unsubscribe(tokenOpen);
    };
  });

  const createCheckoutseesion = async () => {
    try {
      // const body = { cartItems: cartItems };
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ cartItems: cartItems }),
      });
      const data = await response.json();
      console.log(data);
      if (data.ok) {
        localStorage.setItem("checkoutSession", JSON.stringify(data.result));
        localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
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
  const isPostCheckout = success || canceled;
  // const isPostCheckout = false;
  console.log(success, canceled);
  return (
    <div className={clsx("cart pb-md")}>
      <div className='header flex justify-between md:absolute left-0'>
        {!isPostCheckout && (
          <button onClick={() => router.back()}>{`< ${_localizeText(
            "back"
          )}`}</button>
        )}
        {/* <div className='label'>Cart</div> */}
      </div>
      <div className='row'>
        <div className='col-md-6 col-md-offset-4'>
          {isPostCheckout && (
            <div className='post-checkout'>
              {success && (
                <div className='msg'>
                  <CartSuccess />
                </div>
              )}
              {canceled && (
                <div className='msg'>This order was canceled :(</div>
              )}
            </div>
          )}
          {!isPostCheckout && (
            <div className='result'>
              {cartItems.length > 0 && (
                <>
                  <div className='body '>
                    <div className='items '>
                      {cartItems.map((item, i) => (
                        <CartItem
                          key={i}
                          input={item}
                          _delete={() => _delete(item._id)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className='footer'>
                    <div className='inner'>
                      <div className='total flex justify-between'>
                        <div className='label'>{_localizeText("subTotal")}</div>
                        {cartItems && (
                          <div className='price'>{totalPrice(cartItems)}€ </div>
                        )}
                      </div>
                      <button
                        className='btn text-black text-lg text-right block hover:underline'
                        onClick={createCheckoutseesion}>
                        {_localizeText("pay")}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
