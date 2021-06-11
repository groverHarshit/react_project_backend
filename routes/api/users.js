const express = require('express');
const router = express.Router();

/*
    * @route /api/users
    * @desc test route
    * @access public
*/

router.get('/', (req, res) => res.status(200).json({ success: true, msg: "Hello World" }));

module.exports = router;