import * as v from "valibot";

const userSchema = v.object({
  username: v.pipe(
    v.string(),
    v.nonEmpty("Please enter a username"),
    v.minLength(3, "Your username must have atleast 3 characters"),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your Password"),
    v.minLength(8, "Your password must contain a minimum of 8 characters."),
    v.regex(/[a-z]/, "Your password must contain a lowercase letter."),
    v.regex(/[A-Z]/, "Your password must contain a uppercase letter."),
    v.regex(/[0-9]/, "Your password must contain a number."),
    v.regex(
      /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Your password must contain atleast a special character"
    ),
  ),
});



export const userValidation = async (req,res,next)=>{
  try {
    console.log(req.body);
    const response = v.parse(userSchema,req.body);
    if(response) next()
  } catch (error) {
    next(error)
  }
}

export default userSchema
