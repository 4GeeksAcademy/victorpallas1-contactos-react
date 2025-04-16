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

    return (
        <div className="m-auto text-center w-50">
        <button onClick={getTodos} className="btn btn-info mb-3 ms-2">Cargar Contactos API</button>
        <div className="row">
            {contacts.map((contact) => (
                <div key={contact.id} className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header">
                            Contacto en Agenda
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{contact.name}</h5>
                            <p className="card-text"><strong>Teléfono:</strong> {contact.phone}</p>
                            <p className="card-text"><strong>Email:</strong> {contact.email}</p>
                            <p className="card-text"><strong>Dirección:</strong> {contact.address}</p>
                            <button 
                                onClick={() => deleteContact(contact.id)} 
                                className="btn btn-danger mt-2"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}