const pool = require('./db-setup');

async function getAllCards() {
  const res = await pool.query('SELECT * FROM cards');
  return res.rows; 
}

async function getCardById(id) {
  const cardId = parseInt(id, 10); 
  const res = await pool.query('SELECT * FROM cards WHERE id = $1', [cardId]);
  return res.rows[0]; 
}


async function createGiftedCard({ title, message, urlSlug, image }) {
  const query = `
    INSERT INTO giftedCards(title, message, url_slug, image)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [title, message, urlSlug, image];
  
  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

async function getGiftedCardBySlug(urlSlug) {
  const res = await pool.query('SELECT * FROM giftedCards WHERE url_slug = $1', [urlSlug]);
  return res.rows[0]; 
}

module.exports = { getAllCards, getCardById, createGiftedCard, getGiftedCardBySlug };
