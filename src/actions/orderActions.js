import axios  from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
     ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET
    
} from '../constants/orderConstants'

export const createOrder = (order)=> async(dispatch,getState) => {

    try {
        dispatch({type:ORDER_CREATE_REQUEST,});
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.post(`https://mern-commerce-backend-pnx1.onrender.com/api/orders`,order,config)

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}
export const getOrderDetails = (id)=> async(dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_DETAILS_REQUEST,
            
        });
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.get(`https://mern-commerce-backend-pnx1.onrender.com/api/orders/${id}`,config)

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

// UPDATING THE ORDER AFTER CONFIRMING
export const payOrder = (orderId,paymentResults)=> async(dispatch,getState) => {

    try {
        dispatch({
            type:ORDER_PAY_REQUEST,
            
        });
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}= await axios.put(`https://mern-commerce-backend-pnx1.onrender.com/api/orders/${orderId}/pay`,paymentResults,config)

        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}
