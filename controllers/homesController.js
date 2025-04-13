const Home=require("../Models/home")

exports.getHome = (req, res, next) => {
  // getting the registered homes from the database
// rows is the Registered Homes

console.log("Sesion value",req.session);

  Home.find()
    .then((registeredHomes) => {
      res.render("store/home", {
        registeredHomes: registeredHomes,
        pageTitle: "Airbnb Home",
        current_page: "Home",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user 
      });
    })
    .catch(err => {
      console.error("Error fetching homes:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.Bookings = (req, res, next) => {
 
    res.render("store/Bookings", {
      pageTitle: "MY Bookings",
      current_page: "Bookings",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user

    });
  
};


exports.getHomesDetail = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At Home details page, homeId:", homeId);

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found for id:", homeId);
        return res.status(404).render("error", {
          message: "Home not found",
          pageTitle: "Error",
          current_page: "Error",
          isLoggedIn: req.isLoggedIn,
          user: req.session.user
        });
      }

      console.log("Home details found:", home);
      res.render("store/home-Detail", {
        home: home,
        pageTitle: "Home Detail",
        current_page: "home-detail",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch(err => {
      console.error("Error fetching home details:", err);
      res.status(500).render("error", {
        message: "Internal Server Error",
        pageTitle: "Error",
        current_page: "Error",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user
      });
    });
};

