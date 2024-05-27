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
      >
    | any;
};

const ContentPageModulaire = ({ title, input }: Props) => {
  return (
    <div className='content--page-modulaire'>
      <div className='sm-only'>
        <h1 className='mb-md'>{_localizeField(title) || "title"}</h1>
      </div>
      <Modules input={input} />
    </div>
  );
};

export default ContentPageModulaire;
