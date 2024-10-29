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
import { useRouter } from "next/navigation";

type Props = {
  input: ProductExtend;
};

const ContentProduct = ({ input }: Props) => {
  const router = useRouter();
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
  const isLowStock = input.quantity === 1;
  const isOutOfStock = !input.quantity || input.quantity < 1;
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
            {!input.blurb && <p className='text-red border-2'>Blurb needed</p>}
            {/* {isLowStock && <div className='mb-md'>Low stock</div>} */}
            {/* quantity: {input.quantity} */}
            {isOutOfStock && <div className='mb-md'>Sold Out</div>}
            <div className='mb-md'>
              {input.externalProductLink ? (
                <a
                  className='td-u'
                  href={input.externalProductLink.link}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {
                    //_localizeText("buyAt")
                  }
                  {input.externalProductLink.label}
                </a>
              ) : (
                <AddToCart input={input} />
              )}
            </div>
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

          <button className='btn--close' onClick={() => router.back()}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='33.43'
              height='33.42'
              viewBox='0 0 33.43 33.42'>
              <title>Fichier 4</title>
              <g id='c7152e74-87fb-4817-b3ee-eaa51e10c83d' data-name='Calque 2'>
                <g
                  id='b684b04e-e69c-4b1f-9f12-178946f473e9'
                  data-name='Calque 1'>
                  <polygon
                    points='33.43 31.47 18.66 16.7 33.42 1.94 31.47 0 16.71 14.76 1.95 0 0 1.94 14.78 16.71 0.02 31.47 1.97 33.42 16.73 18.66 31.49 33.42 33.43 31.47'
                    fill='#222221'
                  />
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ContentProduct;
