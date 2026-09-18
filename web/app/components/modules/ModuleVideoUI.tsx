import React from "react";
import { ModuleVideo } from "@/app/types/schema";
// import ReactPlayer from "react-player/lazy";
import PlayerVideo from "../ui/PlayerVideo";
import { _localizeText } from "@/app/utils/utils";

type Props = {
  input: ModuleVideo;
};
const ModuleVideoUI = ({ input }: Props) => {
  const { embed } = input;

  return (
    <section className='module module--video mb-md'>
      {embed && <PlayerVideo input={embed} />}
      {input.title && (
        <div className='caption py-02e '>{_localizeText(input.title)}</div>
      )}
    </section>
  );
};

export default ModuleVideoUI;
