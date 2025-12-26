// ================================
// Content Loader - Încarcă conținutul din fișierele de configurare
// ================================

document.addEventListener('DOMContentLoaded', function() {
    loadContact();
    loadTarife();
    loadServicii();
    loadDespre();
});

// ================================
// Normalizează line endings (Windows \r\n -> \n)
// ================================
function normalizeLineEndings(text) {
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

// ================================
// Parser pentru fișiere .txt simple (cheie: valoare)
// ================================
function parseSimpleConfig(text) {
    const config = {};
    const lines = normalizeLineEndings(text).split('\n');

    for (const line of lines) {
        // Ignoră comentarii și linii goale
        if (line.startsWith('#') || line.trim() === '') continue;

        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            config[key] = value;
        }
    }

    return config;
}

// ================================
// Încarcă datele de contact
// ================================
async function loadContact() {
    try {
        const response = await fetch('content/contact.txt');
        if (!response.ok) return;

        const text = await response.text();
        const config = parseSimpleConfig(text);

        // Actualizează elementele din pagină
        updateText('.logo-text', config.Nume);
        updateText('.logo-subtitle', config.Titlu);
        updateText('.hero-title', config.Nume);
        updateText('.hero-subtitle', config.Titlu);
        updateText('.hero-text', config.Slogan);

        // Footer
        updateText('.footer-brand h3', config.Nume);
        updateText('.footer-brand > p', config.Titlu);
        updateText('.footer-tagline', config.Slogan);

        // Contact info
        const adresaCompleta = `${config.Strada}<br>${config.Oras}, ${config.Judet}`;
        updateHTML('.contact-item:nth-child(1) p', adresaCompleta);

        // Telefon cu link
        const telLink = `<a href="tel:${config.Telefon.replace(/\s/g, '')}">${config.Telefon}</a>`;
        updateHTML('.contact-item:nth-child(2) p', telLink);

        // Email cu link
        const emailLink = `<a href="mailto:${config.Email}">${config.Email}</a>`;
        updateHTML('.contact-item:nth-child(3) p', emailLink);

        // Program
        updateHTML('.contact-item:nth-child(4) p', `${config.Program}<br>${config.ProgramNota}`);

        // Footer contact
        updateText('.footer-contact p:nth-child(2)', config.Telefon);
        updateText('.footer-contact p:nth-child(3)', config.Email);
        updateText('.footer-contact p:nth-child(4)', config.Oras);

        // Social links
        updateSocialLink('.social-link[aria-label="Facebook"]', config.Facebook);
        updateSocialLink('.social-link[aria-label="Instagram"]', config.Instagram);
        updateSocialLink('.social-link[aria-label="LinkedIn"]', config.LinkedIn);

        // Copyright
        const year = new Date().getFullYear();
        updateText('.footer-bottom p', `© ${year} ${config.Nume} - Cabinet Psihologic. Toate drepturile rezervate.`);

    } catch (error) {
        console.log('Nu s-au putut încărca datele de contact:', error);
    }
}

// ================================
// Încarcă tarifele
// ================================
async function loadTarife() {
    try {
        const response = await fetch('content/tarife.txt');
        if (!response.ok) return;

        const text = await response.text();
        const tarife = parseTarife(text);

        const container = document.querySelector('.pricing-grid');
        if (!container || tarife.length === 0) return;

        container.innerHTML = tarife.map(tarif => `
            <div class="pricing-card${tarif.popular ? ' featured' : ''}">
                ${tarif.popular ? '<div class="pricing-badge">Popular</div>' : ''}
                <div class="pricing-header">
                    <h3>${tarif.titlu}</h3>
                    <div class="price">
                        <span class="amount">${tarif.pret}</span>
                        <span class="currency">RON</span>
                    </div>
                    <p class="duration">${tarif.durata}</p>
                </div>
                <ul class="pricing-features">
                    ${tarif.beneficii.map(b => `<li><i class="fas fa-check"></i> ${b}</li>`).join('')}
                </ul>
                <a href="#contact" class="btn ${tarif.popular ? 'btn-primary' : 'btn-outline'}">Programează</a>
            </div>
        `).join('');

        // Actualizează nota
        const notaMatch = text.match(/^Nota:\s*(.+)$/m);
        if (notaMatch) {
            const notaEl = document.querySelector('.pricing-note');
            if (notaEl) notaEl.textContent = notaMatch[1];
        }

    } catch (error) {
        console.log('Nu s-au putut încărca tarifele:', error);
    }
}

