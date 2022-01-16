const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');

var resultMenu = [];

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true,
  ssl: { rejectUnauthorized: false },
  ssl: { 
    sslmode: 'require',
    rejectUnauthorized: false
  }
});
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', async (req, res) => {
 
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM menu');

      for(var i = 0; i < result.rows.length; i++){
        resultMenu[i] = result.rows[i].menu_name;
      }
      res.render('pages/index', {
        resultMenu : resultMenu,
      });
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))