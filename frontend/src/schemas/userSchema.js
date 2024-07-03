import * as v from "valibot";

const userSchema = v.object({
  username: v
    .string(),
  password: v
    .minLength(8)
    .regex(/[a-z]/, "Your password must contain a lowercase letter.")
    .regex(/[A-Z]/, "Your password must contain a uppercase letter.")
    .regex(/[0-9]/, "Your password must contain a number.")
    .regex(
      /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Your password must contain atleast a special character"
    ),
});

export default userSchema
