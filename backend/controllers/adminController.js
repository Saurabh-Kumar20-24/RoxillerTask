import User from "../models/userModel.js";
import Store from "../models/storeModel.js";
import bcrypt from "bcryptjs";

// Dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStores = await Store.countDocuments();
    const totalRatings = (await Store.find()).reduce((sum, store) => sum + store.ratings.length, 0);

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// Add user
export const addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    if (!["user","admin","storeOwner"].includes(role)) return res.status(400).json({ message: "Invalid role" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name,email,address,password:hashed,role });
    res.json({ message: "User created", user });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// Add store
export const addStore = async (req, res) => {
  try {
    const { name,email,address,owner } = req.body;
    const store = await Store.create({ name,email,address,owner });
    res.json({ message: "Store created", store });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// List stores
export const listStores = async (req, res) => {
  const stores = await Store.find().populate("ratings.user","name email");
  res.json(stores);
};

// List users
export const listUsers = async (req,res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Get user details
export const getUserDetails = async (req,res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({message:"User not found"});
  res.json(user);
};




// import User from "../models/userModel.js";
// // import Store from "../models/Store.js";
// // import Rating from "../models/Rating.js";
// import bcrypt from "bcryptjs";

// // -------------------- Dashboard --------------------
// export const getDashboardStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     // const totalStores = await Store.countDocuments();
//     // const totalRatings = await Rating.countDocuments();

//     res.json({ totalUsers, totalStores, totalRatings });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- Add New User --------------------
// export const addUser = async (req, res) => {
//   try {
//     const { name, email, password, address, role } = req.body;

//     if (!name || !email || !password || !address || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (!["user", "admin", "storeOwner"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       address,
//       role,
//     });

//     res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- Add New Store --------------------
// export const addStore = async (req, res) => {
//   try {
//     const { name, email, address } = req.body;

//     if (!name || !email || !address) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existing = await Store.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Store already exists" });

//     const store = await Store.create({ name, email, address });
//     res.status(201).json({ message: "Store created successfully", store });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- List Stores --------------------
// export const listStores = async (req, res) => {
//   try {
//     const stores = await Store.find().lean();

//     // calculate average rating
//     const results = await Promise.all(
//       stores.map(async (store) => {
//         const ratings = await Rating.find({ storeId: store._id });
//         const avgRating =
//           ratings.length > 0
//             ? (ratings.reduce((a, r) => a + r.value, 0) / ratings.length).toFixed(1)
//             : "No ratings yet";
//         return { ...store, averageRating: avgRating };
//       })
//     );

//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- List Users with Filters --------------------
// export const listUsers = async (req, res) => {
//   try {
//     const { name, email, address, role } = req.query;

//     let filter = {};
//     if (name) filter.name = { $regex: name, $options: "i" };
//     if (email) filter.email = { $regex: email, $options: "i" };
//     if (address) filter.address = { $regex: address, $options: "i" };
//     if (role) filter.role = role;

//     const users = await User.find(filter).select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- Get User Details --------------------
// export const getUserDetails = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     let response = { ...user.toObject() };

//     if (user.role === "storeOwner") {
//       const store = await Store.findOne({ email: user.email });
//       if (store) {
//         const ratings = await Rating.find({ storeId: store._id });
//         const avgRating =
//           ratings.length > 0
//             ? (ratings.reduce((a, r) => a + r.value, 0) / ratings.length).toFixed(1)
//             : "No ratings yet";
//         response.storeRating = avgRating;
//       }
//     }

//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
