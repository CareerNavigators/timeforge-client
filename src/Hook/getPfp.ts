import { useState } from "react";
const imageLinks = [
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706229843/lqemhivo7ardngzjythn.png", // lqemhivo7ardngzjythn.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230664/fybainccijiisltjyhik.png", // fybainccijiisltjyhik.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230136/uv4hir5bhn0a52ulnlsr.png", // uv4hir5bhn0a52ulnlsr.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230639/fnhnsq6krrvl9dpyujhh.png", // fnhnsq6krrvl9dpyujhh.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230633/lz31mtbhkj3jqfoi2art.png", // lz31mtbhkj3jqfoi2art.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230620/w8nliggagxi9be26spj7.png", // w8nliggagxi9be26spj7.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230606/djfwbmlpagkbly3rwvph.png", // djfwbmlpagkbly3rwvph.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230672/jbn2dwcafzlumsh4jz1o.png", // jbn2dwcafzlumsh4jz1o.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230546/u7x81mi2lrj42jiiykv1.png", // u7x81mi2lrj42jiiykv1.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230614/axkc4phw1qmbox8nfvwy.png", // axkc4phw1qmbox8nfvwy.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230597/q6beseefjitjbgibcmkl.png", // q6beseefjitjbgibcmkl.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230681/foqe8oyyuylwh4yrzym8.png", // foqe8oyyuylwh4yrzym8.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706230627/hgybxodrzsgasod4hqye.png", // hgybxodrzsgasod4hqye.png (512×512)
  "https://res.cloudinary.com/ddcjzcoys/image/upload/v1706229823/eseptha8dac9vhwos3pp.png", // eseptha8dac9vhwos3pp.png (512×512)
];

const usePfp = (): string => {
  const [selectedImageLink] = useState<string>(() => getRandomPfp(imageLinks));
  return selectedImageLink;
};

const getRandomPfp = (imageLinks: string[]): string => {
  const randomIndex = Math.floor(Math.random() * imageLinks.length);
  return imageLinks[randomIndex];
};

export default usePfp;
