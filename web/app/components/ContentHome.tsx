import React from "react";
import Slider from "./ui/slick-slider/index";
import { Home } from "../types/schema";
import Figure from "./ui/Figure";

type Props = {
  input: Home;
};

const ContentHome = ({ input }: Props) => {
  return (
    <article className='content-home'>
      <Slider settingsOverride={{ autoplay: false, dots: true }}>
        {input.slider?.map((item, i) => (
          <div className='slide' key={i}>
            <Figure asset={item.image?.asset} width={2000} />
            <div className='caption'>{item.caption || "need a caption"}</div>
          </div>
        ))}
      </Slider>
    </article>
  );
};

export default ContentHome;
