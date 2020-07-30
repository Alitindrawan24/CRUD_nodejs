const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'example_db'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil');
});

app.use(bodyParser.json());
app.listen(4000, () => console.log('Server berjalan di port 4000'));
app.use(express.static('public'));

app.get('/read',(req, res) => {

  let sql = "SELECT * FROM users";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

app.post('/api', (req, res) => {
  let action = req.body.action;
  let data = {name: req.body.name, email: req.body.email};
  let sql;  

  if(action === 'Simpan'){
      sql = "INSERT INTO users SET ?";    
  }else{
      sql = `UPDATE users SET name='`+req.body.name+`', 
              email='`+req.body.email+`'
              WHERE id='`+req.body.id+`';`
  }
    
  let query = conn.query(sql, data,(err, results) => {
     if(err) throw err;
     res.json(results);
  });
});

app.get('/readbyid/:id', async (req, res) =>{
  const id = req.params.id;

  let sql = "SELECT * FROM users WHERE id = "+ id +"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(results);
    });
});

app.get('/hapus/:id', async (req, res) =>{
  const id = req.params.id;  

  let sql = `DELETE FROM users WHERE id = '`+ id +`';`
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.json(results);
    });
});