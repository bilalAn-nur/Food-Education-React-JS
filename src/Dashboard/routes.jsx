import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  Notifications,
  UserManagement,
} from "../Dashboard/pages/dashboard";
import SpecialDiet from "./pages/dashboard/specialdiet";
import HealthyLifestyle from "./pages/dashboard/healthylifestyle";
import FoodDisease from "./pages/dashboard/fooddisease";

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
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "user management",
        path: "/user-management",
        element: <UserManagement />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "Table Content",
    layout: "dashboard",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Special Diets",
        path: "/special-diets",
        element: <SpecialDiet />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Healthy Lifestyle",
        path: "/healthy-lifestyle",
        element: <HealthyLifestyle />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Food Disease",
        path: "/food-disease",
        element: <FoodDisease />,
      },
    ],
  },
];

export default routes;
