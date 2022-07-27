import { format, parse } from 'date-fns';
import vilocale from 'date-fns/locale/vi';

//export const weekdays = [...Array(7).keys()].map(i => vilocale.localize.day(i, { width: 'narrow'}));

const formatDate = (date) => {
    let parseDate = new Date(date)
    let formattedDate = format(parseDate, 'ccccc, dd/MM/yyyy-kk:mm', {
        locale: vilocale
    })
    
    return formattedDate;
}
export default formatDate;

export const formatDatePicker = (date) => {
    //console.log('date', date)
    let parseDate = new Date(date)
    let formattedDate = format(parseDate, 'ccccc, dd/MM/yyyy', {
        locale: vilocale
    })
    
    return formattedDate;
}

export const formatTimePicker = (date) => {
    let parseDate = new Date(date)
    let formattedDate = format(parseDate, 'kk:m', {
        locale: vilocale
    })
    
    return formattedDate;
}

export const formatDay = (date) => {
    let parseDate = new Date(date)
    let formattedDate = format(parseDate, 'dd/MM/yyyy', {
        locale: vilocale
    })
    
    return formattedDate;
}