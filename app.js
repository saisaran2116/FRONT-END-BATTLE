/**
 * Next-Gen AI Platform Logic
 * Focus: Performance, Matrix Pricing, Adaptive UI
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    new PricingEngine();
    new FeatureAdaptiveUI();
    initSpotlight();
});

/**
 * Loading Sequence
 * Adheres to <500ms initial execution constraint
 */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    requestAnimationFrame(() => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 300);
    });
}

/**
 * Matrix-Driven Pricing Engine
 * Strictly isolated DOM updates for text nodes only
 * Calculation: Base Rate * Currency Factor * Billing Discount
 */
class PricingEngine {
    constructor() {
        this.config = {
            basePlans: {
                basic: 0,
                pro: 29,
                elite: 99
            },
            tariffs: {
                usd: 1,
                eur: 0.92,
                inr: 83.5
            },
            currencies: {
                usd: { symbol: '$' },
                eur: { symbol: '€' },
                inr: { symbol: '₹' }
            },
            discount: 0.2
        };

        this.state = {
            currency: 'usd',
            billing: 'monthly'
        };

        this.nodes = {
            billingBtns: document.querySelectorAll('#billing-toggle button'),
            currencyBtns: document.querySelectorAll('#currency-toggle button'),
            priceValues: {
                basic: document.getElementById('price-basic'),
                pro: document.getElementById('price-pro'),
                elite: document.getElementById('price-elite')
            },
            currencySymbols: document.querySelectorAll('.pricing .currency')
        };

        this.init();
    }

    init() {
        this.nodes.billingBtns.forEach(btn => {
            btn.addEventListener('click', () => this.updateState('billing', btn.dataset.value));
        });

        this.nodes.currencyBtns.forEach(btn => {
            btn.addEventListener('click', () => this.updateState('currency', btn.dataset.value));
        });

        this.render();
    }

    updateState(key, value) {
        if (this.state[key] === value) return;
        this.state[key] = value;
        
        const btns = key === 'billing' ? this.nodes.billingBtns : this.nodes.currencyBtns;
        btns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === value);
        });

        this.render();
    }

    render() {
        const { currency, billing } = this.state;
        const symbol = this.config.currencies[currency].symbol;
        const tariff = this.config.tariffs[currency];

        this.nodes.currencySymbols.forEach(el => {
            if (el.textContent !== symbol) el.textContent = symbol;
        });

        Object.entries(this.nodes.priceValues).forEach(([plan, el]) => {
            let price = this.config.basePlans[plan] * tariff;
            
            if (billing === 'annual') {
                price = price * (1 - this.config.discount);
            }

            // Rounding based on currency (INR usually doesn't show decimals in this context)
            const roundedPrice = currency === 'inr' ? Math.round(price) : price.toFixed(price % 1 === 0 ? 0 : 2);
            const priceStr = roundedPrice.toString();

            if (el.textContent !== priceStr) {
                el.textContent = priceStr;
                el.animate([
                    { opacity: 0.5, transform: 'scale(0.9)', filter: 'blur(2px)' },
                    { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' }
                ], { duration: 150, easing: 'ease-out' });
            }
        });
    }
}

/**
 * Bento-to-Accordion Adaptive UI
 * State persistence (Context Lock) on resize
 */
class FeatureAdaptiveUI {
    constructor() {
        this.activeIndex = 0;
        this.items = document.querySelectorAll('.feature-item');
        this.init();
    }

    init() {
        this.items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 992) this.setActive(index);
            });

            item.addEventListener('click', () => {
                if (window.innerWidth <= 992) this.setActive(index);
            });
        });

        const ro = new ResizeObserver(() => this.updateDOM());
        ro.observe(document.body);
        this.updateDOM();
    }

    setActive(index) {
        if (this.activeIndex === index) return;
        this.activeIndex = index;
        this.updateDOM();
    }

    updateDOM() {
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.activeIndex);
        });
    }
}

/**
 * Visual Polish: Interactive Spotlight
 */
function initSpotlight() {
    const spotlight = document.querySelector('.spotlight');
    if (!spotlight) return;

    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            spotlight.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
        });
    });
}
