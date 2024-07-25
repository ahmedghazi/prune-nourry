import React from "react";
import CookieConsent from "./CookieConsent";
import { getSettings } from "@/app/utils/sanity-queries";
import { _localizeField } from "@/app/utils/utils";

const CookieWrapper = async () => {
  const settings = await getSettings();

  return (
    <div>
      {settings.messageCookies && settings.messageCookies.en && (
        <CookieConsent message={settings.messageCookies} />
      )}
    </div>
  );
};

export default CookieWrapper;
