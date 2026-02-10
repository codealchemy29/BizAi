import { API_BASE_URL } from "@/config/api";
export async function getMe() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await fetch(
     `${API_BASE_URL}/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data; // 👈 IMPORTANT
  } catch (err) {
    console.error("getMe error:", err);
    return null;
  }
}
