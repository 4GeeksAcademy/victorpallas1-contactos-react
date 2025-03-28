import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Agenda = () => {
    const { store, dispatch } = useGlobalReducer();
    const [contacts, setContacts] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/Victor/contacts");
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const dataJson = await response.json();
            setContacts(dataJson.contacts);
        } catch (error) {
            console.error("Error al obtener los contactos:", error);
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Victor/contacts/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            // Filtramos los contactos para quitar el eliminado
            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error("Error al eliminar el contacto:", error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="m-auto text-center w-50">
            <button onClick={getTodos} className="btn btn-info mb-3 ms-2">Cargar Contactos API</button>
            <div className="row">
                {contacts.map((contact) => (
                    <div key={contact.id} className="col-md-4 mb-3">
                        <div className="card">
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
    );
};
