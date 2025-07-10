# 📱 Aplicación de Productos - Ionic Angular

Una aplicación móvil desarrollada con **Ionic 7** y **Angular 17** para gestionar productos con funcionalidades de autenticación, CRUD de productos y navegación intuitiva.

## 🚀 Características

### ✨ Funcionalidades Principales
- **🔐 Autenticación de Usuarios**: Sistema de login/logout
- **📦 Gestión de Productos**: Crear, leer, actualizar y eliminar productos
- **🔍 Búsqueda y Filtros**: Buscar productos por nombre/descripción y filtrar por categoría
- **📱 Diseño Responsivo**: Interfaz adaptada para móviles y tablets
- **💾 Almacenamiento Local**: Los datos se guardan en localStorage
- **🎨 UI Moderna**: Diseño limpio con componentes Ionic

### 📋 Funcionalidades Detalladas

#### Autenticación
- Login con validación de campos
- Protección de rutas con guards
- Cerrar sesión con confirmación

#### Gestión de Productos
- **Lista de Productos**: Vista con tarjetas de productos
- **Crear Producto**: Formulario para agregar nuevos productos
- **Editar Producto**: Modificar productos existentes
- **Eliminar Producto**: Eliminación con confirmación
- **Ver Detalles**: Página dedicada con información completa

#### Filtros y Búsqueda
- Búsqueda en tiempo real por nombre y descripción
- Filtrado por categorías (Electrónicos, Computadoras, Ropa, Hogar, Otros)
- Combinación de búsqueda y filtros

## 🛠️ Tecnologías Utilizadas

- **Ionic 7**: Framework para aplicaciones móviles híbridas
- **Angular 17**: Framework de desarrollo web
- **TypeScript**: Lenguaje de programación tipado
- **SCSS**: Preprocesador CSS
- **Ionic Components**: Componentes UI nativos
- **RxJS**: Programación reactiva

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── guards/          # Guards de autenticación
│   │   ├── models/          # Interfaces y tipos
│   │   └── services/        # Servicios de datos
│   ├── features/
│   │   ├── login/           # Página de autenticación
│   │   ├── products/        # Gestión de productos
│   │   ├── product-form/    # Formulario de productos
│   │   └── details/         # Detalles del producto
│   └── shared/
│       └── components/      # Componentes reutilizables
├── assets/                  # Recursos estáticos
└── theme/                   # Variables de tema
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Ionic CLI

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd productos-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:4200`
   - Para vista móvil, abre las herramientas de desarrollador y activa el modo responsive

## 📱 Uso de la Aplicación

### 🔐 Iniciar Sesión
1. Abre la aplicación
2. Ingresa cualquier usuario y contraseña (demo)
3. Haz clic en "Iniciar Sesión"

### 📦 Gestionar Productos

#### Ver Productos
- La página principal muestra todos los productos
- Usa la barra de búsqueda para filtrar por nombre o descripción
- Selecciona una categoría del dropdown para filtrar

#### Crear Producto
1. Haz clic en el botón flotante (+)
2. Completa el formulario con:
   - Nombre del producto
   - Descripción
   - Categoría
   - Imagen (opcional)
3. Guarda el producto

#### Editar Producto
1. Haz clic en una tarjeta de producto
2. Selecciona "Editar" en el menú
3. Modifica los campos necesarios
4. Guarda los cambios

#### Ver Detalles
1. Haz clic en una tarjeta de producto
2. Selecciona "Ver producto"
3. Observa la información completa del producto

#### Eliminar Producto
1. Haz clic en una tarjeta de producto
2. Selecciona "Eliminar"
3. Confirma la eliminación

## 🎨 Características de Diseño

### Componentes Reutilizables
- **NavbarComponent**: Barra de navegación superior
- **FloatingActionButtonComponent**: Botón flotante para acciones
- **ProductCardComponent**: Tarjeta de producto con estilos

### Estilos y Temas
- Diseño Material Design con Ionic
- Colores y variables personalizables en `theme/variables.scss`
- Componentes responsivos para diferentes tamaños de pantalla

## 🔧 Configuración de Desarrollo

### Scripts Disponibles
```bash
npm start          # Ejecutar en modo desarrollo
npm run build      # Construir para producción
npm run test       # Ejecutar pruebas
npm run lint       # Verificar código
```

### Estructura de Datos

#### Modelo de Producto
```typescript
interface Product {
  id: string
  name: string
  description: string
  category: string
  image?: string
  createdAt: Date
  updatedAt: Date
}
```

#### Categorías Disponibles
- Electrónicos
- Computadoras
- Ropa
- Hogar
- Otros

## 📊 Almacenamiento

La aplicación utiliza **localStorage** para persistir los datos:
- Los productos se guardan automáticamente
- La sesión del usuario se mantiene entre recargas
- Los datos persisten hasta limpiar el navegador

## 🚀 Despliegue

### Para Producción
```bash
npm run build
```

### Para Móvil (Capacitor)
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
npx cap sync
```

## 🐛 Solución de Problemas

### Errores Comunes

1. **"Application bundle generation complete"** - ✅ Normal, compilación exitosa
2. **"exceeded maximum budget"** - ⚠️ El CSS es más grande de lo esperado, pero no afecta la funcionalidad
3. **"empty-glob"** - ⚠️ Warning de Stencil, no afecta la aplicación

### Comandos de Limpieza
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ usando Ionic y Angular

---

**¡Disfruta gestionando tus productos! 🎉** 