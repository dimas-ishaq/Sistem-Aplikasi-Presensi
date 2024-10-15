const Joi = require('joi');

const staffSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Admin', 'Staff').required(),
});

const staffLoginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

const validateStaff = (staff) => {
  return staffSchema.validate(staff);
}
const validateLoginStaff = (staff) => {
  return staffLoginSchema.validate(staff);
}

module.exports = { validateStaff, validateLoginStaff };