const aws = require('aws-sdk');
const fs = require('fs');

aws.config.update({
    region: 'us-east-1'
});

const dynamodb = new aws.DynamoDB.DocumentClient();

const serviceData = JSON.parse(fs.readFileSync('../components/data/services.json', 'utf-8'));

serviceData.forEach(service => {
    const params = {
        TableName: "Services",
        Item: {
            "name": service.name
        }
    };

    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error('Unable to load data', service.name, 'error', JSON.stringify(err, null, 2));
        } else {
            console.log('added', service.name, ' to table');
        }
    });

});