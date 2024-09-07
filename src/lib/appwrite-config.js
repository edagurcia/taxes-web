import { Client, Account, Databases, Avatars } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_ENDPOINT,
  projectId: import.meta.env.VITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_DATABASE_ID,
  userCollectionId: import.meta.env.VITE_USERS_COL_ID,
  taxescollectionId: import.meta.env.VITE_TAXES_COL_ID,
  businessesCollectionId: import.meta.env.VITE_BUSINESSES_COL_ID,
  rtnsCollectionId: import.meta.env.VITE_RTNS_COL_ID,
};

const client = new Client();
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
