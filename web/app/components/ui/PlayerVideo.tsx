import website from "@/app/config/website";
import { Embed } from "@/app/types/schema";
import React from "react";
import ReactPlayer from "react-player";

type Props = {
  input: Embed;
};

const PlayerVideo = ({ input }: Props) => {
  const { url, placeholder, aspectRatio } = input;
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
      {/* <pre>{JSON.stringify(placeholder, null, 2)}</pre> */}
      <ReactPlayer
        url={url}
        config={config}
        light={placeholder?.asset.url ? placeholder?.asset.url : true}
        playsinline={true}
        controls={true}
        width={"100%"}
        height={"100%"}
        style={{
          aspectRatio: aspectRatio || "5 / 3",
          background: "black",
        }}
      />
    </div>
  );
};

export default PlayerVideo;
