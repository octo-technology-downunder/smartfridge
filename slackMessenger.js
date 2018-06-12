const Slack = require('slack-node');
const {promisify} = require('es6-promisify');

const slack = new Slack();
const settings = require('./settings.json');
function sendSlackWebhook(text, attachments) {
    attachments.push({
        title: settings.slackTitle
    });
    slack.setWebhook(settings.slackWebhookUrl);
    return promisify(slack.webhook)({
        channel: settings.slackChannel,
        username: settings.slackBotName,
        link_names: 1,
        text: text,
        attachments: attachments
    });
}

module.exports = {
    sendSlackWebhook
};