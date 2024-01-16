import axios from "axios";
import { apiConfig } from "../../ApiResep/config.js";
import RecipeCard from "../shared/RecipeCard";
import { useEffect, useState } from "react";
import SidebarRecept from "../shared/SidebarRecept.jsx";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";

const Diet = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${apiConfig.urlspoonacular}recipes/random`,
  //         {
  //           params: {
  //             apiKey: apiConfig.appKeyspoonacular,
  //             number: 9,
  //           },
  //         }
  //       );

  //       // const textToTranslate = response.data.recipes[0].summary;
  //       // const responseTranslate = await axios.post(
  //       //   apiConfig.urltranslate,
  //       //   null,
  //       //   {
  //       //     params: {
  //       //       key: apiConfig.appKeytranslate,
  //       //       text: textToTranslate,
  //       //       lang: "en-id",
  //       //     },
  //       //   }
  //       // );
  //       // setRecipes(responseTranslate.data.text[0]);

  //       setRecipes(response.data.recipes);
  //     } catch (error) {
  //       console.error("Error fetching recipes:", error);
  //     }
  //   };

  //   fetchRecipes();
  // }, []);

  return (
    <>
      <div className="flex-grow mt-1">
        <div className="flex justify-center items-center mt-auto">
          <div className="flex flex-col lg:flex-row bg-black w-full gap-8">
            <div className="lg:w-1/4">
              <SidebarRecept />
            </div>
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-full bg-green-500">
                <Card className="w-full max-w-[26rem] shadow-lg">
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/60/4e/ef/image-hotel-resto.jpg?w=700&h=-1&s=1"
                      alt="{recipe.title}"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                    </IconButton>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium">
                        Tittel
                      </Typography>
                    </div>
                    <Typography color="gray">caption</Typography>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}>
                      Reserve
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-full max-w-[26rem] shadow-lg">
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/60/4e/ef/image-hotel-resto.jpg?w=700&h=-1&s=1"
                      alt="{recipe.title}"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                    </IconButton>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium">
                        Tittel
                      </Typography>
                    </div>
                    <Typography color="gray">caption</Typography>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}>
                      Reserve
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-full max-w-[26rem] shadow-lg">
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/60/4e/ef/image-hotel-resto.jpg?w=700&h=-1&s=1"
                      alt="{recipe.title}"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                    </IconButton>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium">
                        Tittel
                      </Typography>
                    </div>
                    <Typography color="gray">caption</Typography>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}>
                      Reserve
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-full max-w-[26rem] shadow-lg">
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/60/4e/ef/image-hotel-resto.jpg?w=700&h=-1&s=1"
                      alt="{recipe.title}"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                    </IconButton>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium">
                        Tittel
                      </Typography>
                    </div>
                    <Typography color="gray">caption</Typography>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}>
                      Reserve
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-full max-w-[26rem] shadow-lg">
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/60/4e/ef/image-hotel-resto.jpg?w=700&h=-1&s=1"
                      alt="{recipe.title}"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                    </IconButton>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium">
                        Tittel
                      </Typography>
                    </div>
                    <Typography color="gray">caption</Typography>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}>
                      Reserve
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-full max-w-[26rem] shadow-lg">
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/60/4e/ef/image-hotel-resto.jpg?w=700&h=-1&s=1"
                      alt="{recipe.title}"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                    </IconButton>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium">
                        Tittel
                      </Typography>
                    </div>
                    <Typography color="gray">caption</Typography>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}>
                      Reserve
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-full max-w-[26rem] shadow-lg">
                  <CardHeader floated={false} color="blue-gray">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/60/4e/ef/image-hotel-resto.jpg?w=700&h=-1&s=1"
                      alt="{recipe.title}"
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                    <IconButton
                      size="sm"
                      color="red"
                      variant="text"
                      className="!absolute top-4 right-4 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                    </IconButton>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium">
                        Tittel
                      </Typography>
                    </div>
                    <Typography color="gray">caption</Typography>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button size="lg" fullWidth={true}>
                      Reserve
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diet;
