import { ExpoRoot } from "expo-router";
import { Alert } from "react-native";
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aquib.attendity",
  projectId: "66b0e227001e9e160c95",
  databaseId: "66b0e639000be2763bb1",
  userCollectionId: "66b0e6c000241442dfb5",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const account = new Account(client);
const database = new Databases(client);

// for new account user
export const createUser = async (email: string, password: string, empId: string) => {
  try {
    const newAccount = account.create(ID.unique(), email, password, empId);
    if (!newAccount) throw Error;
    await signIn(empId, password);
    const newUser = database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: (await newAccount).$id,
        email,
        empId,
      }
    );
    return newUser;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

export const signIn = async (empId: string, password: string) => {
  try {
    await account.createEmailPasswordSession(empId, password);
  } catch (error) {
    throw new Error();
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return (await currentUser).documents[0];
  } catch (error: any) {
    Alert.alert("Err", error);
  }
};
