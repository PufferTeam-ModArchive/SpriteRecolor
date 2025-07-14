const sharp = require('sharp');

const types = [
  "ingot",
  "nugget",
  "dust",
  "gear",
  "plate",
  "ingot2",
  "pickaxe",
  "axe",
  "helmet",
  "chestplate",
  "leggings",
  "boots",
  "shovel",
  "sword",
  "hoe",
  "saw",
  "chisel",
  "chisel_head",
  "layer_1",
  "layer_2"
]

const metals = new Map();

metal('thaumium', 88, 74, 137, 0.6, 1, 0.5);
metal('osmium', 168, 181, 204, 1.2, 1, 1);
metal('manasteel', 51, 137, 255, 1, 1, 1);
metal('terrasteel', 61, 190, 0, 1, 1, 1);
metal('elementium', 237, 51, 154, 1, 1, 1);
metal('bronze', 143, 76, 38, 1, 1, 1);
metal('iron', 216, 216, 216, 1.1, 1, 0.8);
metal('steel', 102, 102, 102, 0.8, 1, 0.5);
metal('gold', 255, 227, 11, 1.2, 1, 1);
metal('diamond', 74, 237, 209, 1.2, 1, 1);
metal('flint', 51, 51, 51, 0.4, 1, 0.1);

function metal(name, r, g, b, brightness, saturation, lightness) {
  metals.set(name, { r: r, g: g, b: b, brightness: brightness, saturation: saturation, lightness: lightness });
}

async function resizeImage(name, r, g, b, brightness, saturation, lightness, type) {
  let fileDir = 'metal-example-output/' + name + '_' + type + '.png';
  let fileDir2 = 'metal-example-output/' + name + '_' + type + '_fixed.png';
  let fileInput = 'metal-example/' + type + '.png';
  try {
    await sharp(fileInput) // Load the input image
      .tint({ r: r, g: g, b: b }) // Tint
      .modulate({
        brightness: brightness,
        saturation: saturation,
        lightness: lightness
      })
      .toFile(fileDir);
    console.log(fileDir);
  } catch (error) {
    console.error('Error coloring image:', error);
  }

  if (type == "pickaxe" || type == "axe" || type == "sword" || type == "shovel" || type == "hoe" || type == "saw" || type == "chisel") {
    let overlay = 'metal-overlay/' + type + '.png'
    try {
      await sharp(fileDir) // Load the input image
        .composite([{ input: overlay }])
        .toFile(fileDir2);
      console.log(fileDir2);
    } catch (error) {
      console.error('Error overlay image:', error);
    }
  }
}

metals.forEach((value, key) => {
  let map = metals.get(key);
  types.forEach((type, i) => {
    resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type);
  })
})
