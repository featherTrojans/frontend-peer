
interface IlocationObj{
  region: string,
  subregion: string,
  city: string
}


export const doesIncludeActiveStates = (locationObj:IlocationObj)=>{
  return true
  // {
  //   "city": "Lagos",
  //   "country": "Nigeria",
  //   "isoCountryCode": "NG",
  //   "name": "GC92+652",
  //   "postalCode": "101245",
  //   "region": "Lagos",
  //   "subregion": "Lagos Mainland",
  // }, 

  // check one by one in the sides sides 
  const allowedstates = ["lagos","oyo","osun","ogun"]
    for(let state of allowedstates){
      if(locationObj?.region?.toLowerCase()?.includes(state)){
        return true
      }
    }
    for(let state of allowedstates){
      if(locationObj?.subregion?.toLowerCase()?.includes(state)){
        return true
      }
    }
    for(let state of allowedstates){
      if(locationObj?.city?.toLowerCase()?.includes(state)){
        return true
      }
    }

    return false
    //subregion
    //
  }

export const plusBase = (charge:string) =>{
  const chargeNum = Number(charge);
  if(chargeNum === 0) return "50";
  return `${chargeNum  + Math.ceil(chargeNum/5000) * 50}`
}
export const justCharge = (charge:string) =>{
  const chargeNum = Number(charge);
  if(chargeNum === 0) return "50";
  return `${Math.ceil(chargeNum/5000) * 50}`
}