import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../features/Auth/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../Appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status)
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();


  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {console.log(authStatus)
      }
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          {" "}
          Sign in to your account
        </h2>
        <p className="m-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary trasition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-center text-red-600 mt-8">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(value) || 
                  "Email address must be a valid address!"
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password",{
                required : true,
                minLength : 6
              })}
            />
            <Button children="Sign Up" className="w-full" type="submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
