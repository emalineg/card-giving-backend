const pool = require('./db-setup');

async function createTable() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const createCardsTableQuery = `
      CREATE TABLE IF NOT EXISTS cards (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
      );
    `;
    await client.query(createCardsTableQuery);

    const createGiftedCardsTableQuery = `
      CREATE TABLE IF NOT EXISTS giftedCards (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL, 
        url_slug VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        comments TEXT[]
      );
    `;
    await client.query(createGiftedCardsTableQuery);

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function populateCards() {
  const cards = [
    { name: 'Congrats', image: 'congrats-card.png' },
    { name: 'Happy Bday', image: 'happybday-card.png' },
    { name: 'Happy Holidays', image: 'holidays-card.png'},
    { name: 'Thanks', image: 'thanks-card.png'},
    { name: 'Valentines Day', image: 'vday-card.png'},
    { name: 'Low Effort Meme Card', image: 'yaycard.jpg'},
  ];

  try {
    for (const card of cards) {
      const query = 'INSERT INTO cards (name, image) VALUES ($1, $2)';
      await pool.query(query, [card.name, card.image]);
    }
    console.log('Cards have been populated successfully.');
  } catch (err) {
    console.error('Error populating cards:', err);
  } finally {
    await pool.end();
  }
}

async function main() {
  await createTable(); 
  await populateCards(); 
}

main();
