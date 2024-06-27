import React from "react";
import { ModuleVideo, ModuleVideos } from "@/app/types/schema";
import ReactPlayer from "react-player/lazy";
import CardVideo from "../CardVideo";
import Masonry from "react-masonry-css";

type Props = {
  input: ModuleVideos;
};
const ModuleVideoUI = ({ input }: Props) => {
  const { items } = input;
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 1,
  };

  return (
    <section className='module module--videos mb-md'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'>
        {items?.map((item, i) => (
          <div className='mb-md-' key={i}>
            <CardVideo input={item} />
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default ModuleVideoUI;
