const express = require('express');
const router = express.Router();

router.use(function timeLog (req, res, next) {
    console.log('Time : ' + Date(Date.now).toString())
    next()
})

router.get("/about", function(req, res){
    res.send("This is About Page. Website made by Hugo Alberigo")
})

module.exports = router