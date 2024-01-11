import { Carousel, Typography } from "@material-tailwind/react";
import BlogCard from "../shared/BlogCard";
const Home = () => {
  const optionCarousel = [
    {
      id: 1,
      img: "assets/img/banner/food.webp",
      text: "PENTINGNYA UNTUK MEMAKAN MAKANAN SEHAT",
    },
    {
      id: 2,
      img: "assets/img/banner/food.webp",
      text: "PENTINGNYA UNTUK MENJAGA KESEHATAN",
    },
  ];
  return (
    <>
      <Carousel
        loop={true}
        autoplay={true}
        className="relative opacity-80 bg-gray-500 w-full">
        {optionCarousel.map((option, index) => (
          <div key={option.id} className="relative">
            <img
              key={index}
              src={option.img}
              alt=""
              style={{ filter: "brightness(0.7) contrast(1.2)" }}
            />
            <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full md:w-auto md:text-white">
              <Typography variant="h1">{option.text}</Typography>
            </div>
          </div>
        ))}
      </Carousel>

      <Typography variant="h1" className="mt-11">
        About Us
      </Typography>
      <div className="flex items-center justify-center w-full md:w-2/3 lg:w-1/2 text-center mt-5 mx-auto">
        <Typography variant="paragraph">
          [nama website] memiliki tekad untuk membantu Anda mencapai gaya hidup
          sehat melalui pendekatan yang berfokus pada pola makan sehat. Kami
          percaya bahwa makanan bukan hanya kebutuhan fisik, tetapi juga
          merupakan kunci untuk kesejahteraan dan kebahagiaan.
        </Typography>
      </div>

      <div className="flex flex-wrap justify-center mt-10">
        <div className="max-w-full  p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Special Diets"
            deskripsi="Temukan resep lezat dan tips ahli untuk menjadikan diet khusus Anda perjalanan yang memuaskan."
          />
        </div>
        <div className="max-w-full p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Healthy Lifestyle"
            deskripsi="Mulailah perjalanan transformasional kehidupan yang lebih sehat dengan panduan nutrisi, aktivitas fisik, dan kesadaran positif."
          />
        </div>
        <div className="max-w-full p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Food Disease"
            deskripsi="Lindungi diri dengan pengetahuan tentang penyakit akibat makanan dan praktik keamanan pangan untuk lingkungan kuliner yang lebih aman."
          />
        </div>
      </div>
    </>
  );
};

export default Home;
