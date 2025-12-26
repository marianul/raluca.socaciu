// ================================
// Content Loader - Încarcă conținutul din fișierele de configurare
// ================================

document.addEventListener('DOMContentLoaded', async function() {
    loadContact();
    await loadTarife();
    loadServicii();
    loadDespre();
    loadBlog();
    setupPricingButtons();
});

// ================================
// Setup pentru butoanele de programare din tarife
// ================================
function setupPricingButtons() {
    document.querySelectorAll('a[data-serviciu]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const serviciu = this.dataset.serviciu;
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = `Bună ziua,\n\nAș dori să programez o ședință "${serviciu}".\n\nVă mulțumesc!`;
            }
        });
    });
}

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

        // Contact info (selectăm elementele din secțiunea Contact)
        const contactItems = document.querySelectorAll('.contact-info .contact-item');
        if (contactItems.length >= 4) {
            // Adresă (primul contact-item)
            const adresaP = contactItems[0].querySelector('p');
            if (adresaP) adresaP.innerHTML = `${config.Strada}<br>${config.Oras}, ${config.Judet}`;

            // Telefon (al doilea contact-item)
            const telP = contactItems[1].querySelector('p');
            if (telP) telP.innerHTML = `<a href="tel:${config.Telefon.replace(/\s/g, '')}">${config.Telefon}</a>`;

            // Email (al treilea contact-item)
            const emailP = contactItems[2].querySelector('p');
            if (emailP) emailP.innerHTML = `<a href="mailto:${config.Email}">${config.Email}</a>`;

            // Program (al patrulea contact-item)
            const programP = contactItems[3].querySelector('p');
            if (programP) programP.innerHTML = `${config.Program}<br>${config.ProgramNota}`;
        }

        // Footer contact (folosim nth-of-type pentru a selecta doar elementele <p>)
        updateHTML('.footer-contact p:nth-of-type(1)', `<i class="fas fa-phone"></i> ${config.Telefon}`);
        updateHTML('.footer-contact p:nth-of-type(2)', `<i class="fas fa-envelope"></i> ${config.Email}`);
        updateHTML('.footer-contact p:nth-of-type(3)', `<i class="fas fa-map-marker-alt"></i> ${config.Oras}`);

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
        if (!response.ok) {
            console.log('Tarife.txt nu s-a putut încărca:', response.status);
            return;
        }

        const text = await response.text();
        const tarife = parseTarife(text);
        console.log('Tarife încărcate:', tarife);

        const container = document.querySelector('.pricing-grid');
        if (!container || tarife.length === 0) {
            console.log('Container negăsit sau tarife goale');
            return;
        }

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
                <a href="#contact" class="btn ${tarif.popular ? 'btn-primary' : 'btn-outline'}" data-serviciu="${tarif.titlu}">Programează</a>
            </div>
        `).join('');

        // Adaugă event listeners pentru butoanele de programare
        container.querySelectorAll('a[data-serviciu]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const serviciu = this.dataset.serviciu;
                const messageField = document.getElementById('message');
                if (messageField) {
                    messageField.value = `Bună ziua,\n\nAș dori să programez o ședință "${serviciu}".\n\nVă mulțumesc!`;
                }
            });
        });

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
    // Elimină comentariile (linii care încep cu #)
    const textFaraComentarii = normalizeLineEndings(text)
        .split('\n')
        .filter(line => !line.trim().startsWith('#'))
        .join('\n');
    const sections = textFaraComentarii.split('---');

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

// ================================
// Încarcă articolele de blog
// ================================
async function loadBlog() {
    try {
        const response = await fetch('blog/articole.md');
        if (!response.ok) return;

        const text = await response.text();
        const posts = parseArticole(text);
        const container = document.querySelector('#blog .blog-grid');
        if (!container || posts.length === 0) return;

        container.innerHTML = posts.map(post => `
            <article class="blog-card">
                <div class="blog-image">
                    <div class="image-placeholder">
                        <i class="fas fa-image"></i>
                    </div>
                </div>
                <div class="blog-content">
                    <span class="blog-category">${post.category}</span>
                    <h3><a href="blog/article.html?post=${post.slug}">${post.title}</a></h3>
                    <p>${post.description}</p>
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar"></i> ${post.dateFormatted}</span>
                        <span><i class="fas fa-clock"></i> ${post.readTime} citire</span>
                    </div>
                </div>
            </article>
        `).join('');

    } catch (error) {
        console.log('Nu s-au putut încărca articolele de blog:', error);
    }
}

// Parser pentru articole.md
function parseArticole(text) {
    const articole = [];
    // Elimină comentariile și split după ===
    const textCurat = normalizeLineEndings(text)
        .split('\n')
        .filter(line => !line.trim().startsWith('#'))
        .join('\n');

    const sections = textCurat.split('===');

    for (const section of sections) {
        // Caută metadata între --- și ---
        const metaMatch = section.match(/---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)/);
        if (!metaMatch) continue;

        const metaText = metaMatch[1];
        const content = metaMatch[2].trim();

        // Parsează metadata
        const meta = {};
        metaText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > -1) {
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();
                meta[key] = value;
            }
        });

        if (meta.slug && meta.title) {
            articole.push({
                slug: meta.slug,
                title: meta.title,
                date: meta.date,
                dateFormatted: meta.dateFormatted,
                category: meta.category,
                author: meta.author,
                readTime: meta.readTime,
                description: meta.description,
                content: content
            });
        }
    }

    return articole;
}
