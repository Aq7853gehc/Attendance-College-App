import { Client } from "react-native-appwrite";

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



