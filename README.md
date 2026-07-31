# Aziel ♡ Girlfriend Day Interactive Cinematic Website

A private, interactive, cinematic love story built specifically for **Aziel** by **Ryan (ur champak)**. Featuring procedural Canvas 2D **Lily blooming animations** (her favorite flowers), floating wind petals, interactive relationship memory timeline, 3D floating polaroid gallery, love reason generator, relationship memory quiz, ambient soundtrack player, unsealing envelope love letter, and final surprise blooming climax.

---

## 🌸 Customization Guide (How Ryan Can Edit Everything)

All text, dates, memories, photos, reasons, quiz questions, soundtrack songs, love letter paragraphs, and final messages are stored in **`js/config.js`**.

### 1. Changing Photos
Replace the files inside `assets/images/` with Ryan & Aziel's actual photos using the same file names, or update the image paths in `js/config.js`:

- `aziel_1.jpg` & `aziel_2.jpg`: Selective quiet photo moments.
- `aziel_story1.jpg` to `aziel_story4.jpg`: Story timeline memory photos.
- `aziel_polaroid1.jpg` to `aziel_polaroid6.jpg`: Polaroid gallery photos.
- `aziel_final.jpg`: Photo displayed during the final blooming climax.

### 2. Editing Text, Dates & Letters
Open `js/config.js` in any text editor to modify:
- **`girlfriendName`**: Default `"Aziel"`
- **`boyfriendName`**: Default `"Ryan"`
- **`boyfriendSignature`**: Default `"Ryan (ur champak)"`
- **`timeline`**: Add or change memory dates, titles, descriptions, and captions.
- **`polaroids`**: Edit polaroid photo paths and handwritten captions.
- **`reasons`**: Add or customize reasons in "Things I Don't Say Enough".
- **`quiz`**: Customize relationship questions, choices, and funny/sweet feedback.
- **`loveLetter`**: Edit the salutation, body paragraphs, and signature.
- **`finale`**: Edit the closing quotes and final greetings.

---

## 🚀 How to Host on GitHub Pages (Free & Public/Private Link)

1. Create a new repository on [GitHub.com](https://github.com/new) (e.g. `aziel-girlfriend-day`).
2. Upload all files from this project folder (`index.html`, `css/`, `js/`, `assets/`, `README.md`).
3. In your GitHub repository settings:
   - Go to **Settings** -> **Pages** (under Code and automation).
   - Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.
4. Within 1–2 minutes, GitHub will generate your live link:
   `https://YOUR-GITHUB-USERNAME.github.io/aziel-girlfriend-day/`

---

## ✨ Features & Architecture
- **100% Static HTML5 / CSS3 / Vanilla JS**: Zero build tools, zero npm/Node dependencies.
- **Procedural Canvas 2D Physics Engine (`js/lilyEngine.js`)**: Organic growth of stem curves, unfolding leaves, 6-petal white/blush lilies, golden stamens, pollen particles, floating wind petals, and parallax sway.
- **Mobile-First & Touch Responsive**: iOS notch/safe-area insets handled, touch-friendly 3D polaroid tilt, and high 60fps GPU performance.
- **`prefers-reduced-motion` Compliant**: Automatically adapts transitions for reduced motion accessibility.
