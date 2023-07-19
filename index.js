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
      items = data;
      updateItemList(items);
    })
    .catch(error => console.log(error));

  async function fetchItems() {
    const response = await fetch(itemsURL);
    const data = await response.json();
    const items = data.items;
    return items;
  }

  function createItem(imageUrl, itemName, itemPrice) {
    const imageBox = document.createElement('img');
    const column = document.createElement('div');
    const itemNameElement = document.createElement('p');
    const itemPriceElement = document.createElement('p');

    column.classList.add('col');
    imageBox.classList.add('image-box');
    imageBox.src = imageUrl;
    imageBox.style.objectFit = 'cover';
    itemNameElement.textContent = itemName;
    itemPriceElement.textContent = `Price: $${itemPrice.toFixed(2)}`;

    column.appendChild(imageBox);
    column.appendChild(itemNameElement);
    column.appendChild(itemPriceElement);
    imageList.appendChild(column);
  }

  function updateItemList(items) {
    imageList.innerHTML = '';
    items.forEach(item => {
      const imageUrl = item.imgpath;
      const itemName = item.name;
      const itemPrice = item.price;
      createItem(imageUrl, itemName, itemPrice);
    });
  }

  const sortByDropdown = document.getElementById('sortByDropdown');

  const sortByPriceDescButton = document.getElementById('sortByPriceDesc');
  const sortByPriceAscButton = document.getElementById('sortByPriceAsc');
  const sortByNameAscButton = document.getElementById('sortByNameAsc');

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
});
