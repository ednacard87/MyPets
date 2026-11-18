/* ==========================================================================
   MY PETS - Lógica Global y Gestión de Estado (JavaScript Puro + localStorage)
   ==========================================================================
   Este archivo centraliza:
   1. Datos semilla (Productos y Veterinarios).
   2. Renderizado consistente de Header (Navbar) y Footer en las 8 páginas.
   3. Simulación de Autenticación (Registro, Login, Logout).
   4. Gestión del Carrito de Compras e Historial de Pedidos.
   5. Gestión de Citas / Reservas Veterinarias.
   ========================================================================== */

const STORAGE_KEYS = {
  USERS: 'mypets_users',
  SESSION: 'mypets_session',
  CART: 'mypets_cart',
  ORDERS: 'mypets_orders',
  RESERVATIONS: 'mypets_reservations'
};

/* --------------------------------------------------------------------------
   1. CATÁLOGO DE PRODUCTOS (Incluye los 4 destacados del mockup)
   -------------------------------------------------------------------------- */
const CATALOGO_PRODUCTOS = [
  {
    id: 'prod-1',
    nombre: 'Cama',
    categoria: 'accesorios',
    mascota: 'Perros y Gatos',
    precio: 70000,
    destacado: true,
    descripcion: 'Cama acolchada azul con bordado de huella, ultra cómoda y lavable.',
    imagen: 'img/cama.png'
  },
  {
    id: 'prod-2',
    nombre: 'Royal Canin 4 Kilos',
    categoria: 'alimentos',
    mascota: 'Perros',
    precio: 150000,
    destacado: true,
    descripcion: 'Alimento seco premium para cachorros y perros adultos con vitaminas.',
    imagen: 'img/royal-canin.png'
  },
  {
    id: 'prod-3',
    nombre: 'Juguete interactivo',
    categoria: 'juguetes',
    mascota: 'Perros',
    precio: 30000,
    destacado: true,
    descripcion: 'Juguete con ventosa y cuerda resistente para estimular la mordida.',
    imagen: 'img/juguete-interactivo.png'
  },
  {
    id: 'prod-4',
    nombre: 'Pechera Personaliza',
    categoria: 'accesorios',
    mascota: 'Perros y Gatos',
    precio: 50000,
    destacado: true,
    descripcion: 'Arnés ergonómico con estampado divertido y correa a juego incluida.',
    imagen: 'img/pechera.png'
  },
  {
    id: 'prod-5',
    nombre: 'Rascador Torre Felina',
    categoria: 'juguetes',
    mascota: 'Gatos',
    precio: 95000,
    destacado: false,
    descripcion: 'Torre de sisal natural con pompón colgante y plataforma suave.',
    svg: `<svg viewBox="0 0 160 120" width="140" height="105">
      <rect x="40" y="92" width="80" height="12" rx="6" fill="#8d6e63"/>
      <rect x="72" y="34" width="16" height="58" fill="#d7ccc8"/>
      <rect x="52" y="24" width="56" height="12" rx="6" fill="#2ec49f"/>
      <circle cx="105" cy="52" r="7" fill="#f5ad7e"/>
    </svg>`
  },
  {
    id: 'prod-6',
    nombre: 'Shampoo Hipoalergénico Avena',
    categoria: 'higiene',
    mascota: 'Perros y Gatos',
    precio: 38000,
    destacado: false,
    descripcion: 'Cuidado dermatológico suave con extracto de avena y aloe vera (500ml).',
    svg: `<svg viewBox="0 0 160 120" width="140" height="105">
      <rect x="60" y="30" width="40" height="75" rx="10" fill="#7dd8bf"/>
      <rect x="70" y="16" width="20" height="14" rx="4" fill="#007d8a"/>
      <rect x="65" y="48" width="30" height="36" rx="4" fill="#ffffff"/>
    </svg>`
  },
  {
    id: 'prod-7',
    nombre: 'Snacks Salmón para Gatos',
    categoria: 'alimentos',
    mascota: 'Gatos',
    precio: 22000,
    destacado: false,
    descripcion: 'Bocaditos crocantes rellenos de crema de salmón ricos en Omega 3.',
    svg: `<svg viewBox="0 0 160 120" width="140" height="105">
      <rect x="48" y="22" width="64" height="80" rx="10" fill="#f5ad7e"/>
      <circle cx="80" cy="60" r="18" fill="#fff"/>
      <circle cx="80" cy="60" r="8" fill="#e57373"/>
    </svg>`
  },
  {
    id: 'prod-8',
    nombre: 'Comedero Doble Acero Inox',
    categoria: 'accesorios',
    mascota: 'Perros y Gatos',
    precio: 45000,
    destacado: false,
    descripcion: 'Base antideslizante en silicona con dos platos desmontables de acero.',
    svg: `<svg viewBox="0 0 160 120" width="140" height="105">
      <rect x="24" y="64" width="112" height="26" rx="12" fill="#2ec49f"/>
      <ellipse cx="56" cy="64" rx="22" ry="10" fill="#cfd8dc" stroke="#90a4ae" stroke-width="3"/>
      <ellipse cx="104" cy="64" rx="22" ry="10" fill="#cfd8dc" stroke="#90a4ae" stroke-width="3"/>
    </svg>`
  }
];

