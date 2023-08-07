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
<<<<<<< Updated upstream
      items = data;
=======
      items = data.items[0].items;
>>>>>>> Stashed changes
      updateItemList(items);
    })
    .catch(error => console.log(error));

  async function fetchItems() {
    const response = await fetch(itemsURL);
    const data = await response.json();
<<<<<<< Updated upstream
    const items = data.items;
    return items;
  }

  function createItem(imageUrl, itemName, itemPrice) {
    const imageBox = document.createElement('img');
    const column = document.createElement('div');
    const itemNameElement = document.createElement('p');
=======
    return data;
  }

  function createItem(imageUrl, itemName, itemPrice,desc,website) {
    const imageBox = document.createElement('img');
    const column = document.createElement('div');
    const itemNameElement = document.createElement('a');
>>>>>>> Stashed changes
    const itemPriceElement = document.createElement('p');

    column.classList.add('col');
    imageBox.classList.add('image-box');
    imageBox.src = imageUrl;
    imageBox.style.objectFit = 'cover';
    itemNameElement.textContent = itemName;
    itemPriceElement.textContent = `Price: $${itemPrice.toFixed(2)}`;
<<<<<<< Updated upstream

=======
    itemNameElement.href="#"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      createItem(imageUrl, itemName, itemPrice);
=======
      createItem(imageUrl, itemName, itemPrice,item.desc,item.website);
>>>>>>> Stashed changes
    });
  }

  const sortByDropdown = document.getElementById('sortByDropdown');
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  const sortByPriceDescButton = document.getElementById('sortByPriceDesc');
  const sortByPriceAscButton = document.getElementById('sortByPriceAsc');
  const sortByNameAscButton = document.getElementById('sortByNameAsc');

<<<<<<< Updated upstream
  sortByPriceDescButton.addEventListener('click', function() {
    items.sort((a, b) => b.price - a.price);
    updateItemList(items);
    sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
  });

  sortByPriceAscButton.addEventListener('click', function() {
    items.sort((a, b) => a.price - b.price);
    updateItemList(items);
    sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
  });

  sortByNameAscButton.addEventListener('click', function() {
    // Implement sorting by name (A to Z) logic here
    updateItemList(items);
    sortByDropdown.textContent = this.textContent; // Update the "Sort By" button text
  });

  // Add event listeners for other dropdown items if needed
=======
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
>>>>>>> Stashed changes
});
