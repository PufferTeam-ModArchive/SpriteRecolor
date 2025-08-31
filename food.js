const sharp = require('sharp');

const foodSalt = [

]

const foodSugar = [

]

async function overlay(overlay, type) {
    try {
        await sharp('food/' + type + '.png') // Load the input image
            .composite([{ input: 'food-overlay/' + overlay + '_0.png' }])
            .toFile('food-output/' + overlay + '_' + type + '.png');
        console.log('food/' + type + '.png');
    } catch (error) {
        console.error('Error adding overlay to image:', error);
    }
}

foodSalt.forEach((value) => {
    overlay("salt", value);
})

foodSugar.forEach((value) => {
    overlay("sugar", value);
})