import React from "react";
import clsx from "clsx";
import Figure from "../ui/Figure";
import { ModuleImages } from "@/app/types/schema";
import Masonry from "react-masonry-css";

type Props = {
  input: ModuleImages;
};

const ModuleImagesUI = ({ input }: Props): JSX.Element => {
  const { items, gridSize, gridType } = input;

  return (
    <section className={clsx("module module--images mb-md-")}>
      {gridType === "default" && (
        <div className={clsx("grid gap-md", `md:grid-cols-${gridSize}`)}>
          {items?.map((item, i) => (
            <div className='item md:mb-md cursor-zoom-in' key={i}>
              <Figure key={i} asset={item.image?.asset} />
            </div>
          ))}
        </div>
      )}

      {gridType === "masonry" && (
        <Masonry
          breakpointCols={{
            default: 3,
            1100: 3,
            700: 2,
            500: 1,
          }}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {items?.map((item, i) => (
            <div className='item mb-md cursor-zoom-in' key={i}>
              <Figure
                asset={item.image?.asset}
                alt={item.caption || "no caption"}
              />
            </div>
          ))}
        </Masonry>
      )}
    </section>
  );
};

export default ModuleImagesUI;
