"use client";
import useAuth from "@/hooks/useAuth";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { SubmitVehicleApi } from "@/api/api";

const page = () => {
  const { loading, isAuthenticated } = useAuth();
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [city, setCity] = useState("Lahore");

  const formik = useFormik({
    initialValues: {
      carModel: "",
      price: "",
      phone: "",
      maxPictures: 1,
    },
    validationSchema: Yup.object({
      carModel: Yup.string()
        .min(3, "Car model must be at least 3 characters")
        .required("Car model is required"),
      price: Yup.number().required("Price is required").positive(),
      phone: Yup.string()
        .length(11, "Phone must be 11 digits.")
        .required("Phone number is required"),
      maxPictures: Yup.number()
        .min(1)
        .max(10)
        .required("Select the number of pictures"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("V".values);
      setSubmitting(true);

      const formData = new FormData();
      formData.append("carModel", values.carModel);
      formData.append("price", values.price);
      formData.append("phone", values.phone);
      formData.append("maxPictures", values.maxPictures);
      formData.append("city", city);
      images.forEach((image) => {
        formData.append("images", image);
      });

      const { data, error } = await SubmitVehicleApi(formData);
      if (data) {
        toast.success(data?.message);
        setSubmitting(false);
        setImages([]);
        resetForm();
      }
      if (error) {
        toast.error(error);
      }
      setSubmitting(false);
    },
  });

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    if (selectedImages.length + images.length > formik.values.maxPictures) {
      toast.error(
        `You can only upload up to ${formik.values.maxPictures} images.`
      );
    } else {
      setImages([...images, ...selectedImages]);
    }
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  if (loading) {
    return <div>Loading...!</div>;
  }
  return (
    <div>
      {isAuthenticated && (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundImage: "url('/images/car.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: 4,
                borderRadius: 2,
                width: { xs: "90%", sm: "70%" },
                maxHeight: {xs:'90%', sm:"80%"},
                boxShadow: 24,
                overflow: "auto",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginBottom: 4,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  width: "max-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Submit Vehicle Information
              </Typography>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    id="carModel"
                    label="Car Model"
                    type="text"
                    name="carModel"
                    value={formik.values.carModel}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.carModel && Boolean(formik.errors.carModel)
                    }
                    helperText={
                      formik.touched.carModel && formik.errors.carModel
                    }
                    sx={{
                      marginBottom: 1,
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
                </Grid>

                <Grid size={6}>
                  <TextField
                    fullWidth
                    id="price"
                    label="Price"
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    sx={{
                      marginBottom: 1,
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
                </Grid>

                <Grid size={6}>
                  <TextField
                    fullWidth
                    id="number"
                    label="Phone"
                    type="number"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    sx={{
                      marginBottom: 1,
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
                </Grid>

                <Grid size={6}>
                  <FormControl fullWidth sx={{ marginBottom: 1 }}>
                    <InputLabel id="number-label">No of Photos</InputLabel>
                    <Select
                      labelId="maxPictures"
                      id="maxPictures"
                      label="No of Pictures"
                      name="maxPictures"
                      value={formik.values.maxPictures}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.maxPictures &&
                        Boolean(formik.errors.maxPictures)
                      }
                    >
                      {[...Array(10).keys()].map((number) => (
                        <MenuItem key={number + 1} value={number + 1}>
                          {number + 1}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.maxPictures &&
                      formik.errors.maxPictures && (
                        <FormHelperText error>
                          {formik.errors.maxPictures}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                      Select City:
                    </Typography>
                    <RadioGroup
                      name="city"
                      value={city}
                      onChange={handleCityChange}
                      row
                    >
                      <FormControlLabel
                        value="Lahore"
                        control={<Radio />}
                        label="Lahore"
                      />
                      <FormControlLabel
                        value="Islamabad"
                        control={<Radio />}
                        label="Islamabad"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* ---------------------------Images senarios--------------------------- */}

                <Grid size={12}>
                  <Box
                    sx={{
                      width: "300px",
                      height: "100px",
                      border: "2px dotted blue",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      cursor: "pointer",
                      borderRadius: "8px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                      },
                    }}
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      disabled={images.length >= formik.values.maxPictures}
                      style={{ display: "none" }}
                      id="image-upload"
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: "blue", fontWeight: "bold" }}
                    >
                      Upload Images
                    </Typography>
                  </Box>

                  {images.length > 0 && (
                    <Box>
                      <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        Selected Images:
                      </Typography>
                      <Grid container spacing={{xs:1, sm:2}}>
                        {images.map((image, index) => (
                          <Grid size={{xs:4,sm:3}} key={index}>
                            <Box
                              sx={{
                                position: "relative",
                                "&:hover .delete-icon": {
                                  display: "flex",
                                },
                              }}
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`image-${index}`}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  borderRadius: "12px",
                                }}
                              />
                              <IconButton
                                onClick={() => handleDeleteImage(index)}
                                className="delete-icon"
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                                  color: "white",
                                  display: "none",
                                  "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                                  },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Grid>

                {/* ------------------------Image senario ending-------------- */}

                <Grid size={{xs:6, sm:4}}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: "4px",
                      padding: "10px",
                      paddingTop: {xs:"10px" , sm: '15px'},
                      paddingBottom: {xs:"10px" , sm: '15px'},
                      marginTop: "20px",
                    }}
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    {submitting ? (
                      <>
                        Submitting
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
                      "Submit"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      )}
    </div>
  );
};

export default page;
