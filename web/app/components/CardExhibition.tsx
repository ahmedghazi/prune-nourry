import React, { useEffect } from "react";
import { Exhibition } from "../types/schema";
import { _localizeField } from "../utils/utils";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import Slider from "./ui/slick-slider";
import Figure from "./ui/Figure";
import { useInView } from "react-intersection-observer";

type Props = {
  input: Exhibition;
};

const CardExhibition = ({ input }: Props) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <article className='content-exhibition' ref={ref}>
      <div className='md:grid md:grid-cols-12 gap-md'>
        <aside className='md:col-span-4'>
          <h1 className='mb-md'>{_localizeField(input.title)}</h1>
          <div className='text mb-md'>
            <PortableText
              value={_localizeField(input.text)}
              components={portableTextComponents}
            />
          </div>
        </aside>
        <div className='media md:col-span-8'>
          {input.slider?.length === 1 && (
            <div className='slide'>
              {input.slider[0].image && (
                <>
                  <Figure asset={input.slider[0].image.asset} />
                  {input.slider[0].caption && (
                    <div className='caption py-02e '>
                      {input.slider[0].caption}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {input.slider && input.slider.length > 1 && inView && (
            <Slider
              settingsOverride={{ autoplay: false, adaptiveHeight: true }}>
              {input.slider?.map((item, i) => (
                <div className='slide' key={i}>
                  {item.image && (
                    <>
                      <Figure asset={item.image.asset} />
                      {item.caption && (
                        <div className='caption py-02e '>{item.caption}</div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </article>
  );
};
/*
{item.caption && (
                      <div className='caption py-02e '>
                        {item.caption}
                      </div>
                      )}
*/

export default CardExhibition;
