import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import FigureComponent from "./Figure";
import { SanityImageAsset } from "@/app/types/schema";
import { a } from "framer-motion/client";

type Props = {
  asset: SanityImageAsset | any;
  width?: number;
};

const FigureExpand = ({ asset, width }: Props) => {
  const [open, setOpen] = React.useState(false);
  const modalStyle = {
    position: "fixed" as const,
    inset: "0",
    backgroundColor: "rgba(255, 255,255, 1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };
  const btntyle = {
    position: "absolute" as const,
    padding: "var(--space-md)",
    top: 0,
    right: 0,
  };
  return (
    <div className='figure-expand'>
      <div
        className='figure-toggle'
        role='button'
        onClick={() => setOpen(!open)}>
        <FigureComponent asset={asset} width={width} />
      </div>
      {open && (
        <div
          className='modal'
          style={modalStyle}
          onClick={() => setOpen(false)}>
          <button className='btn--close' style={btntyle}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='33.43'
              height='33.42'
              viewBox='0 0 33.43 33.42'>
              <title>Fichier 4</title>
              <g id='c7152e74-87fb-4817-b3ee-eaa51e10c83d' data-name='Calque 2'>
                <g
                  id='b684b04e-e69c-4b1f-9f12-178946f473e9'
                  data-name='Calque 1'>
                  <polygon
                    points='33.43 31.47 18.66 16.7 33.42 1.94 31.47 0 16.71 14.76 1.95 0 0 1.94 14.78 16.71 0.02 31.47 1.97 33.42 16.73 18.66 31.49 33.42 33.43 31.47'
                    fill='#222221'></polygon>
                </g>
              </g>
            </svg>
          </button>
          <TransformWrapper
            maxPositionX={0}
            maxPositionY={0}
            limitToBounds={true}>
            <TransformComponent>
              <FigureComponent asset={asset} width={width} />
            </TransformComponent>
          </TransformWrapper>
        </div>
      )}
    </div>
  );
};

export default FigureExpand;
