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

    // Initialize performance chart
    initPerformanceChart();
});

// Performance Chart
function initPerformanceChart() {
    const chartContainer = document.getElementById('performanceChart');
    if (!chartContainer) return;

    const canvas = document.createElement('canvas');
    chartContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = chartContainer.offsetWidth;
    canvas.height = chartContainer.offsetHeight;

    // Data points (monthly data for 12 months)
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const agoraData = [10000, 10120, 10250, 10400, 10580, 10750, 10920, 11080, 11250, 11380, 11460, 11520];
    const cdiData = [10000, 10085, 10175, 10270, 10365, 10460, 10560, 10665, 10770, 10880, 10975, 11065];
    const poupancaData = [10000, 10062, 10128, 10195, 10265, 10335, 10410, 10485, 10560, 10640, 10705, 10770];

    let animationProgress = 0;
    const animationDuration = 2000; // 2 seconds
    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        animationProgress = Math.min((timestamp - startTime) / animationDuration, 1);

        drawChart(animationProgress);

        if (animationProgress < 1) {
            requestAnimationFrame(animate);
        }
    }

    function drawChart(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 40;
        const chartWidth = canvas.width - padding * 2;
        const chartHeight = canvas.height - padding * 2;

        // Calculate scales
        const maxValue = 12000;
        const minValue = 10000;
        const valueRange = maxValue - minValue;

        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
        }

        // Helper function to get point position
        function getPoint(index, value) {
            const x = padding + (chartWidth / (months.length - 1)) * index;
            const y = canvas.height - padding - ((value - minValue) / valueRange) * chartHeight;
            return { x, y };
        }

        // Draw lines with animation
        function drawLine(data, color, lineWidth = 3) {
            const pointsToDraw = Math.floor(data.length * progress);
            
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            ctx.beginPath();
            for (let i = 0; i <= pointsToDraw; i++) {
                const point = getPoint(i, data[i]);
                if (i === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            }
            ctx.stroke();

            // Draw dots
            for (let i = 0; i <= pointsToDraw; i++) {
                const point = getPoint(i, data[i]);
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Draw all lines
        drawLine(poupancaData, '#666', 2);
        drawLine(cdiData, '#FFA500', 2);
        drawLine(agoraData, '#00c592', 3);

        // Draw month labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto';
        ctx.textAlign = 'center';
        months.forEach((month, i) => {
            const point = getPoint(i, minValue);
            ctx.fillText(month, point.x, canvas.height - 10);
        });

        // Draw value labels on Y axis
        ctx.textAlign = 'right';
        for (let i = 0; i <= 4; i++) {
            const value = minValue + (valueRange / 4) * i;
            const y = canvas.height - padding - (chartHeight / 4) * i;
            ctx.fillText(`R$ ${(value / 1000).toFixed(1)}k`, padding - 10, y + 4);
        }
    }

    // Start animation when chart is in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(chartContainer);

    // Redraw on window resize
    window.addEventListener('resize', () => {
        canvas.width = chartContainer.offsetWidth;
        canvas.height = chartContainer.offsetHeight;
        drawChart(1); // Draw complete chart
    });
}

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
