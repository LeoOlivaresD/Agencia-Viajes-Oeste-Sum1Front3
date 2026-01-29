const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudesController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, solicitudesController.getSolicitudes);
router.post('/', authMiddleware, solicitudesController.createSolicitud);
router.get('/:id', authMiddleware, solicitudesController.getSolicitudByIdController);

module.exports = router;