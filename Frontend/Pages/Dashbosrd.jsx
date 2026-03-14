import React, { useContext, useEffect, useState } from 'react'
import { ActualContext } from '../Context/DataContext';
import axios from 'axios';

const Dashboard = () => {
    
    const [balance, setBalance] = useState(0);
    const { fetchBalance } = useContext(ActualContext)

    const [receiver, setReceiver] = useState("")
    const [amount, setAmount] = useState("")
    const [message, setMessage] = useState("")

    const URL = import.meta.env.VITE_BACKEND_URL

    
    useEffect(() => {
        const getBalance = async () => {
            const bal = await fetchBalance()
            setBalance(bal)
        }
        getBalance()
    }, [balance])


    async function handleTransaction() {
        const token = localStorage.getItem("token")
        

        try {
            const res = await axios.post(
                `${URL}/api/account/transfer`,
                { receiver_email: receiver, amount: Number(amount) },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (res.data.status) {
                alert("Transaction Successful")
              setBalance(res.data.senderBalance)
                setReceiver("")
                setAmount("")
            } else {
                alert(res.data.message || "Transaction failed")
            }
        } catch (err) {
            console.log(err)
            alert("failed to transfer")
        }
    }

    return (
        <div className="container">
            <div className="A">
                <h1>Account Balance: ₹{balance}</h1>
            </div>
            <div className="B">
                <h2>Send Money</h2>

                <input
                    placeholder="Receiver Email"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button onClick={handleTransaction}>Transfer</button>

                {message && <p>{message}</p>}
            </div>
        </div>
    )
}

export default Dashboard