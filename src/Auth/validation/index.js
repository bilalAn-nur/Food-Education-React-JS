import * as z from "zod";

export const SignupValidation = z
  .object({
    name: z.string().min(2, {
      message: "The Name Too Short.",
    }),
    email: z.string().email(),
    password1: z.string().min(8, {
      message: "Password must be at least 8 Character.",
    }),
    password2: z.string().min(8, {
      message: "Password must be at least 8 Character",
    }),
  })
  .refine((values) => values.password1 === values.password2, {
    message: "Passwords must match!",
    path: ["password2"],
  });

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
