const express = require ('express');
const history = require('../helpers/chat_db.js')
const router = express.Router();

router.get('/history/:id', (req, res) => {
  history.show(req.params.id).then(messages => {
    res.send({ 
      status: 200,
      messages
    })
  }).catch(err => {
    console.log(err)
    res.send({ status: 500 })
  })
})

module.exports = router;
