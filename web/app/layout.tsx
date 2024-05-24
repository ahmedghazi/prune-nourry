import "./styles/tailwind.css";
import "./styles/index.scss";
import Header from "./components/Header";
import website from "./config/website";
import { getSettings } from "./utils/sanity-queries";
import { PageContextProvider } from "./context/PageContext";
import { LocaleContextProvider } from "./context/LocaleContext";
import { ShopWrapper } from "./components/shop/ShopContext";
import CartAside from "./components/shop/CartSide";
import ImageExpand from "./components/ui/ImageExpand";
import PageTransition from "./components/ui/PageTransition";

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
  const settings = await getSettings();

  return (
    <html lang='en'>
      <body className={"is-loading"}>
        <div id='page'>
          <LocaleContextProvider>
            <ShopWrapper>
              <PageContextProvider settings={settings}>
                <Header settings={settings} />
                {/* <PageTransition> */}
                <main className='md:px-lg md:pb-lg'>{children}</main>
                {/* </PageTransition> */}

                <ImageExpand selector={".module--images img"} />
              </PageContextProvider>
            </ShopWrapper>
          </LocaleContextProvider>
        </div>
      </body>
    </html>
  );
}
