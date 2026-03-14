import axios from 'axios';
import React, { createContext } from 'react'
export const ActualContext = createContext();
const DataContext = ({children}) => {
    const token = localStorage.getItem("token")
      const URL= import.meta.env.VITE_BACKEND_URL
async function fetchBalance(){
  const response = await axios.get(`${URL}/api/account/balance`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    console.log(response.data)
    
    return response.data.Balance
}
  return (
    <div>
      <ActualContext.Provider value={{fetchBalance}}>
        {children}
      </ActualContext.Provider>
    </div>
  )
}

export default DataContext
