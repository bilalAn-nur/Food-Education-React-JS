import { Typography } from "@material-tailwind/react";
import { Search } from "../shared/Search";
import BlogCard from "../shared/BlogCard";

const Diet = () => {
  return (
    <>
      <div className=" mt-8">
        <Search />
      </div>
      <Typography variant="h1" className="mt-11">
        Special Diets
      </Typography>

      <div className="flex flex-wrap justify-center mt-10">
        <div className="max-w-full p-4">
          <BlogCard
            imageContentSrc="assets/img/banner/food.webp"
            judul="Special Diets"
            link="#"
            deskripsi="Because it's about motivating the doers. Because I'm here to follow my dreams and inspire others."
            creator="Umayus"
            imageProfile="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
            tanggalUpload="13 Juni"
          />
        </div>
      </div>
    </>
  );
};

export default Diet;
