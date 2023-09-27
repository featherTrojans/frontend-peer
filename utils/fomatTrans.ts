
import moment from "moment"
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import advancedFormat from "dayjs/plugin/advancedFormat"

var thresholds = [
  { l: 's', r: 1 },
  { l: 'ss', r: 59, d: 'second' },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'h', r: 1 },
  { l: 'hh', r: 23, d: 'hour' },
  { l: 'd', r: 1 },
  { l: 'dd', r: 29, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y', r: 1 },
  { l: 'yy', d: 'year' }
]



var config = {
  thresholds: thresholds,
  rounding: Math.floor
}
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime, config)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'a few seconds',
    ss: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
})





export const tofancyDate = (date:Date) => {
  const currentdate = moment(date).subtract(0, 'days').calendar().split(" ")[0]
  const currentdayjs = dayjs(date).fromNow()
  console.log(currentdayjs, 'nenmam')

  if(currentdate !== "Today" && currentdate !== "Yesterday"){
    return `${dayjs(date).format("Do")} ${dayjs(date).format("MMMM")}, ${dayjs(date).format("YYYY")}`
  }
  
  return currentdate
}

export const lastChatDate = (date: Date) => {
  const currentdate = moment(date).subtract(0, 'days').calendar().split(" ")[0]

  if(currentdate !== "Today" && currentdate !== "Yesterday"){
    return `${moment(date).format("DD/MM/YY")}`
  }  
  return currentdate

}

const formatData = (data:any)=>{
  console.log("Format transaction rendering")
  if(data === undefined) return []
  if(data.length < 1) return []
  const finaldata: {}[] = [];
  let currentdate = tofancyDate(data[0].createdAt);
  let changingarr: string[] = []
  for(let dataitem of data){
    if(tofancyDate(dataitem.createdAt) === currentdate){
      changingarr.push(dataitem);
    }else{
      finaldata.push({time:currentdate,data: changingarr})
      currentdate = tofancyDate(dataitem.createdAt);
      changingarr = [dataitem]
    }
  }
  finaldata.push({time:currentdate,data: changingarr})
  return finaldata
}

export default formatData