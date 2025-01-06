# Instalar las dependencias
npm install

# Instalar Material UI y otras dependencias necesarias
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled react-hook-form react-router-dom
```

### 3. Configurar News API

Regístrate en [News API](https://newsapi.org/) y genera una API key. Reemplaza `API_KEY` en las solicitudes de API dentro del proyecto por tu clave personal.

### 4. Iniciar el servidor de desarrollo
Ejecuta el siguiente comando para iniciar el servidor:
```bash
npm run dev
```

Abre el navegador en [http://localhost:5173](http://localhost:5173) para ver la aplicación.

---

## Hooks utilizados

### 1. `useState`
- **Descripción:** Manejo del estado local en componentes funcionales.
- **Ejemplo de uso:** Control de la visibilidad de contraseñas en `Login.jsx` y `Register.jsx`, selección de artículos en `Cards.jsx`.

### 2. `useEffect`
- **Descripción:** Manejo de efectos secundarios como llamadas a la API o cambios en el DOM.
- **Ejemplo de uso:** Carga inicial de noticias en `NewsPage.jsx` y búsqueda en `SearchPage.jsx`.

### 3. `useContext`
- **Descripción:** Acceso a contextos globales, como temas y autenticación de usuarios.
- **Ejemplo de uso:** Uso de `UserContext` en múltiples componentes como `Navbar.jsx`, `FavoritesPage.jsx` y `SettingsPage.jsx`.

### 4. `useCallback`
- **Descripción:** Optimización de funciones mediante memorización.
- **Ejemplo de uso:** Funciones como `login`, `logout` y gestión de favoritos en `UserContext.jsx`.

### 5. `useForm`
- **Descripción:** Gestión de formularios y validaciones.
- **Ejemplo de uso:** Validación de formularios en `Login.jsx` y `Register.jsx`.

---

## Funcionalidades implementadas

### 1. Inicio de sesión y registro
- Los usuarios pueden autenticarse y crear cuentas utilizando `LoginPage.jsx` y `RegisterPage.jsx`, que incluyen validación y gestión de errores.

### 2. Gestión de noticias
- Obtención de noticias más recientes con News API, categorizadas y paginadas en `NewsPage.jsx` y `Pagination.jsx`.

### 3. Favoritos
- Los usuarios pueden guardar noticias favoritas desde `Cards.jsx` y gestionarlas en `FavoritesPage.jsx`.

### 4. Modo claro/oscuro
- Alternancia entre temas claro y oscuro mediante `Navbar.jsx` y `UserContext`.

### 5. Búsqueda de noticias
- Los usuarios pueden buscar noticias específicas en `SearchPage.jsx` utilizando un input conectado a News API.

### 6. Configuración del perfil
- Edición de perfil (nombre de usuario y avatar) y cambio de contraseña en `SettingsPage.jsx`.

### 7. Carrusel de categorías
- Visualización de categorías en un carrusel interactivo dentro de `Carousel.jsx`.

### 8. Pie de página con enlaces sociales
- Información y enlaces sociales en el pie de página (`Footer.jsx`).

---

## Estructura del proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
src
├── App.jsx: Componente raíz.
├── main.jsx: Punto de entrada del proyecto.
├── assets: Archivos de imágenes.
│   └───image: Imágenes utilizadas en la aplicación.
├── components: Componentes reutilizables.
│   ├── Cards.jsx: Muestra artículos en formato de tarjetas.
│   ├── Carousel.jsx: Carrusel interactivo de categorías.
│   ├── Footer.jsx: Pie de página con información y enlaces sociales.
│   ├── UserGreeting.jsx: Muestra un saludo al usuario.
│   ├── modal: Modales interactivos (búsqueda, noticias, cambio de contraseña).
│   ├── navbar: Barra de navegación principal.
│   └── paginacion: Paginación para los resultados de noticias.
├── context: Manejo de estado global mediante contextos.
│   ├── LoadingContext.jsx: Indicador de carga global.
│   └── UserContext.jsx: Contexto para la autenticación y preferencias del usuario.
├── pages: Páginas principales de la aplicación.
│   ├── FavoritesPage.jsx: Gestión de noticias favoritas.
│   ├── LoginPage.jsx: Página de inicio de sesión.
│   ├── NewsPage.jsx: Página principal de noticias.
│   ├── RegisterPage.jsx: Página de registro de usuarios.
│   ├── SearchPage.jsx: Resultados de búsqueda.
│   ├── SettingsPage.jsx: Configuración del perfil.
│   └── categorias: Página dinámica para las categorías de noticias.
```

---

Si necesitas más información o alguna aclaración, no dudes en preguntar. 🚀
