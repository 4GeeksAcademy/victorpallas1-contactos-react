import React, {useState,useEffect} from "react"
import { json, useNavigate } from "react-router-dom";


const addContacto=()=>{
    const navigate=useNavigate()

    const { store, dispatch } = useGlobalReducer();

    const { contacts } = store
    const [contact, setContact] = useState([{name:"",phone:"", email:"", addres:"" }]);
    const addContact = async(contact) => {
        try {
            const response = await fetch ("https://playground.4geeks.com/contact/agendas/Victor/contacts",{
                method: "POST", headers: {"Content-Type": "application/json"},body:JSON.stringify(contact)
            })
            const data = await response.json()
            dispatch({type:"add_contact",payload:data})

            //return data
            

            
        } catch (error) {
            console.error("tu contacto no fue añadido",error)
            //return null
        }
    }

    return (<div>


    </div>
    )
}