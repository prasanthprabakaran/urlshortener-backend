import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
const app = express();
import connectDB from './config/db.js';
import UrlModel from './models/urlshortener.js'
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', "ejs");
dotenv.config();
connectDB();
const PORT = process.env.PORT || 4000;


app.get('/',(req,res)=>{
    let allUrl = UrlModel.find((err, result)=>{
        res.render('home',{
            urlResult: result 
        })
    })
})

app.post('/create',(req,res)=>{
    let urlShort = new UrlModel({
        longUrl: req.body.longurl,
        shortUrl: generateUrl()
    })

    urlShort.save((err,data)=>{
        if (err) throw err;
        res.redirect('/');
    })
});

app.get('/:urlId', (req,res)=>{
    UrlModel.findOne({ shortUrl: req.params.urlId},(err,data)=>{
        if (err) throw err;

        UrlModel.findByIdAndUpdate({ _id: data.id }, {$inc: {clickCount: 1}},(err,data)=>{
            if (err) throw err;
            res.redirect(data.longUrl)
        })
    })
})

app.get('/delete/:id', (req,res)=>{
    UrlModel.findByIdAndDelete({_id:req.params.id},(err,deleteData)=>{
        if(err) throw err;
        res.redirect('/')
    })
})

const generateUrl =()=>{
    var rndResult = '';
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < 6; i++) {
        rndResult += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return rndResult;
}

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


