const api = require('@timetreeapp/web-api');

function connect(apiKey, timezone) {
    return new TimeTreeConnector(apiKey, timezone);
}

class TimeTreeConnector {
    constructor(apiKey, timezone) {
        this.client = new api.OAuthClient(apiKey);
        this.labels = new Map();
        this.timezone = timezone;
    }

    putLabels(name, labels) {
        this.labels.set(name, labels);
    }

    events(name, numDays = 7) {
        return this.client.getCalendars()
            .then(cs => cs.find(c => c.name === name).id)
            .then(id => this.client.getLabels(id).then(ls => {
                this.putLabels(name, ls)
                return id;
            }))
            .then(id => this.client.getUpcomingEvents({
                "calendarId": id,
                "timezone": this.timezone,
                "days": numDays,
                "include": {
                    "labels": true,
                    "members": false
                }
            }))
            .then(evs => this.convert(name, evs));
    }

    convert(name, events) {
        return events.map(ev => {
            return new CustomTimeTreeEvent(ev.title, ev.startAt, ev.endAt, ev.allDay, this.lookupLabel(name, ev.label.id), ev.location, this.lookupColor(name, ev.label.id));
        });
    }

    lookupLabel(name, id) {
        return this.labels.get(name).find(l => l.id === id).name;
    }

    lookupColor(name, id) {
        return this.labels.get(name).find(l => l.id === id).color;
    }
}

class CustomTimeTreeEvent {
    constructor(title, start, end, allDay, label, location, color) {
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.label = label;
        this.location = location;
        this.color = color;
    }
}

module.exports = {connect};

