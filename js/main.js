/* =========================================================
   WinsDev — JS vanilla (MODO OSCURO · todos próximamente)
   Navegación, store, detalle, modales y WhatsApp
   ========================================================= */

/* ----------------------------------------------------------
   1. CONFIGURACIÓN — EDITA AQUÍ TUS ENLACES Y DATOS
   ----------------------------------------------------------
   Para ACTIVAR un programa el día de su lanzamiento:
     👉 cambia  coming: true  por  coming: false

   Eso es todo. Los botones "Descargar" y "Usar en la web"
   se habilitarán solos y el aviso de "Próximamente" desaparecerá.
   ---------------------------------------------------------- */

const CONFIG = {
  // Cuentas de donación — los datos se muestran DIRECTO en las cards
  donation: {
    binance: {
      id:    "104506222",
      alias: "WinsTheC"
    },
    email: "winstoncontreras4@gmail.com",
    pagoMovil: {
      bank:  "Banco Tesoro (0163)",
      doc:   "V-30330289",
      phone: "0414-2362414"
    }
  },
  whatsapp: "584142362414",

  programs: [
    {
      id: "irontill",
      title: "IronTill",
      tag: "Productividad",
      coming: false,
      launchDate: "Lanzado el 27/10/26",
      platforms: ["pc"],
      short: "Tu sistema POS inteligente para el día a día.",
      desc: "IronTill es un sistema POS punto de venta para control interno, puedes: cobrar, dar vueltos, inventariar, llevar un flujo de caja. Su interfaz minimalista te permite usarla intuitivamente, tanto como cajreo como administrador. Ideal para quienes buscan una herramienta rápida, potente, sin complicaciones y totalmente gratuita.",
      image: "assets/img/irontill.png",
      download: "https://github.com/winsdevai/Instaladores/releases/download/WinsDev/IronTill.Setup.1.0.2.exe",
      useWeb:   "https://winsdevai.github.io/IronTillPOS/",
      terms:  `ACUERDO DE LICENCIA - IronTill (EULA)

I.a. ACEPTACIÓN
Al instalar IronTill usted acepta los presentes términos.

II. NATURALEZA TECNOLÓGICA
Sistema POS interno basado en Electron.

III. PROPIEDAD INTELECTUAL
Puedes reutilizar el código, pero sustituye la marca IronTill.

IV. EL SOFTWARE SE PROPORCIONA "TAL CUAL"...

V. NO FISCAL
Este software NO es un sistema POS fiscal homologado.`
    },
    {
      id: "irondate",
      title: "IronDate",
      tag: "Agenda Citar",
      coming: true,
      launchDate: "",
      platforms: ["pc", "playstore"],
      short: "Agenda citas para tus clientes.",
      desc: "IronDate te permite crear Agendar: cumpleaños, eventos, entregas, viajes o cualquier hito. Solo elige la fecha y la app te mostrará cuántos días, horas y minutos faltan, con notificaciones y funciones semi automáticas para no perderte nada. Su diseño limpio y en tonos lo hace cómodo de usar todos los días. Perfecto para organizar tu tiempo y el de tus clientes o amigos sin complicaciones.",
      image: "assets/img/irondate.png",
      download: "https://www.mediafire.com/",
      useWeb:   "https://example.com/irondate",
      terms: "Acuerdo de Llicencia de usuario final (EULA)"
    },
    {
      id: "ironstock",
      title: "IronStock",
      tag: "Inventario",
      coming: true,
      launchDate: "",
      platforms: ["pc", "playstore"],
      short: "Control de inventario simple y efectivo.",
      desc: "IronStock es una herramienta de inventario pensada para pequeños comercios, emprendedores o cualquier persona que necesite llevar control de productos. Permite registrar entradas y salidas, ver el stock actual en tiempo real y exportar reportes. Sin curva de aprendizaje, sin costos ocultos y sin necesidad de internet: funciona 100% en local. Si necesitas algo más avanzado, también puedes usar la versión web para sincronizar entre dispositivos.",
      image: "assets/img/ironstock.png",
      download: "https://www.mediafire.com/",
      useWeb:   "https://example.com/ironstock",
      terms: "Acuerdo de Llicencia de usuario final (EULA)"
    },
    {
      id: "mystery",
      title: "???",
      tag: "Próximamente",
      coming: true,
      launchDate: "",
      platforms: [],  // por definir cuando reveles el proyecto
      short: "Estamos cocinando algo nuevo. Mantente atento.",
      desc: "Pronto lanzaremos un nuevo programa en WinsDev. Aún no podemos revelar de qué se trata, pero promete ser tan útil como los anteriores. Síguenos por WhatsApp para enterarte primero cuando esté disponible.",
      image: "assets/img/mystery.png",
      download: "#",
      useWeb: "#",
      terms: "Acuerdo de Llicencia de usuario final (EULA)"
    }
  ]
};

