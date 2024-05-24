"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  LinkExternal,
  LinkInternal,
  MenuItem,
  SanityKeyed,
} from "../types/schema";
import { _linkResolver, _localizeField } from "../utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Search from "./ui/Search";
import LocalesSwitcher from "./ui/LocaleSwitcher";
import CartMenu from "./shop/CartMenu";
import { subscribe, unsubscribe } from "pubsub-js";

const SubMenuItem = ({ input }: LinkInternal | LinkExternal | any) => {
  const pathname = usePathname();
  const _isCurrent = (path: string) => path === pathname;

  return (
    <Link
      href={_linkResolver(input.link)}
      className={clsx(
        " ",
        _isCurrent(_linkResolver(input.link)) ? "is-current" : ""
      )}>
      <div className='label'>{_localizeField(input.label)}</div>
    </Link>
  );
};
const MenuItemNode = ({ input }: MenuItem | any) => {
  const ref = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const _isCurrent = (path: string) => path === pathname;

  const _onClick = (e: React.MouseEvent<HTMLElement>) => {
    const hasSubMenu = input.subMenu && input.subMenu.length > 0;
    if (!hasSubMenu) return;

    e.preventDefault();
    if (ref && ref.current) ref.current.classList.toggle("is-active");
  };

  const hasSubmenu = input.subMenu && input.subMenu.length > 0;
  return (
    <div className='menu-item'>
      <Link
        href={_linkResolver(input.link?.link)}
        onClick={_onClick}
        className={clsx(
          "",
          !hasSubmenu && _isCurrent(_linkResolver(input.link?.link))
            ? "is-current"
            : ""
        )}>
        <div className='label'>{_localizeField(input.link?.label)}</div>
      </Link>
      {input.subMenu && (
        <ul
          ref={ref}
          className={clsx(
            "sub-menu",
            `parent-${input.link?.link?.slug?.current}`
          )}>
          {input.subMenu.map(
            (_item: LinkInternal | LinkExternal | any, j: number) => (
              <li key={j} className='depth-1'>
                <SubMenuItem input={_item} />
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

type Props = {
  input: Array<SanityKeyed<MenuItem> | SanityKeyed<LinkExternal>>;
};

const Nav = ({ input }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    const token = subscribe("BURGER", (e, d) => {
      setActive(d);
    });

    return () => {
      unsubscribe(token);
    };
  }, []);

  // console.log(input);
  return (
    <nav className={clsx("nav-primary", active && "is-active")}>
      <ul className='flex flex-col md:flex-row justify-between'>
        {input.map((item, i) => (
          <li
            key={i}
            className={clsx(
              "depth-0",

              item._type === "menuItem" &&
                item.subMenu &&
                item.subMenu.length > 0
                ? "has-sub-menu"
                : "",
              item._type === "menuItem" &&
                `menu-${item.link?.link?.slug?.current}`,
              item._type === "menuItem" &&
                item.link?.link?.slug?.current === "shop"
                ? "menu-product"
                : ""
              // `type-${item.link ? item.link : ""}`
            )}>
            {item && item._type === "menuItem" && (
              <MenuItemNode input={item} key={i} />
            )}
          </li>
        ))}

        <li>
          <CartMenu />
        </li>
        <li>
          <Search />
        </li>
        <li>
          <LocalesSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
