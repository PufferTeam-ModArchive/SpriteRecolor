const sharp = require('sharp');
const fs = require('fs');

const types = [
    "still", "flow"
]

const types2 = [
    "bucket", "ceramic_bucket"
]

const metals = new Map();

metal('blue', 45, 48, 145, 0.4, 1, 1);
metal('black', 18, 19, 23, 0.1, 1, 1);
metal('yellow', 245, 186, 28, 0.55, 1, 1);
metal('white', 225, 228, 229, 0.89, 1, 1);
metal('light_gray', 153, 153, 147, 0.59, 1, 1);
metal('red', 150, 35, 33, 0.36, 1, 1);
metal('purple', 134, 48, 181, 0.45, 1, 1);
metal('pink', 228, 117, 154, 0.68, 1, 1);
metal('orange', 249, 147, 43, 0.57, 1, 1);
metal('magenta', 184, 63, 174, 0.48, 1, 1);
metal('lime', 124, 195, 27, 0.44, 1, 1);
metal('light_blue', 63, 185, 222, 0.44, 1, 1);
metal('green', 79, 100, 31, 0.26, 1, 1);
metal('gray', 64, 70, 73, 0.26, 1, 1);
metal('cyan', 21, 131, 141, 0.35, 1, 1);
metal('brown', 104, 64, 35, 0.27, 1, 1);

metal('tannin', 89, 78, 48, 0.27, 1, 1);

function metal(name, r, g, b, brightness, saturation, lightness) {
    metals.set(name, { r: r, g: g, b: b, brightness: brightness, saturation: saturation, lightness: lightness });
}

function resizeImage(name, r, g, b, brightness, saturation, lightness, type) {
    let fileDir = 'fluid-output/' + name + '_' + type + '.png';
    if (type == "bucket" || type == "ceramic_bucket") {
        fileDir = 'fluid-output-temp/' + name + '_' + type + '.png';
    }
    let fileInput = 'fluid-input/' + type + '.png';
    try {
        sharp(fileInput) // Load the input image
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

function addOverlay(name, type) {
    let fileDir = 'fluid-output/' + name + '_' + type + '.png';
    let fileInput = 'fluid-output-temp/' + name + '_' + type + '.png';
    try {
        sharp(fileInput) // Load the input image
            .composite([{ input: 'fluid-input/' + type + '_overlay.png' }])
            .toFile(fileDir);
    } catch (error) {
        console.error('Error coloring image:', error);
    }
}

function createFile(name, type) {
    let fileDir = 'fluid-output/' + name + '_' + type + '.png.mcmeta';
    let fileContent = '{"animation": {}}'
    if (type == 'still') {
        fileContent = '{"animation": {"frametime": 2}}'
    }
    fs.writeFile(fileDir, fileContent, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return;
        }
        //console.log(fileDir);
    });
}

metals.forEach((value, key) => {
    let map = metals.get(key);
    types.forEach((type, i) => {
        resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type);
        createFile(key, type);
    })
    types2.forEach((type, i) => {
        resizeImage(key, map.r, map.g, map.b, map.brightness, map.saturation, map.lightness, type);
        addOverlay(key, type);
    })
})