/* ----------------------------------------------------------
   2.5  HELPERS DE PLATAFORMAS
   ----------------------------------------------------------
   Dibuja los iconitos de plataforma (PC / Play Store).
   p.platforms es un array con valores: "pc" y/o "playstore".
   ---------------------------------------------------------- */

function platformIcon(type) {
  if (type === "pc") {
    // Icono de monitor / escritorio
    return `
      <span class="plat plat-pc" title="Disponible para PC / Escritorio">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="12" rx="2"/>
          <path d="M8 20h8M12 16v4"/>
        </svg>
        <span>PC</span>
      </span>`;
  }
  if (type === "playstore") {
    // Icono de Google Play (triángulo estilo play)
    return `
      <span class="plat plat-play" title="Disponible en Play Store (Android)">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
          <path d="M3.6 2.3c-.4.2-.6.6-.6 1.1v17.2c0 .5.2.9.6 1.1l9.6-9.7L3.6 2.3z"/>
          <path d="M14 10.6 5.2 1.8 17.1 8.6 14 10.6z" opacity=".75"/>
          <path d="M14 13.4 5.2 22.2l11.9-6.8L14 13.4z" opacity=".5"/>
          <path d="M20.4 13.3 17.1 11.4l-3.5 3.5 3.5 2 3.3-1.9c1-.6 1-2.1 0-2.7z"/>
        </svg>
        <span>Play Store</span>
      </span>`;
  }
  return "";
}

function renderPlatforms(platforms) {
  if (!Array.isArray(platforms) || platforms.length === 0) return "";
  return `<div class="plats">${platforms.map(platformIcon).join("")}</div>`;
}

/* ----------------------------------------------------------
   2. RENDER DE LA TIENDA
   ---------------------------------------------------------- */

