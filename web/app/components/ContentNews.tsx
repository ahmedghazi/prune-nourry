"use client";
import React, { useState } from "react";
import { News, NewsInstagram } from "../types/schema";
import { _localizeField, _localizeText } from "@/app/lib/utils";
import { PortableText } from "@portabletext/react";
import components from "@/app/sanity-api/portableTextComponents";
import Figure from "./ui/Figure";
import ArticleInstagram from "./ArticleInstagram";
import Mailchimp from "./ui/Mailchimp";
import { usePageContext } from "../context/PageContext";

type Props = {
  input: News;
};

const ContentNews = ({ input }: Props) => {
  const [post, setPost] = useState<NewsInstagram | any>(null);
  const { settings } = usePageContext();
  return (
    <div className='content-news'>
      <div className='grid md:grid-cols-12 gap-md'>
        <div className='md:col-span-4'>
          <div className='text-lg text'>
            {settings.urlNewsletter && (
              <Mailchimp
                // action='https://club.us11.list-manage.com/subscribe/post?u=7ec729474c5f3671662bdeda0&id=5530cd0b9b&f_id=00fdafe0f0&tags=123'
                action={settings.urlNewsletter}
                fields={[
                  {
                    name: "EMAIL",
                    placeholder: _localizeText("email"),
                    type: "email",
                    required: true,
                  },
                  {
                    name: "MMERGE1",
                    placeholder: _localizeText("country"),
                    type: "text",
                    required: true,
                  },
                  {
                    name: "MMERGE3",
                    placeholder: _localizeText("firstName"),
                    type: "text",
                    required: true,
                  },
                  {
                    name: "MMERGE2",
                    placeholder: _localizeText("lastName"),
                    type: "text",
                    required: true,
                  },
                ]}
              />
            )}

            {settings.instagram && (
              <a
                href={settings.instagram.link}
                target='_blank'
                rel='noopener noreferrer'>
                {settings.instagram.label}
              </a>
            )}
          </div>
        </div>
        <div className='md:col-span-8'>
          <div className='grid md:grid-cols-4 gap-md'>
            {input.items?.map((item, i) => (
              <div
                className='card--insta cursor-pointer'
                key={i}
                onClick={() => setPost(item)}>
                <Figure asset={item.imageCover?.asset} width={500} alt={""} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {post && (
        <div className='modal bg-white z-10'>
          <div className='inner'>
            <ArticleInstagram input={post} />
            <button className='btn--close' onClick={() => setPost(null)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='33.43'
                height='33.42'
                viewBox='0 0 33.43 33.42'>
                <title>Fichier 4</title>
                <g
                  id='c7152e74-87fb-4817-b3ee-eaa51e10c83d'
                  data-name='Calque 2'>
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
        </div>
      )}
    </div>
  );
};

export default ContentNews;
