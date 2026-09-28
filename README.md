# Mis Talleres

Aplicación web responsive para gestionar talleres, desarrollada con Spring Boot (backend) y Angular (frontend), usando PostgreSQL como base de datos.

## Tecnologías

- **Backend**: Java 17+, Spring Boot 3.2.0
- **Frontend**: Angular 17, TypeScript
- **Base de datos**: PostgreSQL 15+
- **Build**: Maven (backend), npm/Angular CLI (frontend)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Java 17 o superior
- Node.js 18 o superior
- PostgreSQL 15 o superior
- Maven 3.6 o superior

## Configuración de Base de Datos

1. **Crear la base de datos en PostgreSQL:**

   ```sql
   CREATE DATABASE mistalleres;
   ```

2. **Configurar usuario y contraseña:**
   
   Puedes usar el usuario `postgres` o crear uno nuevo. Asegúrate de recordar las credenciales.

3. **Actualizar configuración del backend:**
   
   Edita el archivo `backend/src/main/resources/application.properties` y actualiza los valores según tu configuración de PostgreSQL:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/mistalleres
   spring.datasource.username=tu_usuario
   spring.datasource.password=tu_contraseña
   ```

## Instalación y Ejecución

### Backend (Spring Boot)

1. **Navegar al directorio del backend:**
   ```bash
   cd backend
   ```

2. **Instalar dependencias (opcional, Maven lo hace automáticamente):**
   ```bash
   mvn clean install
   ```

3. **Ejecutar la aplicación:**
   ```bash
   mvn spring-boot:run
   ```

   El backend estará disponible en `http://localhost:8080`

   La API REST estará disponible en:
   - `GET /api/talleres` - Listar todos los talleres
   - `GET /api/talleres/{id}` - Obtener un taller por ID
   - `POST /api/talleres` - Crear un nuevo taller
   - `PUT /api/talleres/{id}` - Actualizar un taller
   - `DELETE /api/talleres/{id}` - Eliminar un taller

### Frontend (Angular)

1. **Navegar al directorio del frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación:**
   ```bash
   npm start
   ```

   El frontend estará disponible en `http://localhost:4200`

## Funcionalidades

- **Listar talleres**: Muestra todos los talleres ordenados por nombre del propietario
- **Crear taller**: Formulario para agregar nuevos talleres
- **Editar taller**: Modificar información de talleres existentes
- **Eliminar taller**: Eliminar talleres con confirmación
- **Ver en Google Maps**: Botón para abrir la ubicación en Google Maps

## Validaciones

- **Campos obligatorios**: Propietario, dirección y link de Google Maps
- **Validación de URL**: El link de Google Maps debe ser una URL válida (http o https)

## Estructura del Proyecto

```
mis-talleres/
├── backend/                 # Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/mistalleres/
│   │   │   │   ├── controller/    # Controladores REST
│   │   │   │   ├── model/         # Entidades JPA
│   │   │   │   ├── repository/    # Repositorios JPA
│   │   │   │   └── service/       # Lógica de negocio
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
├── frontend/                # Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # Componentes Angular
│   │   │   ├── models/            # Modelos TypeScript
│   │   │   ├── services/          # Servicios HTTP
│   │   │   └── app.module.ts
│   └── package.json
└── README.md
```

## Diseño Responsive

La aplicación está diseñada para ser responsive y adaptarse a diferentes tamaños de pantalla:
- **Desktop**: Layout optimizado para pantallas grandes
- **Tablet**: Ajustes para pantallas medianas (≤768px)
- **Móvil**: Diseño optimizado para pantallas pequeñas (≤480px)

## Notas Importantes

- Asegúrate de que PostgreSQL esté ejecutándose antes de iniciar el backend
- La primera vez que ejecute el backend, Hibernate creará automáticamente la tabla `talleres`
- No se requiere autenticación para esta versión
- El frontend usa CORS para comunicarse con el backend en `http://localhost:8080`

## Troubleshooting

