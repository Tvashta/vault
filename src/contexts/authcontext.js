import React, {useContext, useEffect, useState} from "react";
import {auth} from "../helpers/firebase";
import {useHistory} from "react-router-dom";
const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [curUser, setUser]= useState()
    const history = useHistory()
    
    function signup(email,pwd){
        return auth.createUserWithEmailAndPassword(email,pwd)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return curUser.updateEmail(email)
    }

    function updatePassword(password) {
        return curUser.updatePassword(password)
    }
    useEffect(()=>{
        return auth.onAuthStateChanged(user=>{
            setUser(user)
            history.push("/")
        })
    },[history])

    const value={
        curUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}