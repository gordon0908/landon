const aws = require('aws-sdk');
const fs = require('fs');

aws.config.update({
    region: 'us-east-1'
});

const dynamodb = new aws.DynamoDB.DocumentClient();

const galleryData = JSON.parse(fs.readFileSync('../components/data/gallery_images.json', 'utf-8'));

galleryData.forEach(gallery => {
    const className = gallery.className.trim() == ''? 'noclass' : gallery.className;
    const params = {
        TableName: "GalleryImages",
        Item: {
            "src": gallery.src,
            "alt": gallery.alt,
            "className": className
        }
    };

    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error('Unable to load data', gallery.alt, 'error', JSON.stringify(err, null, 2));
        } else {
            console.log('added', gallery.alt, ' to table');
        }
    });

});