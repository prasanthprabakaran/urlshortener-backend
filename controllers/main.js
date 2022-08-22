import UrlModel from "../models/urlshortener.js";

// Create Url

export async function create(req,res){
    const {longUrl,shortUrl} = req.body;
    try {
        const urlShort = await new UrlModel({
            longUrl: req.body.longurl,
            shortUrl: generateUrl()
        })
    
        urlShort.save((err,data)=>{
            if (err) throw err;
            res.redirect('/');
        })
    } catch (error) {
        console.error();
    }
}
