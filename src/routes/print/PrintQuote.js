import * as React from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Button,
  Container,
  FormControl,
  Grid,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import { PrintQuoteFile } from "./PrintQuoteFile";
import apiConfig from "../../config/apiConfig";

const schema = yup
  .object({
    // name: yup.string().required("Name is required"),
  })
  .required();

export const PrintQuote = () => {
  const [quotes, setQuotes] = React.useState([]);

  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const updateQuote = (id, quote) => {
    const newQuotes = [...quotes];

    if (quote === null) {
      newQuotes.splice(id, 1);
    } else {
      newQuotes[id] = quote;
    }

    setQuotes(newQuotes);
  };

  const createSession = async ({
    name,
    company,
    street,
    city,
    state,
    zipcode,
  }) => {
    try {
      const formData = new FormData();
      for (const quote of quotes) {
        formData.append("quantity", quote.quantity);
        formData.append("material", quote.material);
        formData.append("color", quote.color);
        formData.append("file", quote.file);
      }

      const url = `${apiConfig.api.baseUrl}/v1/checkout`;
      const response = await axios.post(url, formData);

      window.location.href = await response.data.checkout_link;
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const quotes = location.state.uploadedFiles?.map((file) => {
      return {
        quantity: 1,
        material: "PLA",
        color: "Black",
        file: file,
      };
    });

    setQuotes(quotes);
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="md">
      <Typography
        variant="h5"
        component="div"
        sx={{ my: 3, fontSize: "2.0rem", fontWeight: "bold" }}
      >
        Quote
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          {quotes.map((quote, index) => (
            <Box key={`quote_${index}`} sx={{ mb: 2 }}>
              <PrintQuoteFile
                id={index}
                quote={quote}
                updateQuote={updateQuote}
              />
            </Box>
          ))}
        </Grid>

        <Grid item xs={4}>
          <FormControl sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              id="name"
              label="Name *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.name?.message}
              helperText={errors.name?.message}
              {...register("name")}
              sx={{ mt: 0 }}
            />

            <TextField
              id="company"
              label="Company"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.company?.message}
              helperText={errors.company?.message}
              {...register("company")}
            />

            <TextField
              id="street"
              label="Street *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.street?.message}
              helperText={errors.street?.message}
              {...register("street")}
            />

            <TextField
              id="city"
              label="City *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.city?.message}
              helperText={errors.city?.message}
              {...register("city")}
            />

            <TextField
              id="state"
              label="State *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.state?.message}
              helperText={errors.state?.message}
              {...register("state")}
            />

            <TextField
              id="zipcode"
              label="Zipcode *"
              variant="outlined"
              margin="dense"
              size="small"
              error={!!errors.zipcode?.message}
              helperText={errors.zipcode?.message}
              {...register("zipcode")}
            />

            <Button
              variant="contained"
              onClick={handleSubmit(createSession)}
              sx={{
                mt: 2,
                py: 1,
                bgcolor: "icon.primary",
                textTransform: "none",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              <LockIcon sx={{ mr: 0.5, fontSize: "1.1rem" }} />
              Checkout
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};
