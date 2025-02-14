import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

  // 📌 Obtener datos del usuario autenticado
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            // ✅ Llamar a la API para obtener los datos del usuario
            const response = await axios.get("http://54.236.104.97:5009/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(response.data);
        } catch (error) {
            console.error("❌ Error obteniendo usuario:", error);
            setError("No se pudo cargar la información del usuario.");
            router.push("/login");
        }
    };

        fetchUserData();
    }, [router]);

    // 📌 Cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (!user) return <div className="text-center mt-5">Cargando...</div>;

    return (
        <div className="container mt-5">
            <nav className="navbar navbar-dark navbar-expand-lg shadow-sm bg-dark">
                <div className="container">
                    <a className="navbar-brand text-white" href="#">⚡ McQueen AutoParts ⚡</a>
                </div>
            </nav>

            <h2 className="text-center mb-4">📌 Choose one!</h2>
            <div className="row g-4">
                {/* 🔹 Tarjeta de Clientes */}
                <div className="col-md-4">
                    <div className="card p-4 shadow-lg text-center">
                        <h4 className="text-primary">👥 Clients</h4>
                        <p>Gestiona los clientes de la tienda</p>
                        <button className="btn btn-primary" onClick={() => router.push("/clients")}>Go to Clients</button>
                    </div>
                </div>

                {/* 🔹 Tarjeta de Proveedores */}
                <div className="col-md-4">
                    <div className="card p-4 shadow-lg text-center">
                        <h4 className="text-warning">🚚 Providers</h4>
                        <p>Gestiona los proveedores de la tienda</p>
                        <button className="btn btn-warning" onClick={() => router.push("/providers")}>Go to Providers</button>
                    </div>
                </div>
                
                {/* Productos */}
                <div className="col-md-4">
                    <div className="card p-3 text-center shadow">
                        <h5>📦 <span className="text-success">Products</span></h5>
                        <p>Gestiona los productos de la tienda</p>
                        <button className="btn btn-success" onClick={() => router.push("/products")}>Go to Products</button>
                    </div>
                </div>
                
                {/* 🔹 Tarjeta de Perfil del Usuario */}
                <div className="col-md-4 mx-auto">
                    <div className="card p-4 shadow-lg text-center">
                        <h4 className="text-success">🟢 My Profile</h4>
                        <p><strong>First Name:</strong> {user.first_name}</p>
                        <p><strong>Last Name:</strong> {user.last_name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        

                        <div className="d-flex justify-content-between">
                            <button className="btn btn-info" onClick={() => router.push("/profile")}>ℹ️ Info</button>
                            <button className="btn btn-danger" onClick={handleLogout}>⬅️ Log Out</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer bg-dark text-white text-center py-3 mt-4">
                <span>© 2025 McQueen AutoParts ⚡</span>
                <span>By Mateo and Erick</span>
                <span>Universidad Central del Ecuador</span>
            </footer>
        </div>
    );
}