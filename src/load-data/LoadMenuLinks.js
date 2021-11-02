const aws = require('aws-sdk');
const fs = require('fs');

aws.config.update({
    region: 'us-east-1'
});

const dynamodb = new aws.DynamoDB.DocumentClient();

const galleryData = JSON.parse(fs.readFileSync('../components/data/menu_links.json', 'utf-8'));

galleryData.forEach(gallery => {

    const params = {
        TableName: "MenuLinks",
        Item: {
            "class": gallery.class,
            "href": gallery.href,
            "text": gallery.text
        }
    };

    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error('Unable to load data', gallery.text, 'error', JSON.stringify(err, null, 2));
        } else {
            console.log('added', gallery.text, ' to table');
        }
    });

});

// "class": "rooms",
// "href": "#rooms",
// "text": "rooms"