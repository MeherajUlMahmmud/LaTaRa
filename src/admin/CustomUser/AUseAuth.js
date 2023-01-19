import {useState,useEffect} from "react"; 
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "../../firebase.config";

const AUseAuth=()=>{
    const [currentUser,setCurrentUser ] = useState({}); 

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                if(user.email==="admin@gmail.com" && user.password === "12345678")
                {
                    setCurrentUser(user); 
                }
               
            }
            else{
                setCurrentUser(null); 
            }
        });
    });
    return currentUser; 
}
export default AUseAuth; 
