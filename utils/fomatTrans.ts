import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

var thresholds = [
  { l: "s", r: 1 },
  { l: "ss", r: 59, d: "second" },
  { l: "m", r: 1 },
  { l: "mm", r: 59, d: "minute" },
  { l: "h", r: 1 },
  { l: "hh", r: 23, d: "hour" },
  { l: "d", r: 1 },
  { l: "dd", r: 29, d: "day" },
  { l: "M", r: 1 },
  { l: "MM", r: 11, d: "month" },
  { l: "y", r: 1 },
  { l: "yy", d: "year" },
];

var config = {
  thresholds: thresholds,
  rounding: Math.floor,
};
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime, config);
dayjs.extend(updateLocale);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a seconds",
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
    yy: "%d years",
  },
});

export const tofancyDate = (date: Date) => {
  if (dayjs(date).isToday()) {
    return "Today";
  }
  if (dayjs(date).isYesterday()) {
    return "Yesterday";
  } else {
    return `${dayjs(date).format("Do")} ${dayjs(date).format("MMMM")}, ${dayjs(
      date
    ).format("YYYY")}`;
  }
};

export const formatTime = (time: Date) => {
  return `${dayjs(time).format("h:mm")} ${dayjs(time).format("a")}`;
};

export const lastChatDate = (date: Date) => {
  if (dayjs(date).isToday() || dayjs(date).isYesterday()) {
    return dayjs(date).fromNow();
  } else {
    return `${dayjs(date).format("DD/MM/YY")}`;
  }
};

export const differenceInMinutes = (futureDate: Date, pastDate: Date) => {
  const date1 = dayjs(futureDate);
  const date2 = dayjs(pastDate);
  return date1.diff(date2, "minute");
};

const formatData = (data: any) => {
  console.log("Format transaction rendering");
  if (data === undefined) return [];
  if (data.length < 1) return [];
  const finaldata: {}[] = [];
  let currentdate = tofancyDate(data[0].createdAt);
  let changingarr: string[] = [];
  for (let dataitem of data) {
    if (tofancyDate(dataitem.createdAt) === currentdate) {
      changingarr.push(dataitem);
    } else {
      finaldata.push({ time: currentdate, data: changingarr });
      currentdate = tofancyDate(dataitem.createdAt);
      changingarr = [dataitem];
    }
  }
  finaldata.push({ time: currentdate, data: changingarr });
  return finaldata;
};

export default formatData;
