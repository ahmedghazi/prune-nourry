import React from "react";
import { ModuleVideo } from "@/app/types/schema";
import ReactPlayer from "react-player/lazy";
import PlayerVideo from "../ui/PlayerVideo";

type Props = {
  input: ModuleVideo;
};
const ModuleVideoUI = ({ input }: Props) => {
  const { embed } = input;

  return (
    <section className='module module--video mb-md'>
      {embed && <PlayerVideo input={embed} />}
    </section>
  );
};

export default ModuleVideoUI;
