import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

interface BlogCardProps {
  imageSrc: string;
  judul: string;
  deskripsi: string;
  link?: string;
}

export function BlogCard({ imageSrc, judul, deskripsi, link }: BlogCardProps) {
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
              className="m-0 rounded-none"
            >
              <img src={imageSrc} alt={judul} />
            </CardHeader>
            <CardBody>
              <Typography variant="h4" color="blue-gray">
                {judul}
              </Typography>
              <Typography
                variant="lead"
                color="gray"
                className="mt-3 min-h-48 font-normal"
              >
                {deskripsi}
              </Typography>
            </CardBody>
          </Card>
        </a>
      ) : (
        <Card className="max-w-80 overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img src={imageSrc} alt={judul} />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
              {judul}
            </Typography>
            <Typography
              variant="lead"
              color="gray"
              className="mt-3 min-h-48 font-normal"
            >
              {deskripsi}
            </Typography>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
