// import "./styles/tailwind.css";
import "./styles/index.scss";
import "./global.css";

import Header from "./components/Header";
import website from "./config/website";
import { getSettings } from "./utils/sanity-queries";
import { Settings } from "./types/schema";
import { PageContextProvider } from "./context/PageContext";
import { LocaleContextProvider } from "./context/LocaleContext";
import { ShopWrapper } from "./components/shop/ShopContext";
import CartAside from "./components/shop/CartSide";
import ImageExpand from "./components/ui/ImageExpand";
import PageTransition from "./components/ui/PageTransition";
import Footer from "./components/Footer";
import CookieWrapper from "./components/ui/CookieWrapper";
import { draftMode } from "next/headers";
import VisualEditingClient from "./components/VisualEditingClient";

export const metadata = {
  metadataBase: new URL(website.url),
  title: {
    template: `%s — ${website.title}`,
  },
  description: website.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = (await getSettings()) as unknown as Settings;
  const { isEnabled } = await draftMode();

  return (
    <html lang='en'>
      <body className={"is-loading"}>
        <div id='page'>
          <LocaleContextProvider>
            <ShopWrapper>
              <PageContextProvider settings={settings}>
                <Header settings={settings} />
                <main className='md:px-lg md:pb-lg'>{children}</main>
                <Footer settings={settings} />
                <CookieWrapper />
                {isEnabled && <VisualEditingClient />}
              </PageContextProvider>
            </ShopWrapper>
          </LocaleContextProvider>
        </div>
      </body>
    </html>
  );
}
