# Paul ♡ Boyfriend Day Interactive Cinematic Website

A private, interactive, cinematic love story built specifically for **Paul** by **Ryan**. Featuring procedural Canvas 2D **Rose blooming animations** (blooming deep crimson roses), floating wind petals, interactive relationship memory timeline, 3D floating polaroid gallery, love reason generator, relationship memory quiz, ambient soundtrack player, unsealing envelope love letter, and final surprise rose blooming climax.

---

## 🌹 Customization Guide (How Ryan Can Edit Everything)

All text, dates, memories, photos, reasons, quiz questions, soundtrack songs, love letter paragraphs, and final messages are stored in **`js/config.js`**.

### 1. Changing Photos
Replace the files inside `assets/images/` with Ryan & Paul's actual photos using the same file names, or update the image paths in `js/config.js`:

- `paul_1.jpg` & `paul_2.jpg`: Selective quiet photo moments.
- `paul_story1.jpg` to `paul_story4.jpg`: Story timeline memory photos.
- `paul_polaroid1.jpg` to `paul_polaroid6.jpg`: Polaroid gallery photos.
- `paul_final.jpg`: Photo displayed during the final blooming climax.

### 2. Editing Text, Dates & Letters
Open `js/config.js` in any text editor to modify:
- **`boyfriendName`**: Default `"Paul"`
- **`partnerName`**: Default `"Ryan"`
- **`partnerSignature`**: Default `"Ryan"`
- **`justUsConfig`**: Add or change memory dates, titles, descriptions, and captions.
- **`polaroids`**: Edit polaroid photo paths and handwritten captions.
- **`reasons`**: Add or customize reasons in "Things I Don't Say Enough".
- **`quiz`**: Customize relationship questions, choices, and feedback.
- **`loveLetter`**: Edit the salutation, body paragraphs, and signature.
- **`finale`**: Edit the closing quotes and final greetings.

---

## 🚀 How to Host on GitHub Pages (Free & Public/Private Link)

1. Create a new repository on [GitHub.com](https://github.com/new) (e.g. `paul-boyfriend-day`).
2. Upload all files from this project folder (`index.html`, `css/`, `js/`, `assets/`, `README.md`).
3. In your GitHub repository settings:
   - Go to **Settings** -> **Pages** (under Code and automation).
   - Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.
4. Within 1–2 minutes, GitHub will generate your live link:
   `https://YOUR-GITHUB-USERNAME.github.io/paul-boyfriend-day/`

---

## ✨ Features & Architecture
- **100% Static HTML5 / CSS3 / Vanilla JS**: Zero build tools, zero npm/Node dependencies.
- **Procedural Canvas 2D Physics Engine (`js/roseEngine.js`)**: Organic growth of stem curves, unfolding rose leaves & thorns, multi-layered crimson/red rose petals, golden stamens, pollen particles, floating wind petals, and parallax sway.
- **Mobile-First & Touch Responsive**: iOS notch/safe-area insets handled, touch-friendly 3D polaroid tilt, and high 60fps GPU performance.
- **`prefers-reduced-motion` Compliant**: Automatically adapts transitions for reduced motion accessibility.
