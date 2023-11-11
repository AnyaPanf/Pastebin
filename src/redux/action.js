
import axios from "axios"
import Cookies from "js-cookie"
 
const apiLink = "https://29e4-212-42-120-155.ngrok-free.app/api"
 
export const sendRecord = (newRecord) => {
    return async (dispatch) => {
        const config = {
            method: 'POST',
            url: `${apiLink}/records/records`,
            //  //`${apiLink}/Record
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${Cookies.get("token")}`,  
                "ngrok-skip-browser-warning": "69420"          
            },
            data: JSON.stringify({
                text: newRecord.text,
                title: newRecord.title,
                isPrivate: newRecord.isPrivate,
                deadline: newRecord.deadLine,
            }),
        }
        const data = await axios(config)
       
    return dispatch({  type: "SET_A_NEW_RECORD", newRecord: data })
    }
 
}
 
// https://ad2c-212-42-120-155.ngrok-free.app/api/Record/publicRecord
 
export const getAllPublicRecords = () => {
    return async (dispatch) => {
        const {data} = await axios(`${apiLink}/records/records/all`, {
            //`${apiLink}/publicRecord`
        method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("token")}`,                            
                "ngrok-skip-browser-warning": "69420"
            }})
    return dispatch({ type: "SET_A_PUBLIC_RECORDS", records: data })
    }
}
 
 
export const getLogin = (user) => {
    return async (dispatch) => {
        const config = {
            method: 'POST',
            url: `${apiLink}/Auth/sessions`,
             //`${apiLink}/Auth/sessions https://fakestoreapi.com/auth/login'
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420"
            },
            data: JSON.stringify({
                username: user.username,
                password: user.password
            }),
        }
        const { data } = await axios(config)
        const setCookies = (token, username) => {
            Cookies.set("token", token, { expires: 1 / 24 });
            Cookies.set("username", username, { expires: 1 / 24 })
          }
          setCookies(data, user.username)
    return dispatch({ type: "SET_A_LOGIN", token: data})
    }
 
}
 
export const createUser = (newUser) => {
    return async (dispatch) => {
        const config = {
            method: 'POST',
            url:`${apiLink}/Auth/users`,
            // //`${apiLink}/Auth/users
            headers: {
                'Content-Type': 'application/json',      
                "ngrok-skip-browser-warning": "69420"          
            },
            data: JSON.stringify({
                username: newUser.username,
                password: newUser.password,
                email: newUser.mail,
            }),
        }
        const { data } = await axios(config)
       
    return dispatch({ type: "SET_A_NEW_USER", newUser: data })
    }
 
}
 
export const changeUser = (changeUser) => {
    return async (dispatch) => {
        const config = {
            method: 'PUT',
            url: 'https://162c-212-42-120-155.ngrok-free.app/api/users/me',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("token")}`,    
                "ngrok-skip-browser-warning": "69420"          
            },
            data: JSON.stringify({
                username: changeUser.username,
                password: changeUser.password,
                email: changeUser.email,
            }),
        }
        const { data } = await axios(config)
       
    return dispatch({ type: "SET_A_CHANGING_USER", changeUser: data })
    }
 
}
 
 
export const getUser = (username) => {
    return async (dispatch) => {
        const {data} = await axios(`https://162c-212-42-120-155.ngrok-free.app/api/users/Rustam`, {
            //`${apiLink}/Auth/{username}
        method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("token")}`,
                "ngrok-skip-browser-warning": "69420"
            }})
    return dispatch({ type: "SET_A_USER", user: data })
    }
}
 
 
export const getAllUserRecords = () => {
    return async (dispatch) => {
        const {data} = await axios(`${apiLink}/records/records/user`, {
            //`${apiLink}/Record/recordCurrentUser
           
        method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("token")}`,                
                "ngrok-skip-browser-warning": "69420"
            }})
    return dispatch({ type: "SET_A_PERSONAL_RECORDS", personalRecords: data })
    }
}
 
 
export const getTenRecords = () => {
    return async (dispatch) => {
        const {data} = await axios(`${apiLink}/records/records/all`, {
            //`${apiLink}/publicRecord`
        method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("token")}`,                            
                "ngrok-skip-browser-warning": "69420"
            }})
    return dispatch({ type: "SET_A_TEN_LAST_RECORDS", tenLastRecords: data.length > 10 ? data.slice(data.length - 11, data.length - 1) : data })
    }
}
 
 
 
 
 
 