import { ModuleSlider } from "@/app/types/schema";
import clsx from "clsx";
import React from "react";
import Figure from "../ui/Figure";
import Slider from "../ui/slick-slider";

type Props = {
  input: ModuleSlider;
};

const ModuleSliderUI = ({ input }: Props) => {
  const { images } = input;
  return (
    <section className={clsx("module module--slider mb-md")}>
      <Slider settingsOverride={{ autoplay: true }}>
        {images?.map((item, i) => (
          <div className='slide' key={i}>
            <Figure asset={item.asset} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ModuleSliderUI;