/* --------------------------------------------------------------------------
   2. LISTADO DE VETERINARIOS
   -------------------------------------------------------------------------- */
const LISTA_VETERINARIOS = [
  {
    id: 'vet-1',
    nombre: 'Dra. Valentina Morales',
    especialidad: 'Medicina General y Vacunación',
    experiencia: '8 años de experiencia',
    horario: 'Lunes a Sábado • 8:00 AM - 5:00 PM',
    iniciales: 'VM'
  },
  {
    id: 'vet-2',
    nombre: 'Dr. Sebastián Rojas',
    especialidad: 'Cirugía y Ortopedia Canina/Felina',
    experiencia: '11 años de experiencia',
    horario: 'Lunes a Viernes • 9:00 AM - 6:00 PM',
    iniciales: 'SR'
  },
  {
    id: 'vet-3',
    nombre: 'Dra. Camila Echeverri',
    especialidad: 'Dermatología y Nutrición Animal',
    experiencia: '6 años de experiencia',
    horario: 'Martes a Sábado • 10:00 AM - 4:00 PM',
    iniciales: 'CE'
  },
  {
    id: 'vet-4',
    nombre: 'Dr. Andrés Felipe Gómez',
    especialidad: 'Medicina Interna y Ecografía',
    experiencia: '9 años de experiencia',
    horario: 'Lunes a Sábado • 7:30 AM - 3:30 PM',
    iniciales: 'AG'
  }
];

/* --------------------------------------------------------------------------
   3. UTILIDADES DE RUTA, FORMATO Y LOCALSTORAGE
   -------------------------------------------------------------------------- */
function esPaginaInterna() {
  return window.location.pathname.includes('/pages/');
}

function resolverRuta(rutaDesdeRaiz) {
  return esPaginaInterna() ? `../${rutaDesdeRaiz}` : rutaDesdeRaiz;
}

function formatearCOP(valor) {
  return valor.toLocaleString('es-CO');
}

function leerStorage(clave, defecto = []) {
  try {
    const raw = localStorage.getItem(clave);
    return raw ? JSON.parse(raw) : defecto;
  } catch (e) {
    console.error('Error leyendo localStorage:', e);
    return defecto;
  }
}

function guardarStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

function obtenerSesionActual() {
  return leerStorage(STORAGE_KEYS.SESSION, null);
}

/* Inicializa datos de demostración si es la primera vez que se abre el sitio */
function inicializarDatosDemo() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    guardarStorage(STORAGE_KEYS.USERS, [
      {
        id: 'usr-demo',
        nombre: 'Tatiana Gómez',
        email: 'demo@mypets.com',
        telefono: '3013059673',
        mascota: 'Luna (Golden Retriever)',
        password: '123'
      }
    ]);
  }

  if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
    guardarStorage(STORAGE_KEYS.RESERVATIONS, [
      {
        id: 'RES-101',
        mascota: 'Luna',
        especie: 'Perro',
        propietario: 'Tatiana Gómez',
        veterinario: 'Dra. Valentina Morales',
        servicio: 'Consulta General y Control',
        fecha: '2026-11-25',
        hora: '10:00',
        notas: 'Control anual de vacunas.',
        estado: 'Confirmada'
      }
    ]);
  }
}

