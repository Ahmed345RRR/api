import express from 'express'
import axios from 'axios'
import Cheerio  from 'cheerio'

const app = express();
const port =3000 ;
const All_data = [];
async function scraping(){
    const response = await axios.get('https://www.hespress.com/');
    const data = response.data ;
    const $ = Cheerio.load(data);
    $('div.col-12').each((i , elements)=>{
         const links = $(elements).find("a.stretched-link").attr('href');
         const image = $(elements).find("img.img-fluid").attr('src');
         const title = $(elements).find("h3.card-title").text();
         const date = $(elements).find("small.text-muted").text();

         const obj ={
            links ,
            image ,
            title ,
            date
         }
         All_data.push(obj);
    })
}
scraping();
// routes
app.get('/',async (req , res)=>{
   return res.json(All_data)
})


app.listen(port , ()=> console.log('server runing ...'));
