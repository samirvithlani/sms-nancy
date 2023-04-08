const zod = require('zod');

const AdminValidations = zod.object({
    body: zod.object({
        firstName: zod.string(),
        lastName: zod.string(),
        email: zod.string().email(),
        password: zod.string(),
        role: zod.string()
    })
})
module.exports = AdminValidations;