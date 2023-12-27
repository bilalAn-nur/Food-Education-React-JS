// src/pages/Auth.jsx
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

const AuthForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);

  const mutation = useMutation(
    async (data) => {
      try {
        return isLogin
          ? await appwrite.account.createSession(data.email, data.password)
          : await appwrite.account.create(data.email, data.password, data.name);
      } catch (error) {
        console.error("Error during mutation:", error);
        throw error;
      }
    }
    // ... (onSuccess, etc.)
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="mx-auto w-full max-w-[24rem]">
      <Card>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            {isLogin ? "Sign In" : "Sign Up"}
          </Typography>
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          >
            {isLogin
              ? "Enter your email and password to Sign In."
              : "Create your account by entering the information below."}
          </Typography>
          {!isLogin && (
            <>
              <Typography className="-mb-2" variant="h6">
                Your Name
              </Typography>
              <Input
                label="Name"
                size="lg"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </>
          )}
          <Typography className="-mb-2" variant="h6">
            Your Email
          </Typography>
          <Input
            label="Email"
            size="lg"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <Typography className="-mb-2" variant="h6">
            Your Password
          </Typography>
          <Input
            label="Password"
            size="lg"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          {!isLogin && (
            <>
              <Typography className="-mb-2" variant="h6">
                Confirm Password
              </Typography>
              <Input
                label="Confirm Password"
                size="lg"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
              />
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </>
          )}
          {!isLogin && (
            <div className="-ml-2.5 -mt-3">
              <Checkbox
                label="I agree to the terms and conditions"
                {...register("agree", {
                  required: "You must agree to the terms and conditions",
                })}
              />
              {errors.agree && <span>{errors.agree.message}</span>}
            </div>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={handleSubmit(onSubmit)} fullWidth>
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
