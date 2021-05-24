class TimeTreeFormatter {
    formatAll(events) {
        const self = this;
        const wrapper = document.createElement("div");
        events.forEach(ev => wrapper.appendChild(self.format(ev)));
        return wrapper;
    }
    
    format(event) {
        const start = Date.parse(event.start);
        const end = Date.parse(event.end);
        const startDate = [start.getDay(), start.getMonth(), start.getFullYear()].join(".");
        const endDate = [end.getDay(), end.getMonth(), end.getFullYear()].join(".");
        const startTime = [start.getHours(), start.getMinutes()].join(":");
        const endTime = [end.getHours(), end.getMinutes()].join(":");

        const ev = document.createElement("div");
        ev.classList.add("calendar-row");
        ev.style.borderLeftColor = ev.color;

        const title = document.createElement("div");
        title.classList.add("event-title");
        title.innerText = event.title;
        ev.appendChild(title);

        const date = document.createElement("div");
        date.classList.add("event-date");
        const dFrom = document.createElement("span");
        dFrom.classList.add("event-date-from");
        dFrom.innerText = startDate;
        date.appendChild(dFrom);
        if (startDate !== endDate) {
            const dTo = document.createElement("span");
            dTo.classList.add("event-date-to");
            dTo.innerText = endDate;
            date.appendChild(dTo);
        }
        ev.appendChild(date);

        const time = document.createElement("div");
        time.classList.add("event-time");
        if (event.allDay) {
            const allDay = document.createElement("span");
            allDay.innerText = "Ganztägig";
            time.appendChild(allDay);
        } else {
            const tFrom = document.createElement("span");
            tFrom.classList.add("event-time-from");
            tFrom.innerText = startTime;
            time.appendChild(tFrom);
            const tTo = document.createElement("span");
            tTo.classList.add("event-time-to");
            tTo.innerText = endTime;
            time.appendChild(tTo);
        }
        ev.appendChild(time);

        return ev;
    }
}