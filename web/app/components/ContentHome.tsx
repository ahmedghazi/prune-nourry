"use client";
import React from "react";
import Slider from "./ui/slick-slider/index";
import { Home } from "../types/schema";
import Figure from "./ui/Figure";
import { useRouter } from "next/navigation";
import { _linkResolver } from "../utils/utils";
import Link from "next/link";

type Props = {
  input: Home;
};

const ContentHome = ({ input }: Props) => {
  const router = useRouter();
  console.log(input);
  return (
    <article className='content-home'>
      <Slider settingsOverride={{ autoplay: true, dots: true }}>
        {input.slider?.map((item, i) => (
          <div className='slide' key={i}>
            <div
              onClick={() => router.push(_linkResolver(input.link))}
              className='cursor-pointer '>
              <Figure asset={item.image?.image?.asset} width={2000} />
            </div>
            <div className='caption'>
              <Link href={_linkResolver(item.link)}>
                {item.image?.caption || "need a caption"}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </article>
  );
};

export default ContentHome;
