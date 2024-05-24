import React from "react";
import { Embed } from "../types/schema";
import ReactPlayer from "react-player";
import { _localizeField } from "../utils/utils";

type Props = {
  input: Embed;
};

const CardVideo = ({ input }: Props) => {
  console.log(input.subTitle);
  return (
    <article className='card--video'>
      <div className='media'>
        {input.url && (
          <ReactPlayer
            url={input?.url}
            light={
              input.placeholder?.asset.url ? input.placeholder?.asset.url : true
            }
            playsinline={true}
            width={"100%"}
            height={"100%"}
            style={{
              aspectRatio: "5 / 3",
              background: "black",
            }}
          />
        )}
      </div>
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
