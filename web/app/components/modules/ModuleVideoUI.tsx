import React from "react";
import { ModuleVideo } from "@/app/types/schema";
import ReactPlayer from "react-player/lazy";

type Props = {
  input: ModuleVideo;
};
const ModuleVideoUI = ({ input }: Props) => {
  const { embed } = input;

  return (
    <section className='module module--video mb-md'>
      {embed && (
        <ReactPlayer
          url={embed?.url}
          light={
            embed.placeholder?.asset.url ? embed.placeholder?.asset.url : true
          }
          width={"100%"}
          height={"100%"}
          style={{
            aspectRatio: "5 / 3",
            background: "black",
          }}
        />
      )}
    </section>
  );
};

export default ModuleVideoUI;
