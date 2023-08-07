const express = require("express");
const app = express();

/*
    website: ,
    store_name:  ,
    product_name: ,
    product_img: ,
    product_desc: ,
    product_price:

    example:

  {
    website: 'https://svala.co/products/sara-chain-wallet-purse-black-pinatex',
    store_name: 'Svala ',
    product_name: 'Black Vegan Pinatex Wallet Purse - Sara - Svala',
    product_desc: 'The Sara chain wallet purse in black Pinatex fabric (made from pineapple leaf fiber) is perfect for the girl on the go. This convertible wallet is handcrafted from sustainable, luxurious Italian vegan leather, black embossed faux snakeskin and ready for daily use or evening wear with the detachable strap.',
    product_price: '250.00'
  }
*/


app.get('/', function (req, res) { // runs http://localhost:3000/
  res.sendFile(__dirname + '/index.html'); // change the path to your index.html
});

const axios = require("axios");
const cheerio = require("cheerio");

async function getLink(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let html = $('#product-grid .grid__item .card-information__text a') // different for all websites
    let links = []
    html.each((index, value) => {
      links.push('https://svala.co' + $(value).attr("href")) // diff
    })
     return links
  }
  catch (err) {
    console.log(err);
  }
}

async function getData(url) {
  try {
    let linksArray = await getLink(url)
    let info = []
    linksArray.forEach(async link => {
      try {
        const { data } = await axios.get(link);
        const $ = cheerio.load(data);
        let structuredData = {
          website: link,
          store_name:  $("meta[property='og:site_name']").attr('content'),
          product_name: $("meta[property='og:title']").attr('content'),
          product_img: $("meta[property='og:image']").attr('content'),
          product_desc: $("meta[property='og:description']").attr('content'),
          product_price: $("meta[property='og:price:amount']").attr('content')
        }
        info.push(structuredData)
      } catch (e) {
        console.log(e);
      }
      console.log(info)
      return info
    })
  } catch (e) {
    console.log(e);
  }
}

getData("https://svala.co/collections/shop")

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})