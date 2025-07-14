const sharp = require('sharp');

const types = [
  "default",
  "blinds",
  "chaotic",
  "chaotic-hor",
  "clean",
  "crate",
  "crateex",
  "crate-fancy",
  "double-side",
  "double-top",
  "fancy",
  "large",
  "panel-nails",
  "parquet",
  "short",
  "vertical",
  "vertical-uneven"
]

const planks = new Map();

plank('sacredoak', 'sacred.png');

function plank(name, overlay) {
  planks.set(name, { overlay: overlay });
}

async function resizeImage(name, overlay, type) {
  try {
    await sharp('planks-overlay-' + name + '/' + type + '.png') // Load the input image
    .composite([{ input: overlay }])
    .toFile('planks-' + name + '/' + type + '.png');
    console.log('planks-' + name + '/' + type + '.png');
  } catch (error) {
    console.error('Error adding overlay to image:', error);
  }
}
planks.forEach((value, key) => {
  let map = planks.get(key);
  types.forEach((type, i) => {
    resizeImage(key, map.overlay, type);
  })
})