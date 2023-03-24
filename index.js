const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./src/utils/forecast')

const { request } = require('express')
const geocode = require('./src/utils/geocode')

const app = express()
const port = process.env.PORT || 3002


// Define paths for express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewspath = path.join(__dirname, './templates/views')
const partialspath = path.join(__dirname, './templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

// app.use - customize your server. // static take the path we want to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Komal Amrutkar'
    }) // we can render one of our handlebar templates. Just need to match up the names.
    // No need to specify index.html or hbs
})

// this specifies when someone tries to get the url. May be we should send back html or JSON 
// callback will describe what should send back to request
// req and resp will descrive what should send back to requester
// .get('') - empty colon describes root path

app.get('/help', (req, res) => {
    res.render( 'help', {
        helpText: 'This is something useful',
        title: 'help',
        name: 'Komal Amrutkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Komal Amrutkar'
    }) 
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You must provide an address'
        })
    }

    let processRES = (error,{ latitude, longitude, location }) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) =>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })

    }

    geocode(req.query.address, processRES)
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // or you can simply write the else code
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
}) // start the server and its gonna listen 