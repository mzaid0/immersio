"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const formatDate = (date?: Date) =>
  date
    ? date.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
    : "";

const isValidDate = (date?: Date) => !!date && !Number.isNaN(date.getTime());

interface Props {
  value: string;
  onChange: (isoDate: string) => void;
  label?: string;
  id?: string;
  error?: string;
}

export default function CalendarDatePicker({ value, onChange, label = "Date", id = "date", error }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);
  const [month, setMonth] = useState<Date | undefined>(date);
  const [displayValue, setDisplayValue] = useState(formatDate(date));

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id} className="px-1">{label}</Label>
      <div className="relative flex gap-2">
        <Input
          id={id}
          value={displayValue}
          placeholder="June 01, 2000"
          className={`bg-background pr-10 ${error ? "border-red-500" : ""}`}
          onChange={(e) => {
            const typed = e.target.value;
            const d = new Date(typed);
            setDisplayValue(typed);
            if (isValidDate(d)) {
              setDate(d);
              setMonth(d);
              onChange(d.toISOString().split("T")[0]);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" className="absolute right-2 top-1/2 size-6 -translate-y-1/2">
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(d) => {
                setDate(d);
                setDisplayValue(formatDate(d));
                onChange(d ? d.toISOString().split("T")[0] : "");
                setOpen(false);
              }}
              fromYear={1900}
              toYear={new Date().getFullYear()}
              disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
