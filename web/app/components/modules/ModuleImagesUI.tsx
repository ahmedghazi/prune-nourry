import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import FigureComponent from "../ui/Figure";
import { Figure, ModuleImages } from "@/app/types/schema";
import Masonry from "react-masonry-css";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import Slider from "../ui/slick-slider";

type ItemProps = {
  input: Figure;
  scope: number;
  index: number;
  prevIndex: number;
  nextIndex: number;
  canExpand: boolean;
};
const Item = ({
  input,
  index,
  scope,
  prevIndex,
  nextIndex,
  canExpand,
}: ItemProps) => {
  // console.log(input);
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  // console.log({ index, prevIndex, nextIndex });
  // console.log({ canExpand });
  // useEffect(() => {
  //   const tokenA = subscribe("IMAGES_EXPAND", (e, d) => {
  //     // console.log(d);
  //     if (d !== input.image?.asset._id) {
  //       setActive(false);
  //     }
  //   });

  //   const tokenB = subscribe("IMAGES_CHANGE", (e, d) => {
  //     // console.log(index, scope, d.index);
  //     if (d.scope !== scope) return;
  //     if (index === d.index) {
  //       setActive(true);
  //     }
  //   });

  //   return () => {
  //     unsubscribe(tokenA);
  //     unsubscribe(tokenB);
  //   };
  // }, []);

  useEffect(() => {
    // console.log({ active, canExpand });
    if (canExpand) {
      // console.log("caaaaaan");
      // publish("IMAGES_EXPAND", input.image?.asset._id);
      publish("IMAGES_TO_SLIDER", {
        index: index,
        scope: scope,
      });
      // if (ref.current) {
      //   ref.current?.scrollIntoView({
      //     // behavior: "smooth",
      //   });
      // }
    }
  }, [active]);

  return (
    <div
      ref={ref}
      className={clsx(
        "item cursor-pointer",
        // canExpand && "cursor-zoom-in"
        // canExpand && active && "col-span-4 is-active cursor-zoom-out"
        // imageRatio
      )}
      onClick={() => setActive(!active)}>
      {/* {active && "is active"} */}
      <FigureComponent asset={input.image?.asset} width={1000} />
      {/* {active && canExpand && (
        <div className='controls'>
          <button
            className='prev'
            onClick={() =>
              publish("IMAGES_CHANGE", {
                index: prevIndex,
                scope: scope,
              })
            }></button>
          <button
            className='next'
            onClick={() =>
              publish("IMAGES_CHANGE", {
                index: nextIndex,
                scope: scope,
              })
            }></button>
          <button className='btn--close' onClick={() => setActive(false)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='33.43'
              height='33.42'
              viewBox='0 0 33.43 33.42'>
              <title>Fichier 4</title>
              <g id='c7152e74-87fb-4817-b3ee-eaa51e10c83d' data-name='Calque 2'>
                <g
                  id='b684b04e-e69c-4b1f-9f12-178946f473e9'
                  data-name='Calque 1'>
                  <polygon
                    points='33.43 31.47 18.66 16.7 33.42 1.94 31.47 0 16.71 14.76 1.95 0 0 1.94 14.78 16.71 0.02 31.47 1.97 33.42 16.73 18.66 31.49 33.42 33.43 31.47'
                    fill='#222221'
                  />
                </g>
              </g>
            </svg>
          </button>
        </div>
      )} */}
    </div>
  );
};

type Props = {
  input: ModuleImages;
};

const ModuleImagesUI = ({ input }: Props): JSX.Element => {
  const { items, gridSize } = input;
  const [viewSlider, setViewSlider] = useState<boolean>(false);
  const [sliderIndex, setSliderIndex] = useState<number | any>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scope = useMemo(() => {
    return Math.round(Math.random() * 100);
  }, []);

  useEffect(() => {
    const token = subscribe("IMAGES_TO_SLIDER", (e, d) => {
      // console.log(scope, d);
      if (d.scope === scope) {
        setSliderIndex(d.index);
        setViewSlider(true);
      }
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    if (viewSlider && sliderRef.current) {
      sliderRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [viewSlider]);

  useEffect(() => {
    // console.log(sliderIndex);

    publish("SLIDER_INDEX", sliderIndex);

    // if (sliderRef.current) {
    //   sliderRef.current.scrollIntoView({
    //     behavior: "smooth",
    //   });
    // }
  }, [sliderIndex]);
  // console.log(items);
  return (
    <section className={clsx("module module--images mb-md")}>
      {viewSlider && (
        <div className='slider mb-lg' ref={sliderRef}>
          <Slider
            settingsOverride={{ autoplay: false, initialSlide: sliderIndex }}>
            {items?.map((item, i) => (
              <div className='slide' key={i}>
                <FigureComponent asset={item.image?.asset} width={1000} />
                {item.caption && (
                  <div className='caption py-02e '>{item.caption}</div>
                )}
              </div>
            ))}
          </Slider>
          {/* {sliderIndex} */}
          <button className='btn--close' onClick={() => setViewSlider(false)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='33.43'
              height='33.42'
              viewBox='0 0 33.43 33.42'>
              <title>Fichier 4</title>
              <g id='c7152e74-87fb-4817-b3ee-eaa51e10c83d' data-name='Calque 2'>
                <g
                  id='b684b04e-e69c-4b1f-9f12-178946f473e9'
                  data-name='Calque 1'>
                  <polygon
                    points='33.43 31.47 18.66 16.7 33.42 1.94 31.47 0 16.71 14.76 1.95 0 0 1.94 14.78 16.71 0.02 31.47 1.97 33.42 16.73 18.66 31.49 33.42 33.43 31.47'
                    fill='#222221'
                  />
                </g>
              </g>
            </svg>
          </button>
        </div>
      )}
      <div
        className={clsx(
          "grid gap-md",
          `md:grid-cols-${gridSize || 4}`,
          gridSize === 4 && "is-mosaic",
        )}>
        {items?.map((item, i) => (
          <Item
            key={item._key}
            input={item}
            canExpand={gridSize ? gridSize > 2 : false}
            index={i}
            scope={scope}
            prevIndex={i > 0 ? i - 1 : items.length - 1}
            nextIndex={i < items.length - 1 ? i + 1 : 0}
          />
        ))}
      </div>
    </section>
  );
};

export default ModuleImagesUI;
