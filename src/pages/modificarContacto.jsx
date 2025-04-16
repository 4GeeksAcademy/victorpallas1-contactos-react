import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Importa tu hook global

const ModificarContacto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const [contact, setContact] = useState(null);

    // Al cargar el componente, busca el contacto en el store global
    useEffect(() => {
        const contactoExistente = store.contacts.find(c => c.id === parseInt(id));
        if (contactoExistente) {
            setContact({
                name: contactoExistente.name || "",
                phone: contactoExistente.phone || "",
                email: contactoExistente.email || "",
                address: contactoExistente.address || ""
            });
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/Victor/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact)
            });
            if (!response.ok) throw new Error("Error al actualizar el contacto");
            navigate("/agenda");
        } catch (error) {
            console.error("Error al modificar el contacto:", error);
        }
    };

    if (!contact) {
        return <div className="container mt-5"><p>Contacto no encontrado en el store.</p></div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Modificar Contacto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                        placeholder="Nombre"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                        placeholder="Teléfono"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                        placeholder="Dirección"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default ModificarContacto;
