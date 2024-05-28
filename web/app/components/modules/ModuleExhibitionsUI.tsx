import { ModuleExhibitions, ModulePress } from "@/app/types/schema";
import React from "react";

import CardNews from "../CardNews";
import CardExhibition from "../CardExhibition";

type Props = {
  input: ModuleExhibitions;
};

const ModuleExhibitionsUI = ({ input }: Props) => {
  const { items } = input;

  return (
    <section className='module module--exhibitions'>
      {items?.map((item, i) => (
        // <CardNews key={i} input={item} />
        <div className='mb-header-height' key={i}>
          <CardExhibition input={item} />
        </div>
      ))}
    </section>
  );
};

export default ModuleExhibitionsUI;
