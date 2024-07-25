import React from "react";
import Slider from "./ui/slick-slider/index";
import { NewsInstagram } from "../types/schema";
import { _localizeField } from "../utils/utils";
import Figure from "./ui/Figure";
import SanityExcerptToText from "./ui/SanityExcerptToText";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
type Props = {
  input: NewsInstagram;
};

const ArticleInstagram = ({ input }: Props) => {
  return (
    <article className='content-article'>
      <div className='grid md:grid-cols-12 gap-md'>
        <aside className='md:col-span-4'>
          <h1 className='mb-md'>{_localizeField(input.title)}</h1>
          {input.excerpt && input.text ? (
            <SanityExcerptToText
              excerpt={_localizeField(input.excerpt)}
              text={_localizeField(input.text)}
            />
          ) : (
            <div className='text md:md'>
              <PortableText
                value={_localizeField(input.text)}
                components={portableTextComponents}
              />
            </div>
          )}
        </aside>
        <div className='media md:col-span-8'>
          {input.images && input.images?.length === 1 && (
            <div className='slide'>
              {input.images[0].image && (
                <Figure asset={input.images[0].image.asset} />
              )}
            </div>
          )}

          {input.images && input.images?.length > 1 && (
            <Slider settingsOverride={{ autoplay: false }}>
              {input.images?.map((item, i) => (
                <div className='slide' key={i}>
                  {item.image && <Figure asset={item.image.asset} />}
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticleInstagram;
