import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker, { DatePickerProps } from "react-datepicker";
import { addDaysToDateTime } from "../utils/utils";

export default function CustomDateTimePicker(props:DatePickerProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [_, setEndDate] = useState<Date>(new Date());

  return (
    <div className="w3-text-white" style={{"display":"flex", "gap":3,"lineHeight":2.3, "marginRight":5,}}>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => {
            setStartDate(date ?? new Date())
            setEndDate(date ?? new Date())
        }}
        startDate={startDate}
      />
      <span>to</span>
      <DatePicker
        disabled
        selectsEnd
        selected={addDaysToDateTime(startDate)}
        // endDate={endDate}
        // startDate={startDate}
        // maxDate={addDaysToDateTime(startDate)}
      />
    </div>
  );
}