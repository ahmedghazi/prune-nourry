"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../types/schema";
import { _localizeField, _localizeText } from "../utils/utils";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import Figure from "./ui/Figure";
import useShop from "./shop/ShopContext";
import Qty from "./shop/Qty";
import { ProductExtend } from "../types/extend";
import AddToCart from "./shop/AddToCart";

type Props = {
  input: ProductExtend;
};

const ContentProduct = ({ input }: Props) => {
  // const { cartItems, setCartItems } = useShop();
  // const [qty, setQty] = useState<number>(1);

  // const _onClick = () => {
  //   //ajout ou update le produit dans le panier
  //   if (cartItems.findIndex((el) => el._id === input._id) === -1) {
  //     setCartItems((prev: ProductExtend[]) => [...prev, input]);
  //   } else {
  //     setCartItems((prev: ProductExtend[]) => {
  //       return prev.map((item: ProductExtend) => {
  //         return item._id === input._id
  //           ? { ...item, quantity: qty } //celui sur lequel on on cliqué
  //           : item; //les autres
  //       });
  //     });
  //   }
  // };

  // useEffect(() => {
  //   input.quantity = qty;
  //   if (qty > 1) _onClick();
  // }, [qty]);

  // console.log(input);

  return (
    <article className='content--product'>
      <div className='grid md:grid-cols-12 gap-md'>
        <div className='body md:col-span-4 '>
          <div className='sm-only'>
            <div className='mb-md'>
              <Figure asset={input.imageCover?.asset} />
            </div>
          </div>
          <div className='inner pb-md-'>
            <h1 className='mb-md'>{_localizeField(input.title)}</h1>
            {input.tag && (
              <div className='type'>{_localizeField(input.tag.title)}</div>
            )}
            {input.blurb && (
              <div className='text description mb-md'>
                {_localizeField(input.blurb)}
              </div>
            )}

            {/* <div className='mb-md'>
              <div className='flex gap-sm'>
                <label htmlFor='qty' className='capitalize '>
                  {_localizeText("qty")}
                </label>
                <div>
                  <button onClick={() => setQty(qty - 1 > 0 ? qty - 1 : 1)}>
                    -
                  </button>
                  <input type='number' name='qty' id='' value={qty} readOnly />
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>
            </div> */}
            <div className='mb-md'>
              <AddToCart input={input} />
            </div>
            {/* <div className='mb-md'>
              <button onClick={() => _onClick()} className='btn'>
                Add to cart
              </button>
            </div> */}

            {input.text && (
              <div className='mb-md'>
                <div className='text '>
                  <PortableText
                    value={_localizeField(input.text)}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='media md:col-span-8 pb-lg'>
          {input.images?.map((item, i) => (
            <div className='mb-md' key={i}>
              <Figure asset={item.image?.asset} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ContentProduct;
