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

const typesmisc = [
  "sign",
  "sign_entity",
  "stripped_log",
  "stripped_log_top",
  "stripped_log2",
  "boat",
  "boat_entity",
  "barrel_top",
  "barrel_top_open",
  "barrel_side",
  "door_top",
  "door_bottom",
  "door",
  "trapdoor",
  "lumber"
]

const planks = new Map();

plank('oak', 188, 152, 98, 1.2, 0, 20);
plank('acacia', 186, 99, 55, 0.8, 0, 20);
plank('dark-oak', 110, 70, 2, 0.5, 0, 0)
plank('cherry', 121, 10, 21, 0.85, 0, 1);
plank('dark', 71, 61, 76, 0.75, 0, 1);
plank('fir', 150, 141, 116, 1.5, 0, 5);
plank('ethereal', 76, 150, 115, 1.4, 0, 0.8);
plank('magic', 99, 115, 177, 1.2, 0, 0.4);
plank('mangrove', 245, 230, 191, 1.8, 0, 20);
plank('palm', 183, 132, 69, 1.5, 0, 1);
plank('redwood', 156, 79, 54, 1.1, 0, 1);
plank('pine', 134, 107, 79, 1.5, 0, 1);
plank('jacaranda', 191, 160, 147, 1.9, 0, 1);
plank('mahogany', 179, 120, 117, 1.5, 0, 1);
plank('willow', 131, 145, 108, 1.6, 0, 1);
plank('hellbark', 195, 145, 85, 1.5, 0, 1);
plank('bamboo', 186, 205, 113, 1.8, 0, 1);

plank('greatwood', 46, 17, 7, 0.35, 0, 1);
plank('silverwood', 180, 169, 144, 1.8, 0, 20);

function plank(name, r, g, b, brightness, saturation, lightness) {
  planks.set(name, { r: r, g: g, b: b, brightness: brightness, saturation: saturation, lightness: lightness });
}

async function resizeImage(name, r, g, b, brightness, saturation, lightness, type, isChisel) {
  let fileDir = 'planks-example-misc-output/' + name + '_' + type + '.png';
  let fileInput = 'planks-example-misc/' + type + '.png';
  if(isChisel) {
    fileDir = 'planks-' + name + '/' + type + '.png';
    fileInput = 'planks-example/' + type + '.png';
  }
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

planks.forEach((value, key) => {
  let map = planks.get(key);
  types.forEach((type, i) => {
    resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type, true);
  })
  typesmisc.forEach((type, i) => {
    resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type, false);
  })
})

