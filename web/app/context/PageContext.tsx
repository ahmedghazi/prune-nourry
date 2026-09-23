"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { Settings } from "../types/schema";
// import { getSettings } from "../utils/sanity-queries";

// const PageContext = createContext({});
type ContextProps = {
  settings: Settings;
};

const PageContext = createContext<ContextProps>({} as ContextProps);

interface PageContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
  settings: Settings;
}

export const PageContextProvider = (props: PageContextProps) => {
  const { children, settings } = props;
  const pathname = usePathname();
  // console.log(pathname);
  // const [isInfos, setIsInfos] = useState<boolean>(false);
  // const settings: Settings = await getSettings();

  // const settings = {
  //   pathname,
  // };

  useEffect(() => {
    _format();
    _handlePageTemplate();
  }, [pathname]);

  useEffect(() => {
    _handlePageTemplate();
    _format();
    window.addEventListener("resize", _format);

    return () => {
      window.removeEventListener("resize", _format);
    };
  }, []);

  const _format = () => {
    // const wh = window.innerHeight;

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
    // document.documentElement.style.setProperty("--app-height", wh + "px");

    const header = document.querySelector("header");
    let headerBounding = { height: 50 };
    if (header) {
      headerBounding = header.getBoundingClientRect();

      document.documentElement.style.setProperty(
        "--header-height",
        headerBounding.height + "px",
      );
    }

    document.body.classList.remove("is-loading");
  };

  const _handlePageTemplate = () => {
    const mainDiv: HTMLElement = document.querySelector(
      "main [data-template]",
    ) as HTMLElement;
    // console.log(mainDiv);
    if (mainDiv) {
      const template = mainDiv.dataset.template;
      // console.log(template);

      document.body.dataset.template = `is-${template}`;
      setTimeout(() => {
        document.body.classList.remove("is-loading");
      }, 150);
    }
  };

  return (
    <PageContext.Provider value={{ settings }}>{children}</PageContext.Provider>
  );
};

// export default PageContext;
// export { PageContext, PageContextProvider };

export const usePageContext = () => useContext(PageContext);
