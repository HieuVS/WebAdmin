const { format } = require('date-fns');
const { vilocale } = require('date-fns/locale/vi');

//export const weekdays = [...Array(7).keys()].map(i => vilocale.localize.day(i, { width: 'narrow'}));

const formatDate = (date) => {
    let parseDate = new Date(date)
    let formattedDate = format(parseDate, 'dd/MM', {
        locale: vilocale
    })
    
    return formattedDate;
}



const getLatest7Days = () => {
    const today = new Date();
    let latest7Days = [];
    for(let i = 6; i>=0; i--) {
        let newDate = new Date();
        latest7Days.push(new Date (newDate.setDate(today.getDate()-i)) )
    }

    return latest7Days;
}

module.exports = {
    formatDate,
    getLatest7Days
}