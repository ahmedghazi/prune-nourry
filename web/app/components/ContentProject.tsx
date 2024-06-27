"use client";
import React, { useState } from "react";
import Slider from "./ui/slick-slider/index";
import { Project } from "../types/schema";
import Modules from "./modules";
import { _linkResolver, _localizeField } from "../utils/utils";
import { PortableText } from "next-sanity";
import portableTextComponents from "../utils/portableTextComponents";
import SanityExcerptToText from "./ui/SanityExcerptToText";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  input: Project;
};

const ContentProject = ({ input }: Props) => {
  // console.log(input);
  const [sticky, setSticky] = useState<boolean>(false);
  return (
    <article className='content--project'>
      <div className='md:grid md:grid-cols-12 gap-lg'>
        <div className='body md:col-span-4 mb-md'>
          <div
            className={clsx("inner ", sticky && "md:sticky top-header-height")}>
            <h1 className='mb-md'>{_localizeField(input.title)}</h1>

            {input.excerpt && input.text ? (
              <div className='mb-md'>
                <SanityExcerptToText
                  excerpt={_localizeField(input.excerpt)}
                  text={_localizeField(input.text)}
                  onChange={(val: boolean) => {
                    setSticky(val);
                  }}
                />
              </div>
            ) : (
              <div className='mb-md'>
                <div className='text'>
                  <PortableText
                    value={_localizeField(input.text)}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}

            {input.link && (
              <Link href={_linkResolver(input.link.link)} className='td-u'>
                {_localizeField(input.link.label)}
              </Link>
            )}

            {input.credits && (
              <div className='text'>
                <PortableText
                  value={_localizeField(input.credits)}
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