/* Notificación flotante amigable */
function mostrarToast(mensaje) {
  let contenedor = document.querySelector('.toast-container');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.className = 'toast-container';
    document.body.appendChild(contenedor);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.textContent = mensaje;
  contenedor.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* --------------------------------------------------------------------------
   4. RENDERIZADO GLOBAL DE HEADER (NAVBAR) Y FOOTER
   -------------------------------------------------------------------------- */
function obtenerIconoHuellaSVG() {
  return `<svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M22 36 C15 36 12 43 16 49 C20 55 28 53 32 49 C36 45 38 39 33 35 C29 32 26 36 22 36 Z" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="18" cy="24" rx="4.2" ry="5.5" transform="rotate(-20 18 24)" stroke-width="3"/>
    <ellipse cx="29" cy="18" rx="4.2" ry="5.5" transform="rotate(-5 29 18)" stroke-width="3"/>
    <ellipse cx="41" cy="21" rx="4.2" ry="5.5" transform="rotate(15 41 21)" stroke-width="3"/>
    <ellipse cx="48" cy="32" rx="4.2" ry="5.2" transform="rotate(32 48 32)" stroke-width="3"/>
  </svg>`;
}

function renderizarHeader() {
  const headerEl = document.getElementById('site-header');
  if (!headerEl) return;

  const sesion = obtenerSesionActual();
  const carrito = leerStorage(STORAGE_KEYS.CART, []);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const pathActual = window.location.pathname;

  const esActivo = (archivo) => pathActual.endsWith(archivo) ? 'active' : '';

  // Links de Reservas y Mis Compras solo aparecen cuando el cliente inició sesión
  const linksPrivadosHTML = sesion
    ? `
      <a href="${resolverRuta('pages/reservas.html')}" class="nav-link ${esActivo('reservas.html')}">RESERVAS</a>
      <a href="${resolverRuta('pages/mis-compras.html')}" class="nav-link ${esActivo('mis-compras.html')}">MIS COMPRAS</a>
    `
    : '';

  // Cuando hay sesión activa se muestra Carrito, saludo y botón Cerrar Sesión;
  // cuando NO hay sesión solo aparecen INICIAR SESION y REGISTRO.
  const botonesSesionHTML = sesion
    ? `
      <a href="${resolverRuta('pages/mis-compras.html')}" class="cart-badge-link" title="Ver carrito y compras">
        🛒 Carrito <span class="badge-count" id="nav-cart-count">${totalItems}</span>
      </a>
      <span class="user-chip" title="Usuario activo">🐾 Hola, ${sesion.nombre.split(' ')[0]}</span>
      <button type="button" class="btn-auth" id="btn-logout">CERRAR SESION</button>
    `
    : `
      <a href="${resolverRuta('pages/login.html')}" class="btn-auth">INICIAR SESION</a>
      <a href="${resolverRuta('pages/registro.html')}" class="btn-auth">REGISTRO</a>
    `;

  headerEl.innerHTML = `
    <div class="container navbar" id="main-navbar">
      <a href="${resolverRuta('index.html')}" class="brand-logo" aria-label="Ir al inicio de My Pets">
        ${obtenerIconoHuellaSVG()}
        <span>MY PETS</span>
      </a>

      <button type="button" class="menu-toggle" id="btn-menu-toggle" aria-label="Abrir menú">
        ☰ Menú
      </button>

      <nav class="nav-links" aria-label="Navegación principal">
        <a href="${resolverRuta('index.html')}" class="nav-link ${esActivo('index.html') || pathActual.endsWith('/') ? 'active' : ''}">INICIO</a>
        <a href="${resolverRuta('pages/productos.html')}" class="nav-link ${esActivo('productos.html')}">TIENDA</a>
        
        <div class="nav-dropdown">
          <a href="${resolverRuta('pages/veterinarios.html')}" class="nav-link ${esActivo('veterinarios.html') || esActivo('peluqueria-guarderia.html') ? 'active' : ''}">SERVICIOS</a>
          <div class="nav-dropdown-menu">
            <a href="${resolverRuta('pages/veterinarios.html')}">🩺 Veterinarios y Citas</a>
            <a href="${resolverRuta('pages/peluqueria-guarderia.html')}">✂️ Peluquería y Guardería</a>
            ${sesion ? `<a href="${resolverRuta('pages/reservas.html')}">📅 Gestionar Mis Reservas</a>` : ''}
          </div>
        </div>

        ${linksPrivadosHTML}
      </nav>

      <div class="nav-actions">
        ${botonesSesionHTML}
      </div>
    </div>
  `;

  // Evento menú móvil
  const btnToggle = document.getElementById('btn-menu-toggle');
  const navbar = document.getElementById('main-navbar');
  if (btnToggle && navbar) {
    btnToggle.addEventListener('click', () => {
      navbar.classList.toggle('nav-open');
    });
  }

  // Evento cerrar sesión
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      mostrarToast('Has cerrado sesión correctamente.');
      setTimeout(() => {
        window.location.href = resolverRuta('index.html');
      }, 700);
    });
  }
}

