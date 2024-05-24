"use client";
import React from "react";
import clsx from "clsx";
import styled from "styled-components";
// import Intro from "./Splash";

const Section = styled.section`
  /* background: whitesmoke; */
  /* padding: var(--space-md); */
  /* margin-bottom: var(--space-md); */
  /* max-width: 70vw; */
`;

type SpaceProps = {
  space: string;
};
const Space = styled.div<SpaceProps>`
  background: var(--color-primary);
  margin-bottom: 1rem;
  height: var(${(props) => props.space});
`;

const DesignSystem = () => {
  const texts = ["lg", "md", "sm"];
  const spaces = ["sm", "md", "lg"];

  return (
    <div className='design-system '>
      <Section className=' mb-lg '>
        {texts.map((item, i) => (
          <div className={clsx(`text-${item}`, "mb-md")} key={i}>
            <div className='row'>
              <div className='col-md-4'>
                <span>Text {item}</span>
              </div>
              <div className='col-xs'>
                <p className={clsx(`text-${item} uppercase- py-02re-`)}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Rerum corporis ab harum blanditiis nam delectus ipsum nulla
                  eveniet dolores alias qui vero <a href='#'>dolorem</a>, nobis
                  fugiat asperiores hic repudiandae vitae quae.
                </p>
              </div>
            </div>
          </div>
        ))}
      </Section>

      {/* <Section>
        <i className="icon-arrow icon-arrow__n"></i>
        <i className="icon-arrow icon-arrow__e"></i>
        <i className="icon-arrow icon-arrow__s"></i>
        <i className="icon-arrow icon-arrow__w"></i>
      </Section> */}

      <Section className=' mb-lg'>
        <h2 className='text-lg mb-1'>Text</h2>

        <p className='text-md-'>
          Lorem ipsum <b>dolor</b> sit, amet <em>consectetur</em> adipisicing
          <br />
          elit. Beatae earum, deleniti inventore vero asperiores voluptatem!
          <br />
          <a href='#'>Distinction</a> temporibus minima sint <i>autem</i>.
        </p>
        <ul className='mb-md'>
          <li>List 1</li>
          <li>List 2</li>
        </ul>
      </Section>

      <Section className='mb-lg'>
        <h2 className='text-lg mb-1'>Buttons</h2>
        <ul className='flex items-baseline '>
          <li className='pr-2'>
            <a href='#' className='  '>
              Link
            </a>
          </li>
          <li className='pr-2'>
            <a href='#' className='btn outline '>
              Link
            </a>
          </li>
          <li className='pr-2'>
            <a href='#' className='btn outline is-active '>
              Link
            </a>
          </li>
          <li className='pr-2'>
            <button className='btn'>Button</button>
          </li>
        </ul>
      </Section>

      <Section className=' mb-lg'>
        <h2 className='text-lg mb-1'>Spaces</h2>
        <Space className='space space-sm' space={"--space-sm"} />
        <Space className='space space-md' space={"--space-md"} />
        <Space className='space space-lg' space={"--space-lg"} />
      </Section>

      <Section className=' mb-lg'>
        <h2 className='text-lg mb-1'>text image</h2>
        <div className='text-image mb-md'>
          <div className='grid grid-cols-2 gap-md'>
            <figure>
              <img
                src='https://goldenblocks.fr/wp-content/uploads/2021/01/photo-streetrunner-2.jpg'
                alt=''
              />
            </figure>
            <div className='text'>
              <h3 className='text-xl'>Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                ipsum sunt vero cupiditate dolorem minima animi quis ducimus,
                iure odit beatae! Perspiciatis veniam laudantium molestiae!
                Ipsum sapiente odio iste fugit.
              </p>
            </div>
          </div>
        </div>
        <div className='text-image text-image--reverse mb-md' dir='rtl'>
          <div className='grid grid-cols-2 gap-md'>
            <figure>
              <img
                src='https://goldenblocks.fr/wp-content/uploads/2021/01/photo-streetrunner-2.jpg'
                alt=''
              />
            </figure>
            <div className='text '>
              <h3 className='text-xl'>Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                ipsum sunt vero cupiditate dolorem minima animi quis ducimus,
                iure odit beatae! Perspiciatis veniam laudantium molestiae!
                Ipsum sapiente odio iste fugit.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DesignSystem;
