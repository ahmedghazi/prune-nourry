"use client";
import React, { useEffect, useMemo, useState } from "react";
import useShop from "./ShopContext";
import { Product } from "@/app/types/schema";
import { ProductExtend } from "@/app/types/extend";

type Props = {
  input: ProductExtend;
};

const Qty = ({ input }: Props) => {
  const { cartItems, setCartItems } = useShop();
  const [val, setVal] = useState<number>(input.quantity);

  const product = useMemo(() => {
    return cartItems.filter((el) => el._id === input._id)[0];
  }, []);

  // console.log(product);
  const _update = (newVal: number) => {
    // product.quantity = newVal;
    console.log(newVal);
    setVal(newVal);
  };

  useEffect(() => {
    // product.quantity = val;
    setCartItems((prev: any) => {
      return prev.map((item: ProductExtend) => {
        console.log(item);
        return item._id === input._id
          ? { ...item, quantity: val } //celui sur lequel on on cliqué
          : item; //les autres
      });
    });
  }, [val]);

  return (
    <div className='quantity flex gap-1e'>
      {product && (
        <>
          <label htmlFor='quantity'>quantity</label>
          <div className='flex'>
            <button
              onClick={() =>
                _update(input.quantity - 1 > 0 ? input.quantity - 1 : 1)
              }>
              -
            </button>
            {input.quantity && (
              <input
                type='number'
                name='quantity'
                id=''
                value={input.quantity}
                readOnly
              />
            )}
            <button onClick={() => _update(input.quantity + 1)}>+</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Qty;
