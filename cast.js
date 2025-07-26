const sharp = require('sharp');

const types = [
  "blank", "pickaxe", "shovel", "axe", "hoe", "sword", "saw", "scythe",
  "hammer", "chisel", "helmet", "chestplate", "leggings", "boots", "plate", "rod", "gear"
]

const metals = new Map();

metal('clay', 142, 70, 49, 0.5, 1, 1);
metal('steel', 152, 152, 152, 0.3, 1, 1);

function metal(name, r, g, b, brightness, saturation, lightness) {
  metals.set(name, { r: r, g: g, b: b, brightness: brightness, saturation: saturation, lightness: lightness });
}

async function resizeImage(name, r, g, b, brightness, saturation, lightness, type) {
  let fileDir = 'cast-output/' + type + '_cast_' + name + '.png';
  let fileInput = 'cast-input/' + type + '_cast.png';
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
}

metals.forEach((value, key) => {
  let map = metals.get(key);
  types.forEach((type, i) => {
    resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type);
  })
})
