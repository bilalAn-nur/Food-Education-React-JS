import {
  Card,
  List,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";

const SidebarRecept = ({ onSelectChange }) => {
  const [isSelectClicked, setSelectClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectClick = () => {
    setSelectClicked(true);
    setTimeout(() => {
      setSelectClicked(false);
    }, 1000);
  };
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Filter
        </Typography>
      </div>
      <List>
        <div className="relative inline-block">
          <Select
            label="Select Type"
            onClick={handleSelectClick}
            value={selectedCategory}
            onChange={handleCategoryChange}>
            <Option value="breakfast">Sarapan</Option>
            <Option value="salad">Salad</Option>
            <Option value="bread">Roti</Option>
            <Option value="snack">Camilan</Option>
            <Option value="drink">Minuman</Option>
            <Option value="soup">Sup</Option>
          </Select>
        </div>
      </List>
      <List className={isSelectClicked ? "mt-60" : ""}>
        <div className="relative inline-block ">
          <Select
            label="Select Version"
            class="appearance-none border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>
      </List>
    </Card>
  );
};
SidebarRecept.propTypes = {
  onSelectChange: PropTypes.func.isRequired,
};

export default SidebarRecept;
