# Demo segura Metro SDQ — guía de integración

Esta guía complementa las páginas `metro-sdq.html` (ES) y `metro-sdq-en.html` (EN) del portafolio.

## Por qué esta demo es segura

- No hay iframe del panel admin (evita filtrar cookies/sesión y bloqueos `X-Frame-Options`).
- No hay contraseñas ni `.env` en el HTML del portafolio.
- El visitante ve el caso de estudio; el acceso vivo y el código se entregan bajo solicitud.
- Los repos de backend/frontend están **privados** (no se enlazan en el portafolio).

## Checklist antes de publicar

1. Railway (backend) y Vercel (panel) desplegados y estables.
2. Crear en Supabase/panel un usuario **demo** solo con datos de prueba (sin cédulas/correos reales).
3. Preferible rol de usuario o admin de prueba con contraseña rotada; no uses tu cuenta personal.
4. Mantener backend/frontend en GitHub como privados mientras evalúas comercialización.
5. No publicar URLs de admin, APK ni credenciales en el HTML público.

## Cómo integrar el video

1. Graba un walkthrough de 3–5 min siguiendo el guion de `metro-sdq.html`.
2. Súbelo a YouTube como **No listado**.
3. En `metro-sdq.html` y `metro-sdq-en.html`, dentro de `#demo-video`, sustituye el placeholder por:

```html
<iframe
  src="https://www.youtube.com/embed/TU_VIDEO_ID"
  title="Demo Metro SDQ"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy"></iframe>
```

## Cómo agregar capturas

1. Copia JPG/PNG a `assets/img/metro-sdq/` (por ejemplo `home.jpg`, `recarga.jpg`, `pase-digital.jpg`, `admin.jpg`).
2. En cada `.case-study-shot`, reemplaza el contenido por una imagen:

```html
<div class="case-study-shot has-image">
  <img src="assets/img/metro-sdq/home.jpg" alt="Pantalla Home con saldo">
</div>
```

## Cómo publicar el portafolio (GitHub Pages)

Desde esta carpeta (`Portafolio`):

```bash
git add metro-sdq.html metro-sdq-en.html portfolio-details.html index.html en.html assets/css/main.css assets/img/metro-sdq DEMO_METRO_SDQ.md
git status
git commit -m "Add Metro SDQ secure case study demo pages"
git push
```

Luego abre:

- ES: `https://elmerluis0129.github.io/portafolio-elmer-saint-hilare/metro-sdq.html`
- EN: `https://elmerluis0129.github.io/portafolio-elmer-saint-hilare/metro-sdq-en.html`

(Ajusta la URL base si tu Pages usa otro path.)

## Si quieres un link “Demo en vivo” del admin

1. Crea la cuenta demo.
2. En `metro-sdq.html`, en `.case-study-actions`, agrega un botón a tu URL de Vercel, por ejemplo:

```html
<a class="btn btn-outline" href="https://TU-PROYECTO.vercel.app/metro_admin.html" target="_blank" rel="noopener noreferrer">Abrir panel (demo)</a>
```

3. Junto al botón, deja el texto: “Credenciales bajo solicitud” (no las publiques en el HTML si hay datos reales).

## Guion corto para entrevistas

1. Problema (filas / taquilla).
2. App: saldo, recarga, pase digital (nonce).
3. Admin: tarjetas, pérdida, auditoría.
4. Arquitectura: Android + WebSocket + Supabase.
5. Seguridad: hash, sesión, sin PAN/CVV, Ley 172-13.
6. Oferta de demo controlada (código y APK bajo solicitud).
