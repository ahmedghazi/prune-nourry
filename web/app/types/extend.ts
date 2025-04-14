import { Artwork, Product, Project, TagProjectArtwork } from "./schema";

export interface ProductExtend extends Product {
  quantity: number;
}

export interface ProjectExtend extends Project {
  artworks: Artwork[];
}

export interface ITagProjectArtwork {
  tag: TagProjectArtwork;
  items: Artwork[];
}
