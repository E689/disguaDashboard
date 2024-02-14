import {Calendar} from "@/app/types/types";

export function filterDataByClientOrPhone(dayCalendars: Calendar, value: string) {
    return dayCalendars
        .filter(dayCalendar => {
            return dayCalendar.schedule.some(schedule => schedule.client?.name.toLowerCase().includes(value.toLowerCase())
                || schedule.client?.phone.toLowerCase().includes(value.toLowerCase()))
        });
}

export function filterDataByDate(dayCalendars: Calendar, value: string) {
    return dayCalendars.filter(dayCalendar => dayCalendar.date.toLowerCase().includes(value.toLowerCase()));
}

