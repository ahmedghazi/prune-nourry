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
  // const [showConsent, setShowConsent] = useState<boolean>(true);
  // const hasCookieValue = hasCookie("localConsent");
  const [showConsent, setShowConsent] = React.useState<
    boolean | Promise<boolean>
  >(true);
  const has: boolean | Promise<boolean> = hasCookie("localConsent");

  useEffect(() => {
    setShowConsent(has);
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  const localizedMessage = _localizeField(message);
  const acceptLabel = _localizeText("accept");

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

          <PortableText value={localizedMessage} components={components} />
        </div>
        <button
          className=' py-2 px-8  underline uppercase'
          onClick={() => acceptCookie()}>
          {acceptLabel}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
