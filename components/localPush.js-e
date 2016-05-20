var LocalNotify = require("LocalNotify");
var moment = require("/moment.js");

LocalNotify.onReceivedMessage = function(payload) {
  console.log ("Recieved Local Notification: " + payload);
  registerNotification();
};

function computeRemainingSecondsToNextPush() {
  // TODO: change 'minute' by 'month' (twice) for production
  return moment().add(1, 'minute').startOf('minute').diff(moment(), 'seconds');
}

function registerNotification() {
  LocalNotify.later(computeRemainingSecondsToNextPush(), "Bam Book!", "Il est temps de voter de voter pour le livre BAM du mois", "Vote", true);
}

module.exports = {
  registerNotification: registerNotification,
};
