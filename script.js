//your code here
document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'img1',
    'img2',
    'img3',
    'img4',
    'img5'
  ];

  // Pick a random image to duplicate
  const randomIndex = Math.floor(Math.random() * images.length);
  images.push(images[randomIndex]);

  // Shuffle the images
  images.sort(() => Math.random() - 0.5);

  const imageContainer = document.getElementById('image-container');

  // Create and append image elements
  images.forEach((imgClass, index) => {
    const img = document.createElement('img');
    img.className = imgClass;
    img.setAttribute('id', `img-${index + 1}`);
    img.addEventListener('click', handleImageClick);
    imageContainer.appendChild(img);
  });
});

let selectedImages = [];

function handleImageClick(event) {
  const img = event.target;

  // If the image is already selected, do nothing
  if (selectedImages.includes(img)) {
    return;
  }

  img.classList.add('selected');
  selectedImages.push(img);

  // Show the reset button
  document.getElementById('reset').style.display = 'block';

  // If two images are selected, show the verify button
  if (selectedImages.length === 2) {
    document.getElementById('verify').style.display = 'block';
  }
}

document.getElementById('reset').addEventListener('click', resetSelection);
document.getElementById('verify').addEventListener('click', verifySelection);

function resetSelection() {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  document.getElementById('reset').style.display = 'none';
  document.getElementById('verify').style.display = 'none';
  document.getElementById('para').textContent = '';
}

function verifySelection() {
  if (selectedImages.length === 2) {
    const [img1, img2] = selectedImages;
    if (img1.className === img2.className) {
      document.getElementById('para').textContent = 'You are a human. Congratulations!';
    } else {
      document.getElementById('para').textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    // Hide the verify button after verification
    document.getElementById('verify').style.display = 'none';
  }
}