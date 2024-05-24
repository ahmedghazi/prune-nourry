import React from "react";
import { ModuleVideo, ModuleVideos } from "@/app/types/schema";
import ReactPlayer from "react-player/lazy";
import CardVideo from "../CardVideo";

type Props = {
  input: ModuleVideos;
};
const ModuleVideoUI = ({ input }: Props) => {
  const { items } = input;
  return (
    <section className='module module--videos mb-md'>
      <div className='grid md:grid-cols-2 gap-y-sm  md:gap-md'>
        {items?.map((item, i) => (
          <CardVideo key={i} input={item} />
        ))}
      </div>
    </section>
  );
};

export default ModuleVideoUI;
