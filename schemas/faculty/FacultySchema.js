const mongoose = require("mongoose");
const z = require("zod");

const facultyValidator = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" }),
  role: z.string().nonempty(),
});

const facultySchema1 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

module.exports = mongoose.model("faculty", facultySchema1), {facultyValidator}
