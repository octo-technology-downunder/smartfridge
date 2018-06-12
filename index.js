'use strict';
const AWS = require('aws-sdk');
const moment = require('moment');
const slack = require('./slackMessenger');
const settings = require('./settings.json');

AWS.config.update({region: settings.awsRegion});

exports.handler = function (event, context, callback){
    let message = appendMetric("", "IoT Device Name", event.deviceId);
    const time = moment.unix(event.time).format("YYYY/MM/DD HH:MM:SS");
    message = appendMetric(message, "Time in the fridge", time);
    message = appendMetric(message, "Temperature in the fridge", +(event.data.Temperature) / 100) + 'C';
    message = appendMetric(message, "Pressure in the fridge", event.data.Pressure);
    message = appendMetric(message, "Light level in the fridge", event.data.Photo);
    message = appendMetric(message, "X_Acceleration of the fridge", Math.round( +event.data.x_Accelerator / 250 ));
    message = appendMetric(message, "Y_Acceleration of the fridge", Math.round( +event.data.y_Accelerator / 250 ));
    message = appendMetric(message, "Z_Acceleration of the fridge", Math.round( +event.data.z_Accelerator / 250 ));

    slack.sendSlackWebhook(message, [])
        .then(() => callback());

};

function appendMetric(msg, metricName, metricValue){
    return msg + '\n' + metricName + ': ' + metricValue;
}