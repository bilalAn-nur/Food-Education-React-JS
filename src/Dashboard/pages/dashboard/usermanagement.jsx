import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Radio,
  Alert,
} from "@material-tailwind/react";

import { format, parseISO } from "date-fns";

import { useAuth } from "../../../Auth/appwrite/ApiAppwrite";
import { useEffect, useState } from "react";

export function UserManagement() {
  const { allUserCollection, updateUserRoleId } = useAuth();
  const [users, setUsers] = useState([]);

  const [alert, setAlert] = useState("");

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

  // const handleDeleteUser = async (userId) => {
  //   try {
  //     const response = await deleteUserCollection(userId);
  //     return response;
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const handleChangeRoleId = async (userId, newRoleId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to change the user role?"
      );
      if (isConfirmed) {
        try {
          const response = await updateUserRoleId(userId, newRoleId);
          return response;
        } catch (error) {
          alert(error);
        }
      } else {
        console.log("batal");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleRoleChange = (event, userId) => {
    try {
      const newRoleId = Number(event.target.value);
      handleChangeRoleId(userId, newRoleId);
      setAlert({
        type: "success",
        message: "Role Berhasil dirubah.",
      });
    } catch (error) {
      alert(error);
    }
  };

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
              {users.map(
                ({ $id, imageUrl, name, email, roleId, joined }, key) => {
                  const className = `py-3 px-5 ${
                    key === users.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
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
                          <div className="flex gap-10">
                            <Radio
                              name={$id}
                              label="Admin"
                              value={1}
                              defaultChecked={roleId === 1}
                              onChange={(event) => handleRoleChange(event, $id)}
                            />
                            <Radio
                              name={$id}
                              label="User"
                              value={2}
                              defaultChecked={roleId === 2}
                              onChange={(event) => handleRoleChange(event, $id)}
                            />
                          </div>
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {formattedJoinedDate}
                        </Typography>
                      </td>
                      {/* <td className={className}>
                        <Button
                          as="a"
                          onClick={() => handleDeleteUser($id)}
                          className="text-xs font-semibold text-blue-gray-600">
                          Hapus
                        </Button>
                      </td> */}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {alert && (
        <div className="relative w-full">
          <div className="absolute right-0 bottom-0">
            <Alert
              open={true}
              onClose={() => setAlert(null)}
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
              }}
              color={alert.type === "error" ? "red" : "green"}>
              {alert.message}
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
