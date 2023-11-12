import axios from "axios";

export async function getData() {
  const response = await axios.get(`/api/videos`);
  return response.data;
}
