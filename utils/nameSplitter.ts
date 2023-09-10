
export const nameSplitter = (name: string) => {
  const splitName = name?.replace(/\s+/g, ' ').split(" ");
  if (splitName.length >= 2) {
    return `${splitName[1][0]}`;
  }else{
    return `${splitName[0][0]}`;
  }
};

export const nameCapitalize = (name: string) => {
  const splitName = name?.replace(/\s+/g, ' ').split(" ");
  // splitName.map(splitted => )
  const firstAlpha = splitName[0].charAt(0).toUpperCase();
  const firstRest = splitName[0].slice(1).toLowerCase();
  const lastAlpha = splitName[1].charAt(0).toUpperCase();
  const lastRest = splitName[1].slice(1).toLowerCase();
    
    return `${firstAlpha}${firstRest} ${lastAlpha}${lastRest}`;
}

export const nameSplitterFirstName = (name: string) => {
  // return "";
  const splitName = name?.replace(/\s+/g, " ").split(" ");

  if (splitName.length >= 2) {
    return `${splitName[0][1]}`;
  } else {
    return `${splitName[0][0]}`;
  }
};

export const nameSplitToTwo = (name: string) => {
  const splitName = name.replace(/\s+/g, " ").split(" ");

  if (splitName.length >= 2) {
    return `${splitName[0][0]} ${splitName[1][0]}`;
  } else {
    return `${splitName[0][0]} ${splitName[1][0]}`;
  }
};

export const getFirstName = (name: string) => {
  const splitName = name.replace(/\s+/g, " ").split(" ");

  if (splitName.length >= 2) {
    return `${splitName[1]}`;
  } else {
    return `${splitName[0]}`;
  }
};

export const nameToShow = (value: string) => {
  if (!value) return "";
  const newvalue = value.replace(/\s+/g, " ");
  if (newvalue?.split(" ").length > 1) {
    return newvalue?.split(" ")[1];
  } else {
    return newvalue;
  }
};
