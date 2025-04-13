const Home = require("../Models/home");
const User = require("../models/user.js");

exports.getFavourites = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const userWithFavourites = await User.findById(userId).populate('favourites');
    if (!userWithFavourites) {
      console.error("User not found");
      return res.status(404).send("User not found");
    }

    const favouritesWithDetail = userWithFavourites.favourites;

    res.render("store/favorite-List", {
      favouritesWithDetail,
      pageTitle: "My Favourites",
      current_page: "Favourites",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.error("Error fetching favourites:", err);
    res.status(500).send("Error fetching favourites");
  }
};

exports.postAddFavourites = async (req, res) => {
  const userId = req.session.user._id;
  const homeId = req.body.homeId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return res.status(404).send("User not found");
    }

    // Avoid duplication
    if (user.favourites.includes(homeId)) {
      console.log("Already in favourites");
      return res.redirect("/favourites");
    }

    user.favourites.push(homeId);
    await user.save();

    console.log("Added to favourites");
    res.redirect("/favourites");
  } catch (err) {
    console.error("Error adding to favourites:", err);
    res.status(500).send("Error adding to favourites");
  }
};

exports.deleteFromFavourites = async (req, res) => {
  const userId = req.session.user._id;
  const homeId = req.params.homeId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return res.status(404).send("User not found");
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { favourites: homeId }
    });

    console.log("Deleted from favourites");
    res.redirect("/favourites");
  } catch (err) {
    console.error("Error deleting from favourites:", err);
    res.status(500).send("Error deleting favourite");
  }
};
