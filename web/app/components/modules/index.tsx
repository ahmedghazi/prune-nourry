"use client";
import React from "react";
import dynamic from "next/dynamic";
const ModuleImagesUI = dynamic(() => import("./ModuleImagesUI"), {
  ssr: false,
});
const ModuleProjectsUI = dynamic(() => import("./ModuleProjectsUI"), {
  ssr: false,
});
const ModuleVideoUI = dynamic(() => import("./ModuleVideoUI"), {
  ssr: false,
});
const ModuleVideosUI = dynamic(() => import("./ModuleVideosUI"), {
  ssr: false,
});
const ModuleSliderUI = dynamic(() => import("./ModuleSliderUI"), {
  ssr: false,
});
const ModuleProductsUI = dynamic(() => import("./ModuleProductsUI"), {
  ssr: false,
});
const ModuleArtworksUI = dynamic(() => import("./ModuleArtworksUI"), {
  ssr: false,
});
const ModulePressUI = dynamic(() => import("./ModulePressUI"), {
  ssr: false,
});

import "./index.scss";

const Modules = ({ input }: any) => {
  // console.log(input);
  const _renderModules = () => {
    const _modules = input.map((module: any, i: number) => {
      // console.log(module._type);
      switch (module._type) {
        case "moduleProjects":
          return <ModuleProjectsUI key={module._key} input={module} />;
        case "moduleImages":
          return <ModuleImagesUI key={module._key} input={module} />;
        case "moduleVideo":
          return <ModuleVideoUI key={module._key} input={module} />;
        case "moduleVideos":
          return <ModuleVideosUI key={module._key} input={module} />;
        case "moduleSlider":
          return <ModuleSliderUI key={module._key} input={module} />;
        case "moduleProducts":
          return <ModuleProductsUI key={module._key} input={module} />;
        case "moduleArtworks":
          return <ModuleArtworksUI key={module._key} input={module} />;
        case "modulePress":
          return <ModulePressUI key={module._key} input={module} />;
        default:
          return null;
      }
    });
    return _modules;
  };

  return <div className='modules'>{_renderModules()}</div>;
};

export default Modules;
