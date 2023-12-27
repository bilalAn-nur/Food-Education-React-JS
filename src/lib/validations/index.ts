import * as z from "zod";

export const SignupValidation = z
  .object({
    name: z.string().min(2, { message: "Too Short." }),
    username: z.string().min(2, { message: "Too Short." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 Character." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 Character" }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords must match!",
  });

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 Character." }),
});

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  tags: z.string(),
});
