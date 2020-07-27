const express = require('express')
const app = express()
const port = 4842;
const request = require('request');
const cors = require('cors');
const db = (require('./db'));

app.use(cors())

const teamNamesInObject = {
  'Cleveland_Indians': 'CLE',
  'New_York_Yankees': 'NYY',
  'Toronto_Blue_Rays': 'TOR',
  'Tampa_Bay_Rays': 'TB'
}



app.get('/', (req, res) => res.send('Hello World!'))


//route that requests depth chart information
app.get('/depth/:team', (req, res) => {

  var team = teamNamesInObject[req.params.team]
  console.log(team)

  db.query(`select queries from queries where TeamName="${team}"`, function (error, results, fields) {
    if (error) throw error;
    db.query(`update queries set queries=${results[0].queries + 1} where TeamName="${team}";`)
  })

  request(`https://fantasybaseballnerd.com/service/depth/${team}`, function (error, response, body) {
    if (error) throw error;
    res.send(body);
  })

})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10
// }