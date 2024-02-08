'use client'

import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Accordion } from "@/components/ui/Accordion";
import { DayCalendarInfo, Schedule } from "@/components/ui/day-calendar-info";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { faCheck, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from "@/components/misc/Spinner";

function filterDataByClientOrPhone(dayCalendars: Calendar, value: string) {
  return dayCalendars
    .filter(dayCalendar => {
      return dayCalendar.schedule.some(schedule => schedule.client?.name.toLowerCase().includes(value.toLowerCase())
        || schedule.client?.phone.toLowerCase().includes(value.toLowerCase()))
    });
}

function filterDataByDate(dayCalendars: Calendar, value: string) {
  return dayCalendars.filter(dayCalendar => dayCalendar.date.toLowerCase().includes(value.toLowerCase()));
}

type Calendar = {
  date: string,
  schedule: Schedule[]
}[];

const possibleSearchTypes = ['fecha', 'paciente'];

export default function Dashboard() {
  const [status, dayCalendars, error] = useFetch<Calendar>('anyURL');
  const [filteredDataByDate, setFilteredDataByDate] = useState<Record<string, Calendar>>({});
  const [filteredDataByClient, setFilteredDataByClient] = useState<Record<string, Calendar>>({});
  const currentSearchedInput = useRef<string>('');
  const [typeSearch, setTypeSearch] = useState<'fecha' | 'paciente'>('fecha');
  const inputPlaceholder = typeSearch === 'fecha' ? 'Busca por dia' : 'Busca por numéro de paciente o teléfono';

  // I need this to only happen on the first render
  useEffect(() => {
    if (status !== 'success') return;

    // filter data
    setFilteredDataByDate({ [currentSearchedInput.current]: filterDataByDate(dayCalendars!, currentSearchedInput.current) });
    setFilteredDataByClient({ [currentSearchedInput.current]: filterDataByClientOrPhone(dayCalendars!, currentSearchedInput.current) });
  }, [status]);

  console.log({ filteredData: filteredDataByDate });
  console.log({ currentSearchedInput: currentSearchedInput.current })

  function filterAndReRender(map: Record<string, Calendar>, value: string, triggerReRenderAndUpdateState: any, filterData: any) {
    // since data has already been filtered, we don't need to filter it again
    // but we do need to render it again
    if (map[value] !== undefined) {
      // trigger a re render
      triggerReRenderAndUpdateState({ ...map });
      return;
    }

    // because has not been filtered, we need to filter it
    let filteredData = filterData(dayCalendars ?? [], value);
    // re render
    triggerReRenderAndUpdateState({ ...map, [value]: filteredData });
  }

  const filterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // update the currentSearchedInput without triggering a re render
    console.log({ value });
    currentSearchedInput.current = value;

    if (typeSearch === 'paciente') {
      filterAndReRender(filteredDataByClient, value, setFilteredDataByClient, filterDataByClientOrPhone)
    }
    if (typeSearch === 'fecha') {
      filterAndReRender(filteredDataByDate, value, setFilteredDataByDate, filterDataByDate)
    }
  }

  return (
    <main className="w-screen h-dvh">
      {/** Separar layout del page */}
      <ThemeToggle />
      <div className="flex w-full h-full">
        <nav
          className='dark:bg-neutral-900 border shadow h-full max-w-[500px] w-1/3 min-w-[100px] p-5 flex flex-col gap-5'>
          <h2 className="text-3xl text-center">Maquinas</h2>
          <div className="flex flex-col gap-2">
            <Button variant='default'>Maquina $</Button>
            <Button variant='default'>Maquina $</Button>
            <Button variant='default'>Maquina $</Button>
            <Button variant='default'>Maquina $</Button>
          </div>
        </nav>
        <div className='flex flex-col gap-5 items-center w-full p-4'>
          <div className='flex gap-5 items-center'>
            {/** Convertir acordeon a comp propio/reutilizable */}
            <Input onInput={filterData} className='w-[50ch]' placeholder={inputPlaceholder}></Input>
            {/* on click should display dropdown, idk if its better to use shadcdn component for this*/}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {possibleSearchTypes.map((type, index) => (
                  <DropdownMenuItem className='flex justify-between cursor-pointer' key={index}
                    onSelect={() => {
                      console.log({ typeSearch });
                      // trigger a re render
                      setTypeSearch(type as 'fecha' | 'paciente');
                    }}>
                    <span>{type}</span>
                    {type === typeSearch &&
                      <span><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></span>}
                  </DropdownMenuItem>
                )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* add a loading spinner*/}
          {
            status === 'loading' && (
              <Spinner />
            )
          }
          {status === 'error' && <div>{error?.name}</div>}
          {
            status === 'success' && typeSearch === "fecha" && (
              <div className='w-full overflow-y-scroll'>
                {
                  filteredDataByDate[currentSearchedInput.current]?.map((dayCalendar, index) => {
                    return (
                      <Accordion highlightedText={currentSearchedInput.current} key={index}
                        title={dayCalendar.date}>
                        {dayCalendar.schedule
                          .map((schedule, i) => (
                            <DayCalendarInfo key={i} schedule={schedule}></DayCalendarInfo>))}
                      </Accordion>
                    )
                  })
                }
              </div>
            )
          }
          {
            status === 'success' && typeSearch === "paciente" && (
              <div className='w-full overflow-y-scroll'>
                {filteredDataByClient[currentSearchedInput.current]?.map((dayCalendar, index) => {
                  return (
                    <Accordion isOpen={true} key={index} title={dayCalendar.date}>
                      {dayCalendar.schedule.filter(scheduleDay => {
                        if (!scheduleDay.client) return false;
                        // if the client name or phone includes the current searched input
                        // return true
                        return scheduleDay.client.name.toLowerCase().includes(currentSearchedInput.current.toLowerCase())
                          || scheduleDay.client.phone.toLowerCase().includes(currentSearchedInput.current.toLowerCase())
                      })
                        .map((scheduleDay, i) => (
                          <DayCalendarInfo highlightedText={currentSearchedInput.current} key={i}
                            schedule={scheduleDay}></DayCalendarInfo>))}
                    </Accordion>
                  )
                })
                }
              </div>
            )}
        </div>
      </div>
    </main>
  )
}