const aws = require('aws-sdk');
const fs = require('fs');

aws.config.update({
    region: 'us-east-1'
});

const dynamodb = new aws.DynamoDB.DocumentClient();

const accessData = JSON.parse(fs.readFileSync('../components/data/accessibilities.json', 'utf-8'));

accessData.forEach(access => {
    const params = {
        TableName: "Accessibilities",
        Item: {
            "name": access.name
        }
    };

    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error('Unable to load data', access.name, 'error', JSON.stringify(err, null, 2));
        } else {
            console.log('added', access.name, ' to table');
        }
    });

});