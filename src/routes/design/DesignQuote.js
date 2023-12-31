import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  Button,
  Container,
  FormControl,
  Grid,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import apiConfig from "../../config/apiConfig";
import { DISPLAY_PHONE_NUMBER, EMAIL } from "../../constants/constants";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone number is required"),
    state: yup
      .string()
      .required("Email is required")
      .email("Email must be in this format; email@email.com"),
  })
  .required();

export const DesignQuote = () => {
  const [files, setFiles] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ name, phone, email, details }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);

    formData.append("type", "DESIGN");
    formData.append("material", "N/A");

    for (const file of files) {
      formData.append("file", file);
    }

    formData.append("details", details);

    try {
      setIsLoading(true);

      const url = `${apiConfig.api.baseUrl}/v1/quote`;
      const response = await axios.post(url, formData);

      setSuccess(response.status === 200);
    } catch (err) {
      setSuccess(false);
    }

    setIsLoading(false);
    handleOpen();
  };

  return (
    <>
      <Grid container spacing={0} sx={{ display: "flex" }}>
        <Grid item xs={12} sx={{ flexGrow: 1, marginTop: "30px" }}>
          <Container maxWidth="md">
            <Typography
              variant="h5"
              component="div"
              sx={{ fontSize: "2.0rem", fontWeight: "bold" }}
            >
              Request a Free Design Consultation
            </Typography>

            <Typography
              variant="body2"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              We just need some information to get started
            </Typography>

            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <TextField
                id="name"
                label="Name *"
                variant="outlined"
                margin="normal"
                error={!!errors.name?.message}
                helperText={errors.name?.message}
                {...register("name")}
              />

              <TextField
                id="phone"
                type="tel"
                label="Phone *"
                variant="outlined"
                margin="normal"
                error={!!errors.phone?.message}
                helperText={errors.phone?.message}
                {...register("phone")}
              />

              <TextField
                id="state"
                label="Email *"
                variant="outlined"
                margin="normal"
                error={!!errors.state?.message}
                helperText={errors.state?.message}
                {...register("state")}
              />

              <Button variant="contained" component="label" sx={{ mt: 1 }}>
                <FileUploadIcon sx={{ mr: 1 }} />
                Upload Supporting Files
                <input
                  type="file"
                  multiple
                  hidden
                  onClick={(e) => (e.target.value = null)}
                  onChange={(e) => setFiles([...files, ...e.target.files])}
                />
              </Button>

              <Box
                display={files?.length === 0 ? "none" : "block"}
                sx={{
                  ml: 2,
                  my: 1,
                  color: "text.secondary",
                  maxHeight: "120px",
                  overflow: "auto",
                }}
              >
                <List>
                  {files?.map((file, index) => (
                    <ListItem key={`file-${index}`} disablePadding>
                      <IconButton
                        onClick={() => {
                          files.splice(index, 1);
                          setFiles([...files]);
                        }}
                        variant="contained"
                        sx={{
                          mr: 1,
                          bgcolor: "white",
                          color: "black",
                          "&:hover": { bgcolor: "white" },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: "medium" }} />
                      </IconButton>

                      <ListItemText primary={file.name} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <TextField
                id="details"
                label="Additional Details"
                variant="outlined"
                multiline
                rows={5}
                margin="normal"
                {...register("details")}
              />

              <Box sx={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                  sx={{
                    color: "secondary",
                    width: "100px",
                    height: "40px",
                    px: "30px",
                    py: "10px",
                    textTransform: "none",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </FormControl>
          </Container>
        </Grid>
      </Grid>

      {/* Status Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 24,
            px: 6,
            py: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="div"
            sx={{
              mb: "16px",
              color: "#595e6c",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {success ? <>Request submitted</> : <>Something went wrong</>}
          </Typography>

          <Divider />

          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            {success ? (
              <>
                Thank you for submitting a consultation request. We will be in
                touch with you within one business day.
              </>
            ) : (
              <>
                An issue occurred while submitting the request. Please make
                another attempt or contact us using the information provided
                below. We apologize for the inconvenience.
              </>
            )}
          </Typography>

          <Divider />

          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box sx={{ minWidth: "100px" }}>Call or Text</Box>
              <Box>{DISPLAY_PHONE_NUMBER}</Box>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box sx={{ minWidth: "100px" }}>Email</Box>
              <Box>{EMAIL}</Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
