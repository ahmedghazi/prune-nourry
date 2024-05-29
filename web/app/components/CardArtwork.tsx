import React from "react";
import { Artwork } from "../types/schema";
import Figure from "./ui/Figure";
import { _linkResolver, _localizeField } from "../utils/utils";
import Link from "next/link";

type Props = {
  input: Artwork;
};

const CardArtwork = ({ input }: Props) => {
  return (
    <article className='card--artwork'>
      {input.image && input.image.image && (
        <Link href={_linkResolver(input.link?.link)}>
          <Figure
            asset={input.image.image.asset}
            width={600}
            alt={_localizeField(input.title)}
          />
        </Link>
      )}
      <div className='header'>
        <h2>{_localizeField(input.title)}</h2>
        {input.description && <div>{_localizeField(input.description)}</div>}
        <Link href={_linkResolver(input.link?.link)}>
          {_localizeField(input.link?.label)}
        </Link>
      </div>
    </article>
  );
};

export default CardArtwork;
