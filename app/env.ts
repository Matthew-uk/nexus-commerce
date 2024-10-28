const env = {
  appwrite: {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apiKey: String(process.env.APPWRITE_API_KEY),
    storageKey: String(process.env.NEXT_PUBLIC_APPWRITE_STORAGE_kEY),
  },
};

export default env;
