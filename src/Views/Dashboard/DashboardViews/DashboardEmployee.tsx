import { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RefreshmentCard from "./components/RefreshmentCard";
import { Link } from "react-router";
function DashboardEmployee() {
  const items = [
    { label: "LHM", value: "LHM" },
    { label: "LEX", value: "LEX" },
    { label: "MCC", value: "MCC" },
  ];
  const roomOverview = [
    { room: "214", floor: "1. Stock", startTime: "12:00", status: "Belegt" },
    { room: "215", floor: "1. Stock", startTime: "13:00", status: "Frei" },
    { room: "216", floor: "1. Stock", startTime: "14:00", status: "Belegt" },
  ];
  const [date, setDate] = useState<Date>();
  return (
    <div className="flex flex-col py-4 px-4 gap-4  ">
      <div className="  grid grid-cols-2 self-center md:gap-5">
        <Select items={items}>
          <SelectTrigger className="w-fit p-5 bg-card/20 hover:bg-transparent ">
            <SelectValue
              placeholder="Standort"
              className="text-muted-foreground text-base lg:text-xl"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                data-empty={!date}
                className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground p-5 hover:bg-transparent bg-card/20 w-fit"
              />
            }
          >
            {date ? (
              <span className="text-muted-foreground text-base lg:text-xl">
                {format(date, "dd.MM.yyyy")}
              </span>
            ) : (
              <span className="text-muted-foreground w-fit text-base lg:text-xl">
                Pick a date
              </span>
            )}
            <CalendarIcon className="text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card/20 border border-border rounded-xl text-muted-foreground text-center p-4">
          <span className="text-2xl font-bold ">5</span>
          <br></br>
          <span>Räume belegt</span>
        </div>
        <div className="bg-card/20 border border-border rounded-xl text-muted-foreground text-center p-4">
          <span className="text-2xl font-bold">5</span>
          <br></br>
          <span>Räume Service</span>
        </div>
        <div className="bg-card/20 border border-border rounded-xl text-muted-foreground text-center p-4">
          <span className="text-2xl font-bold">5</span>
          <br></br>
          <span>Räume Frei</span>
        </div>
      </div>
      <div className="w-full flex flex-col bg-card/20 border border-border rounded-xl text-muted-foreground">
        <h2 className="text-lg font-bold p-4">Bewirtungen Heute</h2>
        <div className="grid grid-cols-1 gap-4 max-h-75 overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
          <Link
            className="flex justify-center"
            to={`araDine/dashboard/refreshment-detail/${"2"}`}
          >
            <RefreshmentCard
              title="Müller"
              startTime="12:00"
              endTime="13:00"
              numberPax={15}
              date={new Date().toLocaleDateString("de-DE")}
              room="214"
              refresh={false}
              refreshmentId="1"
            ></RefreshmentCard>
          </Link>
          <Link
            className="flex justify-center"
            to={`araDine/dashboard/refreshment-detail/${"2"}`}
          >
            <RefreshmentCard
              title="Müller"
              startTime="12:00"
              endTime="13:00"
              numberPax={15}
              date={new Date().toLocaleDateString("de-DE")}
              room="214"
              refresh={false}
              refreshmentId="1"
            ></RefreshmentCard>
          </Link>
          <Link
            className="flex justify-center"
            to={`araDine/dashboard/refreshment-detail/${"2"}`}
          >
            <RefreshmentCard
              title="Müller"
              startTime="12:00"
              endTime="13:00"
              numberPax={15}
              date={new Date().toLocaleDateString("de-DE")}
              room="214"
              refresh={false}
              refreshmentId="1"
            ></RefreshmentCard>
          </Link>
          <Link
            className="flex justify-center"
            to={`araDine/dashboard/refreshment-detail/${"2"}`}
          >
            <RefreshmentCard
              title="Müller"
              startTime="12:00"
              endTime="13:00"
              numberPax={15}
              date={new Date().toLocaleDateString("de-DE")}
              room="214"
              refresh={false}
              refreshmentId="1"
            ></RefreshmentCard>
          </Link>
        </div>
      </div>
      <div className=" flex flex-col bg-card/20 border border-border py-4 px-6 rounded-xl text-muted-foreground">
        <h2 className="text-lg font-bold   ">Raum Übersicht</h2>
        <div className="flex flex-col px-1 ">
          <div className="grid grid-cols-4">
            <p>Räume</p> <p>Startzeit</p> <p>Status</p>
            <p>Aktion</p>
          </div>
          {roomOverview.map((room) => (
            <div
              className="grid grid-cols-4 border-b border-border  py-0.5   "
              key={room.room}
            >
              <p>{room.room}</p>
              <p>{room.startTime}</p>
              <p>{room.status}</p>
              <Button className="w-fit " variant="outline">
                edit
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardEmployee;
