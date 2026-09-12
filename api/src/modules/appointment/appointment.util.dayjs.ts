import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
dayjs.extend(customParseFormat);

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)


export default dayjs