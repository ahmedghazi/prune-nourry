"use client";
import React, { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { BlockContent, LocaleBlockContent } from "@/app/types/schema";
import { PortableText } from "@portabletext/react";
import components from "@/app/utils/portableTextComponents";
import { _localizeField, _localizeText } from "@/app/utils/utils";

type Props = {
  message: LocaleBlockContent;
};

const CookieConsent = ({ message }: Props) => {
  const [showConsent, setShowConsent] = useState<boolean>(true);

  useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  if (showConsent) {
    return null;
  }

  return (
    <div className='fixed bottom-0 w-full bg-white z-50 cookie-consent'>
      <div className='inner  p-md flex place-items-end justify-end w-full'>
        <div className='mr-md '>
          {/* <pre>{JSON.stringify(settings.messageCookies, null, 2)}</pre> */}
          {/* This website uses cookies to improve user experience. By using our
          website you consent to all cookies in accordance with our Cookie
          Policy. */}

          <PortableText
            value={_localizeField(message)}
            components={components}
          />
        </div>
        <button
          className=' py-2 px-8  underline uppercase'
          onClick={() => acceptCookie()}>
          {_localizeText("accept")}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
