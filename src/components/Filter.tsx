import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

const Filter = ({ tasks, filterStatus }) => {
  const [filterText, setFilterText] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [status, setStatus] = useState(filterStatus);
  const [category, setCategory] = useState("All");

  const taskStatuses = ["All", "Pending", "In Progress", "Completed"];
  const taskCategories = ["All", "Work", "Personal", "Shopping"];

  const handleFilterChange = () => {
    const filteredTasks = tasks.filter((task) => {
      const textMatch = task.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const dateMatch = dueDate
        ? task.dueDate === dueDate.format("YYYY-MM-DD")
        : true;
      const statusMatch = status === "All" || task.status === status;
      const categoryMatch = category === "All" || task.category === category;
      return textMatch && dateMatch && statusMatch && categoryMatch;
    });
  };

  const handleFilterClear = () => {
    setFilterText("");
    setDueDate(null);
    setStatus(filterStatus);
    setCategory("All");

  };

  return (
    <div className="flex flex-wrap gap-4 p-4 border-b border-gray-300 bg-white shadow-sm rounded-md">
      <TextField
        label="Task Name"
        variant="outlined"
        size="small"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        onKeyUp={handleFilterChange}
        className="w-48"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Due on"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          renderInput={(params) => (
            <TextField {...params} size="small" className="w-40" />
          )}
        />
      </LocalizationProvider>

      <FormControl variant="outlined" size="small" className="w-40">
        <InputLabel id="status-label">Task Status</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          label="Task Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          {taskStatuses.map((statusOption) => (
            <MenuItem key={statusOption} value={statusOption}>
              {statusOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" className="w-40">
        <InputLabel id="category-label">Task Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          label="Task Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {taskCategories.map((categoryOption) => (
            <MenuItem key={categoryOption} value={categoryOption}>
              {categoryOption}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFilterChange}
        className="h-10 px-4 rounded-md"
      >
        Apply Filter
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFilterClear}
        className="h-10 px-4 rounded-md"
      >
        Clear Filter
      </Button>
    </div>
  );
};

export default Filter;
