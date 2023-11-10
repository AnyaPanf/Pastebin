import axios from "axios"
import Cookies from "js-cookie"



export const sendRecord = (newRecord) => {

    return async (dispatch) => {
        const { data } = await axios('https://fakestoreapi.com/products', {
            // https://localhost:7056/api/Paste
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: Cookies.get("token")
            },
            body: JSON.stringify(
                {
                    text: newRecord.text,
                    title: newRecord.title,
                    isPrivate: newRecord.isPrivate,
                    deadLine: newRecord.deadLine,
                }
            )
        })
        return dispatch({ type: "SET_A_NEW_RECORD", newRecord: data })
    }
}


export const getAllPublicRecords = () => {
    return async (dispatch) => {
        const {data} = await axios('https://fakestoreapi.com/products')
    return dispatch({ type: "SET_A_PUBLIC_RECORDS", records: data })
    }
}


export const getLogin = (user) => {
    return async (dispatch) => {
        const config = {
            method: 'POST',
            url: 'https://fakestoreapi.com/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: user.username,
                password: user.password
            }),
        }
        const { data } = await axios(config)
        const setCookies = (bla) => {
            Cookies.set("token", bla, { expires: 1 / 24 });
          }
          setCookies(data.token)
    return dispatch({ type: "SET_A_LOGIN", token: data.token })
    }

}

export const createUser = (newUser) => {
    return async (dispatch) => {
        const config = {
            method: 'POST',
            url: 'https://fakestoreapi.com/users',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: newUser.username,
                password: newUser.password,
                email: newUser.email,
            }),
        }
        const { data } = await axios(config)
        
    return dispatch({ type: "SET_A_NEW_USER", newUser: data.id })
    }

}


