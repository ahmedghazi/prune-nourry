"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
// import Script from "next/script";
// import UseLocaleContext from "../../context/LocaleContext";
// import { publish } from "pubsub-js";

import { usePathname } from "next/navigation";
import { ProductExtend } from "@/app/types/extend";

interface ShopContextProps {
  // location?: object;
  children: ReactNode;
  // pageContext: object;
}

type ContextProps = {
  ready: boolean;
  cartItems: ProductExtend[];
  setCartItems: Function;
};

const ShopContext = createContext<ContextProps>({} as ContextProps);

declare global {
  interface Window {
    Snipcart: any; // 👈️ turn off type checking
  }
}

export const ShopWrapper = ({ children }: ShopContextProps) => {
  const [ready, setReady] = useState(false);
  const [cartItems, setCartItems] = useState<ProductExtend[]>([]);
  // const pathname = usePathname();

  // useEffect(() => {}, []);

  return (
    <ShopContext.Provider value={{ ready, cartItems, setCartItems }}>
      {children}
    </ShopContext.Provider>
  );
};
export default function useShop() {
  return useContext(ShopContext);
}
