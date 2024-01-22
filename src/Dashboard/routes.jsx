import {
  HomeIcon,
  CodeBracketSquareIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Home, UserManagement } from "../Dashboard/pages/dashboard";
import Apitable from "./pages/dashboard/apitable";
import PostArticle from "./pages/dashboard/postarticle";

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
        name: "Post Article",
        path: "/post-article",
        element: <PostArticle />,
      },
    ],
  },
];

export default routes;
