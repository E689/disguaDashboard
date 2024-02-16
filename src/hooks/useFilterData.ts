import {Calendar} from "@/app/types/types";
import {filterDataByClientOrPhone, filterDataByDate} from "@/lib/filter-by-date-and-client";
import {useEffect, useRef, useState} from "react";

export const useFilterData = (dayCalendars: Calendar, status: string, typeSearch: "paciente" | "fecha") => {
    const [filteredDataByDate, setFilteredDataByDate] = useState<Record<string, Calendar>>({});
    const [filteredDataByClient, setFilteredDataByClient] = useState<Record<string, Calendar>>({});
    const currentSearchedInput = useRef<string>('');


    function filterAndReRender(map: Record<string, Calendar>, value: string, triggerReRenderAndUpdateState: any, filterData: any) {
        // since data has already been filtered, we don't need to filter it again
        // but we do need to render it again
        if (map[value] !== undefined) {
            // trigger a re render
            triggerReRenderAndUpdateState({...map});
            return;
        }

        // because has not been filtered, we need to filter it
        let filteredData = filterData(dayCalendars ?? [], value);
        // re render
        triggerReRenderAndUpdateState({...map, [value]: filteredData});
    }

    const filterData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // update the currentSearchedInput without triggering a re render
        console.log({value});
        currentSearchedInput.current = value;

        if (typeSearch === 'paciente') {
            filterAndReRender(filteredDataByClient, value, setFilteredDataByClient, filterDataByClientOrPhone)
        }
        if (typeSearch === 'fecha') {
            filterAndReRender(filteredDataByDate, value, setFilteredDataByDate, filterDataByDate)
        }
    }

    // I need this to only happen on the first render
    useEffect(() => {
        if (status !== 'success') return;

        // filter data
        setFilteredDataByDate({[currentSearchedInput.current]: filterDataByDate(dayCalendars!, currentSearchedInput.current)});
        setFilteredDataByClient({[currentSearchedInput.current]: filterDataByClientOrPhone(dayCalendars!, currentSearchedInput.current)});
    }, [status, dayCalendars]);

    return {filterData, filteredDataByClient, filteredDataByDate, currentSearchedInput: currentSearchedInput.current};
}