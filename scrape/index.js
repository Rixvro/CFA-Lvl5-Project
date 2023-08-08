const express = require("express");
const app = express();
const FS = require('fs');

app.get('/', function (req, res) { // runs http://localhost:3000/
  res.sendFile(__dirname + '/index.html'); // change the path to your index.html
});

const axios = require("axios");
const cheerio = require("cheerio");

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

async function getLink(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    // console.log($)
    // let html = $('#product-grid .grid__item .card-information__text a') // different for all websites svalva https://svala.co
    // let html = $('#product-grid .grid__item-plp .card__headng a') // different for all websites lucy and yak https://lucyandyak.com
    // let html = $('.product-grid .product .pdp-link a') https://www.patagonia.com
// .search-results .results-grid .product-cell

    let html = $('')
    // console.log(html)
    let links = []
    html.each((index, value) => {
      // if (!links.includes('https://kuyichi.com/' + $(value).attr("href")))
      links.push('https://www.everlane.com' + $(value).attr("href"))
    // }
    })
    console.log(links)
     return links
  }
  catch (err) {
    console.log(err);
  }
}
// getLink("https://www.theory.com/mens-view-all/")
// getLink("https://svala.co/collections/shop")
// getLink("https://lucyandyak.com/en-us/collections/shop-everything")
// getLink("https://www.everlane.com/collections/mens-bestsellersv2")


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
      // console.log(info)
      FS.writeFile ("scrape2.json", JSON.stringify(info), function(err) {
        if (err) throw err;
        // console.log('complete');
        }
      );
      return info
    })
  } catch (e) {
    console.log(e);
  }
}

async function getData2(url) {
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
          // product_price: $("meta[property='og:price:amount']").attr('content')
          product_price: $(".prices .price .sales span").attr('content')
        }
        info.push(structuredData)
      } catch (e) {
        console.log(e);
      }
      // console.log(info)
      FS.writeFile ("scrape3.json", JSON.stringify(info), function(err) {
        if (err) throw err;
        // console.log('complete');
        }
      );
      return info
    })
  } catch (e) {
    console.log(e);
  }
}


// getData2("https://www.theory.com/mens-view-all/")


// getData("https://lucyandyak.com/en-us/collections/shop-everything")
// https://lucyandyak.com/en-us/collections/shop-everything

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})