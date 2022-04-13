const express = require('express')
const userModel = require('../models/UserModel')
const {
    verify_token,
    verifytokenandauthorization,
  } = require("./autentication");

const router = express.Router()

router.get('/', verify_token, (req,res) => {
    res.status(200).send('Welcome User')
})


router.get('/:id', verifytokenandauthorization, (req,res) => {
    res.status(200).send(`welcome user ${req.params.id}`)
})

module.exports = router



