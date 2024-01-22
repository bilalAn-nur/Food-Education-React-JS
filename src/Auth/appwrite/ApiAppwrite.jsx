import { createContext, useState, useEffect, useContext } from "react";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { useNavigate } from "react-router-dom";
import { ID, Query } from "appwrite";
import { Spinner } from "@material-tailwind/react";

const ApiAppwrite = createContext();

// ================================ Auth Logic =======================================

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    //setLoading(false)
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
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

  // ================================ User Management Logic =======================================
  const allUserCollection = async () => {
    try {
      let response = await databases.listDocuments(
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

  const updateUserRoleId = async (userId, newRoleId) => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId
      );

      const userDocument = response.documents.find((doc) => doc.$id === userId);

      if (!userDocument) {
        throw new Error("User not found");
      }

      userDocument.roleId = newRoleId;

      console.log(userDocument.roleId);

      const promise = databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userDocument.$id,
        { roleId: newRoleId }
      );

      return promise;
    } catch (error) {
      alert(error);
    }
  };

  // ================================ Post Logic =======================================
  const allPostCollection = async () => {
    try {
      let response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.limit(25)]
      );
      console.log(response);
      return response.documents || [];
    } catch (error) {
      console.error("Error fetching post collection:", error);
      throw error;
    }
  };

  const addPostCollection = async (post) => {
    try {
      const uploadedFile = await uploadFile(post.file);
      if (!uploadedFile) throw Error;

      const fileUrl = await getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          creator: post.creator,
          title: post.title,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          content: post.content,
          uploadTime: post.uploadTime,
          category: post.category,
        }
      );

      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      // return newPost;
    } catch (error) {
      console.error("Error fetching post collection:", error.message);
      throw error;
    }
  };

  const uploadFile = async (file) => {
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );

      return uploadedFile;
    } catch (error) {
      console.log(error);
    }
  };

  const getFilePreview = async (fileId) => {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );

      console.log(fileUrl);

      if (!fileUrl) {
        throw new Error("File preview URL is undefined or empty.");
      }

      return fileUrl;
    } catch (error) {
      console.error("Error getting file preview:", error.message);
      throw error;
    }
  };

  const deleteFile = async (fileId) => {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);

      return { status: "ok" };
    } catch (error) {
      console.error("Error deleting file:", error);
      return { status: "error", message: error.message };
    }
  };

  const deletePostCollection = async (postId, imageId) => {
    if (!postId || !imageId) return;

    try {
      const statusCode = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );

      if (!statusCode) throw Error;

      await deleteFile(imageId);

      return { status: "Ok" };
    } catch (error) {
      console.error("Error deleting post collection:", error);
      return { status: "error", message: error.message };
    }
  };

  // const allSpecialDietPostCollection = async () => {
  //   try {
  //     let response = await databases.listDocuments(
  //       appwriteConfig.databaseId,
  //       appwriteConfig.postCollectionId,
  //       [Query.equal("category", "Special Diet").limit(10)]
  //     );

  //     return response.documents || [];
  //   } catch (error) {
  //     console.error("Error fetching user collection:", error);
  //     throw error;
  //   }
  // };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    allUserCollection,
    updateUserRoleId,
    allPostCollection,
    addPostCollection,
    uploadFile,
    getFilePreview,
    deleteFile,
    deletePostCollection,
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
