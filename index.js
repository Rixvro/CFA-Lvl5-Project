function getImageNameFromUrl(imageUrl) {
  const urlParts = imageUrl.split('/');
  const imageNameWithExtension = urlParts[urlParts.length - 1];
  const imageName = imageNameWithExtension.split('.')[0];
  return imageName;
}

document.addEventListener("DOMContentLoaded", function() {
  const itemsURL = '../items.json';
  const imageList = document.querySelector('.imageList');
  let items = [];

  fetchItems()
    .then(data => {
      items = data.items[0].items;
      updateItemList(items);
    })
    .catch(error => console.log(error));

  async function fetchItems() {
    const response = await fetch(itemsURL);
    const data = await response.json();
    return data;
  }

  function createItem(imageUrl, itemName, itemPrice,desc,website) {
    const imageBox = document.createElement('img');
    const column = document.createElement('div');
    const itemNameElement = document.createElement('a');
    const itemPriceElement = document.createElement('p');

    column.classList.add('col');
    imageBox.classList.add('image-box');
    imageBox.src = imageUrl;
    imageBox.style.objectFit = 'cover';
    itemNameElement.textContent = itemName;
    itemPriceElement.textContent = `Price: $${itemPrice.toFixed(2)}`;
    itemNameElement.href="#"
    column.appendChild(imageBox);
    column.appendChild(itemNameElement);
    column.appendChild(itemPriceElement);
    imageList.appendChild(column);
    itemNameElement.addEventListener('click',function(){
      itemNameElement.addEventListener('click', function() {
        // Pass the item information to the shop-item.html page
        const shopitempage = `../shop-item/shop-item.html?name=${encodeURIComponent(itemName)}&price=${encodeURIComponent(itemPrice.toFixed(2))}&desc=${encodeURIComponent(desc)}&image=${encodeURIComponent(imageUrl)}&website=${encodeURIComponent(website)}`;
        window.location.href = shopitempage;
      });
    });
  }

  function updateItemList(items) {
    imageList.innerHTML = '';
    items.forEach(item => {
      const imageUrl = item.imgpath;
      const itemName = item.name;
      const itemPrice = item.price;
      createItem(imageUrl, itemName, itemPrice,item.desc,item.website);
    });
  }

  const sortByDropdown = document.getElementById('sortByDropdown');
  const sortByPriceDescButton = document.getElementById('sortByPriceDesc');
  const sortByPriceAscButton = document.getElementById('sortByPriceAsc');
  const sortByNameAscButton = document.getElementById('sortByNameAsc');

  if (sortByPriceDescButton) {
    sortByPriceDescButton.addEventListener('click', function() {
      items.sort((a, b) => b.price - a.price);
      updateItemList(items);
      if (sortByDropdown) {
        sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
      }
    });
  }

  if (sortByPriceAscButton) {
    sortByPriceAscButton.addEventListener('click', function() {
      items.sort((a, b) => a.price - b.price);
      updateItemList(items);
      if (sortByDropdown) {
        sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
      }
    });
  }

  if (sortByNameAscButton) {
    sortByNameAscButton.addEventListener('click', function() {
      // Implement sorting by name (A to Z) logic here
      updateItemList(items);
      if (sortByDropdown) {
        sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
      }
    });
  }

  // ... other code ...
  let input = document.querySelector("#search-input")
  let srcBtn = document.querySelector("#search-button button")
  srcBtn.addEventListener('click', ()=> {
    console.log(input.value) // if empty string do nothoing
    let search = input.value.trim()
    if(search !== '') {
      let searchRes = items.filter(item => item.name.includes(search)) // change name to objects key
      updateItemList(searchRes)
    }
  })
});
