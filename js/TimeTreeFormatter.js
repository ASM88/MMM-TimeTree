class TimeTreeFormatter {
    formatAll(events) {
        const self = this;
        const wrapper = document.createElement("div");
        events.forEach(ev => wrapper.appendChild(self.format(ev)));
        return wrapper;
    }
    
    format(event) {
        const startDate = event.start.split("T")[0].split("-").reverse().join(".");
        const endDate = event.end.split("T")[0].split("-").reverse().join(".");
        let tmpTime = event.start.split("T")[1].split(".")[0].split(":");
        tmpTime.pop();
        const startTime = tmpTime.join(":");
        tmpTime = event.end.split("T")[1].split(".")[0].split(":");
        tmpTime.pop();
        const endTime = tmpTime.join(":");

        const ev = document.createElement("div");
        ev.classList.add("calendar-row");
        ev.style.borderLeftColor = event.color;

        const title = document.createElement("div");
        title.classList.add("event-title");
        title.innerText = event.title;
        ev.appendChild(title);

        const date = document.createElement("div");
        date.classList.add("event-date");
        const dGlyph = document.createElement("span");
        dGlyph.classList.add("fa", "fa-calendar", "event-icon");
        date.appendChild(dGlyph);
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
        const tGlyph = document.createElement("span");
        tGlyph.classList.add("fa", "fa-clock-o", "event-icon");
        time.appendChild(tGlyph);
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