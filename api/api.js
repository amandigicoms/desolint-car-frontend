import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const headers = () => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) {
    headers["Authorization"] = token;
  }
  return headers;
};

export const LoginApi = async ({ email, password }) => {
  try {
    const res = await axios.post("api/v1/user/login", {
      email,
      password,
    });
    return { data: res?.data };
  } catch (err) {
    return { data: null, error: err?.response?.data?.message };
  }
};

export const SubmitVehicleApi = async (formData) => {
  try {
    const res = await axios.post(
      "api/v1/vehicle/create-vehicle",
      formData,
      { headers: headers(),
        'Content-Type': 'multipart/form-data',
       }
    );
    return { data: res?.data };
  } catch (err) {
    return { data: null, error: err?.response?.data?.message };
  }
};
