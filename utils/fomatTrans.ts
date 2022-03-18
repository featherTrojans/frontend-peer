
import moment from "moment"


const tofancyDate = (date:Date) => {
  const currentdate = moment(date).subtract(0, 'days').calendar().split(" ")[0]

  if(currentdate !== "Today" && currentdate !== "Yesterday"){
    return `${moment(date).format("Do")}, ${moment(date).format("MMMM")}`
  }
  
  return currentdate
}

const formatData = (data:any)=>{
  if(data === undefined) return []
  if(data.length < 1) return []
  const finaldata = [];
  let currentdate = tofancyDate(data[0].createdAt);
  let changingarr = []
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