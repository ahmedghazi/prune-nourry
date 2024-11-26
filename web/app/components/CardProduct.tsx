"use client";
import React from "react";
import useShop from "./shop/ShopContext";
import { Product } from "../types/schema";
import { _linkResolver, _localizeField } from "../utils/utils";
import Figure from "./ui/Figure";
import Link from "next/link";

type Props = {
  input: Product;
};

const CardProduct = ({ input }: Props) => {
  const { cartItems, setCartItems } = useShop();
  // console.log(input.quantity);
  const _onClick = () => {
    //ajout ou update le produit dans le panier
    if (cartItems.findIndex((el) => el._id === input._id) === -1) {
      setCartItems((prev: any) => [...prev, input]);
    } else {
      setCartItems((prev: any) => {
        return prev.map((item: any) => {
          return item.id === input._id
            ? { ...item, qty: item.qty + 1 } //celui sur lequel on on cliqué
            : item; //les autres
        });
      });
    }
  };
  const isLowStock = input.quantity === 1;
  const isOutOfStock = !input.quantity || input.quantity < 1;
  return (
    <div className='card--product'>
      <Link href={_linkResolver(input)}>
        {input.imageCover && (
          <Figure
            asset={input.imageCover.asset}
            width={600}
            alt={_localizeField(input.title)}
          />
        )}
        <div className='header'>
          <div className='type'>{_localizeField(input.tag?.title)}</div>
          <h2>{_localizeField(input.title)}</h2>
          {input.price && <div className='price'>{input.price}€ HT</div>}
          {/* {isLowStock && <div>Low stock</div>} */}
          {/* {isOutOfStock && <div>Sold Out</div>} */}
          {/* {`${input.quantity}`} */}
        </div>
      </Link>
    </div>
  );
};

export default CardProduct;
