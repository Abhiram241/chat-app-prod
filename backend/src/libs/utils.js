import jwt from "jsonwebtoken";


//generate a jwt token generally for signup
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevents xss attacks cross site scripting attacks
    sameSite: true, // csrf
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
