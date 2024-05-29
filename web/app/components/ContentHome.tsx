"use client";
import React, { useEffect } from "react";
import Slider from "./ui/slick-slider/index";
import { Home } from "../types/schema";
import Figure from "./ui/Figure";
import { useRouter } from "next/navigation";
import { _linkResolver } from "../utils/utils";
import Link from "next/link";
import Masonry from "react-masonry-css";
import ProjectCard from "./CardProject";
import { useInView } from "react-intersection-observer";

type Props = {
  input: Home;
};

const ContentHome = ({ input }: Props) => {
  const router = useRouter();
  // console.log(input);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    // console.log(entry, inView);
    document.body.classList.toggle("is-above-fold", inView);
  }, [inView]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <article className='content-home'>
      <section className='slider mb-header-height'>
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
      </section>
      <section className='project px-lg mb-lg' ref={ref}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {input.projects &&
            input.projects.length &&
            input.projects.map((item, i) => (
              <ProjectCard key={item._id + "-" + i} input={item} />
            ))}
        </Masonry>
      </section>
    </article>
  );
};

export default ContentHome;
