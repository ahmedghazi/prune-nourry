import { ModulePress } from "@/app/types/schema";
import React from "react";

import CardNews from "../CardNews";

type Props = {
  input: ModulePress;
};

const ModulePressUI = ({ input }: Props) => {
  const { items } = input;

  return (
    <section className='module module--press'>
      {items?.map((item, i) => (
        <CardNews key={i} input={item} />
      ))}
    </section>
  );
};

export default ModulePressUI;
