"use client"

import { useState, useEffect } from "react"

export default function ElapsedTimeCounter() {
  const [minutes, setMinutes] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes((prevMinutes) => prevMinutes + 1)
    }, 60000) // Update every minute (60000 ms)

    return () => clearInterval(interval)
  }, [])

  const days = Math.floor(minutes / (24 * 60))
  const hours = Math.floor((minutes % (24 * 60)) / 60)
  const remainingMinutes = minutes % 60

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <span className="px-8 text-yellow-500 text-sm" aria-live="polite">
      Runtime: {days} days {formatTime(hours)} hrs {formatTime(remainingMinutes)} mins
    </span>
  )
}

