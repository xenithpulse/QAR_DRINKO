import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exists"],
      // unique: true
    },
    password: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);



adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  
  this.password = await bcrypt.hash(this.password, 10);
});


adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id },  process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
};
const Admin =
  mongoose.model("Admin", adminSchema) ;
export default Admin;
