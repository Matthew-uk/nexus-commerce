import { Client, Account, Storage } from "appwrite";
import env from "@/app/env";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId);

export const account = new Account(client);
export const storage = new Storage(client);
