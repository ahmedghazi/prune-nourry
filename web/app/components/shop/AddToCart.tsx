import { ProductExtend } from "@/app/types/extend";
import React, { useEffect, useState } from "react";
import useShop from "./ShopContext";
import { _localizeText } from "@/app/utils/utils";

type Props = {
  input: ProductExtend;
};

const AddToCart = ({ input }: Props) => {
  const { cartItems, setCartItems } = useShop();
  const [qty, setQty] = useState<number>(1);

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

  return (
    <div className='add-to-cart'>
      <div className='price mb-md'>{input.price}€</div>

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

      <button onClick={() => _onClick()} className='btn'>
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
