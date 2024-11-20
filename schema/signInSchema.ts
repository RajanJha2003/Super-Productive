import { z } from "zod";

// Reusable password schema with custom error messages
export const password = z
  .string()
  .refine((val) => val.length >= 10, { message: "Password must be at least 10 characters" })
  .refine((val) => /[A-Z]/.test(val), { message: "Password must contain at least one uppercase letter" })
  .refine((val) => /[a-z]/.test(val), { message: "Password must contain at least one lowercase letter" })
  .refine((val) => /\d/.test(val), { message: "Password must contain at least one digit" });

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password, // Use the reusable password schema here
});

export type SignInSchema = z.infer<typeof signInSchema>;
