import API_URL from "../config";

import toast from "react-hot-toast";


const EliminarProveedor = async (supplierId, setProveedores) => {
    try {
        const response = await fetch(`${API_URL}/proveedores/${supplierId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            toast.success("Proveedor borrado");
            setProveedores((prevProveedores) =>
                prevProveedores.filter((proveedor) => proveedor.SupplierId !== supplierId)
            );
            return response.json();
        } else {
            const errorData = await response.json();
            
            if (errorData.message) {
                toast.error(errorData.message);
            } else {
                toast.error("Error desconocido");
            }

            throw new Error(errorData.message || "Error al intentar borrar el proveedor con ID: " + supplierId);
        }
    } catch (err) {
        toast.error("Ocurrió un error al eliminar el proveedor");
        console.error("Error al borrar:", err);
    }
};

export default EliminarProveedor;