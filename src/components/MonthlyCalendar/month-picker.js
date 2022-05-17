import React from "react";
import { getMonthNameFromNumber } from "./util";

const MonthPicker = ({ month, year, nextMonth, prevMonth }) => (
  <div className="sdp--month-picker">
    <div className="sdp--arrows">
      <button
        className="sdp--square-btn sdp--square-btn__shadowed"
        onClick={prevMonth}
        aria-label="Go to previous month"
        type="button"
      >
        <svg width="15" height="28" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.9" d="M0.32666 14.1285V14.0813L12.4503 0.97168L14.1511 2.76364L3.64104 14.1285L14.1511 25.4462L12.4503 27.2381L0.32666 14.1285Z" fill="#36818B"/>
        </svg>

      </button>

      <p
        className="sdp--text sdp--month-name"
        aria-label={`${getMonthNameFromNumber(month)} ${year} is currently open in Date Picker`}
        tabIndex={0}
      >
        {getMonthNameFromNumber(month)} {year}
      </p>

      <button
        className="sdp--square-btn sdp--square-btn__shadowed"
        onClick={nextMonth}
        aria-label="Go to next month"
        type="button"
      >
        <svg width="15" height="28" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.9" d="M14.6743 14.1285V14.0813L2.55067 0.97168L0.849867 2.76364L11.3599 14.1285L0.849867 25.4462L2.55067 27.2381L14.6743 14.1285Z" fill="#36818B"/>
        </svg>
      </button>
    </div>
  </div>
);

export default MonthPicker;
