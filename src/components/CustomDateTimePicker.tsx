import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker, { DatePickerProps } from "react-datepicker";
import { addDaysToDateTime, minusDaysToDateTime } from "../utils/utils";
import { formatInterval } from "../utils/genesysCloudUtils";

export default function CustomDateTimePicker(props: DatePickerProps & {setData: (data:string) => void}) {
  const [startDate, setStartDate] = useState<Date>(props.selected ?? new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  return (
    <div className="w3-text-white" style={{"display":"flex", "gap":3,"lineHeight":2.3, "marginRight":5,}}>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => {
            const sDate: Date = date ?? new Date()
            const eDate: Date = addDaysToDateTime(sDate)
            setStartDate(sDate)
            setEndDate(eDate)
            props.setData(formatInterval(sDate, eDate))
        }}
        startDate={startDate}
        maxDate={minusDaysToDateTime(new Date())}
      />
      <span>to</span>
      <DatePicker
        disabled
        selectsEnd
        selected={endDate}
        maxDate={new Date()}
      />
    </div>
  );
}