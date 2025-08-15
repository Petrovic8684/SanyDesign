import { api } from "../lib/api";

export async function verifyToken(): Promise<boolean> {
  try {
    const response = await api.get("/auth/verify-token");

    if (response.data.valid === true) return true;
    else return false;
  } catch (error) {
    return false;
  }
}
