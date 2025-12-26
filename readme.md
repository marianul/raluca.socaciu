# Site Cabinet Psihologic - Raluca Socaciu

Site de prezentare pentru cabinetul psihologic, hosted gratuit pe GitHub Pages.

**Link site:** https://marianul.github.io/raluca.socaciu/

---

## Cuprins

1. [Modificare conținut - SIMPLU](#modificare-conținut---simplu)
   - [Date de contact](#date-de-contact)
   - [Tarife](#tarife)
   - [Servicii](#servicii)
   - [Secțiunea Despre](#secțiunea-despre)
2. [Cum să adaugi un articol nou pe blog](#cum-să-adaugi-un-articol-nou-pe-blog)
3. [Cum să modifici un articol existent](#cum-să-modifici-un-articol-existent)
4. [Cum să ștergi un articol](#cum-să-ștergi-un-articol)
5. [Cum să adaugi imagini](#cum-să-adaugi-imagini)
6. [Cum să configurezi EmailJS pentru formular](#cum-să-configurezi-emailjs)
7. [Cum să conectezi un domeniu propriu](#cum-să-conectezi-un-domeniu-propriu)
8. [Structura fișierelor](#structura-fișierelor)

---

## Modificare conținut - SIMPLU

Toate textele importante sunt în fișiere separate, ușor de editat, în folderul `content/`.

**Nu trebuie să știi HTML sau programare!** Doar modifici textul și salvezi.

---

### Date de contact

**Fișier:** `content/contact.txt`

Deschide fișierul și modifică valorile după `:`. Exemplu:

```
Nume: Raluca Socaciu
Titlu: Psiholog Clinician
Slogan: Îți ofer un spațiu sigur pentru explorare personală

Strada: Strada Principală, Nr. 15
Oras: Târgu Mureș
Judet: Mureș

Telefon: +40 745 123 456
Email: raluca@exemplu.ro

Program: Luni - Vineri: 09:00 - 18:00
ProgramNota: Cu programare prealabilă

Facebook: https://facebook.com/pagina-ta
Instagram: https://instagram.com/pagina-ta
LinkedIn:
```

**Note:**
- Liniile care încep cu `#` sunt comentarii (nu apar pe site)
- Dacă nu ai un cont social media, lasă câmpul gol sau șterge linia

---

### Tarife

**Fișier:** `content/tarife.txt`

Format simplu pentru tarife:

```
[Numele Serviciului]
Pret: 200
Durata: 50 minute
Beneficii:
- Primul beneficiu
- Al doilea beneficiu
- Al treilea beneficiu

---

[Alt Serviciu]
POPULAR
Pret: 250
Durata: 60 minute
Beneficii:
- Beneficiu 1
- Beneficiu 2

---

Nota: * Textul care apare sub tarife
```

**Reguli:**
- Fiecare serviciu începe cu `[Numele în paranteze pătrate]`
- Separă serviciile prin `---` (trei liniuțe)
- Adaugă `POPULAR` sub nume pentru a evidenția un serviciu
- Beneficiile încep cu `-`

---

### Servicii

**Fișier:** `content/servicii.txt`

Format:

```
[Numele Serviciului]
Icon: user
Descriere: Textul care descrie serviciul.

---

[Alt Serviciu]
Icon: brain
Descriere: Descrierea acestui serviciu.
```

**Iconițe disponibile:**
- `user` - persoană
- `users` - grup de persoane
- `comments` - conversație
- `brain` - creier
- `cloud` - nor
- `video` - cameră video
- `heart` - inimă
- `graduation-cap` - tocă absolvent

---

### Secțiunea Despre

**Fișier:** `content/despre.md`

Scrie în format simplu Markdown:

```markdown
# Despre Mine

Primul paragraf cu prezentarea ta generală.

Al doilea paragraf cu mai multe detalii.

## Studii

Informații despre studiile tale.

## Atestat

Informații despre atestat și colegiu.

## Specializări

Lista specializărilor tale.
```

---

## Cum să adaugi un articol nou pe blog

Toate articolele sunt într-un singur fișier: `blog/articole.md`

### Pas 1: Deschide fișierul

Deschide `blog/articole.md` într-un editor de text.

### Pas 2: Adaugă articolul

La **ÎNCEPUTUL** fișierului (după comentariile cu `#`), adaugă noul articol folosind acest șablon:

```markdown
---
title: Titlul articolului tău
date: 2025-02-15
dateFormatted: 15 Februarie 2025
category: Anxietate
author: Raluca Socaciu
readTime: 5 min
description: O scurtă descriere care apare în preview (1-2 propoziții)
image: nume-imagine.jpg
---

Aici scrii primul paragraf al articolului. Acesta apare ca introducere.

## Prima secțiune

Textul pentru prima secțiune.

### O subsecțiune

Mai multe detalii aici.

## A doua secțiune

- Element de listă
- Alt element
- Încă unul

## Concluzie

Paragraf final cu concluzii.

===
```

**Important:**
- Fiecare articol este separat prin `===` (trei semne egal)
- Metadata articolului e între `---` și `---`
- Câmpul `image` este **opțional** - dacă nu ai imagine, nu pune linia
- Slug-ul (adresa articolului) se generează automat din titlu

### Pas 3: Salvează modificările

Vezi secțiunea "Cum să salvezi modificările" de mai jos.

---

## Formatare Markdown (pentru articole)

### Titluri
```markdown
# Titlu mare (nu folosi în articol, e doar pentru pagină)
## Titlu secțiune
### Titlu subsecțiune
```

### Text bold și italic
```markdown
**text bold**
*text italic*
***text bold și italic***
```

### Liste
```markdown
- Element 1
- Element 2
- Element 3

1. Primul pas
2. Al doilea pas
3. Al treilea pas
```

### Link-uri
```markdown
[text care apare](https://adresa-site.ro)
```

### Citat
```markdown
> Aceasta este o citare sau un text evidențiat.
```

---

## Cum să modifici un articol existent

1. Deschide `blog/articole.md`
2. Găsește articolul pe care vrei să-l modifici
3. Modifică textul sau metadata
4. Salvează modificările

**Notă:** Dacă schimbi titlul, se va schimba și adresa (URL-ul) articolului automat.

---

## Cum să ștergi un articol

1. Deschide `blog/articole.md`
2. Șterge întregul articol (de la `---` până la `===`)
3. Salvează modificările

---

## Cum să adaugi imagini

### Imagini pentru articole blog (thumbnail/preview):

1. Pune imaginea în folderul `images/blog/`
2. În metadata articolului din `blog/articole.md`, adaugă:
```
image: nume-imagine.jpg
```

**Dimensiuni recomandate:** 800x450px (raport 16:9)

### Imagini în conținutul articolului:

În textul articolului (Markdown), adaugă:
```markdown
![Descriere imagine](../images/blog/nume-imagine.jpg)
```

### Pentru pagina principală:
Înlocuiește placeholder-ul de fotografie din `index.html` cu:
```html
<img src="images/fotografie.jpg" alt="Raluca Socaciu - Psiholog">
```

**Notă:** Dacă nu adaugi imagine la un articol, va apărea un placeholder gri.

---

## Cum să configurezi EmailJS

Pentru ca formularul de contact să trimită email-uri, trebuie să configurezi EmailJS.

### Pas 1: Creează cont EmailJS
1. Mergi la https://www.emailjs.com/
2. Click "Sign Up Free"
3. Creează cont cu email-ul tău

### Pas 2: Adaugă serviciu de email
1. În dashboard, click "Email Services"
2. Click "Add New Service"
3. Alege "Gmail" (sau alt provider)
4. Conectează-ți contul de email
5. Notează **Service ID** (ex: `service_abc123`)

### Pas 3: Creează template email
1. Click "Email Templates"
2. Click "Create New Template"
3. Configurează template-ul:
   - **To Email:** adresa ta de email
   - **Subject:** `Mesaj nou de la {{name}}`
   - **Content:**
   ```
   Nume: {{name}}
   Email: {{email}}
   Telefon: {{phone}}

   Mesaj:
   {{message}}
   ```
4. Salvează și notează **Template ID** (ex: `template_xyz789`)

### Pas 4: Obține Public Key
1. Click "Account" în meniu
2. Copiază **Public Key**

### Pas 5: Actualizează site-ul
Deschide `js/main.js` și înlocuiește:
```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // pune Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';      // pune Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // pune Template ID
```

---

## Cum să conectezi un domeniu propriu

Dacă vrei să ai adresa `www.ralucasocaciu.ro` în loc de `marianul.github.io/raluca.socaciu`:

### Pas 1: Cumpără domeniul
- Furnizori în România: Romarg.ro, Starter.ro, Rotld.ro
- Cost: ~10-15€/an pentru .ro

### Pas 2: Configurează DNS
La furnizorul de domenii, adaugă aceste înregistrări DNS:
```
Tip: A     | Nume: @    | Valoare: 185.199.108.153
Tip: A     | Nume: @    | Valoare: 185.199.109.153
Tip: A     | Nume: @    | Valoare: 185.199.110.153
Tip: A     | Nume: @    | Valoare: 185.199.111.153
Tip: CNAME | Nume: www  | Valoare: marianul.github.io
```

### Pas 3: Configurează GitHub Pages
1. Creează fișier `CNAME` în repository cu conținutul:
```
www.ralucasocaciu.ro
```
2. În GitHub: Settings → Pages → Custom domain → introdu `www.ralucasocaciu.ro`
3. Bifează "Enforce HTTPS"

Propagarea DNS poate dura 24-48 ore.

---

## Cum să salvezi modificările

### Varianta 1: Direct pe GitHub (simplu)
1. Mergi la https://github.com/marianul/raluca.socaciu
2. Navighează la fișierul pe care vrei să-l modifici
3. Click pe iconița creion (Edit)
4. Fă modificările
5. Click "Commit changes"
6. Așteaptă 1-2 minute pentru actualizarea site-ului

### Varianta 2: Cu GitHub Desktop (recomandat pentru modificări multiple)
1. Descarcă GitHub Desktop: https://desktop.github.com/
2. Clonează repository-ul
3. Fă modificările local
4. În GitHub Desktop: scrie un mesaj și click "Commit"
5. Click "Push origin"

---

## Structura fișierelor

```
raluca.socaciu/
├── index.html              # Pagina principală
├── css/
│   ├── style.css           # Stiluri principale
│   └── blog.css            # Stiluri pentru articole
├── js/
│   ├── main.js             # Funcționalități (meniu, formular, etc.)
│   └── content-loader.js   # Încarcă conținutul din folderul content/
├── content/                # ⭐ CONȚINUT EDITABIL (fără HTML!)
│   ├── contact.txt         # Date de contact
│   ├── tarife.txt          # Prețuri și servicii
│   ├── servicii.txt        # Lista serviciilor
│   └── despre.md           # Secțiunea Despre Mine
├── images/                 # Folder pentru imagini
│   └── blog/               # Imagini pentru articolele de blog
├── blog/
│   ├── article.html        # Template pentru afișare articol
│   └── articole.md         # ⭐ TOATE articolele într-un singur fișier
└── readme.md               # Acest fișier
```

---

## Întrebări frecvente

### Site-ul nu se actualizează după ce am făcut modificări
- Așteaptă 2-5 minute - GitHub Pages are nevoie de timp să proceseze
- Verifică că ai făcut "Commit" și "Push"
- Șterge cache-ul browserului (Ctrl+Shift+R)

### Am stricat ceva și site-ul nu mai funcționează
- Pe GitHub, poți vedea istoricul modificărilor și reveni la o versiune anterioară
- În repository → "Commits" → alege un commit vechi → "Revert"

### Am făcut o greșeală în articole.md și blog-ul nu funcționează
- Verifică că fiecare articol are `---` la început și sfârșit pentru metadata
- Verifică că articolele sunt separate prin `===`
- Asigură-te că nu ai caractere speciale în câmpurile metadata

### Pot modifica culorile site-ului?
Da, în `css/style.css` la începutul fișierului sunt definite culorile:
```css
--primary: #7C3AED;        /* Violet principal */
--secondary: #A78BFA;      /* Lavandă */
```

---

## Suport

Pentru probleme tehnice sau întrebări, contactează persoana care a creat site-ul.
