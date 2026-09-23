"use client";
import React, { useState } from "react";
import { Contact, News, NewsInstagram } from "../types/schema";
import { _localizeField, _localizeText } from "@/app/lib/utils";
import { PortableText } from "@portabletext/react";
import components from "@/app/sanity-api/portableTextComponents";
import Figure from "./ui/Figure";
import ArticleInstagram from "./ArticleInstagram";
import Mailchimp from "./ui/Mailchimp";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { usePageContext } from "../context/PageContext";

type Props = {
  input: Contact;
};

const ContentContact = ({ input }: Props) => {
  // const [post, setPost] = useState<NewsInstagram | any>(null);
  const { settings } = usePageContext();
  return (
    <div className='content-contact'>
      <div className='text-lg md:w-8/12'>
        {settings.urlNewsletter && (
          <div className='text-lg text'>
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
          </div>
        )}

        {input.text && (
          <div className='text mb-md'>
            <PortableText
              value={_localizeField(input.text)}
              components={portableTextComponents}
            />
          </div>
        )}
        {input.credits && (
          <div className='credits'>
            <div className='text text-md'>
              <PortableText
                value={_localizeField(input.credits)}
                components={portableTextComponents}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentContact;
