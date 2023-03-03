const mongoose = require("mongoose");
const z = require("zod");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("Role", roleSchema);

const roleValidator = z.object({
  name: z.string().min(3,'Name must be at least 3 characters').max(50),
});

module.exports = { Role, roleValidator };