function renderizarFooter() {
  const footerEl = document.getElementById('site-footer');
  if (!footerEl) return;

  footerEl.innerHTML = `
    <div class="container footer-grid">
      <div>
        <a href="${resolverRuta('index.html')}" class="footer-brand">
          ${obtenerIconoHuellaSVG()}
          <span>MY PETS</span>
        </a>
      </div>

      <div class="footer-social">
        <p>Social Info</p>
        <div class="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram My Pets">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook My Pets">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-contact">
        <div class="footer-contact-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#141e1b">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
          </svg>
          <span>Ciudad, Colombia</span>
        </div>
        <div class="footer-contact-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#141e1b" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>+57 3013059673</span>
        </div>
        <div class="footer-copy">2026- Mi mascota</div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   5. FUNCIONES DEL CARRITO DE COMPRAS
   -------------------------------------------------------------------------- */
function agregarAlCarrito(productoId) {
  const producto = CATALOGO_PRODUCTOS.find((p) => p.id === productoId);
  if (!producto) return;

  const carrito = leerStorage(STORAGE_KEYS.CART, []);
  const existente = carrito.find((item) => item.id === productoId);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      cantidad: 1
    });
  }

  guardarStorage(STORAGE_KEYS.CART, carrito);
  actualizarContadorCarrito();
  mostrarToast(`"${producto.nombre}" agregado al carrito 🐾`);
}

function actualizarContadorCarrito() {
  const badge = document.getElementById('nav-cart-count');
  if (!badge) return;
  const carrito = leerStorage(STORAGE_KEYS.CART, []);
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  badge.textContent = total;
}

/* --------------------------------------------------------------------------
   6. CONTROLADORES POR PÁGINA
   -------------------------------------------------------------------------- */

/* Helper para obtener la miniatura del producto (imagen real o SVG) */
function obtenerVisualProducto(prod) {
  if (prod.imagen) {
    return `<img src="${resolverRuta(prod.imagen)}" alt="${prod.nombre}" />`;
  }
  return prod.svg || '';
}

/* --- 6.1 PÁGINA DE INICIO (index.html) --- */
function iniciarPaginaHome() {
  const gridDestacados = document.getElementById('featured-products-grid');
  if (!gridDestacados) return;

  const destacados = CATALOGO_PRODUCTOS.filter((p) => p.destacado);
  gridDestacados.innerHTML = destacados
    .map(
      (prod) => `
      <article class="product-card">
        <div>
          <div class="product-thumb">
            ${obtenerVisualProducto(prod)}
          </div>
          <h3 class="product-title">${prod.nombre}</h3>
        </div>
        <div class="product-footer">
          <span class="price-pill">${formatearCOP(prod.precio)}</span>
        </div>
      </article>
    `
    )
    .join('');
}

/* --- 6.2 PÁGINA DE PRODUCTOS (pages/productos.html) --- */
function iniciarPaginaProductos() {
  const contenedor = document.getElementById('catalog-products-grid');
  if (!contenedor) return;

  const botonesFiltro = document.querySelectorAll('[data-filter-cat]');
  const inputBusqueda = document.getElementById('search-products');
  let categoriaActiva = 'todos';
  let textoBusqueda = '';

  function renderCatalogo() {
    const filtrados = CATALOGO_PRODUCTOS.filter((prod) => {
      const coincideCat = categoriaActiva === 'todos' || prod.categoria === categoriaActiva;
      const coincideTexto =
        prod.nombre.toLowerCase().includes(textoBusqueda) ||
        prod.descripcion.toLowerCase().includes(textoBusqueda) ||
        prod.mascota.toLowerCase().includes(textoBusqueda);
      return coincideCat && coincideTexto;
    });

    if (filtrados.length === 0) {
      contenedor.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>No encontramos productos con ese filtro</h3>
          <p>Intenta con otra categoría o término de búsqueda.</p>
        </div>
      `;
      return;
    }

    contenedor.innerHTML = filtrados
      .map(
        (prod) => `
        <article class="product-card">
          <div>
            <div class="product-thumb">${obtenerVisualProducto(prod)}</div>
            <div class="product-category-tag">${prod.categoria} • ${prod.mascota}</div>
            <h3 class="product-title">${prod.nombre}</h3>
            <p class="product-desc">${prod.descripcion}</p>
          </div>
          <div class="product-footer">
            <span class="price-pill">$${formatearCOP(prod.precio)}</span>
            <button type="button" class="btn-add-cart" data-add-cart="${prod.id}">Agregar 🛒</button>
          </div>
        </article>
      `
      )
      .join('');
  }

  botonesFiltro.forEach((btn) => {
    btn.addEventListener('click', () => {
      botonesFiltro.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      categoriaActiva = btn.getAttribute('data-filter-cat');
      renderCatalogo();
    });
  });

  if (inputBusqueda) {
    inputBusqueda.addEventListener('input', (e) => {
      textoBusqueda = e.target.value.trim().toLowerCase();
      renderCatalogo();
    });
  }

  contenedor.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-cart]');
    if (btn) {
      agregarAlCarrito(btn.getAttribute('data-add-cart'));
    }
  });

  renderCatalogo();
}

