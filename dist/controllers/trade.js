const express = require('express');
const trade = require('./../helpers/trade_db');
const router = express.Router();


router.get('/:id', (req,res) => {
  trade.show(req.params.id).then((data)=> {
    res.send({user:data});
  })
});


module.exports = router;
