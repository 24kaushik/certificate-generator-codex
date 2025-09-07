import User from "../models/user.model.js";

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(`${password}`);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "User not verified, Please get yourself verified from the tech team (DB verification)." });
    }
    const token = user.getSignedJwtToken();
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roleAtCodex: user.roleAtCodex,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCurrentUser(req, res) {
  return res.status(200).json(req.user);
}

export async function register(req, res) {
  const { name, email, password, roleAtCodex } = req.body;
  if (!name || !email || !password || !roleAtCodex) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  try {
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = new User({ name, email, password, roleAtCodex });
    await user.save();

    const token = user.getSignedJwtToken();

    res
      .status(201)
      .json({
        message:
          "User registered successfully. Please get yourself verified by someone in the tech team (verification from db).",
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
