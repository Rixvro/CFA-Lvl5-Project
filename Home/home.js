document.addEventListener("DOMContentLoaded", function() {
    fetch('./photos.json')
      .then(response => response.json())
      .then(data => {
        const imageList = document.getElementById('image-list');
        data.photos.forEach(photo => {
          const imageBox = document.createElement('div');
          imageBox.classList.add('image-box');
          imageBox.style.backgroundImage = `url(${photo})`;
          imageList.appendChild(imageBox);
        });
      })
      .catch(error => console.log(error));
  });