### Error de conexión a PostgreSQL
- Verifica que PostgreSQL esté ejecutándose
- Confirma que la base de datos `mistalleres` existe
- Verifica las credenciales en `application.properties`

### Error de CORS
- Asegúrate de que el backend esté ejecutándose en el puerto 8080
- Verifica que CORS esté configurado correctamente en el `TallerController`

### Error al instalar dependencias de Angular
- Asegúrate de tener Node.js 18+ instalado
- Intenta limpiar el caché de npm: `npm cache clean --force`

## Despliegue en Render.com

Esta aplicación está configurada para desplegarse en Render.com con el plan gratuito.

### Pasos para desplegar en Render:

1. **Subir código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/mis-talleres.git
   git push -u origin main
   ```

2. **Crear cuenta en Render.com:**
   - Regístrate en https://render.com
   - Conecta tu cuenta de GitHub

3. **Crear servicios en Render:**

   **A. Base de Datos PostgreSQL:**
   - Dashboard → New → PostgreSQL
   - Nombre: `mistalleres-db`
   - Database: `mistalleres`
   - Plan: Free
   - Render generará la `DATABASE_URL` automáticamente

   **B. Backend (Spring Boot):**
   - Dashboard → New → Web Service
   - Conecta tu repositorio de GitHub
   - Root directory: `backend`
   - Build command: `mvn clean package -DskipTests`
   - Start command: `java -jar target/mis-talleres-backend-1.0.0.jar`
   - Variables de entorno:
     - `DATABASE_URL`: (copiar desde servicio PostgreSQL)
     - `SPRING_DATASOURCE_USERNAME`: (copiar desde servicio PostgreSQL)
     - `SPRING_DATASOURCE_PASSWORD`: (copiar desde servicio PostgreSQL)
     - `FRONTEND_URL`: (URL del frontend cuando lo crees)

   **C. Frontend (Angular):**
   - Dashboard → New → Static Site
   - Conecta tu repositorio de GitHub
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist/mis-talleres-frontend`
   - **IMPORTANTE**: Actualiza `frontend/src/environments/environment.prod.ts` con la URL del backend

4. **Actualizar configuración de producción:**
   - Después de crear el backend, copia su URL (ej: `https://mis-talleres-backend.onrender.com`)
   - Actualiza `frontend/src/environments/environment.prod.ts`:
     ```typescript
     export const environment = {
       production: true,
       apiUrl: 'https://tu-backend-url.onrender.com/api/talleres'
     };
     ```
   - Actualiza la variable `FRONTEND_URL` en el backend con la URL del frontend

5. **Despliegue automático:**
   - Cada vez que hagas `git push`, Render re-despliega automáticamente
   - Puedes hacer mejoras en tu laptop y subirlas a GitHub

### Flujo de trabajo para mejoras:

1. **Desarrollo local:**
   ```bash
   # Backend
   cd backend
   mvn spring-boot:run

   # Frontend (otra terminal)
   cd frontend
   ng serve
   ```

2. **Subir cambios:**
   ```bash
   git add .
   git commit -m "Descripción de mejora"
   git push
   ```

3. **Render detecta cambios y re-despliega automáticamente**

### Limitaciones del plan gratuito de Render:

- **Web Services**: 750 horas/mes (~1 hora/día) + se duerme después de 15 min inactividad
- **PostgreSQL**: 90 días de inactividad máximo, 1GB de almacenamiento
- **Static Sites**: Ilimitado

### Variables de entorno necesarias:

**Backend:**
- `DATABASE_URL` (proporcionada por Render PostgreSQL)
- `SPRING_DATASOURCE_USERNAME` (proporcionada por Render PostgreSQL)
- `SPRING_DATASOURCE_PASSWORD` (proporcionada por Render PostgreSQL)
- `FRONTEND_URL` (URL de tu frontend en Render)
- `PORT` (asignada automáticamente por Render)

**Frontend:**
- Actualizar `apiUrl` en `environment.prod.ts` con la URL del backend