function renderStore() {
  const grid = document.getElementById("store-grid");
  if (!grid) return;

  grid.innerHTML = CONFIG.programs.map((p) => {
    const initial = (p.title || "?").charAt(0).toUpperCase();
    const media = p.image
      ? `<img src="${p.image}" alt="${p.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"/><div class="fallback" style="display:none;">${initial}</div>`
      : `<div class="fallback">${p.title === "???" ? "🚀" : initial}</div>`;

    // Badge "Próximamente": solo si coming === true
    const comingBadge = p.coming ? `<span class="card-badge">Próximamente</span>` : "";
    // Etiqueta de fecha de lanzamiento: si tiene fecha, se muestra siempre
    // (también cuando el programa ya está activo pero quieres recordar la fecha)
    const launchBadge = p.launchDate
      ? `<span class="card-launch">Estado: ${p.launchDate}</span>`
      : "";

    // Texto al pie de la tarjeta
    const footText = p.coming
      ? (p.launchDate ? `Lanzamiento ${p.launchDate}` : "Sin fecha aún")
      : (p.launchDate ? `Estado: ${p.launchDate}` : (p.tag || ""));

    // Plataformas (PC / Play Store)
    const plats = renderPlatforms(p.platforms);

    return `
      <article class="card"
               onclick="openProgram('${p.id}')"
               role="button"
               tabindex="0"
               onkeydown="if(event.key==='Enter')openProgram('${p.id}')">
        ${comingBadge}
        ${launchBadge}
        <div class="card-media">${media}</div>
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-sub">${p.short}</p>
          ${plats}
          <div class="card-foot">
            <span class="card-date">${footText}</span>
            <span class="card-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* ----------------------------------------------------------
   3. NAVEGACIÓN ENTRE VISTAS
   ---------------------------------------------------------- */

function goHome(e) {
  const hash = e?.currentTarget?.getAttribute?.("href") || "";
  if (e) e.preventDefault();

  const home = document.getElementById("home-view");
  const detail = document.getElementById("detail-view");

   if (detail && !detail.hidden) {
    history.back();
    return;
  }

  closeDonationModal();
  closeDownloadModal();

  requestAnimationFrame(() => {
    if (hash && hash.startsWith("#") && hash.length > 1) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function openProgram(id) {
  const p = CONFIG.programs.find((x) => x.id === id);
  if (!p) return;

  const home = document.getElementById("home-view");
  const detail = document.getElementById("detail-view");
  if (!home || !detail) return;

  // Textos principales
  document.getElementById("detail-title").textContent = p.title;
  document.getElementById("detail-desc").textContent = p.desc;
  document.getElementById("detail-tag").textContent = p.tag;

  const ta = document.getElementById("tai");
  if (ta) {
    ta.value = p.terms || "Términos y condiciones no disponibles para este programa.";
  }

  // Plataformas disponibles (PC / Play Store)
  const platsContainer = document.getElementById("detail-plats");
  if (platsContainer) {
    platsContainer.innerHTML = renderPlatforms(p.platforms);
  }

  // Imagen con fallback
  const img = document.getElementById("detail-img");
  if (p.image) {
    img.src = p.image;
    img.alt = p.title;
    img.onerror = () => { img.src = makeFallbackImage(p.title); };
  } else {
    img.src = makeFallbackImage(p.title);
    img.alt = p.title;
  }

  // Aviso de próximamente + fecha
  const notice = document.getElementById("coming-notice");
  const dateEl = document.getElementById("coming-date");
  const dl = document.getElementById("detail-download");
  const use = document.getElementById("detail-use");

  if (p.coming) {
    // Mostrar aviso
    notice.classList.add("show");
    if (p.launchDate) {
      dateEl.textContent = `Lanzamiento previsto: ${p.launchDate}`;
    } else {
      dateEl.textContent = "Lanzamiento previsto: por confirmar.";
    }
    // Deshabilitar botones
    dl.setAttribute("disabled", "disabled");
    dl.classList.add("is-disabled");
    dl.removeAttribute("href");
    dl.setAttribute("aria-disabled", "true");
    dl.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
      Disponible ${p.launchDate || "próximamente"}
    `;

    use.setAttribute("disabled", "disabled");
    use.classList.add("is-disabled");
    use.removeAttribute("href");
    use.setAttribute("aria-disabled", "true");
    use.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
      Disponible ${p.launchDate || "próximamente"}
    `;
  } else {
    // Programa activo: ocultar aviso y habilitar botones
    notice.classList.remove("show");
    dateEl.textContent = "";

    dl.removeAttribute("disabled");
    dl.classList.remove("is-disabled");
    dl.setAttribute("href", p.download || "#");
    dl.removeAttribute("aria-disabled");
    dl.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>
      Descargar
    `;

    use.removeAttribute("disabled");
    use.classList.remove("is-disabled");
    use.setAttribute("href", p.useWeb || "#");
    use.removeAttribute("aria-disabled");
    use.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></svg>
      Usar en la web
    `;
  }

   if (!history.state || history.state.view !== 'detail' || history.state.id !== id) {
    history.pushState({ view: 'detail', id: p.id }, '', '#' + p.id);
  }

  // Mostrar vista detalle
  home.hidden = true;
  detail.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function makeFallbackImage(title) {
  const initial = (title || "W").charAt(0).toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#0E7490"/>
          <stop offset="1" stop-color="#2DD4BF"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#g)"/>
      <text x="300" y="240" font-family="Space Grotesk, Arial, sans-serif" font-size="180" font-weight="700" fill="white" text-anchor="middle">${initial}</text>
      <text x="300" y="310" font-family="Inter, Arial, sans-serif" font-size="32" fill="rgba(255,255,255,.85)" text-anchor="middle">${title}</text>
    </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* ----------------------------------------------------------
   4. MODAL DE DONACIÓN
   ----------------------------------------------------------
   Solo dos opciones: Binance y Pago Móvil.
   Los datos se muestran DIRECTO en la card, sin redirecciones
   ni submodals. Cada card tiene un botón "Copiar" para copiar
   el dato principal al portapapeles.
   ---------------------------------------------------------- */

function openDonationModal() {
  const modal = document.getElementById("donation-modal");
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeDonationModal() {
  const modal = document.getElementById("donation-modal");
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

/* Copia un texto al portapapeles y muestra feedback visual en el botón */
function copyToClipboard(text, btn) {
  if (!btn) return;
  const original = btn.innerHTML;
  const done = () => {
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg> ¡Copiado!`;
    btn.classList.add("is-copied");
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove("is-copied");
    }, 1600);
  };
  navigator.clipboard?.writeText(text).then(done).catch(() => {
    // fallback para navegadores antiguos
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    document.body.removeChild(ta);
  });
}

/* Botones de copiar específicos */
function copyBinanceId(event) {
  const btn = event.currentTarget;
  copyToClipboard(CONFIG.donation.binance.id, btn);
}
function copyEmail(event) {
  const btn = event.currentTarget;
  copyToClipboard(CONFIG.donation.email, btn);
}
function copyPagoMovil(event) {
  const btn = event.currentTarget;
  const d = CONFIG.donation.pagoMovil;
  const text = `Banco: ${d.bank}\nCédula: ${d.doc}\nTeléfono: ${d.phone}`;
  copyToClipboard(text, btn);
}

