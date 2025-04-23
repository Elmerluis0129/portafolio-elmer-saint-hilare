/**
* Template Name: EasyFolio
* Template URL: https://bootstrapmade.com/easyfolio-bootstrap-portfolio-template/
* Updated: Feb 21 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener('DOMContentLoaded', () => {
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalTitle = document.getElementById('projectModalLabel');
    const modalDesc = document.getElementById('projectModalDesc');
    const modalImg = document.querySelector('.modal-img');

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img').src;
        const title = card.querySelector('h5').textContent;
        const desc = card.querySelector('p').textContent;

        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalImg.src = img;

        modal.show();
      });
    });
  });

  const toggleBtn = document.getElementById('toggle-darkmode');
  const icon = toggleBtn.querySelector('i');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('bi-moon');
      icon.classList.add('bi-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.remove('bi-sun');
      icon.classList.add('bi-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  // Mantener el modo en recargas
  window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      icon.classList.remove('bi-moon');
      icon.classList.add('bi-sun');
    }
  });

  // Inicialización de componentes
  document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
      duration: 1000,
      once: true
    });

    // Configuración de GLightbox
    const lightbox = GLightbox({
      selector: '.project-card img',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });

    

    // Sistema de filtrado mejorado
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          // Remover clases de animación previas
          card.classList.remove('showing', 'hiding');
          
          if (filter === 'all' || card.getAttribute('data-tags').includes(filter)) {
            card.style.display = 'block';
            card.classList.add('showing');
            card.style.pointerEvents = 'auto';
          } else {
            card.classList.add('hiding');
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    // Efecto hover en las tarjetas
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('hiding')) {
          card.style.transform = 'scale(1.02)';
          card.style.transition = 'transform 0.3s ease';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
      });
    });

    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    // Funcionalidad unificada para todos los botones de compartir
    document.querySelectorAll('.share-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const shareData = {
          title: 'Mi Portafolio - Elmer Saint-Hilare',
          text: 'Echa un vistazo a mi portafolio profesional',
          url: window.location.href
        };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            // Fallback para navegadores que no soportan Web Share API
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = window.location.href;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Mostrar tooltip de confirmación
            const tooltip = bootstrap.Tooltip.getInstance(button) || new bootstrap.Tooltip(button);
            const originalTitle = button.getAttribute('data-bs-original-title') || button.getAttribute('title') || 'Compartir';
            
            button.setAttribute('data-bs-original-title', '¡Enlace copiado!');
            tooltip.show();
            
            setTimeout(() => {
              button.setAttribute('data-bs-original-title', originalTitle);
              tooltip.hide();
            }, 2000);
          }
        } catch (err) {
          console.error('Error al compartir:', err);
        }
      });
    });

    // Funcionalidad de compartir proyectos individuales
    const shareProjectBtns = document.querySelectorAll('.share-project');
    shareProjectBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const projectCard = btn.closest('.project-card');
        const projectTitle = projectCard.querySelector('h5').textContent;
        const projectDesc = projectCard.querySelector('p').textContent;

        const shareData = {
          title: projectTitle,
          text: projectDesc,
          url: window.location.href
        };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            // Fallback similar al anterior
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = window.location.href;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            const tooltip = bootstrap.Tooltip.getInstance(btn);
            const originalTitle = btn.getAttribute('title');
            btn.setAttribute('title', '¡Enlace copiado!');
            tooltip.dispose();
            new bootstrap.Tooltip(btn).show();
            
            setTimeout(() => {
              btn.setAttribute('title', originalTitle);
              tooltip.dispose();
              new bootstrap.Tooltip(btn);
            }, 2000);
          }
        } catch (err) {
          console.log('Error al compartir proyecto:', err);
        }
      });
    });

    // Botones de información adicional
    const infoButtons = document.querySelectorAll('.project-info');
    infoButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const projectCard = btn.closest('.project-card');
        const projectTitle = projectCard.querySelector('h5').textContent;
        const projectDesc = projectCard.querySelector('p').textContent;
        const technologies = Array.from(projectCard.querySelectorAll('.badge'))
          .map(badge => badge.textContent)
          .join(', ');

        // Crear y mostrar modal con Bootstrap
        const modalHtml = `
          <div class="modal fade" id="projectInfoModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">${projectTitle}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <p><strong>Descripción:</strong> ${projectDesc}</p>
                  <p><strong>Tecnologías:</strong> ${technologies}</p>
                </div>
              </div>
            </div>
          </div>
        `;

        // Eliminar modal anterior si existe
        const existingModal = document.getElementById('projectInfoModal');
        if (existingModal) {
          existingModal.remove();
        }

        // Agregar nuevo modal al DOM
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('projectInfoModal'));
        modal.show();
      });
    });
  });
})();