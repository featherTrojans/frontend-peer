
import * as Clipboard from "expo-clipboard";


export const copyToClipboard = (copiedTest: string) => {
    Clipboard.setString(copiedTest);
  };