function parseTarife(text) {
    const tarife = [];
    const sections = normalizeLineEndings(text).split('---');

    for (const section of sections) {
        const titluMatch = section.match(/\[(.+?)\]/);
        if (!titluMatch) continue;

        const tarif = {
            titlu: titluMatch[1],
            popular: section.includes('POPULAR'),
            pret: '',
            durata: '',
            beneficii: []
        };

        const pretMatch = section.match(/Pret:\s*(\d+)/);
        if (pretMatch) tarif.pret = pretMatch[1];

        const durataMatch = section.match(/Durata:\s*(.+)/);
        if (durataMatch) tarif.durata = durataMatch[1].trim();

        // Extrage beneficiile
        const beneficiiMatch = section.match(/Beneficii:\s*([\s\S]*?)(?=---|$)/);
        if (beneficiiMatch) {
            const lines = beneficiiMatch[1].split('\n');
            for (const line of lines) {
                const cleaned = line.replace(/^-\s*/, '').trim();
                if (cleaned && !cleaned.startsWith('#')) {
                    tarif.beneficii.push(cleaned);
                }
            }
        }

        if (tarif.titlu && tarif.pret) {
            tarife.push(tarif);
        }
    }

    return tarife;
}

// ================================
// Încarcă serviciile
// ================================
async function loadServicii() {
    try {
        const response = await fetch('content/servicii.txt');
        if (!response.ok) return;

        const text = await response.text();
        const servicii = parseServicii(text);

        const container = document.querySelector('.services-grid');
        if (!container || servicii.length === 0) return;

        container.innerHTML = servicii.map(s => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-${s.icon}"></i>
                </div>
                <h3>${s.titlu}</h3>
                <p>${s.descriere}</p>
            </div>
        `).join('');

    } catch (error) {
        console.log('Nu s-au putut încărca serviciile:', error);
    }
}

function parseServicii(text) {
    const servicii = [];
    const sections = normalizeLineEndings(text).split('---');

    for (const section of sections) {
        const titluMatch = section.match(/\[(.+?)\]/);
        if (!titluMatch) continue;

        const serviciu = {
            titlu: titluMatch[1],
            icon: 'star',
            descriere: ''
        };

        const iconMatch = section.match(/Icon:\s*(\w+)/);
        if (iconMatch) serviciu.icon = iconMatch[1];

        const descriereMatch = section.match(/Descriere:\s*(.+)/);
        if (descriereMatch) serviciu.descriere = descriereMatch[1].trim();

        if (serviciu.titlu && serviciu.descriere) {
            servicii.push(serviciu);
        }
    }

    return servicii;
}

// ================================
// Încarcă secțiunea Despre
// ================================
async function loadDespre() {
    try {
        const response = await fetch('content/despre.md');
        if (!response.ok) return;

        const text = await response.text();
        const despre = parseDespre(text);

        // Actualizează textele din secțiunea Despre
        const aboutText = document.querySelector('.about-text');
        if (!aboutText) return;

        // Actualizează paragrafele principale
        const paragraphs = aboutText.querySelectorAll('p');
        if (despre.intro && paragraphs.length >= 2) {
            paragraphs[0].textContent = despre.intro[0] || '';
            paragraphs[1].textContent = despre.intro[1] || '';
        }

        // Actualizează detaliile
        const details = aboutText.querySelectorAll('.detail-item p');
        if (details.length >= 3) {
            if (despre.studii) details[0].textContent = despre.studii;
            if (despre.atestat) details[1].textContent = despre.atestat;
            if (despre.specializari) details[2].textContent = despre.specializari;
        }

    } catch (error) {
        console.log('Nu s-au putut încărca datele Despre:', error);
    }
}

function parseDespre(text) {
    const despre = {
        intro: [],
        studii: '',
        atestat: '',
        specializari: ''
    };

    text = normalizeLineEndings(text);

    // Extrage paragrafele de intro (înainte de primul ##)
    const introMatch = text.match(/^#[^#].*?\n\n([\s\S]*?)(?=\n##|$)/);
    if (introMatch) {
        despre.intro = introMatch[1].split('\n\n').filter(p => p.trim());
    }

    // Extrage secțiunile
    const studiiMatch = text.match(/## Studii\s*\n\n?([\s\S]*?)(?=\n##|$)/);
    if (studiiMatch) despre.studii = studiiMatch[1].trim();

    const atestatMatch = text.match(/## Atestat\s*\n\n?([\s\S]*?)(?=\n##|$)/);
    if (atestatMatch) despre.atestat = atestatMatch[1].trim();

    const specMatch = text.match(/## Specializări\s*\n\n?([\s\S]*?)(?=\n##|$)/);
    if (specMatch) despre.specializari = specMatch[1].trim();

    return despre;
}

// ================================
// Helper functions
// ================================
function updateText(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
}

function updateHTML(selector, html) {
    const el = document.querySelector(selector);
    if (el && html) el.innerHTML = html;
}

function updateSocialLink(selector, url) {
    const el = document.querySelector(selector);
    if (el) {
        if (url && url.trim() && !url.includes('facebook.com/') && !url.includes('instagram.com/') && !url.includes('linkedin.com/')) {
            el.href = url;
            el.style.display = '';
        } else if (!url || url.trim() === '' || url.endsWith('.com/')) {
            el.style.display = 'none';
        }
    }
}
