const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const userRoute=require('./routes/user')

const sequelize=require('./utils/database')
var cors=require('cors')


const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(bodyParser.json({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoute)


sequelize.sync().then((result)=>{
    // console.log(result)
    app.listen(3000);
}).catch((err)=>{
    console.log(err)
})


