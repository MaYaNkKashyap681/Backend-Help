const express = require("express");
const router = express.Router();
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({
        msg: "Filds cannot be empty!!!!!",
      });
    }

    const userexist = await userModel.findOne({ email: email });

    if (userexist) {
      res.status(400).send("user already exist");
    } else {
      let password2 = await bcrypt.hash(password, 10);
      const createuser = userModel.create({
        name: name,
        email: email,
        password: password2,
      });

      if (createuser) {
        res.status(200).json({
          msg: "User is Registered",
        });
      } else {
        res.status(400).json({
          msg: "Fault is there cannot register",
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userexist = await userModel.findOne({
      email: email,
    });

    if (!userexist) {
      res.status(400).json({
        msg: "User Does not exist",
      });
    } else {
      const isMatch = bcrypt.compare(password, userexist.password);

      if (isMatch) {
        const token = jwt.sign({ id: userexist._id }, "HelloBaby");
        const { password, ...others } = userexist._doc;
        res.status(200).send({ ...others, token });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
