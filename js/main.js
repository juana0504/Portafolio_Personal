document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('verMas');
  const extras = document.querySelectorAll('.tarjeta.extra');

  btn.addEventListener('click', () => {
    const ocultas = document.querySelectorAll('.tarjeta.extra.oculto');

    if (ocultas.length > 0) {
      // Mostrar todas
      extras.forEach(t => t.classList.remove('oculto'));
      btn.textContent = "Ver menos"; // cambiar texto
    } else {
      // Ocultar todas
      extras.forEach(t => t.classList.add('oculto'));
      btn.textContent = "Ver más"; // volver a estado inicial
    }
  });
});
