export type Schedule = {
    available: boolean,
    timeStart: string,
    timeEnd: string,
    client?: { name: string, phone: '12345678' }
}

export type Calendar = {
    date: string,
    schedule: Schedule[]
}[];