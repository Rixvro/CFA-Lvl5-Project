document.addEventListener("DOMContentLoaded", function() {
  const photosFolder = './images';
  const imageList = document.querySelector('.imageList');

  fetchPhotos()
    .then(photos => {
      photos.forEach(photo => {
        const imageUrl = photo;
        console.log(imageUrl)
        createImageBox(imageUrl);
      });
    })
    .catch(error => console.log(error));

  async function fetchPhotos() {
    
    const response = await fetch(photosFolder);
    console.log(response)
    const html = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const photoLinks = Array.from(doc.querySelectorAll('a'))
      .map(a => a.getAttribute('href'))
      .filter(link => link.endsWith('.jpg') || link.endsWith('.jpeg') || link.endsWith('.png'));
    return photoLinks;
  }

  function createImageBox(imageUrl) {
    const imageBox = document.createElement('img');
    const column=document.createElement('div')
    column.classList.add('col')
    imageBox.classList.add('image-box');
    imageBox.src=imageUrl
    imageBox.style.objectFit='cover'
    column.appendChild(imageBox)
    imageList.appendChild(column);
  }
});
