import { AppActions, AppInitialState, EAppActionstypes } from "../../domain/appTypes"

const initialState: AppInitialState = {
    notification: {
        timeout: 5000,
        message: '',
        type: 'error'
    }
}

export const appReducer = (state = initialState, action: AppActions) => {
    switch (action.type) {
        case EAppActionstypes.SET_NOTIFICATION:
            return {...state, notification: action.payload}
        default: return state
    }
}