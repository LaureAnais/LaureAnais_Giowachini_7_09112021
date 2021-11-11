const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models')
const config = require('./config/config')


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json);
app.use(cors());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/images', express.static(path.join(__dirname, 'images')));

require('./routes')(app)

sequelize.sync()
.then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
})
