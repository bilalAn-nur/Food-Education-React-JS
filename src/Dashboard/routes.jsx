import {
  HomeIcon,
  CodeBracketSquareIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Home, UserManagement } from "../Dashboard/pages/dashboard";
import SpecialDiet from "./pages/dashboard/specialdiet";
import HealthyLifestyle from "./pages/dashboard/healthylifestyle";
import FoodDisease from "./pages/dashboard/fooddisease";
import Apitable from "./pages/dashboard/apitable";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <CodeBracketSquareIcon {...icon} />,
        name: "API Table",
        path: "/api-table",
        element: <Apitable />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "user management",
        path: "/user-management",
        element: <UserManagement />,
      },
    ],
  },
  {
    title: "Table Content",
    layout: "dashboard",
    pages: [
      {
        name: "Special Diets",
        path: "/special-diets",
        element: <SpecialDiet />,
      },
      {
        name: "Healthy Lifestyle",
        path: "/healthy-lifestyle",
        element: <HealthyLifestyle />,
      },
      {
        name: "Food Disease",
        path: "/food-disease",
        element: <FoodDisease />,
      },
    ],
  },
];

export default routes;
