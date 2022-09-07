

  export const nameSplitter = (name: string) => {
    // return "";
    const splitName = name?.replace(/\s+/g, ' ').split(" ");

    if (splitName.length >= 2) {
      return `${splitName[1][0]}`;
    }else{
      return `${splitName[0][0]}`;
    }
  };


  export const nameSplitterFirstName = (name: string) => {
    // return "";
    const splitName = name?.replace(/\s+/g, ' ').split(" ");

    if (splitName.length >= 2) {
      return `${splitName[0][1]}`;
    }else{
      return `${splitName[0][0]}`;
    }
  };

  export const nameSplitToTwo = (name: string) => {
    const splitName = name.replace(/\s+/g, ' ').split(" ");

    if (splitName.length >= 2) {
      return `${splitName[0][0]} ${splitName[1][0]}`;
    }else{
      return `${splitName[0][0]} ${splitName[1][0]}`;
    }
  };


  export const getFirstName = (name: string) => {
    const splitName = name.replace(/\s+/g, ' ').split(" ");

    if (splitName.length >= 2) {
      return `${splitName[1]}`;
    }else{
      return `${splitName[0]}`;
    }
  }



  // export const nameSplitter = (name: string) => {
  //   const splitName = name.replace(/\s+/g, ' ').split(" ");

  //   if (splitName.length >= 2) {
  //     return `${splitName[0][0]}${splitName[1][0]}`;
  //   }else{
  //     return `${splitName[0][0]}${splitName[0][1]}`;
  //   }
  // };