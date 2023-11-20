import { useEffect, useCallback, useRef } from "react";
import { Platform, Alert } from "react-native";
import { checkForUpdateAsync, fetchUpdateAsync, reloadAsync } from "expo-updates";
// import { useIsForeground } from "./useIsForeground";
// import { differenceInMinutes } from "../utils/fomatTrans";

export function useExpoUpdate() {
  useEffect(() => {
    if (__DEV__) return;

    const check = async () => {
      try {
        const update = await checkForUpdateAsync();

        if (update.isAvailable) {

          await fetchUpdateAsync();
          // await reloadAsync();
        }
      } catch (error) {
        console.log(error);
      }
    };

    check();
  }, []);

  return null;
}


