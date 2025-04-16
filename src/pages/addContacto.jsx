import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AddContacto = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/Victor/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("No se pudo crear el contacto");

            const data = await response.json();
            dispatch({ type: "add_contact", payload: data });

            navigate("/agenda"); // redirige a Agenda
        } catch (error) {
            console.error("Error al añadir contacto:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Agregar Contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="form-control" name="name" placeholder="Nombre" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" name="phone" placeholder="Teléfono" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" name="address" placeholder="Dirección" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Contacto</button>
            </form>
        </div>
    );
};

export default AddContacto;