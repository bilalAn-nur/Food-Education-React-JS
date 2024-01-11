import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

import PropTypes from "prop-types";
const BlogCard = ({
  imageContentSrc,
  judul,
  deskripsi,
  link,
  creator,
  imageProfile,
  tanggalUpload,
}) => {
  const isLinkProvided = link && link.trim() !== "";
  return (
    <div>
      {isLinkProvided ? (
        <a href={link} className="block hover:no-underline">
          <Card className="max-w-80 overflow-hidden">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none">
              <img src={imageContentSrc} alt={judul} />
            </CardHeader>
            <CardBody>
              <Typography variant="h4" color="blue-gray">
                {judul}
              </Typography>
              <Typography
                variant="lead"
                color="gray"
                className="mt-3 min-h-36 font-normal">
                {deskripsi}
              </Typography>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center -space-x-3">
                <Tooltip content={creator}>
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt={creator}
                    src={imageProfile}
                    className="border-2 border-white hover:z-10"
                  />
                </Tooltip>
              </div>
              <Typography className="font-normal">{tanggalUpload}</Typography>
            </CardFooter>
          </Card>
        </a>
      ) : (
        <Card className="max-w-80 overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none">
            <img src={imageContentSrc} alt={judul} />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
              {judul}
            </Typography>
            <Typography
              variant="lead"
              color="gray"
              className="mt-3 min-h-48 font-normal">
              {deskripsi}
            </Typography>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

BlogCard.propTypes = {
  imageContentSrc: PropTypes.string.isRequired,
  judul: PropTypes.string.isRequired,
  deskripsi: PropTypes.string.isRequired,
  link: PropTypes.string,
  creator: PropTypes.string.isRequired,
  imageProfile: PropTypes.string.isRequired,
  tanggalUpload: PropTypes.string.isRequired,
};

export default BlogCard;
