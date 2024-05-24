"use client";
import React from "react";
import { Product, Project } from "../types/schema";
import { _linkResolver, _localizeField } from "../utils/utils";
import Figure from "./ui/Figure";
import Link from "next/link";

type Props = {
  input: Project;
};

const CardProject = ({ input }: Props) => {
  return (
    <article className='card--project '>
      <Link href={_linkResolver(input)} className='td-n'>
        {input.imageCover && (
          <Figure
            asset={input.imageCover.asset}
            width={600}
            alt={_localizeField(input.title)}
          />
        )}
        <div className='header'>
          <h2>{_localizeField(input.title)}</h2>
        </div>
      </Link>
    </article>
  );
};

export default CardProject;
