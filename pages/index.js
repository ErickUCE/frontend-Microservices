import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomePage() {
    return (
        <div className="container-fluid p-0">
            {/* Header */}
            <header className="bg-dark text-white text-center py-5">
                <h1 className="fw-bold">🚀 Ogistic - Gestión de Microservicios</h1>
                <p className="lead">Administra eficientemente proveedores y clientes</p>
            </header>

            {/* Sección de botones */}
            <section className="container mt-5">
                <div className="row justify-content-center">
                    
                    {/* Tarjeta de Proveedores */}
                    <div className="col-md-5">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white text-center">
                                <h4 className="fw-bold">📦 Gestión de Proveedores</h4>
                            </div>
                            <div className="card-body text-center">
                                <p>Administra los proveedores del sistema: agregar, editar y eliminar.</p>
                                <Link href="/providers">
                                    <button className="btn btn-primary">Ir a Proveedores</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Clientes */}
                    <div className="col-md-5">
                        <div className="card shadow-lg">
                            <div className="card-header bg-success text-white text-center">
                                <h4 className="fw-bold">👥 Gestión de Clientes</h4>
                            </div>
                            <div className="card-body text-center">
                                <p>Administra los clientes registrados en el sistema.</p>
                                <Link href="/clients">
                                    <button className="btn btn-success">Ir a Clientes</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5">
                <p className="mb-0">© 2024 Ogistic - Sistema de Gestión</p>
            </footer>
        </div>
    );
}
