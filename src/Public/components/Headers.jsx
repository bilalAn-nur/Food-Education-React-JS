import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  InboxArrowDownIcon,
  PowerIcon,
  UserCircleIcon,
  ChevronDownIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../Auth/appwrite/ApiAppwrite";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const { user, logoutUser } = useAuth();
  const profileMenuItems =
    user && user.roleId === 1
      ? [
          {
            label: "Dashboard",
            icon: HomeIcon,
            direct: "/dashboard/home",
          },
          {
            label: "My Profile",
            icon: UserCircleIcon,
            direct: "#",
          },
          {
            label: "Sign Out",
            icon: PowerIcon,
          },
        ]
      : user && user.roleId === 2
      ? [
          {
            label: "My Profile",
            icon: UserCircleIcon,
            direct: "#",
          },
          {
            label: "My Saves",
            icon: InboxArrowDownIcon,
            direct: "#",
          },
          {
            label: "Sign Out",
            icon: PowerIcon,
          },
        ]
      : [
          {
            label: "Sign Out",
            icon: PowerIcon,
          },
        ];

  return (
    <div className="container mx-auto flex items-center justify-between">
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom-end"
        className="fixed top-0 z-50 border-0">
        {user ? (
          <>
            <MenuHandler>
              <Button
                variant="text"
                color="blue-gray"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
                <Avatar
                  variant="circular"
                  size="sm"
                  alt="tania andrew"
                  className="border p-0.5"
                  src={user.imageUrl}
                />
                <p>Hello, {user.name}</p>
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`h-3 w-3 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </MenuHandler>
            <MenuList className="p-1">
              {profileMenuItems.map(({ label, icon, direct }, key) => {
                const isLastItem = key === profileMenuItems.length - 1;
                return (
                  <>
                    <a href={direct} key={label}>
                      <MenuItem
                        key={label}
                        onClick={label === "Sign Out" ? logoutUser : closeMenu}
                        className={`flex items-center gap-2 rounded ${
                          isLastItem
                            ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                            : ""
                        }`}>
                        {React.createElement(icon, {
                          className: `h-4 w-4 ${
                            isLastItem ? "text-red-500" : ""
                          }`,
                          strokeWidth: 2,
                        })}
                        <Typography
                          as="span"
                          variant="small"
                          className="font-normal"
                          color={isLastItem ? "red" : "inherit"}>
                          {label}
                        </Typography>
                      </MenuItem>
                    </a>
                  </>
                );
              })}
            </MenuList>
          </>
        ) : (
          <>
            <a href="/sign-up">
              <Button variant="outlined">Sign Up</Button>
            </a>
            <a href="/sign-in">
              <Button>Sign In</Button>
            </a>
          </>
        )}
      </Menu>
    </div>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/"
        variant="small"
        color="blue-gray"
        className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4 ">Home</ListItem>
      </Typography>
      <Menu>
        <MenuHandler>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-medium"
            as="a"
            href="/article">
            <ListItem className="flex items-center gap-2 py-2 pr-4 ">
              Article
            </ListItem>
          </Typography>
        </MenuHandler>
        {/* <MenuList>
          <Typography
            as="a"
            href="/diet"
            variant="small"
            color="blue-gray"
            className="font-medium">
            <ListItem className="flex items-center gap-2 py-2 pr-4 ">
              Seputar Diet
            </ListItem>
          </Typography>
          <Typography
            as="a"
            href="/lifestyle"
            variant="small"
            color="blue-gray"
            className="font-medium">
            <ListItem className="flex items-center gap-2 py-2 pr-4 ">
              Gaya Hidup Sehat
            </ListItem>
          </Typography>
          <Typography
            as="a"
            href="/diet"
            variant="small"
            color="blue-gray"
            className="font-medium">
            <ListItem className="flex items-center gap-2 py-2 pr-4 ">
              Rekomendasi Makanan Orang Sakit
            </ListItem>
          </Typography>
        </MenuList> */}
      </Menu>
      {/* <Typography
        as="a"
        href="nutricalculator"
        variant="small"
        color="blue-gray"
        className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4 ">
          Nutrikalkulator
        </ListItem>
      </Typography> */}
      <Typography
        as="a"
        href="receplist"
        variant="small"
        color="blue-gray"
        className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4">Resep</ListItem>
      </Typography>
      <Typography
        as="a"
        href="disease"
        variant="small"
        color="blue-gray"
        className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact
        </ListItem>
      </Typography>
    </List>
  );
}

const Headers = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="m-auto px-4 py-2">
      <div className="flex items-center justify-between ">
        <Typography
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          color="gray">
          Logo
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <ProfileMenu />
        </div>
        <IconButton
          variant="text"
          color="black"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <ProfileMenu />
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Headers;
