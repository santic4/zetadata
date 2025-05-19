FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias (usa npm install, porque puede que no tengas package-lock.json)
RUN npm install

# Copiar el resto del código del servidor
COPY . .

# Variables de entorno por defecto
ENV NODE_ENV=production PORT=4000

# Exponer puerto
EXPOSE 4000

# Comando para iniciar la app
CMD ["node", "src/app/app.js"]