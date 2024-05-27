"use client";
import React from "react";
import Slider from "./ui/slick-slider/index";
import { Home } from "../types/schema";
import Figure from "./ui/Figure";
import { useRouter } from "next/navigation";
import { _linkResolver } from "../utils/utils";

type Props = {
  input: Home;
};

const ContentHome = ({ input }: Props) => {
  const router = useRouter();
  return (
    <article
      className='content-home'
      onClick={() => router.push(_linkResolver(input.link))}>
      <Slider settingsOverride={{ autoplay: true, dots: true }}>
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
