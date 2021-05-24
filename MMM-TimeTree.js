Module.register('MMM-TimeTree', {

    // default values
    defaults: {
        accessToken: '',
        calendar: '',
        updateInMinutes: '5',
        timezone: "Europe/Berlin",
        numDays: '7'
    },


    start: function () {
        Log.info('Starting module: ' + this.name );
        this.initialized = false;
        this.context = {};
        this.sendSocketNotification('TIME_TREE_CONNECT', {"accessToken":this.config.accessToken, "timezone":this.config.timezone});
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        if (this.initialized) {
            Log.info("Initialized");
            wrapper.appendChild(context);
        } else {
            Log.info("Not initialized yet");
            wrapper.innerHTML = "<div>Warte</div>";
        }
        return wrapper;
    },

    getStyles: function () {
        return [
            this.file('css/style.css'),
            'font-awesome.css'
        ];
    },

    getScripts: function () {
        return [
            this.file('js/TimeTreeFormatter.js')
        ]
    },

    socketNotificationReceived: function(notification, payload) {
        Log.info("Frontend: Notification received " + notification);
        switch (notification) {
            case 'TIME_TREE_REFRESH':
                this.initialized = true;
                this.context = new TimeTreeFormatter().formatAll(payload.events);
                this.updateDom();
                break;
            case 'TIME_TREE_CONNECT':
                this.startRefresh();
                break;
        }
    },

    startRefresh() {
        Log.info("Refresh");
        this.sendSocketNotification('TIME_TREE_REFRESH', {"calendar":this.config.calendar,"numDays":this.config.numDays});
        setInterval(() => {
            Log.info("Refresh");
            this.sendSocketNotification('TIME_TREE_REFRESH', {"calendar":this.config.calendar,"numDays":this.config.numDays});
        }, this.config.updateInMinutes * 1000 * 60);
    }
});