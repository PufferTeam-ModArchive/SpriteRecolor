const sharp = require('sharp');

const types = [
  "sacredoak", "cherry", "dark", "fir", "ethereal", "magic", "mangrove", "palm", "redwood", "willow", "bamboo", "pine", "hellbark", "jacaranda", "mahogany"
]

async function resizeImage(overlay, type) {
  try {
    await sharp('boat-overlay/' + type + '_boat.png') // Load the input image
      .composite([{ input: overlay }])
      .toFile('boat/' + type + '_chest_boat.png');
    console.log('boat/' + type + '.png');
  } catch (error) {
    console.error('Error adding overlay to image:', error);
  }
}
types.forEach((value) => {
  resizeImage("boat.png", value);
})