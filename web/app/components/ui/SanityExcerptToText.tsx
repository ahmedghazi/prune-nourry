import { LocaleBlockContent } from "@/app/types/schema";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { _localizeField } from "@/app/lib/utils";
import { PortableText } from "next-sanity";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  excerpt: LocaleBlockContent;
  text: LocaleBlockContent;
  onChange?: Function;
};

const SanityExcerptToText = ({ excerpt, text, onChange }: Props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (onChange) onChange(!active);
  }, [active]);

  return (
    <div className='excerpt-to-text'>
      {!active && (
        <div
          className='excerpt cursor-pointer text'
          onClick={() => setActive(true)}>
          <PortableText value={excerpt} components={portableTextComponents} />
          <button className='td-u'>More Information</button>
        </div>
      )}
      {active && (
        <div className='text'>
          <PortableText value={text} components={portableTextComponents} />
          <button onClick={() => setActive(false)} className='td-u'>
            Less info
          </button>
        </div>
      )}
    </div>
  );
};

export default SanityExcerptToText;
