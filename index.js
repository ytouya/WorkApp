// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/times', (req, res) => res.send(countHitsuji())) // ←追記
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  // ↓追記：countHitsuji()
  countHitsuji = () => {
    let result = ''
    const times = process.env.TIMES || 5
    for (i = 0; i < times; i++) {
      // result += i + ' '
      result += '羊が' + i + '匹 '
    }
    return result;
  }