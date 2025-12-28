// Step Navigation
<<<<<<< HEAD
let currentStep = 1;

function nextStep(step) {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
=======
let currentStep = 0;

// Mensagens motivacionais para cada etapa
const motivationalMessages = {
    1: "🚀 Vamos lá! Só mais alguns passos para começar a investir",
    2: "💪 Ótimo! Você está quase lá",
    3: "🎯 Incrível! Última etapa antes do seu futuro financeiro",
    4: "🎉 Parabéns! Você completou o cadastro"
};

function updateProgressBar() {
    const progressContainer = document.querySelector('.progress-container');
    
    if (currentStep === 0) {
        progressContainer.style.display = 'none';
        return;
    } else {
        progressContainer.style.display = 'block';
    }

    const percent = (currentStep / 4) * 100;
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    const currentStepNum = document.getElementById('currentStepNum');
    const motivationText = document.getElementById('motivationText');
    
    // Atualiza a barra
    progressFill.style.width = `${percent}%`;
    progressPercent.textContent = Math.round(percent);
    currentStepNum.textContent = currentStep;
    
    // Atualiza mensagem motivacional com animação
    motivationText.style.animation = 'none';
    setTimeout(() => {
        motivationText.textContent = motivationalMessages[currentStep];
        motivationText.style.animation = 'fadeIn 0.5s ease-in';
    }, 50);
}

// Initialize progress bar state
document.addEventListener('DOMContentLoaded', () => {
    updateProgressBar();
});

function nextStep(step) {
    // Validate current step before proceeding (skip validation for step 0)
    if (currentStep !== 0 && !validateStep(currentStep)) {
>>>>>>> 670a9cf (review form questions)
        return;
    }

    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
<<<<<<< HEAD
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
=======
>>>>>>> 670a9cf (review form questions)

    // Show next step
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
<<<<<<< HEAD
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
=======
    
    // Atualiza progress bar gamificada
    updateProgressBar();
>>>>>>> 670a9cf (review form questions)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Save progress to localStorage
    saveProgress();
}

function prevStep(step) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
<<<<<<< HEAD
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
=======
>>>>>>> 670a9cf (review form questions)

    // Show previous step
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
<<<<<<< HEAD
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');
=======
    
    // Atualiza progress bar gamificada
    updateProgressBar();
>>>>>>> 670a9cf (review form questions)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validation
function validateStep(step) {
    const stepElement = document.getElementById(`step-${step}`);
    const inputs = stepElement.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value || (input.type === 'checkbox' && input.required && !input.checked)) {
            isValid = false;
            input.style.borderColor = '#ff4444';
            
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });

    // Check radio buttons
    const radioGroups = stepElement.querySelectorAll('input[type="radio"][required]');
    if (radioGroups.length > 0) {
        const radioNames = new Set();
        radioGroups.forEach(radio => radioNames.add(radio.name));
        
        radioNames.forEach(name => {
            const checked = stepElement.querySelector(`input[name="${name}"]:checked`);
            if (!checked) {
                isValid = false;
                const radioGroup = stepElement.querySelector(`input[name="${name}"]`).closest('.form-group');
                if (radioGroup) {
                    radioGroup.style.outline = '2px solid #ff4444';
                    setTimeout(() => {
                        radioGroup.style.outline = '';
                    }, 2000);
                }
            }
        });
    }

    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios antes de continuar.');
    }

    return isValid;
}

// Save Progress
function saveProgress() {
    const formData = {
        step: currentStep,
        nome: document.getElementById('nome')?.value || '',
        email: document.getElementById('email')?.value || '',
        telefone: document.getElementById('telefone')?.value || '',
<<<<<<< HEAD
        cpf: document.getElementById('cpf')?.value || '',
        experiencia: document.getElementById('experiencia')?.value || '',
        renda: document.getElementById('renda')?.value || '',
        patrimonio: document.getElementById('patrimonio')?.value || ''
=======
        experiencia: document.getElementById('experiencia')?.value || ''
>>>>>>> 670a9cf (review form questions)
    };

    localStorage.setItem('agoraFormProgress', JSON.stringify(formData));
}

// Load Progress
function loadProgress() {
    const saved = localStorage.getItem('agoraFormProgress');
    if (saved) {
        const data = JSON.parse(saved);
        
        // Restore field values
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element && data[key]) {
                element.value = data[key];
            }
        });
    }
}

// Finish Registration
function finishRegistration() {
    const termos = document.getElementById('termos');
    
    if (!termos.checked) {
        alert('Você precisa aceitar os termos de uso para continuar.');
        return;
    }

    // Collect all form data
    const formData = {
        // Step 1
<<<<<<< HEAD
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cpf: document.getElementById('cpf').value,
        dataNascimento: document.getElementById('data-nascimento').value,
        genero: document.getElementById('genero').value,
        
        // Step 2
        experiencia: document.getElementById('experiencia').value,
        renda: document.getElementById('renda').value,
        patrimonio: document.getElementById('patrimonio').value,
=======
        nome: document.getElementById('nome')?.value,
        email: document.getElementById('email')?.value,
        telefone: document.getElementById('telefone')?.value,
        
        // Step 2
        experiencia: document.getElementById('experiencia')?.value,
>>>>>>> 670a9cf (review form questions)
        risco: document.querySelector('input[name="risco"]:checked')?.value || '',
        
        // Step 3
        objetivos: Array.from(document.querySelectorAll('input[name="objetivo"]:checked')).map(el => el.value),
<<<<<<< HEAD
        prazo: document.getElementById('prazo').value,
        interesses: Array.from(document.querySelectorAll('input[name="interesse"]:checked')).map(el => el.value),
        
        // Terms
        aceitaComunicacao: document.getElementById('comunicacao').checked
=======
        
        // Terms
        aceitaComunicacao: document.getElementById('comunicacao')?.checked
>>>>>>> 670a9cf (review form questions)
    };

    console.log('Dados do formulário:', formData);

    // Simulate API call
    const btn = event.target;
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';

    setTimeout(() => {
        // Clear saved progress
        localStorage.removeItem('agoraFormProgress');
        
        // Show success message
        alert('✅ Informações enviadas com sucesso! Em breve um de nossos assessores entrará em contato com você.');
        
        // Redirect or reload
        // window.location.href = '/obrigado';
        btn.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!';
    }, 2000);
}

// Input Masks
document.addEventListener('DOMContentLoaded', function() {
<<<<<<< HEAD
=======
    // Initialize progress bar
    updateProgressBar();
    
>>>>>>> 670a9cf (review form questions)
    // Load saved progress
    loadProgress();

    // CPF Mask
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    // Phone Mask
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                value = value.replace(/(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = value;
        });
    }

    // Save form data on input change
    const formInputs = document.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('change', saveProgress);
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-save every 30 seconds
setInterval(() => {
    if (currentStep < 4) {
        saveProgress();
    }
}, 30000);
