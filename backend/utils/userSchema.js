import * as v from "valibot";

const userSchema = v.object({
  username: v
    .string()
    .nonEmpty("Please enter a username")
    .minLength(3, "Your username must have atleast 3 characters"),
  password: v
    .password()
    .nonEmpty("Please enter your Password")
    .minLength(8, "Your password must contain a minimum of 8 characters.")
    .regex(/[a-z]/, "Your password must contain a lowercase letter.")
    .regex(/[A-Z]/, "Your password must contain a uppercase letter.")
    .regex(/[0-9]/, "Your password must contain a number.")
    .regex(
      /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Your password must contain atleast a special character"
    ),
});

export const userValidation = async (req,res,next)=>{
  
}

export default userSchema
