import Store from "../models/storeModel.js";

// List stores
export const getStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    let query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (address) query.address = { $regex: address, $options: "i" };

    const stores = await Store.find(query).populate("ratings.user", "name email");
    const formatted = stores.map((store) => {
      // Find the logged-in user's rating
      const userRatingObj = store.ratings.find(
        (r) => r.user._id.toString() === req.user.id
      );

      const averageRating = store.ratings.length > 0
      ? (store.ratings.reduce((acc, r) => acc + r.rating, 0) / store.ratings.length).toFixed(1)
      : null;

      return {
        id: store._id,
        name: store.name,
        address: store.address,
        averageRating,
        userRating: userRatingObj ? userRatingObj.rating : null,
      };
    });

    res.json(formatted);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// Submit/update rating
export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const existing = store.ratings.find((r) => r.user.toString() === req.user.id);
    if (existing) existing.rating = rating;
    else store.ratings.push({ user: req.user.id, rating });

    await store.save();
    res.json({ message: "Rating submitted" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};
