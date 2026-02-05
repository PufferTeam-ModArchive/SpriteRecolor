const sharp = require('sharp');
const fs = require('fs');

function capitalize(str) {
  let e = str.split("");
  e[0] = e[0].toUpperCase()
  let r = e.join("")

  return r
}

const types = [
  "anvil",
  "block",
  "ingot",
  "nugget",
  "dust",
  "gear",
  "rod",
  "plate",
  "raw_ore",
  "pile",
  "pickaxe",
  "pickaxe_head",
  "axe",
  "axe_head",
  "shovel",
  "shovel_head",
  "hammer",
  "hammer_head",
  "sword",
  "sword_blade",
  "chisel",
  "chisel_head",
  "saw",
  "saw_blade",
  "hoe",
  "hoe_head",
  "hammer",
  "hammer_head",
  "helmet",
  "chestplate",
  "leggings",
  "boots",
  "layer_1",
  "layer_2",
  "bucket",
  "scythe",
  "scythe_head",
  "propick",
  "propick_head",
  "knife",
  "knife_blade",
  "armor1",
  "armor2",
  "helmet1",
  "chestplate1",
  "leggings1",
  "boots1",
  "armor2_1",
  "armor2_2",
  "helmet2",
  "chestplate2",
  "leggings2",
  "boots2",
  "liquid",
  "ore",
  "liquid_flow"
]

const metals = new Map();

metal('aluminum', 195, 202, 205, 0.9, 1, 2);
metal('copper', 231, 124, 86, 0.75, 1, 1);
metal('bronze', 165, 104, 62, 0.75, 1, 1);
metal('electrum', 225, 166, 70, 0.9, 1.2, 3);
metal('invar', 141, 152, 148, 0.8, 1, 3);
metal('tin', 117, 151, 170, 0.8, 1, 3);
metal('silver', 191, 219, 227, 1.0, 1, 3);
metal('thaumium', 88, 74, 137, 0.5, 1, 3);
metal('thaumium', 88, 74, 137, 0.5, 1, 3);

metal('manasteel', 51, 137, 255, 0.9, 1, 1);
metal('terrasteel', 61, 190, 0, 0.9, 1, 1);
metal('elementium', 237, 51, 154, 0.9, 1, 1);
metal('constantan', 202, 144, 78, 0.75, 1, 1);
metal('lead', 73, 81, 115, 0.5, 1, 1);
metal('iron', 216, 216, 216, 1.0, 1, 0.8);
metal('steel', 102, 102, 102, 0.5, 1, 1.0);
metal('gold', 255, 210, 20, 1.0, 2.5, 2.0);
metal('diamond', 74, 237, 217, 1.0, 1, 1);
metal('platinum', 141, 212, 240, 1.0, 1, 1);
metal('manainfused', 145, 227, 255, 0.9, 1, 3);
metal('nickel', 189, 170, 117, 0.9, 1.1, 0.8);
metal('osmium', 168, 181, 204, 0.9, 1, 1);
metal('signalum', 221, 63, 0, 0.7, 1, 1);
metal('lumium', 220, 213, 108, 1.1, 1.5, 0.8);
metal('enderium', 15, 112, 112, 0.5, 1.2, 0.8);
metal('uranium', 75, 134, 11, 0.7, 1.2, 0.8);
metal('cast_iron', 99, 85, 70, 0.4, 1, 1);

function metal(name, r, g, b, brightness, saturation, lightness) {
  metals.set(name, { r: r, g: g, b: b, brightness: brightness, saturation: saturation, lightness: lightness });
}

