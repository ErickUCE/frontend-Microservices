import { GraphQLClient, gql } from "graphql-request";

// 📌 Configuración de los servidores EC2
const READ_GRAPHQL_API = "http://3.229.198.244:4003"; // ReadProvider (Consulta de proveedores)
const CREATE_GRAPHQL_API = "http://34.198.77.62:4000"; // CreateProvider (Creación de proveedores)
const UPDATE_GRAPHQL_API = "http://52.5.181.183:4002"; // UpdateProvider (Actualización de proveedores)
const DELETE_GRAPHQL_API = "http://23.21.70.193:4001"; // DeleteProvider (Eliminación de proveedores)

// ✅ Crear clientes GraphQL
const readClient = new GraphQLClient(READ_GRAPHQL_API); 
const createClient = new GraphQLClient(CREATE_GRAPHQL_API);
const updateClient = new GraphQLClient(UPDATE_GRAPHQL_API);
const deleteClient = new GraphQLClient(DELETE_GRAPHQL_API);

// 🔹 Obtener proveedores (QUERY)
export const getProviders = async () => {
    const query = gql`
        query {
            getAllProviders {
                id
                name
                address
                email
            }
        }
    `;

    try {
        const data = await readClient.request(query);
        console.log("📡 Proveedores recibidos:", data.getAllProviders);
        return data.getAllProviders;
    } catch (error) {
        console.error("❌ Error obteniendo proveedores:", error);
        throw error;
    }
};

// 🔹 Crear proveedor (MUTATION)
export const createProvider = async (providerData) => {
    const mutation = gql`
        mutation ($name: String!, $address: String!, $email: String!) {
            createProvider(input: { name: $name, address: $address, email: $email }) {
                id
                name
                address
                email
            }
        }
    `;

    try {
        const variables = {
            name: providerData.name,
            address: providerData.address,
            email: providerData.email,
        };

        const data = await createClient.request(mutation, variables);
        console.log("✅ Proveedor agregado:", data.createProvider);
        return data.createProvider;
    } catch (error) {
        console.error("❌ Error al agregar proveedor:", error.response || error);
        throw error;
    }
};

// 🔹 Actualizar proveedor (MUTATION)
export const updateProvider = async (providerData) => {
    const mutation = gql`
        mutation UpdateProvider($id: ID!, $input: ProviderInput!) {
            updateProvider(id: $id, input: $input) {
                id
                name
                address
                email
            }
        }
    `;

    try {
        const variables = {
            id: parseInt(providerData.id),
            input: {
                name: providerData.name,
                address: providerData.address,
                email: providerData.email,
            },
        };

        console.log("📡 Enviando mutación a GraphQL en UpdateProvider:", variables);
        const data = await updateClient.request(mutation, variables);
        console.log("✅ Proveedor actualizado:", data.updateProvider);
        return data.updateProvider;
    } catch (error) {
        console.error("❌ Error al actualizar proveedor:", error.response || error);
        throw error;
    }
};

// 🔹 Eliminar proveedor (MUTATION)
export const deleteProvider = async (id) => {
    const mutation = gql`
        mutation DeleteProvider($id: ID!) {
            deleteProvider(id: $id)
        }
    `;

    try {
        const variables = { id };
        const data = await deleteClient.request(mutation, variables);
        console.log("🗑️ Proveedor eliminado:", data);
        return id;
    } catch (error) {
        console.error("❌ Error al eliminar proveedor:", error.response || error);
        throw error;
    }
};
