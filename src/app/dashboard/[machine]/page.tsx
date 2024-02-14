"use client";

import { Accordion } from "@/components/ui/Accordion";
import { DayCalendarInfo } from "@/components/ui/day-calendar-info";
import { useState } from "react";
import { useFetchSchedule } from "@/hooks/useFetchSchedule";
import Spinner from "@/components/misc/Spinner";
import { SearchBar } from "@/components/ui/search-bar";
import { Calendar, Schedule } from "@/app/types/types";
import { useFilterData } from "@/hooks/useFilterData";
import { DropdownMenuItems } from "@/app/dashboard/_components/dropdown-items";
import { buttonVariants } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Dashboard({ params }: { params: { machine: string } }) {
  const [status, dayCalendars, error] = useFetchSchedule<Calendar>("anyURL");
  const [typeSearch, setTypeSearch] = useState<"fecha" | "paciente">("fecha");
  const inputPlaceholder =
    typeSearch === "fecha"
      ? "Busca por dia"
      : "Busca por numéro de paciente o teléfono";
  const {
    filterData,
    filteredDataByDate,
    filteredDataByClient,
    currentSearchedInput,
  } = useFilterData(dayCalendars!, status, typeSearch);
  const path = params.machine;

  const isMatch = (scheduleDay: Schedule) => {
    if (!scheduleDay.client) return false;
    // if the client name or phone includes the current searched input
    // return true
    return (
      scheduleDay.client.name
        .toLowerCase()
        .includes(currentSearchedInput.toLowerCase()) ||
      scheduleDay.client.phone
        .toLowerCase()
        .includes(currentSearchedInput.toLowerCase())
    );
  };

  const renderDayCalendarInfo = (isPacient: boolean) => {
    const Component = (schedule: Schedule, i: number) => {
      if (isPacient)
        return (
          <DayCalendarInfo
            highlightedText={currentSearchedInput}
            key={i}
            schedule={schedule}
          ></DayCalendarInfo>
        );
      return <DayCalendarInfo key={i} schedule={schedule}></DayCalendarInfo>;
    };
    // to make ES Lint happy
    Component.displayName = "DayCalendarInfo";
    return Component;
  };
  return (
    <div className="flex flex-col gap-5 items-center w-full overflow-y-hidden p-4">
      <SearchBar
        onInput={filterData}
        placeholder={inputPlaceholder}
        dropdownElements={
          <DropdownMenuItems
            typeSearch={typeSearch}
            setTypeSearch={setTypeSearch}
          ></DropdownMenuItems>
        }
      ></SearchBar>

      <div className="w-full flex justify-end md:px-10">
        <Link
          href={`/dashboard/${path}/new`}
          className={`${buttonVariants({ variant: "default" })} font-semibold flex gap-3`}
        >
          <span>Crear Cita</span>
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Link>
      </div>
      {status === "loading" && <Spinner className="absolute top-0" />}
      {status === "error" && <div>{error?.name}</div>}
      {status === "success" && typeSearch === "fecha" && (
        <div className="w-full overflow-y-scroll no-scrollbar">
          {filteredDataByDate[currentSearchedInput]?.map(
            (dayCalendar, index) => {
              return (
                <Accordion
                  highlightedText={currentSearchedInput}
                  key={index}
                  title={dayCalendar.date}
                >
                  {dayCalendar.schedule.map(renderDayCalendarInfo(false))}
                </Accordion>
              );
            },
          )}
        </div>
      )}
      {status === "success" && typeSearch === "paciente" && (
        <div className="w-full overflow-y-scroll no-scrollbar">
          {filteredDataByClient[currentSearchedInput]
            ?.filter(({ schedule }) => schedule.some(isMatch))
            .map((dayCalendar, index) => {
              return (
                <Accordion isOpen={true} key={index} title={dayCalendar.date}>
                  {dayCalendar.schedule
                    .filter(isMatch)
                    .map(renderDayCalendarInfo(true))}
                </Accordion>
              );
            })}
        </div>
      )}
    </div>
  );
}
