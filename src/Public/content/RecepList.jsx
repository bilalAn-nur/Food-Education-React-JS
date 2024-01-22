import axios from "axios";
import { apiConfig } from "../../ApiResep/config.js";
import RecipeCard from "../shared/RecipeCard";
import { useEffect, useState } from "react";
import SidebarRecept from "../shared/SidebarRecept.jsx";

const RecipeList = () => {
  const [recipeList, setRecipeList] = useState([]); // Ganti nama state menjadi recipeList
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [typeParams, setTypeParams] = useState(null);

  const fetchRecipes = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiConfig.urlspoonacular}recipes/complexSearch`,
        {
          params: {
            apiKey: apiConfig.appKeyspoonacular,
            page: pageNumber,
            type: typeParams,
          },
        }
      );

      setRecipeList((prevRecipes) => {
        const newRecipes = Array.isArray(response.data.results)
          ? response.data.results
          : [];
        return [...prevRecipes, ...newRecipes];
      });
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    setTypeParams(value);
  };

  useEffect(() => {
    fetchRecipes(page);
  }, [page, typeParams]);

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
              <SidebarRecept onSelectChange={handleSelectChange} />
            </div>
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-full">
                {recipeList.map((recipe) => (
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
