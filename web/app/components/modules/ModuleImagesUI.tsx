import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import FigureComponent from "../ui/Figure";
import { Figure, ModuleImages } from "@/app/types/schema";
import Masonry from "react-masonry-css";
import { publish, subscribe, unsubscribe } from "pubsub-js";

type ItemProps = {
  input: Figure;
};
const Item = ({ input }: ItemProps) => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = subscribe("IMAGES_EXPANDE", (e, d) => {
      if (d !== input.image?.asset._id) {
        setActive(false);
      }
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  useEffect(() => {
    if (active) {
      publish("IMAGES_EXPANDE", input.image?.asset._id);
      if (ref.current) {
        ref.current?.scrollIntoView({
          behavior: "smooth",
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
    </div>
  );
};

type Props = {
  input: ModuleImages;
};

const ModuleImagesUI = ({ input }: Props): JSX.Element => {
  const { items, gridSize } = input;

  return (
    <section className={clsx("module module--images mb-md")}>
      {/* {gridType === "default" && ( */}
      <div
        className={clsx(
          "grid gap-md",
          `md:grid-cols-${gridSize}`,
          gridSize === 4 && "is-mosaic"
        )}>
        {items?.map((item, i) => (
          <Item key={i} input={item} />
        ))}
      </div>
      {/* )} */}

      {/* {gridType === "masonry" && (
        <Masonry
          breakpointCols={{
            default: 3,
            1100: 3,
            700: 2,
            500: 1,
          }}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'>
          {items?.map((item, i) => (
            <div className='item mb-md cursor-zoom-in' key={i}>
              <Figure
                asset={item.image?.asset}
                alt={item.caption || "no caption"}
              />
            </div>
          ))}
        </Masonry>
      )} */}
    </section>
  );
};

export default ModuleImagesUI;
