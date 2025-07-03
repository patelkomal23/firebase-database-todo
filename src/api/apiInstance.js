import axios from "axios";

export const apiInstance = axios.create({
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
});