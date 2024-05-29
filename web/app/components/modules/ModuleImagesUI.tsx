import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import FigureComponent from "../ui/Figure";
import { Figure, ModuleImages } from "@/app/types/schema";
import Masonry from "react-masonry-css";
import { publish, subscribe, unsubscribe } from "pubsub-js";

type ItemProps = {
  input: Figure;
  scope: number;
  index: number;
  prevIndex: number;
  nextIndex: number;
};
const Item = ({ input, index, scope, prevIndex, nextIndex }: ItemProps) => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  // console.log({ index, prevIndex, nextIndex });
  useEffect(() => {
    const tokenA = subscribe("IMAGES_EXPAND", (e, d) => {
      console.log(d);
      if (d !== input.image?.asset._id) {
        setActive(false);
      }
    });

    const tokenB = subscribe("IMAGES_CHANGE", (e, d) => {
      console.log(index, scope, d.index);
      if (d.scope !== scope) return;
      if (index === d.index) {
        setActive(true);
      }
    });

    return () => {
      unsubscribe(tokenA);
      unsubscribe(tokenB);
    };
  }, []);

  useEffect(() => {
    if (active) {
      publish("IMAGES_EXPAND", input.image?.asset._id);
      if (ref.current) {
        ref.current?.scrollIntoView({
          // behavior: "smooth",
        });
      }
    }
  }, [active]);

  return (
    <div
      ref={ref}
      className={clsx(
        "item md:mb-md- cursor-zoom-in",
        active && "col-span-4 is-active cursor-zoom-out"
      )}
      onClick={() => setActive(!active)}>
      <FigureComponent asset={input.image?.asset} width={1000} />
      {active && (
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
        </div>
      )}
    </div>
  );
};

type Props = {
  input: ModuleImages;
};

const ModuleImagesUI = ({ input }: Props): JSX.Element => {
  const { items, gridSize } = input;
  const scope = Math.round(Math.random() * 100);
  return (
    <section className={clsx("module module--images mb-md")}>
      <div
        className={clsx(
          "grid gap-md",
          `md:grid-cols-${gridSize || 4}`,
          gridSize === 4 && "is-mosaic"
        )}>
        {items?.map((item, i) => (
          <Item
            key={item._key}
            input={item}
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
