import PropTypes from "prop-types";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Button,
  IconButton,
  Tooltip,
  CardFooter,
} from "@material-tailwind/react";

const RecipeCard = ({ recipe }) => {
  const maxWords = 20;
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");

    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  };
  const truncatedSummary = truncateText(recipe.summary, maxWords);
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img src={recipe.image} alt={recipe.title} />
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
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {recipe.title}
          </Typography>
        </div>
        <Typography color="gray">
          <div dangerouslySetInnerHTML={{ __html: truncatedSummary }} />
        </Typography>
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true}>
          Click to detail
        </Button>
      </CardFooter>
    </Card>
  );
};
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    servings: PropTypes.string.isRequired,
    readyInMinutes: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
