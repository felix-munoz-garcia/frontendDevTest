# 📱 MobileShop - Front-End Test

Aplicación Single Page Application (SPA) desarrollada con React para la visualización y gestión de un catálogo de dispositivos móviles.

## 🚀 Funcionalidades Principales

- **Vista de Listado (PLP):** Visualización de productos con buscador en tiempo real (filtra por marca y modelo). Diseño adaptativo con un máximo de **4 elementos por fila**.
- **Vista de Detalle (PDP):** Información técnica detallada, selección de almacenamiento/color (marcados por defecto si solo hay una opción disponible) y opción de añadir al carrito.
- **Sistema de Caché:** Implementación de persistencia de datos en cliente con expiración de 1 hora para optimizar el tráfico de red.
- **Breadcrumbs:** Navegación jerárquica integrada en la cabecera para mejorar la experiencia de usuario.
- **Carrito Persistente:** Sincronización del estado de la cesta con el almacenamiento local del navegador.

## 🛠️ Stack Tecnológico

- **Framework:** React (Vite)
- **Estilos:** CSS Modules (Estilos encapsulados por componente)
- **Enrutado:** React Router Dom
- **Gestión de API:** Fetch API con lógica de interceptación para caché.
- **API Base URL:** `https://itx-frontend-test.onrender.com/api`

## 📂 Estructura del Proyecto

```text
src/
├── components/     # Componentes reutilizables (Header, Breadcrumbs, etc.)
├── pages/          # Vistas principales (Listado y Detalle)
├── services/       # Lógica de API y gestión de caché
├── styles/         # Estilos globales y variables
└── App.jsx         # Enrutado y estado global del carrito
```

## � Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en local:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Lanzar en modo desarrollo:**
   ```bash
   npm run start
   ```

## 📜 Scripts del Proyecto

Según los requerimientos de la prueba, dispone de los siguientes comandos:

| Comando | Acción |
| :--- | :--- |
| `npm run start` | Ejecuta la aplicación en modo desarrollo. |
| `npm run build` | Compila el proyecto para producción. |
| `npm run test` | Ejecuta las pruebas unitarias. |
| `npm run lint` | Comprueba la calidad y formato del código. |

## 💾 Detalles de Implementación: Persistencia

Para cumplir con el requisito de optimización de peticiones:
- Se utiliza el **LocalStorage** para almacenar las respuestas del listado y los detalles de cada producto.
- Cada entrada incluye un `timestamp`.
- Al realizar una petición, el servicio comprueba si el dato existe y si tiene menos de **60 minutos** de antigüedad. Si ha expirado, se realiza una nueva llamada al API y se actualiza la caché.

## 🧪 Testing y Calidad

- **Unit Tests:** Se han implementado pruebas exhaustivas para el servicio de API utilizando `Vitest`, cubriendo:
  - Mocking de peticiones de red (`fetch`).
  - Validación de la lógica de expiración de caché mediante `fakeTimers`.
  - Persistencia correcta en `localStorage`.

---