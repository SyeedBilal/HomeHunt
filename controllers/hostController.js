const Home = require("../Models/home");
const fs=require('fs');

const { ObjectId } = require("mongodb");

// Renders the form to add a home
exports.getHostHome = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes,
      pageTitle: "Host Homes List",
      current_page: "Host-homes",
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user,
      
    });
  });
};
// here we are getting id from host-home-list.ejs

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for edit");
      return res.redirect("/host/home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Register Your Home",
      current_page: "Add Home",
      editing: editing,
      isLoggedIn: req.session.isLoggedIn,
      user: req.session.user
    });
  }).catch(err => {
    console.error("Error finding home:", err);
    res.redirect("/host/home-list");
  });
};

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    editing:false,
    pageTitle: "Register Your Home",
    current_page: "Add Home",
    isLoggedIn: req.session.isLoggedIn,
    user: req.session.user,
    
  });
};


// Handles submission of the add-home form
exports.postAddHome = async (req, res, next) => {
  const { houseName, price, location, rating, description } = req.body;
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const home = new Home({ houseName, price, location, rating, photoUrl, description });
    await home.save();
    console.log("Home saved successfully");
    res.redirect('/');
  } catch (err) {
    console.error("Error saving home:", err);
    res.status(500).send("Error saving home");
  }
};

//      ********    we already have the home id in the body passed from the edit-home.ejs  ******

exports.postEditHome = async (req, res, next) => {
  const { id, houseName, price, location, rating, description } = req.body;
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const home = await Home.findById(id);
    if (!home) {
      return res.status(404).send("Home not found");
    }

    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.description = description;
    if (photoUrl) {
      home.photoUrl = photoUrl;
    }
if(req.file){
  fs.unlink(home.photoUrl,(err)=>{
    console.log("Errro while deleting home",err);
  })
}
    await home.save();
    console.log("Home updated successfully");
    res.redirect('/host/host-home-list');
  } catch (err) {
    console.error("Error updating home:", err);
    res.status(500).send("Error updating home");
  }
};

exports.getdeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect('/host/host-home-list');
    })
    .catch(err => {
      console.log(err);
    });
};

/**  Method 2 without using prehook 
 exports.getdeleteHome = async (req, res, next) => {
  const homeId = req.params.homeId;

  try {
    await Favourites.deleteMany({ homeId }); // Delete related favourites manually
    console.log(`Deleted favourites for homeId: ${homeId}`);

    await Home.findByIdAndDelete(homeId); // Now delete the home
    res.redirect('/host/host-home-list');
  } catch (err) {
    console.error("Error deleting home and related favourites:", err);
    res.status(500).send("Error deleting home");
  }
};

 */