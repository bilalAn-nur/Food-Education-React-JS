import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";

import { format, parseISO } from "date-fns";

import { useAuth } from "../../../Auth/appwrite/ApiAppwrite";
import { useEffect, useState } from "react";

export function UserManagement() {
  const { allUserCollection } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allUserCollection();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching user collection:", error);
      }
    };

    fetchData();
  }, [allUserCollection]);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            User Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["user", "role", "joined", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400">
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(({ imageUrl, name, email, roleId, joined }, key) => {
                const className = `py-3 px-5 ${
                  key === users.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;
                const formattedJoinedDate = format(
                  parseISO(joined),
                  "MMM dd, yyyy, HH:mm"
                );
                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={imageUrl}
                          alt={name}
                          size="sm"
                          variant="rounded"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold">
                            {name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {roleId === 1 ? "Admin" : "User"}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {formattedJoinedDate}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600">
                        Hapus
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default UserManagement;
