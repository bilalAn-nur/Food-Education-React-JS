import {
  Card,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

const SidebarRecept = () => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Vegetarian
            </Typography>
          </label>
        </ListItem>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Vegan
            </Typography>
          </label>
        </ListItem>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              gluten Free
            </Typography>
          </label>
        </ListItem>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              dairyFree
            </Typography>
          </label>
        </ListItem>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              veryHealthy
            </Typography>
          </label>
        </ListItem>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              lowFodmap
            </Typography>
          </label>
        </ListItem>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              cheap
            </Typography>
          </label>
        </ListItem>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              veryPopular
            </Typography>
          </label>
        </ListItem>
        <ListItem>
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2">
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              sustainable
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
  );
};

export default SidebarRecept;
