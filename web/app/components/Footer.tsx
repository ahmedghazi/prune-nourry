"use client";
import React from "react";
import { Settings } from "../types/schema";
import { _linkResolver, _localizeField } from "../utils/utils";
import Link from "next/link";
import website from "../config/website";

type Props = {
  settings: Settings;
};

const Footer = ({ settings }: Props) => {
  return (
    <footer>
      {/* <pre>{JSON.stringify(settings, null, 2)}</pre> */}
      <div className='flex justify-between'>
        <div className='g'>
          © {website.title} {new Date().getFullYear()}
        </div>
        <nav className='footer-nav'>
          <ul className='flex gap-sm'>
            {settings.navSecondary &&
              settings.navSecondary?.map((item, i) => (
                <li key={i}>
                  <Link href={_linkResolver(item.link)}>
                    {_localizeField(item.label)}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
