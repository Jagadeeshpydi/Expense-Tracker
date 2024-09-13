import Joi from 'joi';

// Middleware for validating expense data
export const validateExpense = (req, res, next) => {
  // Define the schema for expense validation
  const schema = Joi.object({
    date: Joi.date().iso().required().messages({
      'date.base': 'Date should be a valid date',
      'date.iso': 'Date should be in ISO format (e.g., YYYY-MM-DD)',
      'any.required': 'Date is a required field',
    }),
    category: Joi.string().trim().min(1).required().messages({
      'string.base': 'Category should be a type of text',
      'string.empty': 'Category cannot be empty',
      'any.required': 'Category is a required field',
    }),
    amount: Joi.number().positive().required().messages({
      'number.base': 'Amount should be a number',
      'number.positive': 'Amount must be a positive number',
      'any.required': 'Amount is a required field',
    }),
    description: Joi.string().trim().allow('').optional().messages({
      'string.base': 'Description should be a type of text',
    }),
  });

  // Validate the request body against the schema
  const { error } = schema.validate(req.body, { allowUnknown: true });

  if (error) {
    // Return a 400 Bad Request status with the error message
    return res.status(400).json({ error: error.details[0].message });
  }

  // Proceed to the next middleware if validation passes
  next();
};
