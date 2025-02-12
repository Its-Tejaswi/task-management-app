import React, { useState, useEffect } from "react";
import {
  AccessTime,
  FormatListNumbered,
  Logout,
  Search,
  SpaceDashboard,
} from "@mui/icons-material";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import TaskModal from "./TaskModal.tsx";
import DatePicker from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";

interface HeaderProps {
  onViewChange: (view: "list" | "board" | "activity") => void;
  setFilteredTasks: (tasks: any[]) => void;
}

const Header: React.FC<HeaderProps> = ({ onViewChange, setFilteredTasks }) => {
  const [filterText, setFilterText] = useState("");
  const [category, setCategory] = useState("All");
  const [dateRange, setDateRange] = useState<
    [DateObject | null, DateObject | null]
  >([null, null]);
  const [open, setOpen] = useState(false);

  const tasksList = useSelector((state) => state.tasks.tasksList);
  const taskCategories = ["All", "Work", "Personal", "Shopping"];

  useEffect(() => {
    const filtered = tasksList.filter((task) => {
      const textMatch = task.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const categoryMatch = category === "All" || task.category === category;

      let dateMatch = true;
      if (dateRange[0] && dateRange[1]) {
        const taskDate = new Date(task.dueDate);
        dateMatch =
          taskDate >= dateRange[0]?.toDate() &&
          taskDate <= dateRange[1]?.toDate();
      }

      return textMatch && categoryMatch && dateMatch;
    });

    setFilteredTasks(filtered);
  }, [filterText, dateRange, category, tasksList]);

  const handleClearFilter = () => {
    setDateRange([null, null]);
    setCategory("All");
    setFilterText("");
  };

  return (
    <header className="flex flex-col gap-4 px-8 py-4 bg-white shadow-md m-8">
      <div className="flex items-center justify-between">
        {/* Top Row: Title & User */}
        <div className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/task.png"
            alt="TaskBuddy Logo"
            className="w-7 h-7"
          />
          <h1 className="text-2xl font-semibold text-gray-800">TaskBuddy</h1>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-800 font-medium">Aravind</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Second Row: List/Board & Logout */}
        <nav className="flex items-center gap-6 bg-white p-4 rounded-lg shadow-md">
          {/* List View */}
          <button
            className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-purple-500"
            onClick={() => onViewChange("list")}
          >
            <FormatListNumbered className="w-6 h-6" />
            List
          </button>

          {/* Board View */}
          <button
            className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-purple-500"
            onClick={() => onViewChange("board")}
          >
            <SpaceDashboard className="w-6 h-6" />
            Board
          </button>

          {/* Activity View */}
          <button
            className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-purple-500"
            onClick={() => onViewChange("activity")}
          >
            <AccessTime className="w-6 h-6" />
            Activity
          </button>
        </nav>
        <button
          className="bg-[#FFF9F9] flex items-center gap-2 px-3 py-1 border rounded-lg hover:bg-[#FAD1EB] transition"
          aria-label="Logout"
        >
          <Logout className="text-gray-600" />
          <span className="text-gray-700">Logout</span>
        </button>
      </div>

      <div className="flex items-center justify-between py-2">
        {/* Filters Section */}
        <div className="flex items-center gap-4">
          <span className="text-gray-500 font-medium">Filter by:</span>

          {/* Category Filter */}
          <div className="relative w-40">
            <FormControl variant="outlined" size="small" className="w-full">
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                className="rounded-full px-4 text-gray-700"
                sx={{ borderRadius: "10px", borderColor: "gray" }}
              >
                <MenuItem value="" disabled>
                  Category
                </MenuItem>
                {taskCategories.map((categoryOption) => (
                  <MenuItem key={categoryOption} value={categoryOption}>
                    {categoryOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="relative w-60 flex items-center gap-2">
            <DatePicker
              buttons
              value={dateRange}
              onChange={(range) => setDateRange(range)}
              range
              numberOfMonths={1}
              format="DD-MM-YYYY"
              placeholder="Select date range"
              className="border border-gray-300 rounded-lg px-2 py-1"
              style={{
                height: "42px",
                fontSize: "16px",
                padding: "10px",
                borderRadius: "10px",
                borderColor: "gray",
              }}
            />

            <Button
              variant="outlined"
              onClick={handleClearFilter}
              className="px-4 py-1 rounded-lg shadow hover:bg-blue-150 transition"
              sx={{ color: "black", borderColor: "gray" }}
              style={{
                height: "42px",
                fontSize: "16px",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Search & Add Task Section */}
        <div className="flex items-center gap-6">
          {/* Search Input */}
          <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-purple-500">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-48 bg-transparent text-gray-700 focus:outline-none ml-2"
            />
          </div>

          {/* Add Task Button */}
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition"
            onClick={() => setOpen(true)}
          >
            ADD TASK
          </button>
          <TaskModal open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
