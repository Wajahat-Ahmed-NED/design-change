import * as React from "react";
import "./styles.css";

const DateButton = ({ date, active, onClick, selected, workday }) => (
  <button
    className={`sdp--date-btn sdp--text ${!active ? "sdp--text__inactive" : ""}`}
    onClick={() => onClick(date)}
    tabIndex={active ? 0 : -1}
    aria-label={`${selected ? "Currently selected" : "Select"} ${date.toLocaleDateString("en-US")}`}
    type="button"
  >
    <div className={`${selected ? "sdp--date-btn__selected" : "sdp--square-btn"}`}>
      {date.getDate()}
    </div>
    
    {active && (
      <div
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "8px",
          backgroundColor: workday ? "#D37498" : "#FFF",
          marginTop: "2px",
        }}
      />
    )}
  </button>
);

export default React.memo(
  DateButton,
  (p, n) =>
    p.date.getDay() === n.date.getDay() && p.active === n.active && p.selected === n.selected
);
