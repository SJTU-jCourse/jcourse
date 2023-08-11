import { Promotion } from "@/lib/models";
import { clickPromotion } from "@/services/promotion";
import { Image } from "antd";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

const convertImageSrc = (src: string | null) => {
  if (!src) return "";
  return src;
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

  const onClick = () => {
    clickPromotion(promotion.id);
  };

  return (
    <Link
      href={convertJumpLink(promotion.jump_link, router)}
      target="_blank"
      onClick={onClick}
    >
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
