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
      items = data.items;
      updateItemList(items);
    })
    .catch(error => console.log(error));

  async function fetchItems() {
    const response = await fetch(itemsURL);
    const data = await response.json();
    return data;
  }

  function createItem(imageUrl, itemName, itemPrice,desc,website,storename) {
    const imageBox = document.createElement('img');
    const column = document.createElement('div');
    const itemNameElement = document.createElement('a');
    const itemPriceElement = document.createElement('p');

    column.classList.add('col');
    imageBox.classList.add('image-box');
    imageBox.src = imageUrl;
    imageBox.style.objectFit = 'contain';
    itemNameElement.textContent = itemName;
    itemPriceElement.textContent = `Price: $${parseInt(itemPrice)}`;
    itemNameElement.href="#"
    column.appendChild(imageBox);
    column.appendChild(itemNameElement);
    column.appendChild(itemPriceElement);
    imageList.appendChild(column);
    itemNameElement.addEventListener('click',function(){
      itemNameElement.addEventListener('click', function() {
        // Pass the item information to the shop-item.html page
        const shopitempage = `../shop-item/shop-item.html?name=${encodeURIComponent(itemName)}&price=${encodeURIComponent(itemPrice)}&desc=${encodeURIComponent(desc)}&image=${encodeURIComponent(imageUrl)}&website=${encodeURIComponent(website)}&storename=${encodeURIComponent(storename)}`;
        window.location.href = shopitempage;
      });
    });
  }

  function updateItemList(items) {
    imageList.innerHTML = '';
    items.forEach(item => {
      const imageUrl = item.product_img;
      const itemName = item.product_name;
      const itemPrice = item.product_price;
      const itemDesc=item.product_desc
      const website=item.website
      createItem(imageUrl, itemName, itemPrice,itemDesc,website,item.store_name);
    });
  }

  const sortByDropdown = document.getElementById('sortByDropdown');
  const sortByPriceDescButton = document.getElementById('sortByPriceDesc');
  const sortByPriceAscButton = document.getElementById('sortByPriceAsc');
  const sortByNameAscButton = document.getElementById('sortByNameAsc');
  let CurrentSelection=""

  if (sortByPriceDescButton) {
    sortByPriceDescButton.addEventListener('click', function() {
      items.sort((a, b) => b.product_price - a.product_price); // Corrected property name
      updateItemList(items);
      if (sortByDropdown) {
        sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
        CurrentSelection=this.textContent
      }
    });
  }
  
  if (sortByPriceAscButton) {
    sortByPriceAscButton.addEventListener('click', function() {
      items.sort((a, b) => a.product_price - b.product_price); // Corrected property name
      updateItemList(items);
      if (sortByDropdown) {
        sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
        CurrentSelection=this.textContent
      }
    });
  }
  

  if (sortByNameAscButton) {
    sortByNameAscButton.addEventListener('click', function() {
      items.sort((a, b) => a.product_name.localeCompare(b.product_name));
      updateItemList(items);
      if (sortByDropdown) {
        sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
        CurrentSelection=this.textContent
      }
    });
  }

  // Toggle Search Bar
  // Search Functionality
// Search Functionality
const searchInput = document.getElementById('search-input');
const searchContainer = document.getElementById('expanded-search'); // Moved the search container outside of the event listener
function UpdateSort(){
  if (CurrentSelection==sortByPriceAscButton.textContent){
    sortByPriceAscButton.click()
  }
}


function updateSortByDropdown(selection) {
  if (sortByDropdown) {
    sortByDropdown.textContent = selection;
    CurrentSelection = selection;
  }
}

// Search Functionality
// ...

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === '') {
    updateItemList(items); // Reset to show all items
  } else {
    const filteredItems = items.filter(item =>
      item.product_name.toLowerCase().includes(searchTerm)
    );
    updateItemList(filteredItems);

    // Update the "Sort By" dropdown based on the current sorting criteria
    updateSortByDropdown(CurrentSelection);
  }
});

// Toggle Search Bar
const searchButton = document.querySelector('.fa-magnifying-glass');

searchButton.addEventListener('click', function() {
  UpdateSort()
  
  
  searchContainer.classList.toggle('active');
});



});
