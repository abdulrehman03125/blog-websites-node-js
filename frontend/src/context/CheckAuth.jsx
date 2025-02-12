import { createContext, useState } from "react";

// create context
export const CheckAuth = createContext(null);


// create provider
export const CheckAuthProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(null);

    const logout = () => {
        setIsLogin(false);
        setToken(null);
    }
    return(
        <CheckAuth.Provider value={ {isLogin, setIsLogin, token, setToken, logout} }>
            {children}
        </CheckAuth.Provider>
    )
}



// custom hook -> optional