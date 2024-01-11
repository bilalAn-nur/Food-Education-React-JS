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
import { useRef, useState } from "react";
import { useAuth } from "../appwrite/ApiAppwrite";
import { SignupValidation } from "../validation";

const SignupForm = () => {
  const registerForm = useRef(null);
  const { registerUser } = useAuth();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [alert, setAlert] = useState("");
  const [buttonLoading, setbuttonLoading] = useState(false);

  const handleSubmit = async (e) => {
    setbuttonLoading(true);
    e.preventDefault();

    const formData = {
      name: registerForm.current.name.value,
      email: registerForm.current.email.value,
      password1: registerForm.current.password1.value,
      password2: registerForm.current.password2.value,
    };

    try {
      await SignupValidation.parseAsync(formData);

      setErrors({
        name: "",
        email: "",
        password1: "",
        password2: "",
      });

      const userInfo = { ...formData };

      try {
        await registerUser(userInfo);
        alert("User registered successfully. Please sign in.");
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
    <div className="grid place-items-center h-full">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 mt-4 grid h-28 place-items-center">
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <form ref={registerForm} onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input label="Nama Lengkap" size="lg" name="name" />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
            <Input label="Email" size="lg" name="email" />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
            <Input
              label="Password"
              size="lg"
              type="password"
              name="password1"
            />

            {errors.password1 && (
              <span className="text-red-500">{errors.password1}</span>
            )}
            <Input
              label="Ketik Ulang Password"
              type="password"
              size="lg"
              name="password2"
            />

            {errors.password2 && (
              <span className="text-red-500">{errors.password2}</span>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              type="submit"
              loading={buttonLoading}
              fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Sudah mempunyai akun?
              <Typography
                as="a"
                href="/sign-in"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold">
                Sign in
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

export default SignupForm;
