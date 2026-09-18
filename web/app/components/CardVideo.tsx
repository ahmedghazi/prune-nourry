import React from "react";
import { Embed } from "../types/schema";
// import ReactPlayer from "react-player";
import { _localizeField } from "@/app/lib/utils";
// import website from "../config/website";
import PlayerVideo from "./ui/PlayerVideo";

type Props = {
  input: Embed;
};

const CardVideo = ({ input }: Props) => {
  // console.log(input.subTitle);
  // const config = {
  //   youtube: {
  //     playerVars: {
  //       iv_load_policy: 3,
  //       cc_load_policy: 0,
  //       modestbranding: 1,
  //       showinfo: 0,
  //       rel: 0,
  //       origin: website.url,
  //     },
  //   },
  //   vimeo: {
  //     // title: "false",
  //   },
  // };

  return (
    <article className='card--video'>
      <div className='media'>{input.url && <PlayerVideo input={input} />}</div>
      <div className='header'>
        <h2>{_localizeField(input.title)}</h2>
        {input.subTitle && (
          <div className='subtitle text-sm--mobile md:text-sm'>
            {_localizeField(input.subTitle)}
          </div>
        )}
      </div>
    </article>
  );
};

export default CardVideo;
