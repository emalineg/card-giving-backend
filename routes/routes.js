const express = require('express');
const { fetchAllCards, fetchCardById, pushGiftedCard, fetchGiftedCardBySlug } = require('../controllers/controller.js');
const router = express.Router();

router.get('/cards', fetchAllCards);

router.get('/cards/:id', fetchCardById); 

router.post('/gifted-cards', pushGiftedCard);

router.get('/gifted-cards/:urlSlug', fetchGiftedCardBySlug);


module.exports = router;
