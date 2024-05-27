import React from "react";
import { Exhibition } from "../types/schema";
import { _localizeField } from "../utils/utils";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import Slider from "./ui/slick-slider";
import Figure from "./ui/Figure";

type Props = {
  input: Exhibition;
};

const CardExhibition = ({ input }: Props) => {
  return (
    <article className='content-article'>
      <div className='grid md:grid-cols-12 gap-md'>
        <aside className='md:col-span-4'>
          <h1 className='mb-md'>{_localizeField(input.title)}</h1>
          <div className='text md:md'>
            <PortableText
              value={_localizeField(input.text)}
              components={portableTextComponents}
            />
          </div>
        </aside>
        <div className='media md:col-span-8'>
          <Slider settingsOverride={{ autoplay: true }}>
            {input.slider?.map((item, i) => (
              <div className='slide' key={i}>
                {item.image && <Figure asset={item.image.asset} />}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </article>
  );
};

export default CardExhibition;
