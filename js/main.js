// Category Filter
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter products
            productCards.forEach(card => {
                if (category === 'todos') {
                    card.style.display = 'block';
                } else {
                    const productCategory = card.getAttribute('data-category');
                    if (productCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// Quantity controls
function incrementQuantity() {
    const input = document.getElementById('quantity');
    if (input) {
        input.value = parseInt(input.value) + 1;
    }
}

function decrementQuantity() {
    const input = document.getElementById('quantity');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to cart
function addToCart() {
    const quantity = document.getElementById('quantity')?.value || 1;
    alert(`${quantity}x produto adicionado ao carrinho!`);
}

// Copy referral link
function copyReferralLink() {
    const input = document.getElementById('referralLink');
    if (input) {
        input.select();
        document.execCommand('copy');
        alert('Link copiado para a área de transferência!');
    }
}

// Share referral link
function shareReferralLink() {
    const link = document.getElementById('referralLink')?.value;
    if (navigator.share) {
        navigator.share({
            title: 'Vital Recife Suplementos',
            text: 'Conheça os melhores suplementos com meu código de indicação!',
            url: link
        });
    } else {
        copyReferralLink();
    }
}

// Tab switching
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        if (tab.id === tabName) {
            tab.classList.remove('hidden');
        } else {
            tab.classList.add('hidden');
        }
    });
    
    buttons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
