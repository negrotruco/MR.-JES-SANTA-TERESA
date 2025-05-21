document.addEventListener('DOMContentLoaded', function() {
    // Show the first unit by default
    document.getElementById('unit7').classList.add('active');
    document.querySelector('.unit-btn[data-target="unit7"]').classList.add('active');

    // Unit navigation buttons
    const unitButtons = document.querySelectorAll('.unit-btn');
    unitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Hide all units
            document.querySelectorAll('.unit').forEach(unit => {
                unit.classList.remove('active');
            });
            
            // Remove active class from all buttons
            unitButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show the target unit
            document.getElementById(targetId).classList.add('active');
            
            // Add active class to all buttons that target this unit
            document.querySelectorAll(`.unit-btn[data-target="${targetId}"]`).forEach(btn => {
                btn.classList.add('active');
            });
            
            // Scroll to the top of the unit
            window.scrollTo({
                top: document.getElementById(targetId).offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // Previous and Next unit buttons
    const prevNextButtons = document.querySelectorAll('.prev-unit-btn, .next-unit-btn');
    prevNextButtons.forEach(button => {
        if (!button.hasAttribute('disabled')) {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                // Hide all units
                document.querySelectorAll('.unit').forEach(unit => {
                    unit.classList.remove('active');
                });
                
                // Remove active class from all buttons
                unitButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Show the target unit
                document.getElementById(targetId).classList.add('active');
                
                // Add active class to all buttons that target this unit
                document.querySelectorAll(`.unit-btn[data-target="${targetId}"]`).forEach(btn => {
                    btn.classList.add('active');
                });
                
                // Scroll to the top of the unit
                window.scrollTo({
                    top: document.getElementById(targetId).offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        }
    });

    // Footer navigation links
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Hide all units
            document.querySelectorAll('.unit').forEach(unit => {
                unit.classList.remove('active');
            });
            
            // Remove active class from all buttons
            unitButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show the target unit
            document.getElementById(targetId).classList.add('active');
            
            // Add active class to all buttons that target this unit
            document.querySelectorAll(`.unit-btn[data-target="${targetId}"]`).forEach(btn => {
                btn.classList.add('active');
            });
            
            // Scroll to the top of the unit
            window.scrollTo({
                top: document.getElementById(targetId).offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // Save answers to localStorage
    const saveUserInput = () => {
        const inputs = document.querySelectorAll('input[type="text"], textarea');
        const radioInputs = document.querySelectorAll('input[type="radio"]:checked');
        const checkboxInputs = document.querySelectorAll('input[type="checkbox"]:checked');
        
        const savedData = {};
        
        inputs.forEach(input => {
            if (input.value) {
                savedData[input.id || input.name || input.getAttribute('class') + '-' + Array.from(document.querySelectorAll('.' + input.getAttribute('class'))).indexOf(input)] = input.value;
            }
        });
        
        radioInputs.forEach(radio => {
            savedData[radio.name] = radio.value;
        });
        
        checkboxInputs.forEach(checkbox => {
            savedData[checkbox.name] = true;
        });
        
        localStorage.setItem('englishExercisesData', JSON.stringify(savedData));
    };

    // Load saved answers from localStorage
    const loadUserInput = () => {
        const savedData = JSON.parse(localStorage.getItem('englishExercisesData') || '{}');
        
        Object.keys(savedData).forEach(key => {
            const elements = document.querySelectorAll(`[id="${key}"], [name="${key}"]`);
            
            elements.forEach(element => {
                if (element.type === 'radio' || element.type === 'checkbox') {
                    if (element.value === savedData[key] || savedData[key] === true) {
                        element.checked = true;
                    }
                } else {
                    element.value = savedData[key];
                }
            });
            
            // Handle class-based selectors for inputs without IDs or names
            if (elements.length === 0 && key.includes('-')) {
                const [className, index] = key.split('-');
                const classElements = document.querySelectorAll('.' + className);
                if (classElements[index]) {
                    classElements[index].value = savedData[key];
                }
            }
        });
    };

    // Auto-save on input change
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('change', saveUserInput);
        input.addEventListener('input', saveUserInput);
    });

    // Load saved data when page loads
    loadUserInput();

    // Clear all answers button
    const addClearButton = () => {
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear All Answers';
        clearButton.classList.add('clear-button');
        
        clearButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all your answers?')) {
                localStorage.removeItem('englishExercisesData');
                document.querySelectorAll('input[type="text"], textarea').forEach(input => {
                    input.value = '';
                });
                document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
                    input.checked = false;
                });
            }
        });
        
        document.body.appendChild(clearButton);
    };
    
    addClearButton();

    // Make word options clickable to auto-fill answers
    document.querySelectorAll('.words span, .word-options span, .word-options div').forEach(word => {
        word.addEventListener('click', function() {
            // Find the closest input or textarea
            const container = this.closest('.exercise');
            if (container) {
                const input = container.querySelector('input[type="text"]:not([value]), textarea:not(:has(text))');
                if (input) {
                    input.value = this.textContent.trim();
                    saveUserInput();
                }
            }
        });
    });
});