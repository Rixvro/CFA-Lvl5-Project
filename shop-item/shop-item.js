document.addEventListener("DOMContentLoaded", function() {
  const productImgElement = document.querySelector("Img");
  const productNameElement=document.getElementById("Title")
  const productPriceElement=document.getElementById("Price")
  const productWebsiteNameElement=document.getElementById("Website")
  const productWebisteButton=document.getElementById("WebsiteButton")
  const urlParams = new URLSearchParams(window.location.search);
  const DescElement=document.getElementById("Desc")
  function isValidUrl(url) {
    const urlPattern = new RegExp(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
    );
    return urlPattern.test(url);
  }
  const itemImage = urlParams.get('image')
  const itemName = urlParams.get('name').replace(".", "")
  const itemPrice="$"+urlParams.get('price')
  const websiteParam = urlParams.get('website');
  const StoreName = urlParams.get('storename')
  const Desc=urlParams.get('desc')
  let websiteUrl
 
  if (isValidUrl(websiteParam)){
    websiteUrl=new URL(websiteParam); websiteName = websiteUrl.hostname;;
  }else{websiteUrl="#" ;websiteName="null"}
  
  productWebsiteNameElement.textContent="Seller: "+StoreName
  productNameElement.textContent=itemName;  
  productImgElement.src = itemImage;
  DescElement.textContent=Desc
  productPriceElement.textContent=itemPrice
  productWebisteButton.addEventListener("click",function(){
    window.location.href=websiteUrl
  })
});
