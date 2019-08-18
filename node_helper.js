const connector = require('./js/TimeTreeConnector');
const NodeHelper = require("node_helper");
const TimeTreeFormatter = require("./js/TimeTreeFormatter");
const Log = require("logger");

module.exports = NodeHelper.create({
    client: undefined,

    start: function () {
        Log.log('Starting node helper for MMM-TimeTree');
        this.client = undefined;
    },

    connect: function(accessToken, timezone) {
        this.client = connector.connect(accessToken, timezone);
        this.sendSocketNotification('TIME_TREE_CONNECT', {"status":"OK"});
        Log.log('Sent response to notification=TIME_TREE_CONNECT');
    },

    refresh: function(calendar, numDays = 7) {
        Log.log('Refresh calendar=' + calendar);
        const self = this;
        this.client.events(calendar, numDays).then(evs => {
            const formatter = new TimeTreeFormatter();
            const htmlFormatted = formatter.formatAll(evs);
            self.sendSocketNotification('TIME_TREE_REFRESH', {"html":htmlFormatted});
            Log.log('Sent response to notification=TIME_TREE_REFRESH');
        });
    },

    socketNotificationReceived: function (notification, payload) {
        Log.log("Received notification=" + notification);
        switch (notification) {
            case 'TIME_TREE_CONNECT':
                this.connect(payload.accessToken, payload.timezone);
                return;
            case 'TIME_TREE_REFRESH':
                this.refresh(payload.calendar, payload.numDays);
                return;
        }
    }
});