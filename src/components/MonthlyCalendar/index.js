import React from "react";

import MonthPicker from "./month-picker";
import DateButton from "./date-button";
import { getDatesOfMonth } from "./util";

import "./styles.css";

const MonthlyCalendar = React.forwardRef(
  (
    {
      onChange,
      selected = new Date(),
      minDate = new Date(1900, 0, 1),
      maxDate,
      workdays,
      className,
      ...props
    },
    ref
  ) => {
    const minDateVal = minDate.getTime();
    const maxDateVal =
      typeof maxDate === "undefined" ? Number.POSITIVE_INFINITY : maxDate.getTime();

    const [monthDate, setMonthDate] = React.useState(selected);
    const [selectedDate, setSelectedDate] = React.useState(selected);

    const nextMonth = React.useCallback(
      () =>
        setMonthDate((d) => {
          const m = d.getMonth();
          const y = d.getFullYear();
          if (m === 11) {
            return new Date(y + 1, 0);
          } else {
            return new Date(y, m + 1);
          }
        }),
      []
    );

    const prevMonth = React.useCallback(
      () =>
        setMonthDate((d) => {
          const m = d.getMonth();
          const y = d.getFullYear();
          if (m === 0) {
            return new Date(y - 1, 11);
          } else {
            return new Date(y, m - 1);
          }
        }),
      []
    );

    const setNewSelectedDate = React.useCallback(
      (date) => {
        setSelectedDate(date);
        onChange?.(date);
      },
      [onChange, setSelectedDate]
    );

    if (selected.getTime() > maxDateVal || selected.getTime() < minDateVal) {
      console.warn("DatePicker: Selected date must fall in the range of maxDate and minDate");
    }

    // TODO: arrow-keys navigation
    return (
      <div
        className={`sdp ${className ?? ""}`}
        aria-label="Date Picker"
        tabIndex={0}
        ref={ref}
        {...props}
      >
        <MonthPicker
          month={monthDate.getMonth()}
          year={monthDate.getFullYear()}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
        />
        <div className="sdp--dates-grid">
          <p className="sdp--text sdp--text__inactive">Sun</p>
          <p className="sdp--text sdp--text__inactive">Mon</p>
          <p className="sdp--text sdp--text__inactive">Tue</p>
          <p className="sdp--text sdp--text__inactive">Wed</p>
          <p className="sdp--text sdp--text__inactive">Thu</p>
          <p className="sdp--text sdp--text__inactive">Fri</p>
          <p className="sdp--text sdp--text__inactive">Sat</p>

          {getDatesOfMonth(monthDate).map(({ d, active }, i) => {
            const dVal = d.getTime();
            return (
              <DateButton
                key={dVal}
                date={d}
                active={dVal >= minDateVal && dVal <= maxDateVal && active}
                selected={selectedDate.toDateString() === d.toDateString()}
                onClick={setNewSelectedDate}
                workday={!!((i + d.getDay()) % 3)}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

MonthlyCalendar.displayName = "DatePicker";

export default MonthlyCalendar;