/* --- 6.3 PÁGINA DE LOGIN (pages/login.html) --- */
function iniciarPaginaLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value.trim();

    const usuarios = leerStorage(STORAGE_KEYS.USERS, []);
    const usuario = usuarios.find((u) => u.email.toLowerCase() === email && u.password === password);

    if (!usuario) {
      mostrarToast('Correo o contraseña incorrectos. Puedes probar con demo@mypets.com / 123');
      return;
    }

    guardarStorage(STORAGE_KEYS.SESSION, {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      mascota: usuario.mascota
    });

    mostrarToast(`¡Bienvenido(a), ${usuario.nombre}!`);
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 800);
  });
}

/* --- 6.4 PÁGINA DE REGISTRO (pages/registro.html) --- */
function iniciarPaginaRegistro() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const telefono = document.getElementById('reg-telefono').value.trim();
    const mascota = document.getElementById('reg-mascota').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    const usuarios = leerStorage(STORAGE_KEYS.USERS, []);
    if (usuarios.some((u) => u.email.toLowerCase() === email)) {
      mostrarToast('Ya existe una cuenta registrada con este correo.');
      return;
    }

    const nuevoUsuario = {
      id: 'usr-' + Date.now(),
      nombre,
      email,
      telefono,
      mascota,
      password
    };

    usuarios.push(nuevoUsuario);
    guardarStorage(STORAGE_KEYS.USERS, usuarios);
    guardarStorage(STORAGE_KEYS.SESSION, {
      id: nuevoUsuario.id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      mascota: nuevoUsuario.mascota
    });

    mostrarToast('¡Cuenta creada con éxito! Redirigiendo al inicio...');
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 900);
  });
}

