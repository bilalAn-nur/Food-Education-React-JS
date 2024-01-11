import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useAuth } from "../appwrite/ApiAppwrite";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SigninValidation } from "../validation";

const SignInForm = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState("");
  const [buttonLoading, setbuttonLoading] = useState(false);

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/dashboard/home");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: loginForm.current.email.value,
      password: loginForm.current.password.value,
    };

    try {
      await SigninValidation.parseAsync(formData);

      setErrors({
        email: "",
        password: "",
      });
      const userInfo = { ...formData };

      try {
        await loginUser(userInfo, setAlert);
        setAlert();
      } catch (error) {
        setbuttonLoading(false);
        console.log(error);
      }
    } catch (validationError) {
      const errorObject = validationError.errors.reduce((acc, error) => {
        const path = error.path[0];
        acc[path] = error.message;
        return acc;
      }, {});

      setErrors(errorObject);
      setbuttonLoading(false);
      setAlert({
        type: "error",
        message: "Failed to create a user account. Please try again later.",
      });
    }
  };

  return (
    <div className="grid place-items-center pt-40">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 mt-4 grid h-28 place-items-center">
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit} ref={loginForm}>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" name="email" size="lg" />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
            <Input label="Password" name="password" size="lg" type="password" />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              type="submit"
              fullWidth
              loading={buttonLoading}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="/sign-up"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold">
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
      {alert && (
        <div className="relative w-full">
          <div className="absolute bottom-0 right-0">
            <Alert
              open={true}
              onClose={() => setAlert(null)}
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
              }}
              color={alert.type === "error" ? "red" : "green"}>
              {alert.message}
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
