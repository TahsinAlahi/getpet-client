import axios from "axios";

const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  timeout: 10000, // 10 seconds
});

function useAxiosPublic() {
  return axiosPublic;
}
export default useAxiosPublic;
