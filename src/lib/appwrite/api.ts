import { ID } from "appwrite";
import { INewUser } from "../../types";
import { account } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    return { success: true, data: newAccount };
  } catch (error) {
    console.error("Error creating user account:", error);
    return {
      success: false,
      error: "Failed to create user account. Please try again later.",
    };
  }
}
