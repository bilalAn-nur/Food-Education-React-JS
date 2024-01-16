import axios from "axios";
import { apiConfig } from "../../ApiResep/config.js";
import RecipeCard from "../shared/RecipeCard";
import { useEffect, useState } from "react";
import SidebarRecept from "../shared/SidebarRecept.jsx";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiConfig.urlspoonacular}recipes/random`,
        {
          params: {
            apiKey: apiConfig.appKeyspoonacular,
            number: 6,
            page: pageNumber,
          },
        }
      );

      // const textToTranslate = response.data.recipes[0].summary;
      // const responseTranslate = await axios.post(
      //   apiConfig.urltranslate,
      //   null,
      //   {
      //     params: {
      //       key: apiConfig.appKeytranslate,
      //       text: textToTranslate,
      //       lang: "en-id",
      //     },
      //   }
      // );
      // setRecipes(responseTranslate.data.text[0]);

      setRecipes((prevRecipes) => [...prevRecipes, ...response.data.recipes]);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        fetchRecipes(page + 1);
      }

      console.log(scrollHeight, scrollTop, clientHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading]);

  return (
    <>
      <div className="flex-grow mt-1">
        <div className="flex justify-center items-center mt-auto">
          <div className="flex flex-col lg:flex-row w-full gap-8">
            <div className="lg:w-1/4">
              <SidebarRecept />
            </div>
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-full">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeList;
