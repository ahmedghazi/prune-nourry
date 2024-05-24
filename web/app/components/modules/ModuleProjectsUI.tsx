import React from "react";
import { Project } from "@/app/types/schema";
import { _localizeField } from "@/app/utils/utils";
// import PreJson from "../ui/PreJson";
import ProjectCard from "../CardProject";
import Masonry from "react-masonry-css";

type Props = {
  input: {
    items: Project[];
  };
};

const ModuleProjectsUI = ({ input }: Props) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className='module module--projects'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'>
        {input.items.length &&
          input.items.map((item, i) => (
            <ProjectCard key={item._id + "-" + i} input={item} />
          ))}
      </Masonry>
    </div>
  );
};

export default ModuleProjectsUI;
