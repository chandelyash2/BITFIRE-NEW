import { CustomSlider } from "../common/Slider";
import Link from "next/link";
import Image from "next/image";
const bannersArr = [
  {
    img: "/img/Frame 13.png",
    url: "/sport/cricket",
  },
  {
    img: "/img/Frame 14.png",
    url: "/sport/cricket",
  },
  {
    img: "/img/Frame 15.png",
    url: "/sport/cricket",
  },
];

export const Banner = () => {
  return (
    <div>
      <CustomSlider infinite={bannersArr.length > 1 ? true : false}>
        {bannersArr.map((item, i) => (
          <Link key={i} href={item.url} className="flex gap-4 items-center">
            <Image
              alt="Card background"
              src={item.img}
              width={350}
              height={100}
              className="w-full md:w-[350px] lg:w-[385px]"
            />
          </Link>
        ))}
      </CustomSlider>
    </div>
  );
};
