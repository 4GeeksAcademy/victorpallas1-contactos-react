import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Agenda = () => {
    const { store, dispatch } = useGlobalReducer();
    const [contacts, setContacts] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/Victor/contacts");
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const dataJson = await response.json();
            dispatch({type:"set_contacts",payload:dataJson.contacts})
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

    // Verificamos si la agenda Victor existe, si no existe aparece el boton para crear la agenda
    useEffect(() => {
        const verificarAgenda = async () => {
            try {
                const res = await fetch("https://playground.4geeks.com/contact/agendas/Victor/contacts");
                if (res.ok) {
                    setAgendaExiste(true);
                }
            } catch (e) {
                console.warn("No se pudo verificar la agenda:", e);
            }
        };
    
        verificarAgenda();
        getTodos();  // también puedes cargar los contactos al iniciar
    }, []);

    // Constante para verificar si la agenda existe
    const [agendaExiste, setAgendaExiste] = useState(false);

    // constante para crear Agenda Victor
    const crearAgenda = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/Victor", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
    
            if (response.ok) {
                setAgendaExiste(true);  // ✅ la agenda existe ahora
                alert("Agenda creada correctamente o ya existía.");
            } else {
                const errorData = await response.json();
                console.error("Error al crear agenda:", errorData);
                alert("Error al crear agenda: " + (errorData?.msg || response.statusText));
            }
        } catch (error) {
            console.error("Error de red:", error);
            alert("Error de red al crear la agenda.");
        }
    };
    
    

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <div className="m-auto text-center w-50">
            <button onClick={getTodos} className="btn btn-info mb-3 ms-2">Cargar Contactos API</button>
            {!agendaExiste && (
            <button onClick={crearAgenda} className="btn btn-success mb-3 ms-2">
            Crear Agenda Victor
            </button>
            )}
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
                                <Link to={`/modificarContacto/${contact.id}`}>
                                <button className="btn btn-warning mt-2">Modificar</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
