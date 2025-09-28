import Store from "../models/storeModel.js";

// Get store owner dashboard
export const getMyStoreDashboard = async (req, res) => {
  try {
    // ensure storeOwner is logged in
    if (req.user.role !== "storeOwner") {
      return res.status(403).json({ message: "Access denied: Store owners only" });
    }

    const store = await Store.findOne({ owner: req.user.id })
      .populate("ratings.user", "name email");

    if (!store) return res.status(404).json({ message: "No store found for this owner" });

    const avgRating =
      store.ratings.length === 0
        ? 0
        : store.ratings.reduce((a, b) => a + b.rating, 0) / store.ratings.length;

    res.json({
      storeName: store.name,
      address: store.address,
      averageRating: avgRating,
      ratedUsers: store.ratings.map((r) => ({
        userId: r.user._id,
        name: r.user.name,
        email: r.user.email,
        rating: r.rating,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
