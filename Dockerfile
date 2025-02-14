# Usa una imagen base oficial de Node.js
FROM node:18-alpine AS builder

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación Next.js
RUN npm run build

# --- Segunda etapa: Servidor ---
FROM node:18-alpine

WORKDIR /app

# Copia los archivos necesarios desde la etapa anterior
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# ⚠️ Esta línea ha sido eliminada
# COPY --from=builder /app/styles ./styles

# Expone el puerto 3000
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start"]
