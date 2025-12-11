document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // CONFIGURACIÓN INICIAL
  // ========================================
  
  const btn = document.getElementById('verMas');
  const extras = document.querySelectorAll('.tarjeta.extra');
  let expandido = false;

  // ========================================
  // BOTÓN "VER MÁS" CON ANIMACIÓN SUAVE
  // ========================================
  
  if (btn && extras.length > 0) {
    btn.addEventListener('click', () => {
      expandido = !expandido;

      extras.forEach((tarjeta, index) => {
        if (expandido) {
          // Mostrar con delay escalonado para efecto cascada
          setTimeout(() => {
            tarjeta.classList.remove('oculto');
            tarjeta.style.animation = 'fadeInUp 0.5s ease forwards';
          }, index * 100);
        } else {
          // Ocultar con animación
          tarjeta.style.animation = 'fadeOutDown 0.3s ease forwards';
          setTimeout(() => {
            tarjeta.classList.add('oculto');
          }, 300);
        }
      });

      // Cambiar texto del botón con transición suave
      btn.style.opacity = '0.5';
      setTimeout(() => {
        btn.textContent = expandido ? "Ver menos" : "Ver más";
        btn.style.opacity = '1';
      }, 150);

      // Scroll suave si se está ocultando
      if (!expandido) {
        setTimeout(() => {
          btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      }
    });
  }

  // ========================================
  // NAVEGACIÓN SUAVE ENTRE SECCIONES
  // ========================================
  
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Cerrar menú mobile si está abierto
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }

          // Scroll suave con offset para navbar fijo
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Actualizar clase active
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // ========================================
  // EFECTO PARALLAX EN CÍRCULOS DECORATIVOS
  // ========================================
  
  const circles = document.querySelectorAll('.circle');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    circles.forEach((circle, index) => {
      const speed = (index % 2 === 0) ? 0.3 : 0.5;
      const yPos = -(scrolled * speed);
      circle.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ========================================
  // ANIMACIÓN DE ENTRADA PARA TARJETAS
  // ========================================
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        entry.target.style.opacity = '1';
      }
    });
  }, observerOptions);

  // Observar todas las tarjetas visibles
  document.querySelectorAll('.tarjeta:not(.extra)').forEach(tarjeta => {
    tarjeta.style.opacity = '0';
    observer.observe(tarjeta);
  });

  // ========================================
  // NAVBAR: CAMBIAR FONDO AL HACER SCROLL
  // ========================================
  
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Agregar fondo sólido después de 100px
    if (currentScroll > 100) {
      navbar.style.backgroundColor = 'rgba(27, 19, 34, 0.95)';
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.backgroundColor = 'transparent';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ========================================
  // DETECCIÓN DE SECCIÓN ACTIVA AL SCROLL
  // ========================================
  
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ========================================
  // ANIMACIÓN PARA ICONOS DE HABILIDADES
  // ========================================
  
  const iconos = document.querySelectorAll('#icono');
  
  iconos.forEach(icono => {
    icono.parentElement.addEventListener('mouseenter', () => {
      icono.style.transform = 'rotate(360deg) scale(1.2)';
    });
    
    icono.parentElement.addEventListener('mouseleave', () => {
      icono.style.transform = 'rotate(0deg) scale(1)';
    });
  });

  // ========================================
  // MEJORAR CARRUSEL DE PORTAFOLIO
  // ========================================
  
  const carouselItems = document.querySelectorAll('.carousel-item img');
  
  carouselItems.forEach(img => {
    img.style.transition = 'all 0.3s ease';
    
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
      img.style.boxShadow = '0 8px 25px rgba(60, 199, 245, 0.4)';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.boxShadow = 'none';
    });
  });

  // ========================================
  // ANIMACIÓN PARA REDES SOCIALES
  // ========================================
  
  const redesIcons = document.querySelectorAll('.redes-icons img');
  
  redesIcons.forEach((icon, index) => {
    icon.style.animation = `bounce 1s ease ${index * 0.1}s infinite`;
  });

  // ========================================
  // COPIAR EMAIL AL HACER CLIC (FOOTER)
  // ========================================
  
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    const span = item.querySelector('span');
    if (span) {
      item.style.cursor = 'pointer';
      item.setAttribute('title', 'Clic para copiar');
      
      item.addEventListener('click', () => {
        const text = span.textContent;
        navigator.clipboard.writeText(text).then(() => {
          // Feedback visual
          const originalText = span.textContent;
          span.textContent = '¡Copiado!';
          span.style.color = '#00ff88';
          
          setTimeout(() => {
            span.textContent = originalText;
            span.style.color = '#000';
          }, 1500);
        });
      });
    }
  });

  // ========================================
  // AGREGAR ESTILOS CSS DINÁMICOS
  // ========================================
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOutDown {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(20px);
      }
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .tarjeta.extra {
      transition: all 0.3s ease;
    }

    .navbar {
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    #verMas {
      transition: opacity 0.3s ease;
    }

    #icono {
      transition: transform 0.5s ease, filter 0.3s ease;
    }

    .circle {
      transition: transform 0.1s ease-out;
    }
  `;
  document.head.appendChild(style);
});