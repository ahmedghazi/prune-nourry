import Link from "next/link";
import React from "react";

import Nav from "./Nav";
import { Settings } from "../types/schema";
import Burger from "./ui/Burger";

type Props = {
  settings: Settings;
};

const Header = ({ settings }: Props) => {
  return (
    <header>
      <div className='md:grid md:grid-cols-12 gap-md'>
        <div className='md:col-span-4'>
          <Link href='/' className='td-n'>
            <div className='site-name text-lg'>
              {settings.siteName || "PRUNE NOURRY"}
            </div>
          </Link>
        </div>
        <div className='col-span-8'>
          {settings.navPrimary && <Nav input={settings.navPrimary} />}
        </div>
      </div>
      <Burger />
    </header>
  );
};

export default Header;
