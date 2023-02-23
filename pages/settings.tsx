import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { UPDATE_AVATAR } from "../src/api/mutations";
import { useMutation } from "@apollo/client";
import { updateClientAvatar } from "../src/store/authSlice";
import redirectIfGuest from "../src/services/routing/RedirectIfGuest";


const Settings = () => {
  
  redirectIfGuest();
  const [formError, setFormError] = useState<string | null>(null);
  const [file, setFile] = useState<any>(null)

  const token = useSelector((state: any) => state.auth.loginData?.token)
  const [updateAvatar, { loading, error, data }] = useMutation(UPDATE_AVATAR, {
    variables: { file },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  const dispatch = useDispatch();
  const imgField = useRef<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    imgField.current.value = null;

    await updateAvatar()
      .then((response) => dispatch(updateClientAvatar(response)))
      .catch((error) => setFormError(error.message));
  };

  const handleImgChange = (e: any) => {
    setFormError(null);
    const formFile = e.target.files[0];

    if (formFile.size <= 1000000) {
      //1 MB
      setFile(formFile)
    } else {
      imgField.current.value = null;
      setFormError("Image size must be below 1 MB");
    }
  };

  return (
    <section className="grid grid-cols-3 pt-4 px-7">
      <div className="col-span-3 md:col-span-1 md:col-start-2">
        <h1 className="text-2xl text-primary mb-4">
          Settings
        </h1>
        <form onSubmit={handleSubmit}>
          <Typography sx={{mb:1}}>
            Update profile picture:
          </Typography>
          <TextField
            sx={{ mb: 2 }}
            label=""
            type="file"
            fullWidth
            onChange={(e) => handleImgChange(e)}
            inputRef={imgField}
          />
          <Button
            type="submit"
            variant="contained"
            className="blue-btn"
            fullWidth
          >
            <span style={{ opacity: loading ? 0 : 1 }}>Update</span>
            {loading && (
              <CircularProgress
                size={22}
                sx={{ color: "#fff", position: "absolute" }}
              />
            )}
          </Button>
        </form>
        {error && (
          <div className="bg-red-200 mt-4 rounded p-4">
            <p className="text-red-800">{formError}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Settings;
