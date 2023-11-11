import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
    login: " ",
    registration: {},
    createOneRecord: "",
    getTenLastRecords: [],
    getAllPublicRecords: [],
    getAllUserRecords: [],
    getOneRecord: {},
    deleteOneRecord: {},
    getOneUser: {},
    changeUser: {},
}

const pasteBinReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_A_LOGIN":
            return { ...state, login: action.token }
        case "SET_A_NEW_USER":
            return { ...state, registration: action.newUser }
        case "SET_A_NEW_RECORD":
            return { ...state, createOneRecord: action.newRecord }
        case "SET_A_TEN_LAST_RECORDS":
            return { ...state, getTenLastRecords: action.tenLastRecords }
        case "SET_A_PUBLIC_RECORDS":
            return { ...state, getAllPublicRecords: action.records }
        case "SET_A_PERSONAL_RECORDS":
            return { ...state, getAllUserRecords: action.personalRecords }
        case "SET_A_NEW_RECORD":
            return { ...state, createOneRecord: action.newRecord }
        case "SET_A_ONE_RECORD":
            return { ...state, getOneRecord: action.oneRecord }
        case "SET_A_DELETET_RECORD_ID":
            return { ...state, deleteOneRecord: action.deleteRecord }
        case "SET_A_USER":
            return { ...state, getOneUser: action.user }
        case "SET_A_CHANGING_USER":
            return { ...state, changeUser: action.userChanges }

        default:
            return state
    }
}

export const store = createStore(pasteBinReducer, composeWithDevTools(applyMiddleware(thunk)))