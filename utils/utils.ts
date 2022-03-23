export const doesIncludeActiveStates = (state:string)=>{
  return true 
    return ["lagos","oyo","osun","ogun"].includes(state.toLowerCase())
  }

export const plusBase = (charge:string) =>{
  const chargeNum = Number(charge);
  return `${chargeNum  + Math.ceil(chargeNum/5000) * 100}`
}