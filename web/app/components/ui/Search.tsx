"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  _linkResolver,
  _localizeField,
  _localizeText,
} from "@/app/utils/utils";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import Figure from "./Figure";
import {
  Contact,
  Infos,
  News,
  PageModulaire,
  Product,
  Project,
} from "@/app/types/schema";

// import debounce from "lodash.debounce";

type SearchResultItemProps = {
  input: Infos | PageModulaire | Project | News | Contact | Product | any;
};

const SearchResultItem = ({ input }: SearchResultItemProps) => (
  <div className='item'>
    <Link href={_linkResolver(input)}>
      <div className='grid md:grid-cols-12'>
        <div className='title col-span-4'>{_localizeField(input.title)}</div>
        <div className='col-span-3'>
          <div className='image '>
            {input.imageCover && (
              <Figure
                asset={input.imageCover?.asset}
                width={1000}
                alt={_localizeField(input.title)}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  </div>
);

type Props = {};

const Search = (props: Props) => {
  const [term, setTerm] = useState<string>("");
  // const { searchResult, setSearchResult } = usePageContext();
  const [active, setActive] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refInputWrapper = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    _format();
    window.addEventListener("resize", _format);

    return () => {
      window.removeEventListener("resize", _format);
    };
  }, []);

  const _format = () => {
    if (!refWrapper.current || !refInputWrapper.current) return;

    const nav = document.querySelector("header nav");
    if (nav) {
      const navBounding = nav.getBoundingClientRect();
      refInputWrapper.current.style.left = navBounding.left + "px";

      const wrapperBounding = refWrapper.current?.getBoundingClientRect();
      const width = wrapperBounding?.right - navBounding.left;
      refInputWrapper.current.style.width = width + "px";
    }
  };

  // reset
  useEffect(() => {
    // console.log("heeeeeeeeeee");
    setTerm("");
    setActive(false);
    if (setSearchResult) {
      setSearchResult([]);
    }
  }, [pathname]);

  useEffect(() => {
    if (!refInput.current) return;
    refInput.current.focus();
  }, [active]);

  const _handleSearch = async () => {
    const body = { s: term };
    // console.log(body);
    // return;
    document.body.classList.add("is-fetching");
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      // console.log(data);
      if (setSearchResult) setSearchResult(data);
      document.body.classList.remove("is-fetching");
    } catch (error: any) {
      console.log(error);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setTerm(event.target?.value);
    } else {
      if (setSearchResult) setSearchResult([]);
    }
  };

  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.length > 0) {
      _handleSearch();
    }
  };

  const _reset = () => {
    setTerm("");
    setSearchResult([]);
    setActive(false);
  };

  const _openClick = () => {
    console.log("_openClick");

    setActive(!active);
  };

  return (
    <div className='search-wrapper' ref={refWrapper}>
      <button onClick={() => _openClick()}>
        <div className='hidden-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='13.2'
            height='13.19'
            viewBox='0 0 13.2 13.19'>
            <path d='M13,12,9.93,9a5.55,5.55,0,1,0-1,1L12,13a.69.69,0,1,0,1-1ZM5.56,9.73A4.17,4.17,0,1,1,9.74,5.56,4.17,4.17,0,0,1,5.56,9.73Z' />
          </svg>
        </div>
        <div className='sm-only'>{_localizeText("search")}</div>
      </button>
      {active && (
        <div className={clsx("search-modal", active && "is-active")}>
          <form className='search' onSubmit={_handleSubmit}>
            <div className={clsx("input-wrapper")} ref={refInputWrapper}>
              <input
                type='search'
                ref={refInput}
                placeholder={_localizeText("search")}
                name='term'
                // onChange={changeHandler}
                onInput={changeHandler}
                value={term}
              />
              <input type='submit' hidden />
              <button onClick={() => _reset()} className='btn--close'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='33.43'
                  height='33.42'
                  viewBox='0 0 33.43 33.42'>
                  <polygon
                    points='33.43 31.47 18.66 16.7 33.42 1.94 31.47 0 16.71 14.76 1.95 0 0 1.94 14.78 16.71 0.02 31.47 1.97 33.42 16.73 18.66 31.49 33.42 33.43 31.47'
                    fill='#222221'
                  />
                </svg>
              </button>
            </div>
            {/* <div className='py-md bg-red'>term: {term}</div> */}
          </form>
          {searchResult.length > 0 && (
            <div className='results'>
              <div className='header py-md'>
                <div className='label'>
                  {`${_localizeText("searchResultFor")}: ${term}`}
                </div>

                {/* <button className='btn--close' onClick={_reset}>
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
                </button> */}
              </div>
              <div className='inner'>
                <div className='body text-lg'>
                  {searchResult.map((item, i) => (
                    <SearchResultItem key={i} input={item} />
                  ))}
                </div>
                {/* <pre>{JSON?.stringify(searchResult, null, 2)}</pre> */}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
