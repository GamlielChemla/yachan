let express = require('express')
let mysql = require('mysql');
let app = express();

const port = 5000;

let myDB = {
  host: 'localhost',
  user: 'root',
  password: 'rina3004',
  database: "risk"
};

const connectDb = (db) => {
  console.log("good job");
  return mysql.createConnection(db)

}
const myPromiseFunc = (myRequstt, db) => {

  return new Promise((resolve, reject) => {
    const myConect = connectDb(db);
    myConect.connect((err) => {
      if (!err) {
        console.log("connect");
      }
    });

    myConect.query(myRequstt, (err, result, files, rows) => {
      if (!err) {
        resolve(result)

      } else {
        reject();
      }
    })
  })
}
app.get('/a', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Max-Age', 86400)
  res.header('Access-Control-Allow-Headers', '*');

  let sql = "SELECT * FROM test";
  
  myPromiseFunc(sql, myDB)
  .then((result) => {
    res.send(result)
  })
    .catch(() => {
      console.log("ya ala");
    })
})

app.listen(port, () => console.log(`server ${port}`))
