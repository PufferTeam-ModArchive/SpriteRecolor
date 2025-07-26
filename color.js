const sharp = require('sharp');
const fs = require('fs');

const types = [
  "default",
  "blinds",
  "chaotic-v9",
  "chaotic-hor-v9",
  "clean",
  "crate",
  "crate-ctm",
  "crateex",
  "crateex-ctm",
  "crate-fancy",
  "crate-fancy-ctm",
  "double-side",
  "double-top",
  "fancy",
  "fancy-ctm",
  "large",
  "large-ctm",
  "panel-nails",
  "panel-nails-ctm",
  "parquet",
  "parquet-ctm",
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

const typesmisc2 = [
  "desk_bop",
  "table_bop",
  "base"
]

const typesmisc3 = [
  "front_1",
  "front_2",
  "front_4",
  "side",
  "side_h",
  "side_v",
  "sort",
  "trim"
]

const planks = new Map();

plank('oak', 188, 152, 98, 1.2, 0, 20);
plank('sacredoak', 188, 152, 98, 1.2, 0, 20);
plank('acacia', 186, 99, 55, 0.8, 0, 20);
plank('dark-oak', 110, 70, 2, 0.5, 0, 0)
plank('cherry', 121, 10, 21, 0.85, 0, 1);
plank('dark', 92, 75, 109, 0.75, 0, 1);
plank('fir', 150, 141, 116, 1.5, 0, 5);
plank('ethereal', 76, 150, 115, 1.4, 0, 0.8);
plank('magic', 99, 115, 177, 1.2, 0, 0.4);
plank('mangrove', 245, 230, 191, 1.8, 0, 20);
plank('palm', 183, 132, 69, 1.5, 0, 1);
plank('redwood', 163, 74, 42, 1, 0, 1);
plank('pine', 134, 107, 79, 1.5, 0, 1);
plank('jacaranda', 191, 160, 147, 1.8, 0, 1);
plank('mahogany', 186, 122, 118, 1.5, 0, 1);
plank('willow', 131, 145, 108, 1.5, 0, 1);
plank('hellbark', 69, 48, 50, 0.5, 0, 1);
plank('bamboo', 186, 205, 113, 1.8, 0, 1);
plank('rowan', 213, 185, 94, 1.3, 0, 10);
plank('hawthorn', 177, 172, 169, 1.5, 0, 20);
plank('alder', 177, 95, 87, 0.9, 0, 15);

plank('greatwood', 46, 17, 7, 0.35, 0, 1);
plank('silverwood', 180, 169, 144, 1.8, 0, 20);

function plank(name, r, g, b, brightness, saturation, lightness) {
  planks.set(name, { r: r, g: g, b: b, brightness: brightness, saturation: saturation, lightness: lightness });
}

async function resizeImage(name, r, g, b, brightness, saturation, lightness, type, isChisel) {
  let fileDir = 'planks-example-misc-output/' + name + '_' + type + '.png';
  let fileInput = 'planks-example-misc/' + type + '.png';
  if (isChisel == 1) {
    fileDir = 'planks-' + name + '/' + type + '.png';
    fileInput = 'planks-example/' + type + '.png';
  }
  if (isChisel == 2) {
    fileDir = 'planks-example-misc-output/' + type + '_' + name + '.png';
  }
  if (isChisel == 3) {
    fileDir = 'planks-example-misc-output/drawers_' + name + '_' + type + '.png';
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
    //console.log(fileDir);
  } catch (error) {
    console.error('Error coloring image:', error);
  }
}

function createFile(name, type) {
  if (type == 'crate' || type == 'crateex' || type == 'crate-fancy' || type == 'fancy' || type == 'large' || type == 'panel-nails' || type == 'parquet') {
    let fileDir = 'planks-' + name + '/' + type + '.png.mcmeta';
    let fileContent = '{"ctm": {"ctm_version": 1, "type": "ctm","textures": ["chisel:blocks/planks-' + name + '/' + type + '-ctm"]}}'
    fs.writeFile(fileDir, fileContent, (err) => {
      if (err) {
        console.error('Error creating file:', err);
        return;
      }
      //console.log(fileDir);
    });
  }
}

async function addOverlay(name, type) {
  if (type == "desk_bop") {
    fileDir = 'planks-example-misc-output/' + type + '_' + name + '-fixed.png';
    fileInput = 'planks-example-misc-output/' + type + '_' + name + '.png';
    try {
      await sharp(fileInput) // Load the input image
        .composite([{ input: type + '.png' }])
        .toFile(fileDir);
    } catch (error) {
      console.error('Error coloring image:', error);
    }
  }

}

planks.forEach((value, key) => {
  let map = planks.get(key);
  types.forEach((type, i) => {
    resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type, 1);
  })
  typesmisc.forEach((type, i) => {
    resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type, 0);
  })
  typesmisc2.forEach((type, i) => {
    resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type, 2);
  })
  typesmisc3.forEach((type, i) => {
    resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type, 3);
  })
  typesmisc2.forEach((type, i) => {
    addOverlay(key, type);
  })
  types.forEach((type, i) => {
    createFile(key, type);
  })
})

