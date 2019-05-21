const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils_api/geocode')
const weather = require('./utils_api/weather') 
const fs = require('fs')
const https = require('https')

const app = express()

// port 3000
const port = process.env.PORT || 3000; 

// directory paths
const public_path = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../pages/views')
const partial_path = path.join(__dirname, '../pages/partials')

// Configration handlebar engine and views location
app.set('views', views_path)
app.set('view engine','hbs')
hbs.registerPartials(partial_path)

// Configration static public directory
app.use(express.static(public_path))
 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Tofig Bakhshiyev'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tofig Bakhshiyev'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tofig Bakhshiyev'
    })
})

app.get('/weather', (req, res) => {
    // if address does not exist
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }
    //address for example Baku                  //destructuring = {} empty
    geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
        if (error) {
            // always return error
            return res.send({ error })
        } 
        weather(latitude, longitude, (error, Weather_data)=>{
            if (error) {
                // always return error
                return res.send({ error })
            } 
            res.send({
                weather: Weather_data,
                location: location,
                address: req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => { 
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tofig Bakhshiyev',
        errorMessage: 'Help relate page not found!'
    })
})

// * match anything
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tofig Bakhshiyev',
        errorMessage: 'Page not found!'
    })
})


app.listen(port, ()=>{
    console.log('Server is up on port:' + port);
    console.log('Link http://localhost:'+ port);
})

// https configuration
/* https.createServer({
    key: fs.readFileSync(path.join(__dirname,'../keys/server.key')),
    cert: fs.readFileSync(path.join(__dirname,'../keys/server.cert'))
  }, app).listen(port, () => {
    console.log('Server is up on port' + port);
    console.log('Link http://localhost:'+ port);
}) */