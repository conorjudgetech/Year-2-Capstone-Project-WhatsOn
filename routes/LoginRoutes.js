const express = require('express');
const loginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/:id', loginController.signUp);
router.get('/:id', loginController.deleteAccount);