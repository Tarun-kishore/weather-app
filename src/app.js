require('dotenv').config()
const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use(express.static(path.join(__dirname,'../public')))


app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Tarun Kishore'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Tarun Kishore'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'Tarun Kishore'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must specify a address'})
    }

    forecast(req.query.address,(error,response)=>{
        if(error){
            return res.send(error)
        }

        return res.send(response)
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name:'Tarun Kishore',
        message:'Help article Not Found'
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name:'Tarun Kishore',
        message:'Page Not Found'
    })
})
const port = process.env.PORT|| 3000

app.listen(port,()=>{
    console.log('server is running')
})