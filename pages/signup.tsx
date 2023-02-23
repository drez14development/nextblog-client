import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../src/api/mutations";
import { setLoginData } from "../src/store/authSlice";
import redirectIfLoggedIn from "../src/services/routing/RedirectIfLoggedIn";

const SignUp = () => {
  redirectIfLoggedIn()
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);

  const dispatch = useDispatch();
  const [signup, { loading, error, data }] = useMutation(SIGNUP, {
    variables: { input: { username, email, password } },
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup()
      .then((payload) => dispatch(setLoginData(payload)))
      .catch((response) => setFormError(response.message));
  };

  return (
    <section className="grid grid-cols-3 pt-4 px-7">
      <div className="col-span-3 md:col-span-1 md:col-start-2">
        <h1 className="text-2xl text-center text-primary mb-4">
          Sign up
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ mb: 2 }}
            label="Username"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoComplete="off"
          />
          <TextField
            sx={{ mb: 2 }}
            label="Email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
          />
          <TextField
            sx={{ mb: 2 }}
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#1976d2 !important" }}
            fullWidth
          >
            <span style={{ opacity: loading ? 0 : 1 }}>Submit</span>
            {loading && (
              <CircularProgress
                size={22}
                sx={{ color: "#fff", position: "absolute" }}
              />
            )}
          </Button>
        </form>
        {formError && (
          <div className="bg-red-200 mt-4 rounded p-4">
            <p className="text-red-800">{formError}</p>
          </div>
        )}
        <div className="text-center mt-6">
          <Link href="login" className="text-primary">
            Already registered? Login here
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
