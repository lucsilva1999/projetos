// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Share via WhatsApp
function shareWhatsApp() {
    const text = encodeURIComponent('Ei! Invista na Ágora usando meu link e ganhe benefícios exclusivos! 🚀💰');
    const url = encodeURIComponent('https://www.agorainvestimentos.com.br/indica?ref=SEU_CODIGO');
    const whatsappUrl = `https://wa.me/?text=${text}%20${url}`;
    
    window.open(whatsappUrl, '_blank');
}

// Copy Link
function copyLink() {
    const link = 'https://www.agorainvestimentos.com.br/indica?ref=SEU_CODIGO';
    
    navigator.clipboard.writeText(link).then(() => {
        // Change button text temporarily
        const btn = event.target.closest('button');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Link copiado!';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        alert('Não foi possível copiar o link. Por favor, copie manualmente: ' + link);
    });
}

// Smooth scroll for navigation links
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
    
    lastScroll = currentScroll;
});
