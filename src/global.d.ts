/// <reference types="@sveltejs/kit" />

type PNGSrc = {
  png: string;
  webp: string;
};

type JPGSrc = {
  jpg: string;
  webp: string;
};

declare type ImgSrc = PNGSrc | JPGSrc;
