import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const CustomSlider = ({
  children,
  infinite,
}: {
  children: React.ReactNode;
  infinite: boolean;
}) => {
  const settings = {
    autoplay: true,
    infinite: infinite,
    slidesToShow: 3,
    speed: 400,
    centerPadding: "30px",
    className: "center",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings} arrows={false} dots={true} className="custom-dots">
      {children}
    </Slider>
  );
};
