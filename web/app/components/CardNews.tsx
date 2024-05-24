import React from "react";
import { News, NewsArticle } from "../types/schema";
import { _date, _localizeField } from "../utils/utils";
import Figure from "./ui/Figure";

type Props = {
  input: NewsArticle;
};

const CardNews = ({ input }: Props) => {
  // console.log(input);
  return (
    <article className='card--news mb-lg'>
      <div className='grid md:grid-cols-12 gap-sm md:gap-md'>
        <aside className='md:col-span-4 order-2 md:order-1'>
          <div className='md:sticky md:top-header-height  '>
            <time dateTime={input.date} className='mb-05e block'>
              {_date(input.date)}
            </time>
            <h2 className='text-lg mb-sm'>{_localizeField(input.title)}</h2>
            <a
              href={input.link?.link}
              target='_blank'
              rel='noopener noreferrer'
              className='td-u'>
              {input.link?.label}
            </a>
          </div>
        </aside>
        <div className='md:col-span-5 order-1 md:order-2'>
          {input.image && input.image.image && (
            <Figure
              asset={input.image.image.asset}
              width={600}
              alt={_localizeField(input.title)}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default CardNews;
