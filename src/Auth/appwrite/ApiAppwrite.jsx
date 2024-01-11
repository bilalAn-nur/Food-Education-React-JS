import { createContext, useState, useEffect, useContext } from "react";
import { account, appwriteConfig, avatars, databases } from "./config";
import { useNavigate } from "react-router-dom";
import { ID, Query } from "appwrite";
import { Spinner } from "@material-tailwind/react";

const ApiAppwrite = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //setLoading(false)
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo, setAlert) => {
    setLoading(true);

    console.log("userInfo", userInfo);

    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );

      let accountDetails = await account.get();

      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", accountDetails.$id)],
        1,
        0
      );
      setUser(currentUser.documents[0]);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    setLoading(true);
    await account.deleteSession("current");
    setUser(null);
    setLoading(false);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );

      if (!response) throw Error;

      const avatarUrl = avatars.getInitials(userInfo.name);
      const joinedDate = new Date();

      const newUser = await saveDBToUser({
        accountId: response.$id,
        name: userInfo.name,
        email: userInfo.email,
        imageUrl: avatarUrl,
        joined: joinedDate,
      });

      if (!newUser) throw Error;

      await account.createEmailSession(userInfo.email, userInfo.password1);
      let accountDetails = await account.get();
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", accountDetails.$id)],
        1,
        0
      );
      setUser(currentUser.documents[0]);

      navigate("/");
    } catch (error) {
      alert(error);
    }

    setLoading(false);
  };

  const saveDBToUser = async (user) => {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
      );
      return newUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();

      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", accountDetails.$id)],
        1,
        0
      );
      setUser(currentUser.documents[0]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const allUserCollection = async () => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.limit(25)]
      );

      return response.documents || [];
    } catch (error) {
      console.error("Error fetching user collection:", error);
      throw error;
    }
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    allUserCollection,
  };

  return (
    <ApiAppwrite.Provider value={contextData}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      ) : (
        children
      )}
    </ApiAppwrite.Provider>
  );
};

export const useAuth = () => {
  return useContext(ApiAppwrite);
};
export default ApiAppwrite;
