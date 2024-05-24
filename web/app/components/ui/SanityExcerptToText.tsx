import { LocaleBlockContent } from "@/app/types/schema";
import portableTextComponents from "@/app/utils/portableTextComponents";
import { _localizeField } from "@/app/utils/utils";
import { PortableText } from "next-sanity";
import React, { useMemo, useState } from "react";

type Props = {
  excerpt: LocaleBlockContent;
  text: LocaleBlockContent;
};

const SanityExcerptToText = ({ excerpt, text }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <div className='excerpt-to-text'>
      {!active && (
        <div
          className='excerpt cursor-pointer text'
          onClick={() => setActive(true)}>
          <PortableText value={excerpt} components={portableTextComponents} />
          <button className='td-u'>More info</button>
        </div>
      )}
      {active && (
        <div className='text'>
          <PortableText value={text} components={portableTextComponents} />
        </div>
      )}
    </div>
  );
};

export default SanityExcerptToText;
