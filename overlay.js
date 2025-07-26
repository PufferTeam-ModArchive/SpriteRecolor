const sharp = require('sharp');

const types = [
  "default",
  "blinds",
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

const types2 = [
  "crate-ctm",
  "crateex-ctm",
  "crate-fancy-ctm",
  "fancy-ctm",
  "large-ctm",
  "panel-nails-ctm",
  "parquet-ctm"
]

const types3 = [
  "chaotic-v9",
  "chaotic-hor-v9"
]

const planks = new Map();

plank('sacredoak', 'sacred.png', 'sacred2.png', 'sacred3.png');

function plank(name, overlay, overlay2, overlay3) {
  planks.set(name, { overlay: overlay, overlay2: overlay2, overlay3: overlay3 });
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

  types2.forEach((type, i) => {
    resizeImage(key, map.overlay2, type);
  })

  types3.forEach((type, i) => {
    resizeImage(key, map.overlay3, type);
  })
})