
const SECONDS_IN_AN_HOUR = 3600
const SECONDS_IN_A_MINUTE = 60

const wholeHours = seconds => Math.floor(seconds / SECONDS_IN_AN_HOUR)
const wholeMinutes = seconds => Math.floor(seconds % SECONDS_IN_AN_HOUR / SECONDS_IN_A_MINUTE)

const withProperPlurarity = (word, count) => `${word}${count === 1 ? '' : 's'}`

const displayTimePart = (timePart, description) => {
  if (timePart <= 0) return ""
  return `${timePart} ${withProperPlurarity(description, timePart)}`
}

export const displayTime = seconds => {
  seconds = Number(seconds)
  if (isNaN(seconds)) return ""

  return [
    displayTimePart(wholeHours(seconds), "hour"),
    displayTimePart(wholeMinutes(seconds), "minute")
  ].filter(s => s).join(' ')
}

const displayTimePart3 = (timePart, description) => {
  if (timePart <= 0) return ""
  return `${timePart} ${description}${timePart === 1 ? '' : 's'}`
}


const displayTimePart2 = (timePart, description) => {
  if (timePart <= 0) return ""
  return timePart + (timePart === 1 ? ` ${description} ` : ` ${description}s `)
}

const displayTimePart1 = (timePart, description) =>
  timePart > 0 ? timePart + (timePart === 1 ? ` ${description} ` : ` ${description}s `) : ""

export const displayTime6 = seconds => {
  seconds = Number(seconds)
  if (isNaN(seconds)) return ""

  return (
    displayTimePart(wholeHours(seconds), "hour") +
    displayTimePart(wholeMinutes(seconds), "minute")
  ).trim()
}

export const displayTime5 = seconds => {
  seconds = Number(seconds)
  if (isNaN(seconds)) return ""

  const hours = wholeHours(seconds)
  const minutes = wholeMinutes(seconds)
  const hoursDisplay = displayTimePart(hours, "hour")
  const minutesDisplay = displayTimePart(minutes, "minute")
  return (hoursDisplay + minutesDisplay).trim()
}

export const displayTime4 = seconds => {
  seconds = Number(seconds)
  if (isNaN(seconds)) return ""

  const hours = Math.floor(seconds / SECONDS_IN_AN_HOUR)
  const minutes = Math.floor(seconds % SECONDS_IN_AN_HOUR / SECONDS_IN_A_MINUTE)
  const hoursDisplay = displayTimePart(hours, "hour")
  const minutesDisplay = displayTimePart(minutes, "minute")
  return (hoursDisplay + minutesDisplay).trim()
}

export const displayTime3 = seconds => {
  seconds = Number(seconds)
  if (isNaN(seconds)) return ""

  const hours = Math.floor(seconds / SECONDS_IN_AN_HOUR)
  const minutes = Math.floor(seconds % SECONDS_IN_AN_HOUR / SECONDS_IN_A_MINUTE)
  const hoursDisplay = hours > 0 ? hours + (hours === 1 ? " hour " : " hours ") : ""
  const minutesDisplay = minutes > 0 ? minutes + (minutes === 1 ? " minute " : " minutes ") : ""
  return (hoursDisplay + minutesDisplay).trim()
}

export const displayTime2Point5 = seconds => {
  seconds = Number(seconds)
  if (isNaN(seconds)) return ""

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds % 3600 / 60)
  const hoursDisplay = hours > 0 ? hours + (hours === 1 ? " hour " : " hours ") : ""
  const minutesDisplay = minutes > 0 ? minutes + (minutes === 1 ? " minute " : " minutes ") : ""
  return (hoursDisplay + minutesDisplay).trim()
}

export const displayTime2 = seconds => {
  seconds = Number(seconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds % 3600 / 60)
  const hoursDisplay = hours > 0 ? hours + (hours === 1 ? " hour " : " hours ") : ""
  const minutesDisplay = minutes > 0 ? minutes + (minutes === 1 ? " minute " : " minutes ") : ""
  return (hoursDisplay + minutesDisplay).trim()
}

export const dispTime1 = s => {
  s = Number(s)
  const h = Math.floor(s / 3600)
  const m = Math.floor(s % 3600 / 60)
  const hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : ""
  const mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : ""
  return (hDisplay + mDisplay).trim()
}
