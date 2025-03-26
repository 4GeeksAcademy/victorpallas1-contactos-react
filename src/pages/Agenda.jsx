import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Agenda = () => {
    const { store, dispatch } = useGlobalReducer();
    
    const [newTarea, setNewTarea] = useState("");
    const [tareas, setTareas] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(null);

    const getTodos = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/victorpallas1/contacts");
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const dataJson = await response.json();
            
            // Extrae los contactos y los muestra en la lista
            setTareas(dataJson.contacts.map(contact => `${contact.name} - ${contact.phone} ${contact.email} ${contact.address}`));
        } catch (error) {
            console.error("Error al obtener los contactos:", error);
        }
    };

    const agregarTarea = () => {
        if (newTarea.trim() === "") return;
        setTareas([...tareas, newTarea]);
        setNewTarea("");
    };

    const eliminarTarea = (index) => {
        setTareas(tareas.filter((_, i) => i !== index));
    };

    const eliminarTodas = () => {
        setTareas([]);
    };

    return (
        <div className="m-auto text-center w-50">
            <input
                type="text"
                value={newTarea}
                onChange={(e) => setNewTarea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
                placeholder="Escribe tu tarea"
                className="form-control mb-2"
            />
            <button onClick={agregarTarea} className="btn btn-primary">Agregar Tarea</button>

            {/* Botón para cargar contactos desde la API */}
            <button onClick={getTodos} className="btn btn-info mb-3 ms-2">Cargar Contactos API</button>

            <ul className="list-group">
                {tareas.map((tarea, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                    >
                        {tarea}
                        {hoverIndex === index && (
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => eliminarTarea(index)}
                            >
                                DELETE
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <p></p>
            <span className="mb-3">Total: {tareas.length}</span>

            <button onClick={eliminarTodas} className="btn btn-danger">
                Eliminar todas
            </button>
        </div>
    );
};
