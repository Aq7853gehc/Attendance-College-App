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



export const submitAttendance = async (userId, datetime, attendance) => {
  const alreadyMarked = await hasMarkedAttendanceToday(userId);

  if (alreadyMarked) {
    Alert.alert("Attendance already marked for today")
    console.log("Attendance already marked for today");
    return; 
  }

  try {
      const response = await database.createDocument(
          config.databaseId, 
          config.attendenceId, 
          ID.unique(),
          {
              date: datetime,
              user: userId,
              attendence: attendance,
          }
      );

      return response;
  } catch (error) {
      console.error('Error submitting attendance data:', error);
      throw error;
  }
};

export const getAttendanceData = async (userId) => {
  if (!userId) {
    console.error("User ID is required");
    return [];
  }

  try {
    const response = await database.listDocuments(
      config.databaseId,
      config.attendenceId,
      [Query.equal("user", userId)]
    );
    return response.documents; // Return documents or an empty array if undefined
  } catch (error) {
    console.error("Failed to fetch attendance data:", error);
    return []; // Return an empty array in case of error
  }
};


export const hasMarkedAttendanceToday = async (userId) => {
  const today = new Date().toISOString().split('T')[0]; // Get the current date in "YYYY-MM-DD" format

  try {
    const response = await database.listDocuments(
      config.databaseId,
      config.attendenceId,
      [
        Query.equal("user", userId),
        Query.equal("date", today), // Filter by today's date
      ]
    );

    // If there's any document for today, return true
    return response.documents.length > 0;
  } catch (error) {
    console.error("Error checking attendance:", error);
    return false;
  }
};