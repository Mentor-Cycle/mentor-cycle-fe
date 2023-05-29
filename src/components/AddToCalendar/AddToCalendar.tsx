import { useState } from "react";
import { AddToCalendarProps } from "./types";
import { FiCalendar, FiExternalLink } from "react-icons/fi";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

const AddToCalendarButton = ({
  startDate,
  endDate,
  title,
  description,
}: AddToCalendarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState("");

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const startDateFormated = new Date(startDate);
  const endDateFormated = new Date(endDate);

  const startDateAdjusted = new Date(
    startDateFormated.getTime() - 3 * 60 * 60 * 1000
  );
  const endDateAdjusted = new Date(
    endDateFormated.getTime() - 3 * 60 * 60 * 1000
  );

  const googleStartDate = startDateAdjusted
    .toISOString()
    .replace(/[-:]/g, "")
    .slice(0, -5);
  const googleEndDate = endDateAdjusted
    .toISOString()
    .replace(/[-:]/g, "")
    .slice(0, -5);

  const outlookStartDate = startDateFormated.toISOString().slice(0, -8);
  const outlookEndDate = endDateFormated.toISOString().slice(0, -8);

  const handleOptionClick = (calendar: string) => {
    setSelectedCalendar(calendar);

    if (calendar === "google") {
      window.open(
        `https://www.google.com/calendar/render?action=TEMPLATE&dates=${encodeURIComponent(
          googleStartDate
        )}/${encodeURIComponent(googleEndDate)}&text=${encodeURIComponent(
          title
        )}&details=${encodeURIComponent(description)}`,
        "_blank"
      );
    } else if (calendar === "outlook") {
      window.open(
        `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
          title
        )}&startdt=${encodeURIComponent(
          outlookStartDate
        )}&enddt=${encodeURIComponent(
          outlookEndDate
        )}&body=${encodeURIComponent(description)}`,
        "_blank"
      );
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="relative flex items-center outline-none px-4 py-2 bg-green-500 text-white rounded"
        onClick={handleButtonClick}
      >
        <span className="mr-2">Adicionar ao calendário</span>
        <FiCalendar />
      </button>
      {isOpen && (
        <div className="absolute top-6 left-0 z-10 w-40 mt-2 bg-white rounded shadow">
          <button
            className="flex items-center w-full p-2 hover:bg-gray-100"
            onClick={() => handleOptionClick("google")}
          >
            <FaGoogle className="mr-2" />
            Google
          </button>
          <button
            className="flex items-center w-full p-2 hover:bg-gray-100"
            onClick={() => handleOptionClick("outlook")}
          >
            <FaMicrosoft className="mr-2" />
            Outlook
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCalendarButton;
