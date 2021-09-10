
const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express();

//Define paths for Express config
const pub_dir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set hanndle bar negine and views location
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(pub_dir))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Akash"
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about me",
        name:"akash"
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        description:"about me about meabout meabout meabout meabout meabout meabout me ",
        title:'akash',
        name:'andrew',
        
    });
})
 

//not required
// app.get('',(req, res)=>{
//     res.send('<h1>Welcome to express</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:"andrew",
//         age:27
//     });
// })

// for sending array of objects
// app.get('/help',(req,res)=>{
//  res.send([{
    //     name:"akash"
    // },{
    //     age:27
    // }]);
// })

// app.get('/about',(req,res)=>{
//     res.send('<h2>This is the about page</h2>');
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address"
        })
    }

    geocode(req.query.address,(error, {location}={})=>{
        if(error){
            return res.send({
                error
            })   
        }
        weather(location,(error,{result})=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: result,
                address: location
            })
        })
    })
    
    // res.send({
    //     location:"Punjab",
    //     adress: req.query.address
    // });
})




app.get('/products',(req,res)=>{
    if(!req.query.search){
         return res.send({
            error:"please provide search"
        })
    }
    
    console.log(req.query.search)
    
    res.send({
        products: [],
    });
})



app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'akash',
        errorMessage:'Yoy are at the wrong URL of the help section',
    })
})

// "*" means match anything we have matched so far
app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage:'This is an error message',
        name:'Akash'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server started');
})