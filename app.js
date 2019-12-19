const mongoose = require('mongoose')
const hbs = require('hbs')
const path = require('path')
const express = require('express')
const userRoutes = require('./routes/userRoutes')
const app = express()
const methodOverride = require('method-override')
const cors = require('cors')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost:27017/node-task', { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.");
});


//Define path for Express
app.use(express.static(path.join(__dirname, 'clientPanel')))

//Setup static directory to serve
// app.use(express.static(publicdirpath))

//Setup handlebars engine and views location
// app.set('view engine', 'hbs')
// app.set('views', viewspath)
// hbs.registerPartials(partialspath)

app.use(methodOverride('newMethod'));

app.use('', userRoutes);

app.listen(3000, () => {
    console.log('Server is up at port 3000!')
})
