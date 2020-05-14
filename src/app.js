const express = require('express')
const path = require('path') // ใช้ path ในการไปหาไฟล์อื่นที่ต้องการในโฟลเดอร์อื่นๆ
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const temp = require('./utils/temperature')

console.log(__dirname) // dirname คือ โฟล์เดอร์ปัจจุบันที่ไฟล​์นี้อยู่
// console.log(path.join(__dirname, '../public')) //.. เพื่อถอยไปหลังโฟล์เดอร์ก่อนหน้า

const app = express()
const port = process.env.PORT || 3000 //set port 

// define paths for express config
const pathDirec = path.join(__dirname, '../public') // ถอยแล้วไปpublic forder
const viewsPath = path.join(__dirname, '../templates/views') 
const hbsPath = path.join(__dirname, '/../templates/partials')

// setup handlerbars and view location
app.set('view engine','hbs')
app.set('views' , viewsPath) // set folder views (old name) => templates (new name)
hbs.registerPartials(hbsPath) //กำหนดพาร์ทที่ต้องการ partials  


// Set up static direstory to serve
app.use(express.static(pathDirec)) //run on file in public folder (if you url : index.html => run index.html) (if you input : about.html => run about.html)

// 
app.get('/', (req,res) => { //root website
    res.render('index' , {
        title:'Weather',
        name:'Chadchai'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name:'Chadchai'
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        title:'Help',
        name:'Chadchai'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) { //this is req query! (ต้องป้อนค่า ?address)
        res.send({
            error:'You must provide an address'
        })
    } else {
        const address = req.query.address
        geocode(address,(error, {latitute,longitute,location} = {}) => { // การที่ใส่ {} ด้านหลังobject คือการกำหนดค่าว่างให้มัน
            if (error) {
                return res.send({
                    error:error
                })
            }
            temp(latitute,longitute,(error,{temperature, weather_descriptions} = {}) => {
                if (error) {
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    temperature,
                    weather_descriptions,
                    location,
                    address 
                })

            })
        })
    }
    
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title:'Error 404',
        name: 'Emma',
        error:'Help article not found'
    })
})

app.get('*', (req,res) => { // ใส่อะไรก็ตามที่ไม่ได้กำหนดหลัง / เช่น /me จะขึ้น 404 error
    res.render('error', {
        title:'Error 404',
        name: 'Emma',
        error:'My 404 Error page'
    })
}) 

app.listen(port , () => {
    console.log('server is up on port : '+ port)
})
