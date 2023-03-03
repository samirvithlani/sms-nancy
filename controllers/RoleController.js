const { Role, roleValidator } = require("../schemas/RoleSchema");
const { ZodError } = require("zod");

exports.getAllRoles = (req, res) => {
  Role.find((err, data) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    } else {
      return res.status(200).json({
        message: "All roles",
        data: data,
      });
    }
  });
};

exports.createRole = (req, res) => {
  // Validate request body
  try {
    const validateRole = roleValidator.parse(req.body);
    if (validateRole) {
      // Check if role already exists
      Role.findOne({ name: req.body.name }, (err, data) => {
        if (err) {
          return res.status(400).send("Bad request");
        } else if (data) {
          return res.status(400).send("Role already exists.");
        } else {
          //create new role
          var role = new Role(validateRole);
          role.save((err, data) => {
            if (err) {
              res.status(500).json({
                message: "Error in saving data",
              });
            } else {
              res.status(200).json({
                message: "Role created successfully",
                data: data,
              });
            }
          });
        }
      });
    } else {
      res.status(400).json({});
    }
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.errors[0].message;
      console.log(`Zod validation error: ${message}`);
      res.status(400).json({ message: message });
    } else {
      console.log(`Unexpected error: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
