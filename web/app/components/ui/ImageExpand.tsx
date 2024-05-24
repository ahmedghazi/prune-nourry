"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { subscribe, unsubscribe } from "pubsub-js";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  selector: string;
};

const initialBounding = { x: 0, y: 0, width: 0, height: 0 };

const ImageExpand = ({ selector }: Props) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [bounding, setBounding] = useState<DOMRect | any>(initialBounding);
  const ref = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      addListeners();
    }, 500);

    return () => {
      removeListeners();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      addListeners();
    }, 500);

    return () => {
      removeListeners();
    };
  }, [pathname]);

  const addListeners = () => {
    let btns;
    // console.log(selector);

    btns = document.querySelectorAll(selector);
    // console.log(btns);

    if (btns) {
      btns.forEach((el) => {
        // console.log(el);
        el.removeEventListener("click", _placeIt);
        el.addEventListener("click", _placeIt);
      });
    }
  };

  const removeListeners = () => {
    let btns = document.querySelectorAll(selector);
    if (btns)
      btns.forEach((el) => {
        el.removeEventListener("click", _placeIt);
      });
  };

  const _placeIt = ({ target }: any) => {
    console.log("_placeIt", target);
    if (!target) return;
    if (!ref.current) return;

    const targetBounding = target.getBoundingClientRect();

    setBounding(targetBounding);
    setImage(target);
    ref.current.classList.add("is-placed");
  };

  useEffect(() => {
    // return;
    if (!ref.current) return;
    if (image) {
      ref.current.addEventListener("click", _closeIt);
      window.addEventListener("resize", _expandIt);
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.classList.add("is-anime");
        setTimeout(() => {
          _expandIt();
        }, 50);
      }, 50);
    }

    return () => {
      if (ref.current) ref.current.removeEventListener("click", _closeIt);
      window.removeEventListener("resize", _expandIt);
    };
  }, [bounding, image]);

  const _expandIt = () => {
    // console.log("_expandIt");
    // return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // const { width, height } = bounding
    // console.log(windowWidth, windowHeight);
    const newWith = (windowWidth * 100) / 100;
    const newHeight = (windowHeight * 100) / 100;

    const translateX = (windowWidth - newWith) / 2;
    const translateY = (windowHeight - newHeight) / 2;

    if (outerRef.current) {
      outerRef.current.style.width = `${newWith}px`;
      outerRef.current.style.height = `${newHeight}px`;
      outerRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    }
  };

  const _closeIt = () => {
    const { width, height, x, y } = bounding;
    if (outerRef.current) {
      outerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      outerRef.current.style.width = `${width}px`;
      outerRef.current.style.height = `${height}px`;
    }

    if (!ref.current) return;

    setTimeout(() => {
      if (!ref.current) return;
      ref.current.classList.remove("is-placed");

      setTimeout(() => {
        // return;
        // console.log('_closeIt remove styles and classes', ref.current);
        if (ref.current) ref.current.classList.remove("is-anime");
        setImage(null);
        setBounding(initialBounding);
        window.removeEventListener("resize", _expandIt);
      }, 150);
    }, 350);
  };

  return (
    <div ref={ref} className={"image-expand"}>
      <div className='bg absolute inset-0 bg-primary-50'></div>
      <div
        className='outer'
        ref={outerRef}
        style={{
          width: bounding.width,
          height: bounding.height,
          transform: `translate(${bounding.x}px, ${bounding.y}px)`,
        }}>
        <div className='inner'>
          {image && (
            <figure>
              <img src={image.src} alt='' />

              {/* {bounding.y} */}
              <figcaption className='text-sm  py-05e absolute'>
                {image.alt}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageExpand;
