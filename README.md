# React + Vite

# 💕 BodaApp — Regalo de boda interactivo

Una aplicación web creada con **React**, **HTML**, **CSS** y **JavaScript** como regalo especial para mi mejor amiga en el día de su boda.  
La idea es que sirva **antes, durante y después del evento**: para compartir recuerdos, preparar detalles y guardar dedicatorias llenas de cariño. 💌


## 🌸 Características principales

### 🏠 Home
- Página inicial con un fondo romántico, con el nombre de los novios y la fecha de la boda en una cuenta regresiva al día de la boda.
- Tipografía elegante combinando **Great Vibes** y **Quicksand**
- **Corazones flotantes animados** en el fondo
- Barra de navegación centrada arriba con todas las secciones del sitio.  
- Presentación de la app y acceso directo a las demás secciones.


### ⏳ Countdown
- Componente con una **cuenta atrás hasta el 5 de septiembre de 2026**, día de la boda.  
- Muestra días, horas, minutos y segundos que faltan.  
- Frase animada estilo “máquina de escribir”:  
  _Cada segundo nos acerca al “Sí, quiero” 💞_  

### 💑 History
- Espacio para contar la historia de la pareja.
- Posibilidad de que los amigos/familiares agreguen recuerdos o anécdotas.

### 📅 Event Day
- Detalles sobre el gran día: lugar, hora, mapa, etc.
- Agenda/cronograma del día (hora de la ceremonia, cóctel, banquete, fiesta…) y los eventos relacionados (ensayo, fiestas o despedidas de solteros, …)
- Puede usarse antes o durante el evento.

### 🧑‍🤝‍🧑 Guests
- Sección dedicada a los invitados.
- Permite listar personas importantes, confirmar asistencia con formulario, posibilidad de añadir acompañantes, alergias, necesidades especiales, o dejar mensajes.

### 🎁 Gifts
- Ideas de regalo, lista de deseos o enlaces a tiendas.

### 💌 Dedications
- Sección donde amigos y familiares pueden dejar dedicatorias, fotos,vídeos cortos, consejos,...


### 💡 Ideas
- Espacio para que los invitados sugieran canciones, actividades, juegos...

### 📸 Pictures
- Galería para subir y mostrar las mejores fotos antes (fotos de preparativos, despedidas, recuerdos), durante (espacio para que los invitados suban en vivo sus fotos, comentarios en directo, …) y después de la boda (espacio para que los invitados suban en vivo sus fotos, comentarios en directo, …)

### 🫂 Gratitudes
- Mensajes de agradecimientos para los invitados.
- Resumen recuerdos por parte de los novios.


## 🧭 Navegación

- **Navbar** fija y centrada en la parte superior.
- Los nombres de las secciones están bien separados y con efecto de resalte al pasar el ratón.
- Se puede saltar a cualquier sección desde cualquier página.
- Cada página tiene una **animación de entrada/salida** suave con `framer-motion`.


## ⚙️ Tecnologías usadas

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Google Fonts](https://fonts.google.com/)
- CSS puro (sin frameworks externos)



## 🧩 Estructura del proyecto

public/assets
src/
├── components/
│ ├── Navbar
│ └── Countdown
│ └── FloatingHearts
├── pages/
│ ├── Home
│ ├── History
│ ├── EventDay
│ ├── Guest
│ ├── Gratitudes
│ ├── Gifts
│ ├── Dedications
│ ├── Ideas
│ └── Pictures
├── App.jsx
├── App.css
└── index.js
index.html


