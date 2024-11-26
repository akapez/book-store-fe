import * as React from "react";

interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const NextImage: React.FC<NextImageProps> = ({ src, alt, ...props }) => {
  return <img src={src} alt={alt} {...props} />;
};

export default NextImage;
