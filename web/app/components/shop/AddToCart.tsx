import { ProductExtend } from "@/app/types/extend";
import React, { useEffect, useMemo, useState } from "react";
import useShop from "./ShopContext";
import { _localizeText } from "@/app/lib/utils";
import Link from "next/link";

type Props = {
  input: ProductExtend;
};

const AddToCart = ({ input }: Props) => {
  const { cartItems, setCartItems } = useShop();
  const [qty, setQty] = useState<number>(1);

  const productIsInCart = useMemo(() => {
    return cartItems.filter((el) => el._id === input._id)[0];
  }, [cartItems]);

  console.log({ productIsInCart });

  const _onClick = () => {
    //ajout ou update le produit dans le panier
    if (cartItems.findIndex((el) => el._id === input._id) === -1) {
      setCartItems((prev: ProductExtend[]) => [...prev, input]);
    } else {
      setCartItems((prev: ProductExtend[]) => {
        return prev.map((item: ProductExtend) => {
          return item._id === input._id
            ? { ...item, quantity: qty } //celui sur lequel on on cliqué
            : item; //les autres
        });
      });
    }
  };

  useEffect(() => {
    input.quantity = qty;
    // if (qty > 1) _onClick();
  }, [qty]);

  const viewCartLabel = _localizeText("viewCart");

  return (
    <div className='add-to-cart'>
      <div className='price mb-md'>{input.price}€ HT</div>

      <div className='flex gap-sm mb-md'>
        <label htmlFor='qty' className='capitalize '>
          {_localizeText("qty")}
        </label>
        <div>
          <button onClick={() => setQty(qty - 1 > 0 ? qty - 1 : 1)}>-</button>
          <input type='number' name='qty' id='' value={qty} readOnly />
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
      </div>

      <div className='flex gap-md'>
        {input.quantity > 0 && (
          <button onClick={() => _onClick()} className='btn'>
            {_localizeText("addToCart")}
          </button>
        )}
        {input.quantity === 0 && <div>Out of stock</div>}
        {productIsInCart && (
          <Link href='/cart' className='td-u'>
            {viewCartLabel}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
