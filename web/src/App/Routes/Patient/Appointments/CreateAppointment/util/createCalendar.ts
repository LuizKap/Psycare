
import type { Dayjs } from 'dayjs'

function createCalendar(date: Dayjs) {

    const previousMonth = date.subtract(1, 'month')
    const daysInMonth = date.daysInMonth()
    const startOfMonth = date.startOf('month').day()

    let monthDaysArray: number[] = []

    //Monta o mês
    for (let day = 1; day <= daysInMonth; day++) {
        monthDaysArray.push(day)
    }

    let previousMonthDaysArray: number[] = []

     //Monta os dias que devem ser mutados a partir do dia onde começou o mês
    for (let i = previousMonth.daysInMonth() - startOfMonth + 1; i <= previousMonth.daysInMonth(); i++) {
        previousMonthDaysArray.push(i)
    }
    

    return {
        monthDaysArray,
        previousMonthDaysArray
    }
}



export default createCalendar