/* --- 6.5 PÁGINA DE VETERINARIOS Y AGENDAMIENTO (pages/veterinarios.html) --- */
function iniciarPaginaVeterinarios() {
  const contenedorVets = document.getElementById('vets-list-container');
  const selectVet = document.getElementById('cita-veterinario');
  const formCita = document.getElementById('booking-form');
  if (!contenedorVets || !formCita) return;

  // Render tarjetas de veterinarios
  contenedorVets.innerHTML = LISTA_VETERINARIOS.map(
    (vet) => `
    <article class="vet-card">
      <div style="display:flex; align-items:center; gap:14px;">
        <div class="vet-avatar">${vet.iniciales}</div>
        <div>
          <h3>${vet.nombre}</h3>
          <span class="vet-specialty">${vet.especialidad}</span>
        </div>
      </div>
      <p style="font-size:0.9rem; color:var(--color-text-muted);">${vet.experiencia}</p>
      <p style="font-size:0.86rem; font-weight:600;">🕒 ${vet.horario}</p>
      <button type="button" class="btn-pill-mint" data-select-vet="${vet.nombre}" style="width:fit-content; margin-top:6px;">
        Elegir profesional
      </button>
    </article>
  `
  ).join('');

  // Llenar opciones del select
  selectVet.innerHTML = LISTA_VETERINARIOS.map(
    (vet) => `<option value="${vet.nombre}">${vet.nombre} - ${vet.especialidad}</option>`
  ).join('');

  // Prellenar propietario si hay sesión iniciada
  const sesion = obtenerSesionActual();
  if (sesion) {
    const inputProp = document.getElementById('cita-propietario');
    const inputMascota = document.getElementById('cita-mascota');
    if (inputProp && !inputProp.value) inputProp.value = sesion.nombre;
    if (inputMascota && sesion.mascota && !inputMascota.value) {
      inputMascota.value = sesion.mascota.split(' ')[0];
    }
  }

  // Fecha mínima hoy
  const inputFecha = document.getElementById('cita-fecha');
  if (inputFecha) {
    inputFecha.min = new Date().toISOString().split('T')[0];
  }

  // Botón "Elegir profesional" selecciona en el formulario
  contenedorVets.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-select-vet]');
    if (btn) {
      selectVet.value = btn.getAttribute('data-select-vet');
      document.getElementById('cita-mascota').focus();
      mostrarToast(`Seleccionaste a ${selectVet.value}`);
    }
  });

  // Guardar reserva en localStorage
  formCita.addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevaCita = {
      id: 'RES-' + Math.floor(100 + Math.random() * 900),
      propietario: document.getElementById('cita-propietario').value.trim(),
      mascota: document.getElementById('cita-mascota').value.trim(),
      especie: document.getElementById('cita-especie').value,
      veterinario: selectVet.value,
      servicio: document.getElementById('cita-servicio').value,
      fecha: document.getElementById('cita-fecha').value,
      hora: document.getElementById('cita-hora').value,
      notas: document.getElementById('cita-notas').value.trim() || 'Sin observaciones adicionales',
      estado: 'Confirmada'
    };

    const reservas = leerStorage(STORAGE_KEYS.RESERVATIONS, []);
    reservas.unshift(nuevaCita);
    guardarStorage(STORAGE_KEYS.RESERVATIONS, reservas);

    formCita.reset();
    mostrarToast('¡Cita agendada con éxito! Redirigiendo a tus reservas...');
    setTimeout(() => {
      window.location.href = 'reservas.html';
    }, 1000);
  });
}

