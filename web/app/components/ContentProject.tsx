"use client";
import React from "react";
import Slider from "./ui/slick-slider/index";
import { Project } from "../types/schema";
import Modules from "./modules";
import { _localizeField } from "../utils/utils";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import SanityExcerptToText from "./ui/SanityExcerptToText";

type Props = {
  input: Project;
};

const ContentProject = ({ input }: Props) => {
  // console.log(input.text);
  return (
    <article className='content--project'>
      <div className='md:grid md:grid-cols-12 gap-md'>
        <div className='body md:col-span-4 mb-md'>
          <div className='inner md:sticky- top-header-height-'>
            <h1 className='mb-md'>{_localizeField(input.title)}</h1>

            {input.excerpt && input.text ? (
              <SanityExcerptToText
                excerpt={_localizeField(input.excerpt)}
                text={_localizeField(input.text)}
              />
            ) : (
              <div className='text'>
                <PortableText
                  value={_localizeField(input.text)}
                  components={portableTextComponents}
                />
              </div>
            )}
          </div>
        </div>
        <div className='media md:col-span-8 pb-lg'>
          {input.modules && <Modules input={input.modules} />}
        </div>
      </div>
    </article>
  );
};

export default ContentProject;
