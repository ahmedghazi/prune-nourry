import React from "react";
import { News, NewsArticle } from "../types/schema";
import { _datePress, _localizeField } from "../utils/utils";
import Figure from "./ui/Figure";

type Props = {
  input: NewsArticle;
};

const CardNews = ({ input }: Props) => {
  // console.log(input);
  return (
    <article className='card--news mb-md text-lg'>
      <a
        href={input.link?.link}
        target='_blank'
        rel='noopener noreferrer'
        className='td-u'>
        <div className='sm-3-lines-'>
          <div className='flex flex-wrap md:flex-nowrap  sm-3-lines-'>
            <span className='date tabular-nums'>
              <time dateTime={input.date} className=''>
                {_datePress(input.date)}
              </time>
            </span>

            {input.mediaTitle && (
              <span>
                <span className='sep'>-</span> {input.mediaTitle}
              </span>
            )}
          </div>
          <h2 className='h2 ellipsis- md-ellipsis'>
            {_localizeField(input.title)}
          </h2>
          <div className='image hidden-sm'>
            {input.image && input.image.image && (
              <Figure
                asset={input.image.image.asset}
                width={600}
                alt={_localizeField(input.title)}
              />
            )}
          </div>
        </div>
      </a>
    </article>
  );
};

export default CardNews;
