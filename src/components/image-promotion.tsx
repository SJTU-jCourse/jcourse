import Touchpoint from "@/config/touchpoint";
import { Promotion } from "@/lib/models";
import { Image } from "antd";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

const convertImageSrc = (src: string | null) => {
  if (!src) return "";
  return Touchpoint.URL_PREFIX + src;
};

const convertJumpLink = (
  jump_link: string | null,
  router: NextRouter
): string => {
  return jump_link || router.asPath;
};

const ImagePromotion = ({ promotion }: { promotion?: Promotion }) => {
  const router = useRouter();
  if (!promotion) return <></>;
  return (
    <Link href={convertJumpLink(promotion.jump_link, router)} target="_blank">
      <Image
        src={convertImageSrc(promotion.image)}
        alt={promotion.text || ""}
        preview={false}
        width="100%"
      ></Image>
    </Link>
  );
};

export default ImagePromotion;
