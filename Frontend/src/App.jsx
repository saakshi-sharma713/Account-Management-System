import { Routes ,Route} from "react-router-dom"
import SignUp from "../Pages/SignUp"
import Login from "../Pages/Login"
import Dashbosrd from "../Pages/Dashbosrd"

const App = () => {
  return (
    <div>
    
    <Routes>
      <Route path="/" element={<SignUp/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/dashboard" element={<Dashbosrd/>}/>
    </Routes>
    </div>
  )
}

export default App
