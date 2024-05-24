import React from "react";
import { Product, Project } from "@/app/types/schema";
import { _localizeField } from "@/app/utils/utils";
// import PreJson from "../ui/PreJson";
import ProjectCard from "../CardProject";
import Masonry from "react-masonry-css";
import CardProduct from "../CardProduct";

type Props = {
  input: {
    items: Product[];
  };
};

const ModuleProductsUI = ({ input }: Props) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className='module module--products'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'>
        {input.items.length &&
          input.items.map((item, i) => (
            <CardProduct key={item._id + i} input={item} />
          ))}
      </Masonry>
    </div>
  );
};

export default ModuleProductsUI;
