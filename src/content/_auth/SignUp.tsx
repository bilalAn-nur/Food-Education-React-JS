import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

import * as z from "zod";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { createUserAccount } from "../../lib/appwrite/api";
import { SignupValidation } from "../../lib/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "react-router-dom";

const SignUpCard = () => {
  const [isVerified, setVerified] = useState(false);
  // const form = useForm<z.infer<typeof SignupValidation>>({
  //   resolver: zodResolver(SignupValidation),
  //   defaultValues: {
  //     name: "",
  //     username: "",
  //     email: "",
  //     password: "",
  //   },
  // });

  const handleRecaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setVerified(true);
  };

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    if (isVerified) {
      const newUser = await createUserAccount(values);
      console.log(newUser);
    } else {
      console.log("Please verify reCAPTCHA.");
    }
  }

  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <Form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Input label="Nama" size="lg" />
          <Input label="Username" size="lg" />
          <Input label="Email" size="lg" />
          <Input label="Password" size="lg" type="password" />
          <Input label="Re-password" size="lg" type="password" />
          {/* Add reCAPTCHA to your signup form */}
          <ReCAPTCHA
            sitekey="6LeKQTspAAAAACxTTYxtGbmEd1WXeJE_hnHidsI9"
            onChange={handleRecaptchaChange}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as="a"
              href="#signin"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign in
            </Typography>
          </Typography>
        </CardFooter>
      </Form>
    </Card>
  );
};

export default SignUpCard;
