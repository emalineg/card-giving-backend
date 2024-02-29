const { getAllCards, getCardById, createGiftedCard, getGiftedCardBySlug} = require('../db/database.js');


async function fetchAllCards(req, res) {
    try {
        const cards = await getAllCards();
        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).send('Server error');
    }
}

async function fetchCardById(req, res) {
  try {
    const card = await getCardById(req.params.id);
    if (card) {
      res.json(card);
    } else {
      res.status(404).send('Card not found');
    }
  } catch (error) {
    console.error('Error fetching card by ID:', error);
    res.status(500).send('Server error');
  }
}

async function pushGiftedCard(req, res) {
  try {
    const newCard = await createGiftedCard(req.body);
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error creating gifted card:', error);
    res.status(500).send('Server error');
  }
}

async function fetchGiftedCardBySlug(req, res) {
  try {
    const card = await getGiftedCardBySlug(req.params.urlSlug);
    if (card) {
      res.json(card);
    } else {
      res.status(404).send('Card not found');
    }
  } catch (error) {
    console.error('Error fetching gifted card by ID:', error);
    res.status(500).send('Server error');
  }
}
module.exports = { fetchAllCards, fetchCardById, pushGiftedCard, fetchGiftedCardBySlug };