/* Carga los datos en las cards cuando se abre el modal */
function fillDonationCards() {
  const binanceIdEl    = document.getElementById("don-binance-id");
  const binanceAliasEl = document.getElementById("don-binance-alias");
  const emailEl        = document.getElementById("don-email");
  const pmBankEl       = document.getElementById("don-pm-bank");
  const pmDocEl        = document.getElementById("don-pm-doc");
  const pmPhoneEl      = document.getElementById("don-pm-phone");

  if (binanceIdEl)    binanceIdEl.textContent    = CONFIG.donation.binance.id;
  if (binanceAliasEl) binanceAliasEl.textContent = CONFIG.donation.binance.alias;
  if (emailEl)        emailEl.textContent        = CONFIG.donation.email;
  if (pmBankEl)       pmBankEl.textContent       = CONFIG.donation.pagoMovil.bank;
  if (pmDocEl)        pmDocEl.textContent        = CONFIG.donation.pagoMovil.doc;
  if (pmPhoneEl)      pmPhoneEl.textContent      = CONFIG.donation.pagoMovil.phone;
}

/* Hook: cuando se abre el modal, rellenar las cards */
document.addEventListener("DOMContentLoaded", () => {
  fillDonationCards();
});

/* ----------------------------------------------------------
   4.5  MODAL POST-DESCARGA (no invasivo)
   ----------------------------------------------------------
   El botón "Descargar" abre MediaFire en una pestaña nueva DE UNA
   (sin interrumpir el clic) y A LA VEZ muestra este modal en
   WinsDev con dos opciones: "Donar" y "Regresar a inicio".
   ---------------------------------------------------------- */

function interceptDownload(event) {
  // Si el botón está deshabilitado (programa próximamente),
  // no hacemos nada: el navegador respetará el estado disabled.
  const link = document.getElementById("detail-download");
  if (!link || link.hasAttribute("disabled") || link.classList.contains("is-disabled")) {
    if (event) event.preventDefault();
    return false;
  }

  // NO interceptamos: dejamos que el link <a target="_blank">
  // abra MediaFire en pestaña nueva de una.
  // El modal se abre al mismo tiempo (sin bloquear la descarga).
  const url = link.getAttribute("href") || "#";
  if (url && url !== "#") {
    // Abrimos la pestaña nueva inmediatamente (síncrono, dentro
    // del gesto del clic para que los navegadores lo permitan).
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Abrimos el modal de "gracias" en WinsDev
  const modal = document.getElementById("download-modal");
  if (modal) {
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  // Prevenir que el <a> haga también la navegación (ya la abrimos)
  if (event) event.preventDefault();
  return false;
}

function closeDownloadModal() {
  const modal = document.getElementById("download-modal");
  if (!modal) return;
  modal.hidden = true;
  const donationOpen = document.getElementById("donation-modal") && !document.getElementById("donation-modal").hidden;
  if (!donationOpen) {
    document.body.style.overflow = "";
  }
}

function confirmDownload() {
  // Ya no se usa: el link se abre directo. Lo dejamos por compatibilidad.
  closeDownloadModal();
}

function supportProject() {
  // Cerramos el modal post-descarga y abrimos el de donación
  const modal = document.getElementById("download-modal");
  if (modal) modal.hidden = true;
  setTimeout(() => {
    openDonationModal();
  }, 120);
}

function goHomeFromDownload() {
  // Cierra el modal post-descarga y vuelve al inicio
  closeDownloadModal();
  goHome();
}

/* ----------------------------------------------------------
   5. ESC PARA CERRAR MODALES
   ---------------------------------------------------------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDownloadModal();
    closeDonationModal();
  }
});

/* ----------------------------------------------------------
   6. SCROLL REVEAL Y AÑO DEL FOOTER
   ---------------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll(".card, .about-card, .hero-copy, .hero-art");
  els.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderStore();
  initReveal();
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
   if (!history.state || history.state.view !== 'home') {
    history.replaceState({ view: 'home' }, '', window.location.pathname);
  }
});

window.addEventListener('popstate', (e) => {
  const home = document.getElementById("home-view");
  const detail = document.getElementById("detail-view");
  if (!home || !detail) return;

  const state = e.state;

  if (state && state.view === 'detail' && state.id) {
    // Volvió a un estado de detalle → abrir esa card
    openProgram(state.id);
  } else {
    // state es null o es home → mostrar home
    detail.hidden = true;
    home.hidden = false;
    closeDonationModal();
    closeDownloadModal();
    // Limpiar hash sin recargar
    if (window.location.hash) {
      history.replaceState({ view: 'home' }, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});