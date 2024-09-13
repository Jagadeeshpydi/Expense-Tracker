import User from '../models/User.js';


export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,  // Plain text password
      phoneNumber
    });

    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating account. Please try again.' });
  }
};