import React from "react";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import clsx from "clsx";
import { ModuleText } from "@/app/types/schema";
import { _localizeField } from "@/app/lib/utils";

type Props = {
  input: ModuleText;
};
const ModuleTextUI = ({ input }: Props) => {
  const { text } = input;

  return (
    <section className='module module--text mb-lg'>
      {text && (
        <PortableText
          value={_localizeField(text)}
          components={portableTextComponents}
        />
      )}
    </section>
  );
};

export default ModuleTextUI;
