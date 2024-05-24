"use client";
import React, { useState } from "react";
import { Contact, News, NewsInstagram } from "../types/schema";
import { _localizeField, _localizeText } from "../utils/utils";
import { PortableText } from "@portabletext/react";
import components from "../utils/portableTextComponents";
import Figure from "./ui/Figure";
import ArticleInstagram from "./ArticleInstagram";
import Mailchimp from "./ui/Mailchimp";
import portableTextComponents from "../utils/portableTextComponents";

type Props = {
  input: Contact;
};

const ContentContact = ({ input }: Props) => {
  const [post, setPost] = useState<NewsInstagram | any>(null);
  return (
    <div className='content-contact'>
      <div className='text-lg md:w-8/12'>
        <Mailchimp
          // action='https://club.us11.list-manage.com/subscribe/post?u=7ec729474c5f3671662bdeda0&id=5530cd0b9b&f_id=00fdafe0f0&tags=123'
          action='https://club.us11.list-manage.com/subscribe/post?u=xxxxxx'
          fields={[
            {
              name: "EMAIL",
              placeholder: "Email",
              type: "email",
              required: true,
            },
            {
              name: "NAME",
              placeholder: _localizeText("firstName"),
              type: "text",
              required: true,
            },
          ]}
        />

        {input.text && (
          <div className='text mb-md'>
            <PortableText
              value={_localizeField(input.text)}
              components={portableTextComponents}
            />
          </div>
        )}
        {input.credits && (
          <div className='text text-md'>
            <PortableText
              value={_localizeField(input.credits)}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentContact;
