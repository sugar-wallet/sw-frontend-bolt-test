import Dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isYesterday from 'dayjs/plugin/isYesterday'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'

import { DATE_TIME_FORMATS } from '@sw-npm-packages/constants'

// extending dayjs plugins
Dayjs.extend(utc)
Dayjs.extend(timezone)
Dayjs.extend(isYesterday)
Dayjs.extend(isToday)
Dayjs.extend(isTomorrow)
Dayjs.extend(isBetween)
Dayjs.extend(isSameOrBefore)
Dayjs.extend(isSameOrAfter)
Dayjs.extend(weekday)
Dayjs.extend(advancedFormat)
Dayjs.extend(customParseFormat)
Dayjs.extend(duration)

export { Dayjs }

export const getDateString = (dateTime?: Dayjs.Dayjs): string => {
  const dateObject = dateTime ? Dayjs(dateTime) : Dayjs()

  return dateObject.format(DATE_TIME_FORMATS.date)
}

export const getDateUserDisplayFormatString = (
  dateTime?: string | null
): string => {
  const dateObject = dateTime ? Dayjs(dateTime) : Dayjs()

  return dateObject.format(DATE_TIME_FORMATS.dateUserDisplayFormat)
}

export const getFormattedDateString = (date: string) => {
  if (Dayjs().format(DATE_TIME_FORMATS.date) === date) {
    return 'Today'
  } else if (
    Dayjs().subtract(1, 'day').format(DATE_TIME_FORMATS.date) === date
  ) {
    return 'Yesterday'
  } else {
    return Dayjs(date, DATE_TIME_FORMATS.date).format('ddd DD MMMM')
  }
}
