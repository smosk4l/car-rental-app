'use client';

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { StyledCalendar, NavButton } from "./styles";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  month,
  onMonthChange,
  ...props
}: CalendarProps) {
  const now = React.useMemo(() => new Date(), []);
  const startOfCurrentMonth = React.useMemo(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
    [now]
  );
  const [currentMonth, setCurrentMonth] = React.useState<Date>(month || startOfCurrentMonth);

  const handleMonthChange = React.useCallback((newMonth: Date) => {
    setCurrentMonth(newMonth);
    onMonthChange?.(newMonth);
  }, [onMonthChange]);

  // Custom Caption component with proper navigation buttons
  const CustomCaption = React.useCallback(
    (props: { calendarMonth: { date: Date }; displayIndex: number }) => {
      const { calendarMonth } = props;
      const displayMonth = calendarMonth.date;

      const goToPreviousMonth = () => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        handleMonthChange(newMonth);
      };

      const goToNextMonth = () => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        handleMonthChange(newMonth);
      };

      const isPreviousDisabled =
        currentMonth.getFullYear() === now.getFullYear() &&
        currentMonth.getMonth() <= now.getMonth();

      const monthYear = displayMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      });

      return (
        <div className="rdp-caption">
          <NavButton
            type="button"
            className="rdp-nav_button rdp-nav_button_previous"
            onClick={goToPreviousMonth}
            disabled={isPreviousDisabled}
            aria-label="Go to previous month"
          >
            <ChevronLeft />
          </NavButton>
          <div className="rdp-caption_label">
            {monthYear}
          </div>
          <NavButton
            type="button"
            className="rdp-nav_button rdp-nav_button_next"
            onClick={goToNextMonth}
            aria-label="Go to next month"
          >
            <ChevronRight />
          </NavButton>
        </div>
      );
    },
    [currentMonth, handleMonthChange, now]
  );

  return (
    <StyledCalendar className={className}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        classNames={classNames}
        components={{
          MonthCaption: CustomCaption,
        }}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        disabled={{ before: now }}
        startMonth={startOfCurrentMonth}
        {...props}
      />
    </StyledCalendar>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
