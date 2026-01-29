const express = require('express');
const router = express.Router();
const ssrController = require('../controllers/ssrController');

router.get('/solicitudes', ssrController.renderSolicitudesSSR);

module.exports = router;