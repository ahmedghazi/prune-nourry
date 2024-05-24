import { ModuleArtworks } from "@/app/types/schema";
import React from "react";
import CardArtwork from "../CardArtwork";
import Masonry from "react-masonry-css";

type Props = {
  input: ModuleArtworks;
};

const ModuleArtworksUI = ({ input }: Props) => {
  const { items } = input;
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 1,
  };

  return (
    <section className='module module--artworks'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'>
        {items?.map((item, i) => (
          <div className='mb-md-' key={i}>
            <CardArtwork input={item} />
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default ModuleArtworksUI;
