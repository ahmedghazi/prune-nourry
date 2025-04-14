"use client";
import React from "react";
import Masonry from "react-masonry-css";
import CardArtwork from "./CardArtwork";
import { Artwork } from "../types/schema";

type Props = {
  items: Artwork[];
};

const ContentTagProjectArtwork = ({ items }: Props) => {
  const breakpointColumnsObj = {
    default: Math.abs(4),
    1100: 2,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'>
        {items?.map((item, i) => (
          <CardArtwork input={item} key={i} />
        ))}
      </Masonry>
    </div>
  );
};

export default ContentTagProjectArtwork;
