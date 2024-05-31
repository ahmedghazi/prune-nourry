"use client";
import React from "react";
import { Infos } from "../types/schema";
import { _localizeField } from "../utils/utils";
import { PortableText } from "@portabletext/react";
import components from "../utils/portableTextComponents";
import Figure from "./ui/Figure";
import website from "../config/website";

type Props = {
  input: Infos;
};

const ContentInfos = ({ input }: Props) => {
  return (
    <div className='content-infos'>
      <article>
        <div className='md:grid md:grid-cols-12 gap-md'>
          <div className='md:col-span-4 mb-md'>
            <h1 className='mb-md'>{_localizeField(input.title)}</h1>

            {input.imageCover && input.imageCover && (
              <div className='mb-md sm-only'>
                <Figure
                  asset={input.imageCover?.asset}
                  width={1000}
                  alt={website.title}
                />
              </div>
            )}

            <div className='text'>
              <PortableText
                value={_localizeField(input.text)}
                components={components}
              />
            </div>
          </div>
          <div className='md:col-span-8'>
            {input.imageCover && input.imageCover && (
              <div className='mb-md hidden-sm'>
                <Figure
                  asset={input.imageCover?.asset}
                  width={1000}
                  alt={website.title}
                />
              </div>
            )}
            <div className='list'>
              {input.list?.map((item, i) => (
                <div className='item' key={i}>
                  <h2 className='text-lg mb-md'>
                    {_localizeField(item.title)}
                  </h2>
                  <ul>
                    {item.items?.map((_item, j) => (
                      <li key={j} className='mb-md'>
                        <div className='key'>{_item.key}</div>
                        <div className='text'>
                          <PortableText
                            value={_localizeField(_item.val)}
                            components={components}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ContentInfos;
