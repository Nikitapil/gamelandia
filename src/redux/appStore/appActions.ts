import { EAppActionstypes, Inotification } from "../../domain/appTypes";

export const setAppNotification = (payload:Inotification) => {
    return {
        type: EAppActionstypes.SET_NOTIFICATION,
        payload
    }
}