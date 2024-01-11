import { Typography } from "@material-tailwind/react";
import { Search } from "../shared/Search";
import BlogCard from "../shared/BlogCard";

const Lifestyle = () => {
  return (
    <>
      <div className=" mt-8">
        <Search />
      </div>
      <Typography variant="h1" className="mt-11">
        Special Diets
      </Typography>

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
        <div className="max-w-full p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Food Disease"
            deskripsi="Lindungi diri dengan pengetahuan tentang penyakit akibat makanan dan praktik keamanan pangan untuk lingkungan kuliner yang lebih aman."
          />
        </div>
        <div className="max-w-full p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Food Disease"
            deskripsi="Lindungi diri dengan pengetahuan tentang penyakit akibat makanan dan praktik keamanan pangan untuk lingkungan kuliner yang lebih aman."
          />
        </div>
        <div className="max-w-full p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Food Disease"
            deskripsi="Lindungi diri dengan pengetahuan tentang penyakit akibat makanan dan praktik keamanan pangan untuk lingkungan kuliner yang lebih aman."
          />
        </div>
        <div className="max-w-full p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Food Disease"
            deskripsi="Lindungi diri dengan pengetahuan tentang penyakit akibat makanan dan praktik keamanan pangan untuk lingkungan kuliner yang lebih aman."
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

export default Lifestyle;
