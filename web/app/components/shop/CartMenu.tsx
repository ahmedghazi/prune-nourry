"use client";
import React from "react";
import useShop from "./ShopContext";
import { publish } from "pubsub-js";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { _localizeText } from "@/app/lib/utils";

type Props = {};

const CartMenu = (props: Props) => {
  const { cartItems } = useShop();
  const router = useRouter();

  const _openCart = () => {
    // publish("CART_OPEN");
    router.push("/cart");
  };

  return (
    <button
      className={clsx("cart-menu", cartItems.length > 0 && "has-products")}
      onClick={_openCart}>
      <div className='flex gap-02e items-center'>
        {cartItems.length > 0 && <span> ({cartItems.length})</span>}
        <div className='hidden-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='17.17'
            height='13.84'
            viewBox='0 0 17.17 13.84'>
            <path d='M17.05,2.27A.68.68,0,0,0,16.51,2H3.89L3.24.21A.33.33,0,0,0,2.93,0H.33A.33.33,0,0,0,0,.33v.73a.33.33,0,0,0,.33.33h1.9c1,2.66,2.09,5.5,3.45,8.92a.33.33,0,0,0,.3.2h8.46a.33.33,0,0,0,.33-.33V9.51a.33.33,0,0,0-.33-.33H6.67L6.19,8h8.45a.58.58,0,0,0,.65-.52l1.85-4.56a.69.69,0,0,0-.1-.62ZM4.4,3.31H15.5L14.22,6.59H5.68Z' />
            <path d='M7.45,10.59a1.63,1.63,0,1,0,1.66,1.59A1.65,1.65,0,0,0,7.45,10.59Zm0,1a.61.61,0,1,1-.61.61A.61.61,0,0,1,7.45,11.57Z' />
            <path d='M13.23,10.59a1.63,1.63,0,1,0,1.66,1.59A1.65,1.65,0,0,0,13.23,10.59Zm0,1a.61.61,0,1,1-.61.61A.61.61,0,0,1,13.23,11.57Z' />
          </svg>
        </div>
        <div className='sm-only'>{_localizeText("cart")}</div>
      </div>
    </button>
  );
};

export default CartMenu;
