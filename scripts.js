document.addEventListener('DOMContentLoaded', function() {
    // Mostrar la Unidad 10 al cargar la página y ocultar las demás
    const units = document.querySelectorAll('.unit');
    units.forEach(function(unit) {
        if (unit.id === 'unit10') {
            unit.style.display = 'block'; // Mostrar Unidad 10
        } else {
            unit.style.display = 'none'; // Ocultar otras unidades
        }
    });
    
    // Marcar el botón de la Unidad 10 como activo
    const unitButtons = document.querySelectorAll('.unit-btn');
    unitButtons.forEach(function(button) {
        if (button.getAttribute('data-target') === 'unit10') {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Función para mostrar una unidad específica
    function showUnit(unitId) {
        // Ocultar todas las unidades
        units.forEach(function(unit) {
            unit.style.display = 'none';
        });
        
        // Mostrar la unidad seleccionada
        const selectedUnit = document.getElementById(unitId);
        if (selectedUnit) {
            selectedUnit.style.display = 'block';
            
            // Desplazarse al inicio de la unidad
            window.scrollTo({
                top: selectedUnit.offsetTop - 20,
                behavior: 'smooth'
            });
            
            // Actualizar botones activos
            updateActiveButtons(unitId);
        }
    }

    // Actualizar botones activos
    function updateActiveButtons(unitId) {
        const unitButtons = document.querySelectorAll('.unit-btn');
        unitButtons.forEach(function(button) {
            if (button.getAttribute('data-target') === unitId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Manejar clics en los botones de unidad
    unitButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetUnit = this.getAttribute('data-target');
            showUnit(targetUnit);
        });
    });

    // Manejar clics en los botones de navegación de unidad
    const prevButtons = document.querySelectorAll('.prev-unit-btn');
    prevButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetUnit = this.getAttribute('data-target');
            showUnit(targetUnit);
        });
    });

    const nextButtons = document.querySelectorAll('.next-unit-btn');
    nextButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetUnit = this.getAttribute('data-target');
            if (targetUnit) {
                showUnit(targetUnit);
            }
        });
    });

    // Manejar clics en los enlaces del pie de página
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUnit = this.getAttribute('href').substring(1);
            showUnit(targetUnit);
        });
    });

    // Guardar respuestas en localStorage
    const inputs = document.querySelectorAll('input[type="text"], input[type="radio"], textarea');
    inputs.forEach(function(input) {
        // Cargar valores guardados
        const inputId = input.closest('.unit').id + '-' + (input.name || input.id || Math.random().toString(36).substring(2, 9));
        
        if (input.type === 'radio') {
            if (localStorage.getItem(inputId) === input.value) {
                input.checked = true;
            }
            
            input.addEventListener('change', function() {
                if (this.checked) {
                    localStorage.setItem(inputId, this.value);
                }
            });
        } else {
            if (localStorage.getItem(inputId)) {
                input.value = localStorage.getItem(inputId);
            }
            
            input.addEventListener('input', function() {
                localStorage.setItem(inputId, this.value);
            });
        }
    });

    // Verificar si hay un hash en la URL para mostrar una unidad específica
    if (window.location.hash) {
        const unitId = window.location.hash.substring(1);
        showUnit(unitId);
    }
});