/* --- 6.6 PÁGINA DE GESTIÓN DE RESERVAS (pages/reservas.html) --- */
function iniciarPaginaReservas() {
  const contenedor = document.getElementById('reservations-table-container');
  if (!contenedor) return;

  function renderReservas() {
    const reservas = leerStorage(STORAGE_KEYS.RESERVATIONS, []);

    if (reservas.length === 0) {
      contenedor.innerHTML = `
        <div class="empty-state">
          <h3>Aún no tienes citas o reservas agendadas</h3>
          <p style="margin: 8px 0 18px;">Agenda una consulta con nuestros especialistas veterinarios.</p>
          <a href="veterinarios.html" class="btn-primary">Agendar nueva cita</a>
        </div>
      `;
      return;
    }

    contenedor.innerHTML = `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Mascota</th>
              <th>Propietario</th>
              <th>Veterinario / Servicio</th>
              <th>Fecha y Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${reservas
              .map(
                (r) => `
              <tr>
                <td><strong>${r.id}</strong></td>
                <td>${r.mascota} <small>(${r.especie})</small></td>
                <td>${r.propietario}</td>
                <td>
                  <div><strong>${r.veterinario}</strong></div>
                  <div style="font-size:0.84rem; color:var(--color-text-muted);">${r.servicio}</div>
                </td>
                <td>${r.fecha} • ${r.hora}</td>
                <td>
                  <span class="status-badge ${r.estado === 'Confirmada' ? 'status-confirmada' : 'status-cancelada'}">
                    ${r.estado}
                  </span>
                </td>
                <td>
                  ${
                    r.estado === 'Confirmada'
                      ? `<button type="button" class="btn-danger" data-cancel-res="${r.id}">Cancelar</button>`
                      : `<button type="button" class="btn-outline" data-delete-res="${r.id}" style="padding:4px 12px; font-size:0.8rem;">Eliminar</button>`
                  }
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  contenedor.addEventListener('click', (e) => {
    const btnCancelar = e.target.closest('[data-cancel-res]');
    const btnEliminar = e.target.closest('[data-delete-res]');

    if (btnCancelar) {
      const id = btnCancelar.getAttribute('data-cancel-res');
      const reservas = leerStorage(STORAGE_KEYS.RESERVATIONS, []);
      const reserva = reservas.find((r) => r.id === id);
      if (reserva) {
        reserva.estado = 'Cancelada';
        guardarStorage(STORAGE_KEYS.RESERVATIONS, reservas);
        mostrarToast(`La reserva ${id} fue cancelada.`);
        renderReservas();
      }
    }

    if (btnEliminar) {
      const id = btnEliminar.getAttribute('data-delete-res');
      const reservas = leerStorage(STORAGE_KEYS.RESERVATIONS, []).filter((r) => r.id !== id);
      guardarStorage(STORAGE_KEYS.RESERVATIONS, reservas);
      mostrarToast(`Reserva ${id} eliminada del historial.`);
      renderReservas();
    }
  });

  renderReservas();
}

/* --- 6.7 PÁGINA DE MIS COMPRAS Y CARRITO (pages/mis-compras.html) --- */
function iniciarPaginaMisCompras() {
  const cartContainer = document.getElementById('cart-items-container');
  const ordersContainer = document.getElementById('orders-history-container');
  if (!cartContainer || !ordersContainer) return;

  function renderCarrito() {
    const carrito = leerStorage(STORAGE_KEYS.CART, []);

    if (carrito.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-state">
          <h3>Tu carrito de compras está vacío 🛒</h3>
          <p style="margin: 8px 0 18px;">Explora nuestra tienda de alimentos, camas, juguetes y accesorios.</p>
          <a href="productos.html" class="btn-primary">Ir a la Tienda</a>
        </div>
      `;
      return;
    }

    const totalCompra = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    cartContainer.innerHTML = `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Quitar</th>
            </tr>
          </thead>
          <tbody>
            ${carrito
              .map(
                (item) => `
              <tr>
                <td><strong>${item.nombre}</strong></td>
                <td>$${formatearCOP(item.precio)}</td>
                <td>
                  <div class="qty-controls">
                    <button type="button" class="qty-btn" data-qty-action="dec" data-id="${item.id}">-</button>
                    <span>${item.cantidad}</span>
                    <button type="button" class="qty-btn" data-qty-action="inc" data-id="${item.id}">+</button>
                  </div>
                </td>
                <td><strong>$${formatearCOP(item.precio * item.cantidad)}</strong></td>
                <td>
                  <button type="button" class="btn-danger" data-remove-item="${item.id}">Eliminar</button>
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-top:22px; padding-top:16px; border-top:2px solid var(--color-border);">
        <button type="button" class="btn-outline" id="btn-clear-cart">Vaciar carrito</button>
        <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap;">
          <div style="font-size:1.25rem; font-weight:700; color:var(--color-hero-green);">
            Total a pagar: $${formatearCOP(totalCompra)}
          </div>
          <button type="button" class="btn-primary" id="btn-checkout">Confirmar Compra ✅</button>
        </div>
      </div>
    `;
  }

  function renderHistorialPedidos() {
    const pedidos = leerStorage(STORAGE_KEYS.ORDERS, []);
    if (pedidos.length === 0) {
      ordersContainer.innerHTML = `
        <div class="empty-state">
          <p>Aún no has realizado pedidos. Cuando confirmes una compra aparecerá aquí.</p>
        </div>
      `;
      return;
    }

    ordersContainer.innerHTML = `
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total Pagado</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${pedidos
              .map(
                (ped) => `
              <tr>
                <td><strong>${ped.id}</strong></td>
                <td>${ped.fecha}</td>
                <td>${ped.cliente}</td>
                <td>${ped.resumen}</td>
                <td><strong>$${formatearCOP(ped.total)}</strong></td>
                <td><span class="status-badge status-confirmada">Completado</span></td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  cartContainer.addEventListener('click', (e) => {
    const btnQty = e.target.closest('[data-qty-action]');
    const btnRemove = e.target.closest('[data-remove-item]');
    const carrito = leerStorage(STORAGE_KEYS.CART, []);

    if (btnQty) {
      const id = btnQty.getAttribute('data-id');
      const accion = btnQty.getAttribute('data-qty-action');
      const item = carrito.find((i) => i.id === id);
      if (item) {
        if (accion === 'inc') item.cantidad += 1;
        if (accion === 'dec') item.cantidad -= 1;
        const actualizado = carrito.filter((i) => i.cantidad > 0);
        guardarStorage(STORAGE_KEYS.CART, actualizado);
        actualizarContadorCarrito();
        renderCarrito();
      }
    }

    if (btnRemove) {
      const id = btnRemove.getAttribute('data-remove-item');
      const actualizado = carrito.filter((i) => i.id !== id);
      guardarStorage(STORAGE_KEYS.CART, actualizado);
      actualizarContadorCarrito();
      mostrarToast('Producto eliminado del carrito.');
      renderCarrito();
    }

    if (e.target.id === 'btn-clear-cart') {
      guardarStorage(STORAGE_KEYS.CART, []);
      actualizarContadorCarrito();
      mostrarToast('Se vació el carrito.');
      renderCarrito();
    }

    if (e.target.id === 'btn-checkout') {
      if (carrito.length === 0) return;
      const sesion = obtenerSesionActual();
      const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      const resumen = carrito.map((i) => `${i.nombre} (x${i.cantidad})`).join(', ');

      const nuevoPedido = {
        id: 'PED-' + Math.floor(1000 + Math.random() * 9000),
        fecha: new Date().toLocaleDateString('es-CO'),
        cliente: sesion ? sesion.nombre : 'Cliente Invitado',
        resumen,
        total
      };

      const pedidos = leerStorage(STORAGE_KEYS.ORDERS, []);
      pedidos.unshift(nuevoPedido);
      guardarStorage(STORAGE_KEYS.ORDERS, pedidos);
      guardarStorage(STORAGE_KEYS.CART, []);

      actualizarContadorCarrito();
      mostrarToast('¡Compra realizada con éxito! Gracias por confiar en My Pets 🐾');
      renderCarrito();
      renderHistorialPedidos();
    }
  });

  renderCarrito();
  renderHistorialPedidos();
}

/* --------------------------------------------------------------------------
   7. INICIALIZACIÓN AL CARGAR EL DOM
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  inicializarDatosDemo();
  renderizarHeader();
  renderizarFooter();
  iniciarPaginaHome();
  iniciarPaginaProductos();
  iniciarPaginaLogin();
  iniciarPaginaRegistro();
  iniciarPaginaVeterinarios();
  iniciarPaginaReservas();
  iniciarPaginaMisCompras();
});

