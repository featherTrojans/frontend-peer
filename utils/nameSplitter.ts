

  export const nameSplitter = (name: string) => {
    const splitName = name.replace(/\s+/g, ' ').split(" ");

    if (splitName.length >= 2) {
      return `${splitName[0][0]}`;
    }else{
      return `${splitName[0][0]}`;
    }
  };



  // export const nameSplitter = (name: string) => {
  //   const splitName = name.replace(/\s+/g, ' ').split(" ");

  //   if (splitName.length >= 2) {
  //     return `${splitName[0][0]}${splitName[1][0]}`;
  //   }else{
  //     return `${splitName[0][0]}${splitName[0][1]}`;
  //   }
  // };