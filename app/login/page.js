"use client";
import { LoginApi } from "@/api/api";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().min(8, 'Password shoule be 8 digits minimum').required("Password is required"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);

      const payloadData = {
        email: values?.email,
        password: values?.password,
      };

      const { data, error } = await LoginApi(payloadData);
      if (data) {
        toast.success(data?.message);
        router?.push("/submit-vehicle");
        localStorage?.setItem("token", data?.user?.token);
      }
      if (error) {
        toast.error(error);
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          background: 'url("/images/login-bg.png")',
          backgroundPosition: "50%",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            borderRadius: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            width: { xs: "90%", sm: "950px" },
            paddingRight: "1rem",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              size={7}
              sx={{
                backgroundImage: " url(/images/login.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: { xs: "none", sm: "block" },
                borderRadius: "20px",
              }}
            ></Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                }}
              >
                <Box
                  sx={{
                    alignItems: "center",
                    backgroundPosition: "50%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "0 auto",
                    minHeight: "80vh",
                    padding: "30px 12px",
                  }}
                >
                  <form onSubmit={formik.handleSubmit}>
                    <Typography
                      sx={{
                        color: "rgb(29, 29, 29)",
                        fontSize: "30.16px",
                        fontWeight: 600,
                        lineHeight: "30.16px",
                        letterSpacing: "-0.01em",
                        textAlign: "center",
                        marginBottom: "20px",
                      }}
                    >
                      Welcome Back 👋
                    </Typography>

                    <Typography
                      sx={{
                        color: "rgb(89, 89, 89)",
                        fontSize: "13.4px",
                        fontWeight: 400,
                        lineHeight: "21.45px",
                        textAlign: "center",
                        marginBottom: "40px",
                      }}
                    >
                      Today is a new day. It's your day. You shape it. Sign in
                      to start submitting vehicle details.  
                    </Typography>

                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#333",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.875rem",
                          lineHeight: "1.5",
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      id="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      sx={{
                        marginBottom: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#333",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "0.875rem",
                          lineHeight: "1.5",
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: "4px",
                        padding: "10px",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        marginTop: "20px",
                      }}
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      {submitting ? (
                        <>
                          Signing In
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="ml-1 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                    <Box
                      sx={{
                        marginTop: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <Image
                        src="/images/or.svg"
                        alt="Or"
                        width={1000}
                        height={500}
                        layout="responsive"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        align="center"
                        sx={{
                          marginBottom: 0,
                          display: "flex",
                        }}
                      >
                        Don't you have an account?{" "}
                        <Link
                          href="#"
                          className="text-[#1264fd] text-md font-semibold ml-1"
                        >
                          Sign Up
                        </Link>
                      </Typography>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default page;
