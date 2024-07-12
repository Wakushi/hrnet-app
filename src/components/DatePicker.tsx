import { MouseEvent, useEffect, useState } from "react"

const MAX_DAYS_IN_GRID = 42

type GridDay = {
  dayNumber: number
  month: number
  dayName?: string
}

export default function DatePicker({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (date: string) => void
}) {
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [daysOfMonth, setDaysOfMonth] = useState<GridDay[]>([])
  const [selectedMonth, setSelectedMonth] = useState<number>(
    getNow().getMonth()
  )
  const [selectedYear, setSelectedYear] = useState<number>(
    getNow().getFullYear()
  )
  const [selectedDate, setSelectedDate] = useState<Date>(
    value ? new Date(value) : new Date()
  )

  useEffect(() => {
    buildDaysGrid()

    const handleClickOutside = (e: Event) => {
      const modal = document.getElementById("datePickerModal")
      if (!modal) return
      const target = e.target as Node
      const targetId = (e.target as HTMLElement)?.id
      if (!modal.contains(target) && target !== modal && targetId !== id) {
        setShowCalendar(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [selectedMonth, selectedYear])

  function getCurrentTimeFrame(): Date {
    const time = new Date()
    time.setMonth(selectedMonth)
    time.setFullYear(selectedYear)
    time.setHours(0, 0, 0, 0)
    return time
  }

  function getNow(): Date {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    return now
  }

  function getDaysAmountInMonth(date: Date) {
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()
    const nextMonth = new Date(currentYear, currentMonth + 1, 1)
    nextMonth.setDate(nextMonth.getDate() - 1)
    return nextMonth.getDate()
  }

  function getYearsSelectorArray(): number[] {
    const YEARS_EDGE = 500
    const currentYear = getNow().getFullYear()
    const yearRangeStart = currentYear - YEARS_EDGE
    const yearRangeEnd = currentYear + YEARS_EDGE
    const rangeSize = yearRangeEnd - yearRangeStart
    return Array.from({ length: rangeSize }, (_, i) => yearRangeStart + i)
  }

  function formatDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  function buildDaysGrid() {
    const previousMonth = getCurrentTimeFrame()
    previousMonth.setMonth(previousMonth.getMonth() - 1)
    const previousMonthDaysAmount = getDaysAmountInMonth(previousMonth)

    const firstOfMonth = getCurrentTimeFrame()
    firstOfMonth.setDate(1)
    const currentMonthDaysAmount = getDaysAmountInMonth(getCurrentTimeFrame())

    let daysBeforeMonday = firstOfMonth.getDay() - 1

    if (daysBeforeMonday < 0) {
      daysBeforeMonday = 6
    }

    const previousMonthLastDays: GridDay[] = []

    for (let i = daysBeforeMonday; i > 0; i--) {
      previousMonthLastDays.push({
        dayNumber: previousMonthDaysAmount - i + 1,
        month: previousMonth.getMonth(),
      })
    }

    const daysGrid = previousMonthLastDays.concat(
      Array.from({ length: currentMonthDaysAmount }, (_, i) => ({
        dayNumber: i + 1,
        month: firstOfMonth.getMonth(),
      }))
    )

    const nextMonth = getCurrentTimeFrame()
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const remainingDays = MAX_DAYS_IN_GRID - daysGrid.length

    for (let i = 1; i <= remainingDays; i++) {
      daysGrid.push({
        dayNumber: i,
        month: nextMonth.getMonth(),
      })
    }

    setDaysOfMonth(daysGrid)
  }

  function onSelectDate(gridDay: GridDay) {
    const { dayNumber, month } = gridDay
    const date = new Date(`${selectedYear}-${month + 1}-${dayNumber}`)
    date.setHours(0, 0, 0, 0)
    setSelectedDate(date)
    onChange(formatDate(date))
    setShowCalendar(false)
  }

  function onDateInputClick(e: MouseEvent) {
    e.preventDefault()
    setShowCalendar((prevShowCalendar) => !prevShowCalendar)
  }

  return (
    <div className="relative">
      {showCalendar && (
        <div
          id="datePickerModal"
          className="absolute bg-white bottom-[100%] right-0 flex flex-col gap-2 shadow-lg p-2 rounded-md z-[999]"
        >
          <div className="flex items-center">
            {/* MONTH SELECTOR */}
            <select
              name="month"
              id="month"
              className="bg-white shadow-none"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(+e.target.value)}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, i) => (
                <option key={month} value={i}>
                  {month}
                </option>
              ))}
            </select>

            {/* YEARS SELECTOR */}
            <select
              name="year"
              id="year"
              className="bg-white shadow-none"
              value={selectedYear}
              onChange={(e) => setSelectedYear(+e.target.value)}
              size={1}
            >
              {getYearsSelectorArray().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-[200px]">
            <div className="grid grid-cols-7 gap-2 font-semibold">
              <span className="grid-box">M</span>
              <span className="grid-box">T</span>
              <span className="grid-box">W</span>
              <span className="grid-box">T</span>
              <span className="grid-box">F</span>
              <span className="grid-box">S</span>
              <span className="grid-box">S</span>
            </div>
            <div className="grid grid-cols-7 grid-rows-6 gap-2">
              {daysOfMonth.map((gridDay, i) => {
                return (
                  <div
                    key={i + 1}
                    className={`text-black text-center grid-box day-chip ${
                      gridDay.month !== selectedMonth ? "opacity-60" : ""
                    }`}
                    onClick={() => {
                      onSelectDate(gridDay)
                    }}
                  >
                    {gridDay.dayNumber}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      <input
        id={id}
        type="date"
        className="w-full"
        value={formatDate(selectedDate)}
        onChange={() => {}}
        onClick={(e) => onDateInputClick(e)}
      />
    </div>
  )
}
