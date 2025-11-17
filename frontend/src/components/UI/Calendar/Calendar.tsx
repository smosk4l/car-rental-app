'use client';

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { StyledCalendar } from "./styles";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <StyledCalendar className={className}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        classNames={classNames}
        components={{
          Chevron: ({ orientation }) => 
            orientation === "left" ? <ChevronLeft /> : <ChevronRight />
        }}
        {...props}
      />
    </StyledCalendar>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
