const {
  facultySchema,
  facultyValidator,
} = require("../../schemas/faculty/FacultySchema");
const ZodError = require("zod");

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

exports.addFaculty = (req, res) => {
  // validate request body
  const validateFaculty = facultyValidator.parse(req.body);
  if (validateFaculty) {
    // check if faculty already exists
    facultySchema.findOne({ email: req.body.email }, async (err, data) => {
      if (err) {
        return res.status(400).send("Bad request");
      } else if (data) {
        return res.status(400).send("Faculty already exists.");
      } else {
        try {
          const hashedPassword = await bcrypt.hash(
            req.body.password,
            SALT_ROUNDS
          );
          const faculty = new facultySchema({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
          });
          faculty.save((err, data) => {
            if (err) {
              res.status(500).json({
                message: "Bad request",
                error: err.message,
              });
            } else {
              res.status(200).json({
                message: "Faculty added successfully",
                data: faculty,
              });
            }
          });
        } catch (error) {
          console.log(`Unexpected error: ${error.message}`);
          res.status(500).json({ message: "Internal server error" });
        }
      }
    });
  } else {
    if (validateFaculty instanceof ZodError) {
      const messages = validateFaculty.errors.map((error) => error.message);
      console.log(`Zod validation errors: ${messages}`);
      res.status(400).json({ messages: messages });
    } else {
      console.log(`Unexpected error: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

exports.getFacultyById = (req, res) => {
  facultySchema.findById(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).send("Bad request");
    } else if (!data) {
      return res.status(404).send("Faculty not found.");
    } else {
      res.status(200).json({
        message: "Faculty found",
        data: data,
      });
    }
  });
};

exports.updateFaculty = (req, res) => {
  const validateFaculty = facultyValidator.parse(req.body);
  if (validateFaculty) {
    facultySchema.findByIdAndUpdate(
      req.params.id,
      validateFaculty,
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).send("Bad request");
        } else if (!data) {
          return res.status(404).send("Faculty not found.");
        } else {
          res.status(200).json({
            message: "Faculty updated successfully",
            data: data,
          });
        }
      }
    );
  } else {
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

exports.deleteFaculty = (req, res) => {
  id = req.params.id;
  facultySchema.findByIdAndRemove(id, (err, data) => {
    if (err) {
      return res.status(400).send("Bad request");
    } else if (!data) {
      return res.status(404).send("Faculty not found.");
    } else {
      res.status(200).json({
        message: "Faculty deleted successfully",
        data: data,
      });
    }
  });
};
