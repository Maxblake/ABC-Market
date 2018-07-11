const express = require ('express');
let router = express.Router();

router.use('/',require('./session'));
router.use('/product',require('./product'));
router.use('/chat', require('./chat'));
router.use('/trade',require('./trade'));

router.use('/product/article',require('./products/article'));
router.use('/product/offer',require('./products/offer'));
router.use('/product/place', require('./products/place'));
router.use('/product/vehicle',require('./products/vehicle'));
router.use('/product/service',require('./products/service'));

module.exports = router;
