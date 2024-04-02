import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";

type DateComponentType = {
  setDate: (newValue: string) => void;
  defaultValue?: string | null;
};

const DateComponent: React.FC<DateComponentType> = ({
  setDate,
  defaultValue = null,
}) => {
  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    defaultValue ? dayjs(defaultValue, "DD-MM-YYYY") : null
  );

  useEffect(() => {
    // Оновити вибрану дату, якщо defaultValue змінено
    setSelectedDate(defaultValue ? dayjs(defaultValue) : null);
  }, [defaultValue]);

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
    const formattedDate = newValue ? newValue.format("DD-MM-YYYY") : "";
    setDate(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        format="DD-MM-YYYY"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
};

export default DateComponent;
