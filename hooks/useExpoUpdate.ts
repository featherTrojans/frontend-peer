import { useEffect, useCallback, useRef } from "react";
import { Platform, Alert } from "react-native";
import * as Updates from "expo-updates";
import { useIsForeground } from "./useIsForeground";
import { differenceInMinutes } from "../utils/fomatTrans";

export function useExpoUpdate() {
  const isForeground = useIsForeground();
  const appBackgrounded = useRef<Date | null>(null);
  const lastUpdateCheck = useRef<Date | null>(null);

  const checkUpdate = useCallback(async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (!update.isAvailable) {
        return;
      }

      const result = await Updates.fetchUpdateAsync();

      if (!result.isNew) {
        return;
      }
      // for now, we won't auto reload on android because it causes a crash due to reanimated
      // since we've downloaded the update, it will be applied on next restart
      if (Platform.OS === "ios") {
        await Updates.reloadAsync();
      }
    } catch (error) {
      Alert.alert(error);
    }
  }, []);

  useEffect(() => {
    // dont run on web or dev mode
    if (__DEV__) return;

    // this fires when the app is backgrounded or in inactive state (app switcher)
    // will be skipped on first run
    if (!isForeground) {
      appBackgrounded.current = new Date();
      return;
    }

    // check if its the first time running, so its cold start
    if (!lastUpdateCheck.current) {
      checkUpdate();
    } else if (
      // check if its been 30 minutes since the last check and the app was backgrounded
      appBackgrounded.current &&
      differenceInMinutes(new Date(), appBackgrounded.current) > 30
    ) {
      checkUpdate();
    }

    lastUpdateCheck.current = new Date();
  }, [checkUpdate, isForeground]);
}


