import { createContext, useEffect, useState } from "react";

// create context
export const CheckAuth = createContext(null);


// create provider
export const CheckAuthProvider = ({children}) => {
        // save token 
        const savedToken = sessionStorage.getItem("token");
        const savedIsLogin = savedToken ? true : false;



        const [isLogin, setIsLogin] = useState(savedIsLogin);
        const [token, setToken] = useState(savedToken);
        const logout = () => {
            setIsLogin(false);
            setToken(null);
            sessionStorage.removeItem("token"); // Remove the token from localStorage on logout
        };

        useEffect(() => {
            if (isLogin && token) {
                sessionStorage.setItem("token", token); // Save the token to localStorage
            } else {
                sessionStorage.removeItem("token"); // Remove token if not logged in
                
            }
        }, [isLogin, token]);

    return(
        <CheckAuth.Provider value={ {isLogin, setIsLogin, token, setToken, logout} }>
            {children}
        </CheckAuth.Provider>
    )
}



// custom hook -> optional