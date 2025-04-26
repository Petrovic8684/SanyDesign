import { api } from "../lib/api";

export async function verifyToken(): Promise<boolean> {
  try {
    const response = await api.post("/auth/verify-token");
    return response.data.valid;
  } catch (error) {
    return false;
  }
}
