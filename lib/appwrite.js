import { ExpoRoot } from "expo-router";
import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aquib.attendity",
  projectId: "66b0e227001e9e160c95",
  databaseId: "66c1c6cc00046e4bbae6",
  userCollectionId: "66c1c6e7000770188467",
  attendenceId: "66fdf2650037103b0d78",
  storageId: "671dc35f0035ad52a728",
};

const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform);
export const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

// for new account user
export const createUser = async (email, password, username, name) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
      name
    );
    if (!newAccount) throw Error;
    // avatars
    const avatarUrl = avatars.getInitials();

    await signIn(email, password);

    const newUser = database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        empId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
        name,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("empId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return (await currentUser).documents[0];
  } catch (error) {
    Alert.alert("Err", error.message);
  }
};

export const logoutAccount = async () => {
  try {
    const response = await account.deleteSession("current");
    console.log(response);
  } catch (error) {
    return null;
  }
};

export const getAttData = async () => {
  try {
    const response = await database.listDocuments(
      config.databaseId,
      config.attendenceId
    );
    console.log(response);
  } catch (error) {
    console.error("Get Attendance", error);
  }
};

export async function uploadFile(file, type) {
  if (!file) return;

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      file
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