function needsOverlay(type) {
  if (type == "pickaxe" || type == "axe" || type == "sword" || type == "shovel" || type == "hoe" || type == "saw" || type == "chisel" || type == "bucket" || type == "scythe" || type == "hammer" || type == "pickaxe1" || type == "axe1" || type == "sword1" || type == "shovel1" || type == "hoe1" || type == "knife" || type == "propick" || type == "armor1" || type == "helmet1" || type == "chestplate1" || type == "helmet2" || type == "leggings2" || type == "armor2_1" || type == "armor2_2" || type == "hammer") {
    return true;
  }
  return false;
}
function isTool(type, name) {
  if (type == "layer_1" || type == "layer_2" || type == "helmet" || type == "chestplate" || type == "leggings" || type == "boots" || type == "pickaxe" || type == "pickaxe_head" || type == "axe" || type == "axe_head" || type == "sword" || type == "sword_blade" || type == "shovel" || type == "shovel_head" || type == "hoe" || type == "hoe_head" || type == "saw" || type == "saw_blade" || type == "chisel" || type == "chisel_head" || type == "scythe" || type == "scythe_head" || type == "hammer" || type == "hammer_head" || type == "pickaxe1" || type == "pickaxe_head1" || type == "axe1" || type == "axe_head1" || type == "sword1" || type == "sword_blade1" || type == "shovel1" || type == "shovel_head1" || type == "hoe1" || type == "hoe_head1" || type == "propick" || type == "propick_head" || type == "knife" || type == "knife_blade" || type == "hammer" || type == "hammer_head") {
    if (name != "iron" && name != "gold" && name != "thaumium" && name != "manasteel" && name != "terrasteel" && name != "elementium" && name != "bronze" && name != "steel" && name != "copper") {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
async function resizeImage(name, r, g, b, brightness, saturation, lightness, type) {
  let fileDir0 = 'metal-example-temp/' + name + '_' + type + '-temp.png';
  let fileDir = 'metal-example-output/' + name + '_' + type + '.png';
  let fileDir2 = 'metal-example-output/' + name + '_' + type + '_fixed.png';
  let fileDir3 = '';
  if (needsOverlay(type)) {
    fileDir0 = 'metal-example-temp/' + name + '_' + type + '-temp.png';
    fileDir = 'metal-example-temp/' + name + '_' + type + '.png';
    fileDir2 = 'metal-example-output/' + name + '_' + type + '.png';
  }
  if (type == "saw") {
    fileDir0 = 'metal-example-temp/saw' + capitalize(name) + '-temp.png';
    fileDir = 'metal-example-temp/saw' + capitalize(name) + '.png';
    fileDir2 = 'metal-example-output/saw' + capitalize(name) + '.png';
  }
  if (type == "chisel") {
    fileDir0 = 'metal-example-temp/chisel_' + name + '-temp.png';
    fileDir = 'metal-example-temp/chisel_' + name + '.png';
    fileDir2 = 'metal-example-output/chisel_' + name + '.png';
  }
  if (type == "ore") {
    fileDir0 = 'metal-example-temp/' + name + '_' + type + '-temp.png';
    fileDir = 'metal-example-temp/' + name + '_' + type + '.png';
    fileDir2 = 'metal-example-output/' + name + '_ore.png';
    fileDir3 = 'metal-example-output/deepslate_' + name + '_ore.png';
  }
  if (type == "liquid") {
    fileDir0 = 'metal-example-temp/liquid_' + name + '-temp.png';
    fileDir = 'metal-example-output/liquid_' + name + '.png';
  }
  if (type == "liquid_flow") {
    fileDir0 = 'metal-example-temp/liquid_' + name + '_flow-temp.png';
    fileDir = 'metal-example-output/liquid_' + name + '_flow.png';
  }
  if (type == "bucket") {
    fileDir0 = 'metal-example-temp/' + type + '_' + name + '-temp.png';
    fileDir = 'metal-example-temp/' + type + '_' + name + '.png';
    fileDir2 = 'metal-example-output/' + type + '_' + name + '.png';
  }
  let fileInput = 'metal-example/' + type + '.png';
  try {
    await sharp(fileInput) // Load the input image
      .tint({ r: r, g: g, b: b }) // Tint
      .modulate({
        brightness: brightness,
        lightness: lightness
      })
      .toFile(fileDir0);
    console.log(fileDir0);
  } catch (error) {
    console.error('Error coloring image:', error);
  }

  try {
    await sharp(fileDir0) // Load the input image
      .modulate({
        hue: 0,
        saturation: saturation,
      })
      .toFile(fileDir);
  } catch (error) {
    console.error('Error coloring image:', error);
  }

  if (needsOverlay(type)) {
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

  if (type == "ore") {
    let overlayStone = 'metal-overlay/stone.png'
    let overlayDeepslate = 'metal-overlay/deepslate.png'
    try {
      await sharp(fileDir) // Load the input image
        .composite([{ input: overlayStone }])
        .toFile(fileDir2);
      console.log(fileDir2);
    } catch (error) {
      console.error('Error overlay image:', error);
    }

    try {
      await sharp(fileDir) // Load the input image
        .composite([{ input: overlayDeepslate }])
        .toFile(fileDir3);
      console.log(fileDir3);
    } catch (error) {
      console.error('Error overlay image:', error);
    }
  }

}

function createFile(name, type) {
  if (type == "liquid" || type == "liquid_flow") {
    let fileDir = 'metal-example-output/liquid_' + name + '.png.mcmeta';
    if (type == "liquid_flow") {
      fileDir = 'metal-example-output/liquid_' + name + '_flow.png.mcmeta';
    }

    let fileContent = '{"animation": {"frametime": 2,"frames": [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]}}'
    if (type == "liquid_flow") {
      fileContent = '{"animation": {"frametime": 3}}'
    }
    fs.writeFile(fileDir, fileContent, (err) => {
      if (err) {
        console.error('Error creating file:', err);
        return;
      }
      //console.log(fileDir);
    });
  }
}

metals.forEach((value, key) => {
  let map = metals.get(key);
  types.forEach((typeKey, i) => {
    let name = key;
    let type = typeKey;
    if (name == "manasteel" || name == "terrasteel" || name == "elementium" || name == "thaumium") {
      if (type == "pickaxe" || type == "pickaxe_head" || type == "axe" || type == "axe_head" || type == "shovel" || type == "shovel_head" || type == "sword" || type == "sword_blade" || type == "hoe" || type == "hoe_head") {
        type = typeKey + "1";
      }
    }
    if (isTool(type, name)) {
      resizeImage(name, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type);
      createFile(name, type);
    }
  })
})
