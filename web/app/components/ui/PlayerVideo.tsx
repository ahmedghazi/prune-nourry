import website from "@/app/config/website";
import { Embed } from "@/app/types/schema";
import React from "react";
import ReactPlayer from "react-player";

type Props = {
  input: Embed;
};

const PlayerVideo = ({ input }: Props) => {
  const config = {
    youtube: {
      playerVars: {
        iv_load_policy: 3,
        cc_load_policy: 0,
        modestbranding: 1,
        showinfo: 0,
        rel: 0,
        origin: website.url,
      },
    },
    vimeo: {
      // title: "false",
    },
  };

  return (
    <div className='player-video'>
      <ReactPlayer
        url={input?.url}
        config={config}
        light={
          input.placeholder?.asset.url ? input.placeholder?.asset.url : true
        }
        playsinline={true}
        controls={true}
        width={"100%"}
        height={"100%"}
        style={{
          aspectRatio: "5 / 3",
          background: "black",
        }}
      />
    </div>
  );
};

export default PlayerVideo;
