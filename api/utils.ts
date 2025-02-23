import { API_URL } from "@/api/endpoint";
import { AppTypes } from "@/type";

export async function getData({
  lang,
}: {
  lang: string;
}): Promise<AppTypes.Data[]> {
  try {
    const response = await fetch(`${API_URL.GET_ALL_PAGES}?lang=${lang}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    // console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return empty array instead of throwing to prevent app crash
  }
}
