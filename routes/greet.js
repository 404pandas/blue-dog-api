// importing packages
const express = require("express");
const router = express.Router();

// Get request
router.get(`/`, function (req, res) {
  res
    .status(200)
    .json({ msg: `If your friend wants data, she's gotta GET for data.` });
});

// Post Request
router.post(`/`, function (req, res) {
  res
    .status(200)
    .json({
      msg: `Leave them alone! They’re just trying to run a POST request.`,
    });
});

// Put Request
router.put(`/`, function (req, res) {
  res.status(200).json({ msg: `It’s called a tactical PUT request.` });
});

// Delete Request
router.delete(`/`, function (req, res) {
  res
    .status(200)
    .json({
      msg: `This is what happens when you're unhappy with what you've got; someone's husband eventually gets a DELETE request.`,
    });
});

module.exports = router;
