// @ts-check
const router = require('express').Router();

router.get('/greet/:id', (req, res) => {
    res.send(`Hello ${req.params.id}!`)
})

module.exports = router;