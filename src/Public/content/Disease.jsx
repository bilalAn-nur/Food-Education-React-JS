import { Typography } from "@material-tailwind/react";
import { Search } from "../shared/Search";
import BlogCard from "../shared/BlogCard";

const Disease = () => {
  return (
    <>
      <div className=" mt-8">
        <Search />
      </div>
      <Typography variant="h1" className="mt-11">
        Food Disease
      </Typography>

      <div className="flex flex-wrap justify-center mt-10">
        <div className="max-w-full  p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Special Diets"
            deskripsi="Temukan resep lezat dan tips ahli untuk menjadikan diet khusus Anda perjalanan yang memuaskan."
          />
        </div>
      </div>
    </>
  );
};

export default Disease;
