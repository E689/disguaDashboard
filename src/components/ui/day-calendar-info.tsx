'use client'

import {Schedule} from "@/app/types/types";

type DayCalendarInfoProps = {
    schedule: Schedule
    highlightedText?: string
}

export const DayCalendarInfo: React.FC<DayCalendarInfoProps> = ({schedule, highlightedText}) => {
    function getText(text: string) {
        if (!schedule.client) return null;
        if (!text.toLowerCase().includes(highlightedText?.toLowerCase() ?? '')) return text;
        if (!highlightedText) return text;
        // text before the highlighted text
        const beforeText = text.slice(0, text.toLowerCase().indexOf(highlightedText.toLowerCase()));
        // text highlighted
        const textHighlighted = text.slice(text.toLowerCase().indexOf(highlightedText.toLowerCase()), text.toLowerCase().indexOf(highlightedText.toLowerCase()) + highlightedText.length);
        // text after the highlighted text
        const afterText = text.slice(text.toLowerCase().indexOf(highlightedText.toLowerCase()) + highlightedText.length);

        return (
            <>
                <span>{beforeText}</span>
                <span className='dark:bg-violet-800 bg-violet-500'>{textHighlighted}</span>
                <span>{afterText}</span>
            </>
        )
    }

    console.log(getText(schedule.client?.phone ?? ''))

    return (
        <div className='flex justify-between p-2 text-lg border rounded border-x-0'>
            <div className="flex p-2 items-center">
                <div>{schedule.timeStart} - {schedule.timeEnd}</div>
            </div>
            {schedule.available && <div className="flex p-2">Disponible</div>}
            {!schedule.available &&
                (
                    <div className="flex flex-col md:flex-row gap-3 items-end p-2">
                        <div>{getText(schedule.client!.name)}</div>
                        <div>{getText(schedule.client!.phone)}</div>
                    </div>
                )
            }

        </div>
    )
}