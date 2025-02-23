"use client"

interface CalendarProps {
  currentMonth: Date
  selectedDate?: Date
  onSelectDate: (date: Date) => void
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const getOccupiedDays = (year: number, month: number) => {
  // This is a placeholder. In a real application, you would fetch this data from a backend.
  const occupiedDates = [
    new Date(2025, 6, 1),
    new Date(2025, 6, 2),
    new Date(2025, 6, 4),
    new Date(2025, 6, 11),
    new Date(2025, 6, 15),
    new Date(2025, 6, 16),
    new Date(2025, 6, 17),
    new Date(2025, 6, 20),
  ]
  return occupiedDates
    .filter((date) => date.getFullYear() === year && date.getMonth() === month)
    .map((date) => date.getDate())
}

export function Calendar({ currentMonth, selectedDate, onSelectDate }: CalendarProps) {
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const startingDayIndex = (firstDayOfMonth.getDay() + 6) % 7 // Adjusting to start from Monday

  const days = []
  const totalDays = lastDayOfMonth.getDate()

  // Previous month days
  for (let i = 0; i < startingDayIndex; i++) {
    days.push({
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), -startingDayIndex + i + 1),
      isCurrentMonth: false,
    })
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i),
      isCurrentMonth: true,
    })
  }

  const occupiedDays = getOccupiedDays(currentMonth.getFullYear(), currentMonth.getMonth())

  return (
    <div>
      <div className="grid grid-cols-7 gap-4 mb-4">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {days.map(({ date, isCurrentMonth }, index) => {
          const dayOfMonth = date.getDate()
          const isOccupied = occupiedDays.includes(dayOfMonth) && isCurrentMonth
          const isSelected = selectedDate?.toDateString() === date.toDateString()

          return (
            <button
              key={index}
              onClick={() => isCurrentMonth && !isOccupied && onSelectDate(date)}
              disabled={!isCurrentMonth || isOccupied}
              className={`
                p-2 rounded-xl text-center min-h-[80px] flex flex-col items-center justify-between
                ${!isCurrentMonth ? "text-gray-300 bg-gray-50" : ""}
                ${isSelected ? "border-2 border-[#E85C3F]" : "border border-gray-100"}
                ${isCurrentMonth && !isOccupied ? "hover:border-[#E85C3F]" : ""}
              `}
            >
              <span className="text-lg font-medium">{dayOfMonth}</span>
              {isCurrentMonth && (
                <span className={`text-sm ${isOccupied ? "text-gray-400" : "text-[#E85C3F]"}`}>
                  {isOccupied ? "Occupé" : "Libre"}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

