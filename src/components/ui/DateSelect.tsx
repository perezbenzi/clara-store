"use client";

import { useState, useRef, useEffect } from "react";

export interface SelectedDate {
  day: number;
  month: number;
  year: number;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getAvailableDays(): Date[] {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 2);
  minDate.setHours(0, 0, 0, 0);
  const days: Date[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(minDate);
    d.setDate(minDate.getDate() + i);
    days.push(d);
  }
  return days;
}

interface CustomSelectProps {
  label: string;
  displayValue: string;
  placeholder: string;
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

function CustomSelect({
  label,
  displayValue,
  placeholder,
  options,
  selected,
  onSelect,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-[#666]">
        {label}
      </label>
      <div ref={ref} className="relative">
        <div
          className="bg-[#ebe9e2] border border-[#d5d2ca] px-3 py-2.5 text-sm text-ink flex items-center justify-between cursor-pointer [border-radius:0]"
          style={{ backgroundColor: "#ebe9e2", borderRadius: 0 }}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={displayValue ? "text-[#111]" : "text-[#bbb]"}>
            {displayValue || placeholder}
          </span>
          <span
            className={`text-muted text-xs transition-transform duration-150 ${
              open ? "-rotate-90" : "rotate-90"
            }`}
          >
            ›
          </span>
        </div>

        {open && options.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-[#d5d2ca] border-t-0 z-20 max-h-40 overflow-y-auto">
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`px-3 py-2 text-sm cursor-pointer border-b border-[#f0eee8] ${
                  selected === opt.value
                    ? "bg-[#111] text-white"
                    : "text-ink hover:bg-[#f0eee8]"
                }`}
                onClick={() => {
                  onSelect(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface DateSelectProps {
  value: SelectedDate | null;
  onChange: (date: SelectedDate) => void;
}

export default function DateSelect({ value, onChange }: DateSelectProps) {
  const allDays = getAvailableDays();

  const months = Array.from(
    new Map(
      allDays.map((d) => [
        `${d.getFullYear()}-${d.getMonth()}`,
        { year: d.getFullYear(), month: d.getMonth() },
      ])
    ).values()
  );

  const daysForMonth = value
    ? allDays.filter(
        (d) => d.getMonth() === value.month && d.getFullYear() === value.year
      )
    : [];

  const selectedMonthKey = value ? `${value.year}-${value.month}` : "";

  function handleMonthChange(key: string) {
    const [year, month] = key.split("-").map(Number);
    const firstDay = allDays.find(
      (d) => d.getMonth() === month && d.getFullYear() === year
    );
    if (firstDay) {
      onChange({ day: firstDay.getDate(), month, year });
    }
  }

  function handleDayChange(dayStr: string) {
    if (!value) return;
    onChange({ ...value, day: Number(dayStr) });
  }

  const monthOptions = months.map((m) => ({
    value: `${m.year}-${m.month}`,
    label: MONTH_NAMES[m.month],
  }));

  const dayOptions = daysForMonth.map((d) => ({
    value: String(d.getDate()),
    label: String(d.getDate()),
  }));

  return (
    <div className="grid grid-cols-2 gap-3">
      <CustomSelect
        label="Month"
        displayValue={value ? MONTH_NAMES[value.month] : ""}
        placeholder="Select month"
        options={monthOptions}
        selected={selectedMonthKey}
        onSelect={handleMonthChange}
      />
      <CustomSelect
        label="Day"
        displayValue={value ? String(value.day) : ""}
        placeholder="Select day"
        options={dayOptions}
        selected={value ? String(value.day) : ""}
        onSelect={handleDayChange}
      />
    </div>
  );
}
