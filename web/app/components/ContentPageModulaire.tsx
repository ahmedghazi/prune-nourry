"use client";
import React from "react";
import { SanityKeyed } from "sanity-codegen";
import {
  ModuleImages,
  ModuleText,
  ModuleTexts,
  ModuleVideo,
  ModuleVideos,
  ModuleSlider,
  ModuleProjects,
  ModuleProducts,
  LocaleString,
  ModuleExhibitions,
} from "../types/schema";
import Modules from "./modules";
import { _localizeField } from "../utils/utils";
import clsx from "clsx";

type Props = {
  title: LocaleString;
  input:
    | Array<
        | SanityKeyed<ModuleImages>
        | SanityKeyed<ModuleText>
        | SanityKeyed<ModuleTexts>
        | SanityKeyed<ModuleVideo>
        | SanityKeyed<ModuleVideos>
        | SanityKeyed<ModuleSlider>
        | SanityKeyed<ModuleProjects>
        | SanityKeyed<ModuleProducts>
        | SanityKeyed<ModuleExhibitions>
        | SanityKeyed<ModuleText>
      >
    | any;
};

const ContentPageModulaire = ({ title, input }: Props) => {
  const isPageText =
    input.filter((el: any) => el._type === "moduleText").length > 0;
  return (
    <div className='content--page-modulaire'>
      <div className={clsx("sm-only", isPageText && "!block")}>
        <h1 className='mb-md'>{_localizeField(title) || "title"}</h1>
      </div>
      {/* {JSON.stringify(isPageText)} */}
      <Modules input={input} />
    </div>
  );
};

export default ContentPageModulaire;
