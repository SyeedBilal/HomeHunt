const { check, validationResult } = require("express-validator");
const User=require("../Models/user");
const bycrypt=require('bcryptjs')
exports.getLogin = (req, res, next) => {
  res.render("auth/login.ejs", {
    pageTitle: "Login",
    isLoggedIn: false,
    errorMessage: [], 
    user:{}
  });
};

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login.ejs", {
      pageTitle: "Login",
      isLoggedIn: false,
      errorMessage: errors.array().map((err) => err.msg), // Pass validation errors
    });
  }

  // req.cookie("isLoggedIn", true,);
  // req.isLoggedIn = true;
  console.log("Body:", req.body);
  const {email,password}=req.body;
  
  const user= await User.findOne({email});
  
  if(!user){
    return res.status(422).render("auth/login.ejs", {
      pageTitle: "Login",
      isLoggedIn: false,
      errorMessage: ["User not found"],
      oldInput: {
        email,
        password,
      },
    });
  }
  
  const isMatch=await bycrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(422).render("auth/login.ejs", {
      pageTitle: "Login",
      isLoggedIn: false,
      errorMessage: ["Invalid password"],
      oldInput: {
        email,
        password,
      },
    });
  }

  req.session.isLoggedIn = true;
  req.session.user=user;

  req.session.save(err => {
    if (err) console.log(err);
    console.log("Redirected from Post login");
    res.redirect("/");
  });

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup.ejs", {
    pageTitle: "Signup",
    isLoggedIn: false,
    errorMessage: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
      user:{}
    },
  });
};

exports.postSignup = [
  // First Name validation
  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Please enter a valid first name"),

  // Last Name Validation
  check("lastName") // ✅ Fixed from "firstName" to "lastName"
    .trim()
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Please enter a valid last name"),

  // Email validation
  check("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),

  // Password validation
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  // Confirm Password Validation
  check("confirmPassword") // ✅ Fixed from "Confirm Password" (case-sensitive)
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // User Type Validation
  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Please select a valid user type"),

  // Terms and Conditions Validation
  check("terms")
    .equals("on") // ✅ Ensures checkbox is checked
    .withMessage("Please accept the terms and conditions"),

  async (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup.ejs", {
        pageTitle: "Signup",
        isLoggedIn: false,
        errorMessage: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, password, userType },
        user:{}
      });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(422).render("auth/signup.ejs", {
          pageTitle: "Signup",
          isLoggedIn: false,
          errorMessage: ["Email already exists"],
          oldInput: { firstName, lastName, email, password, userType },
          user:{}
        });
      }

      const hashedPassword = await bycrypt.hash(password, 12);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType
      });
      
      await user.save();
      
      // Set session after user is created
      req.session.isLoggedIn = true;
      req.session.user = user;
      
      return req.session.save((err) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.redirect("/");
      });

    } catch (err) {
      console.error("Error in signup:", err);
      return res.status(500).render("auth/signup.ejs", {
        pageTitle: "Signup",
        isLoggedIn: false,
        errorMessage: ["An error occurred during signup"],
        oldInput: { firstName, lastName, email, password, userType },
        user:{}
      });
    }
  },
];
