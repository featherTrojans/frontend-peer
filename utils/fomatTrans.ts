const today = new Date().toLocaleDateString()

const tofancyDate = (date:Date) => {
  const currentdate = new Date(date).toLocaleDateString()
  if(currentdate === today) return "Today";
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