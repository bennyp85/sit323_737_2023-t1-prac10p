const moment = require('moment')


const timeAgo = (utcTime, currTime) => {
    const past = moment(utcTime)
    const result = past.from(moment(currTime))
    return result
}


const formatCalculations = (calculations) => {
    const currTime = moment.now()
    calculations.forEach(calculation => {
        calculation.timeAgo= timeAgo(calculation.timestamp, currTime)
    });
    return calculations
    
}

module.exports = {
    timeAgo: timeAgo,
    formatCalculations: formatCalculations
}