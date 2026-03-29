document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Service Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manage Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter Cards
            serviceCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 2. WhatsApp Deep Link Generation
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('custName').value;
        const date = document.getElementById('bookDate').value;
        const service = document.getElementById('serviceSelect').value;
        
        // Target WhatsApp Number (Replace with actual)
        const waNumber = '910000000000'; 
        
        const message = `Hi Aura Salon, I am ${name}. I would like to book an appointment for '${service}' on ${date}. Please confirm.`;
        
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp
        window.open(waLink, '_blank');
        closeModal();
    });
});

// 3. Modal Controls (Global scope for inline onclick usage)
function openModal(serviceName = null) {
    document.getElementById('bookingModal').style.display = 'flex';
    if(serviceName) {
        const selectElement = document.getElementById('serviceSelect');
        selectElement.value = serviceName;
    }
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('bookingForm').reset();
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeModal();
    }
}

