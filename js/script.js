/**
 * ===================================================================
 * AZIEL & RYAN - MAIN INTERACTIVE APPLICATION LOGIC
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.AZIEL_CONFIG;
  if (!config) return;

  // Initialize Canvas Lily Engine
  const lilyEngine = new LilyEngine('lilyCanvas');

  // Populate Dynamic HTML Content from Config
  initContent(config);

  // Intro Sequence Controller
  initIntroSequence(config, lilyEngine);

  // Setup Interactivity
  initPolaroidGallery(config);
  initReasonsGenerator(config);
  initQuiz(config);
  initSoundtrack(config);
  initLoveLetter(config);
  initFinale(config, lilyEngine);
  initScrollReveals();
});

/* -------------------------------------------------------------------
 * 1. DYNAMIC CONTENT INJECTION
 * ------------------------------------------------------------------- */
function initContent(config) {
  // Intro Text
  document.getElementById('intro-greeting').textContent = config.introText.greeting;
  document.getElementById('intro-subtext').textContent = config.introText.subtext;
  document.getElementById('intro-taketime').textContent = config.introText.takeTime;
  document.getElementById('btn-begin').textContent = config.introText.button;

  // Frame Reveal Text
  document.getElementById('frame-line1').textContent = config.frameRevealText.line1;
  document.getElementById('frame-line2').textContent = config.frameRevealText.line2;
  document.getElementById('frame-line3').textContent = config.frameRevealText.line3;

  // Hero Section
  document.getElementById('hero-title').textContent = config.heroText.title;
  document.getElementById('hero-line1').textContent = config.heroText.line1;
  document.getElementById('hero-line2').textContent = config.heroText.line2;
  document.getElementById('hero-line3').textContent = config.heroText.line3;

  // Quiet Photo Moments
  if (config.photoAppreciations && config.photoAppreciations.length > 0) {
    const q1 = config.photoAppreciations[0];
    document.getElementById('quiet-photo-1').src = q1.photo;
    document.getElementById('quiet-quote-1').textContent = q1.quote;

    if (config.photoAppreciations.length > 1) {
      const q2 = config.photoAppreciations[1];
      document.getElementById('quiet-photo-2').src = q2.photo;
      document.getElementById('quiet-quote-2').textContent = q2.quote;
    }
  }

  // ===================================================================
  // 9. OUR STORY — "JUST US." (MEMORY BOX EXPERIENCE)
  // ===================================================================
  const justUsConfig = config.justUsConfig;
  document.getElementById('just-us-title').textContent = justUsConfig.title;
  document.getElementById('just-us-subtitle').textContent = justUsConfig.subtitle;

  const justUsContainer = document.getElementById('just-us-container');
  justUsContainer.innerHTML = '';

  justUsConfig.memories.forEach((mem) => {
    const card = document.createElement('div');

    if (mem.type === 'text-first') {
      card.className = 'memory-card';
      card.innerHTML = `
        <p class="memory-quote serif-heading">"${mem.quote}"</p>
        <img class="memory-img" src="${mem.photo}" alt="Aziel & Ryan" loading="lazy">
        <p class="memory-caption">${mem.caption}</p>
      `;
    } else if (mem.type === 'photo-first') {
      card.className = 'memory-card';
      card.innerHTML = `
        <img class="memory-img" style="margin-top:0; margin-bottom:1rem;" src="${mem.photo}" alt="Aziel & Ryan" loading="lazy">
        <p class="memory-quote serif-heading">"${mem.quote}"</p>
        <p class="memory-caption">${mem.caption}</p>
      `;
    } else if (mem.type === 'interactive-card') {
      card.className = 'memory-card interactive-memory-box';
      card.innerHTML = `
        <span class="memory-badge">${mem.badge || 'Memory Card'}</span>
        <h4 class="interactive-card-title serif-heading">${mem.cardTitle}</h4>
        <div class="interactive-hidden-content">
          <img class="memory-img" src="${mem.photo}" alt="Secret Memory" loading="lazy">
          <p class="memory-caption" style="margin-top:0.8rem;">${mem.caption}</p>
        </div>
      `;
      // Click / Tap handler to unwrap secret memory
      card.addEventListener('click', () => {
        card.classList.toggle('unfolded');
      });
    } else if (mem.type === 'fullscreen-pause') {
      card.className = 'fullscreen-pause-card';
      card.innerHTML = `
        <img class="pause-img" src="${mem.photo}" alt="Quiet Moment" loading="lazy">
        <p class="pause-line serif-heading" id="pause-l1">${mem.line1}</p>
        <p class="pause-line serif-heading" id="pause-l2" style="color: var(--text-blush);">${mem.line2}</p>
        <p class="pause-line serif-heading" id="pause-l3" style="color: var(--accent-gold); font-size:1.5rem;">${mem.line3}</p>
      `;

      // Trigger line reveals when scrolled into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const l1 = entry.target.querySelector('#pause-l1');
            const l2 = entry.target.querySelector('#pause-l2');
            const l3 = entry.target.querySelector('#pause-l3');
            setTimeout(() => l1 && l1.classList.add('visible'), 400);
            setTimeout(() => l2 && l2.classList.add('visible'), 2000);
            setTimeout(() => l3 && l3.classList.add('visible'), 3600);
          }
        });
      }, { threshold: 0.4 });
      observer.observe(card);
    }

    justUsContainer.appendChild(card);
  });

  // Collage Ending of "Just Us."
  const eq = justUsConfig.endingQuotes;
  const collageElem = document.createElement('div');
  collageElem.className = 'just-us-collage-ending';
  collageElem.innerHTML = `
    <p class="collage-line serif-heading">${eq.line1}</p>
    <p class="collage-line serif-heading" style="color: var(--text-blush);">${eq.line2}</p>
    <p class="collage-line serif-heading" style="margin-top:1.5rem;">${eq.line3}</p>
    <p class="collage-line serif-heading" style="color: var(--accent-gold); font-size:1.4rem;">${eq.line4}</p>
    <div class="collage-tag signature-text">${eq.finalTag}</div>
  `;
  justUsContainer.appendChild(collageElem);
}

/* -------------------------------------------------------------------
 * 2. CINEMATIC INTRO & LILY BLOOM SEQUENCE
 * ------------------------------------------------------------------- */
function initIntroSequence(config, lilyEngine) {
  const introScreen = document.getElementById('intro-screen');
  const frameScreen = document.getElementById('frame-reveal-screen');
  const btnBegin = document.getElementById('btn-begin');

  // Timed Line Reveal
  setTimeout(() => document.getElementById('intro-greeting').classList.add('visible'), 600);
  setTimeout(() => document.getElementById('intro-subtext').classList.add('visible'), 2000);
  setTimeout(() => document.getElementById('intro-taketime').classList.add('visible'), 3500);
  setTimeout(() => btnBegin.classList.add('visible'), 4800);

  // Click BEGIN
  btnBegin.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    setTimeout(() => { introScreen.style.visibility = 'hidden'; }, 1000);

    // Start Canvas Lily growth and ONLY trigger text reveal once bloom FULLY finishes + 1.2s quiet pause!
    lilyEngine.startBloomAnimation(() => {
      // Quiet pause (1.2s) after 5-second bloom completes to admire the full blossom on canvas
      setTimeout(() => {
        frameScreen.classList.add('visible');
        
        const line1 = document.getElementById('frame-line1');
        const line2 = document.getElementById('frame-line2');
        const line3 = document.getElementById('frame-line3');

        setTimeout(() => line1 && line1.classList.add('visible'), 500);
        setTimeout(() => line2 && line2.classList.add('visible'), 2800);
        setTimeout(() => line3 && line3.classList.add('visible'), 5200);

        // After text is read, transition to main content & activate floating petals background
        setTimeout(() => {
          frameScreen.style.opacity = '0';
          setTimeout(() => {
            frameScreen.style.display = 'none';
            lilyEngine.state = 'ambient';
            
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
              mainContent.style.display = 'block';
              mainContent.offsetHeight; // Force layout reflow
              mainContent.classList.add('visible');
              mainContent.scrollIntoView({ behavior: 'smooth' });
            }
          }, 1500);
        }, 8800);
      }, 1200);
    });
  });
}

/* -------------------------------------------------------------------
 * 3. POLAROID GALLERY & LIGHTBOX
 * ------------------------------------------------------------------- */
function initPolaroidGallery(config) {
  const grid = document.getElementById('polaroid-grid');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  grid.innerHTML = '';
  config.polaroids.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.transform = `rotate(${item.rotation}deg)`;

    card.innerHTML = `
      <div class="polaroid-img-wrapper">
        <img class="polaroid-img" src="${item.photo}" alt="Aziel" loading="lazy">
      </div>
      <div class="polaroid-caption">${item.caption}</div>
    `;

    // Click to expand fullscreen lightbox
    card.addEventListener('click', () => {
      modalImg.src = item.photo;
      modalCaption.textContent = item.caption;
      modal.classList.add('active');
    });

    grid.appendChild(card);
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* -------------------------------------------------------------------
 * 4. "THINGS I DON'T SAY ENOUGH" GENERATOR
 * ------------------------------------------------------------------- */
function initReasonsGenerator(config) {
  const btn = document.getElementById('btn-reason');
  const textElem = document.getElementById('reason-text');
  let index = 0;

  textElem.textContent = config.reasons[0];

  btn.addEventListener('click', () => {
    textElem.style.opacity = '0';
    textElem.style.transform = 'translateY(10px)';

    setTimeout(() => {
      index = (index + 1) % config.reasons.length;
      textElem.textContent = config.reasons[index];
      textElem.style.opacity = '1';
      textElem.style.transform = 'translateY(0)';
    }, 300);
  });
}

/* -------------------------------------------------------------------
 * 5. PERSONALIZED MEMORY QUIZ
 * ------------------------------------------------------------------- */
function initQuiz(config) {
  const quizBox = document.getElementById('quiz-box');
  let currentQ = 0;

  function renderQuestion(qIdx) {
    if (qIdx >= config.quiz.length) {
      quizBox.innerHTML = `
        <div style="text-align:center; padding: 2rem;">
          <h3 class="serif-heading" style="font-size: 1.8rem; color: var(--accent-gold);">Quiz Completed! 🌸</h3>
          <p style="margin-top: 1rem; color: var(--text-blush);">You know us inside out. I love you, Aziel!</p>
        </div>
      `;
      return;
    }

    const item = config.quiz[qIdx];
    quizBox.innerHTML = `
      <h3 class="quiz-question serif-heading">${item.question}</h3>
      <div class="quiz-options">
        ${item.options.map((opt, i) => `
          <button class="quiz-btn" data-index="${i}">${opt}</button>
        `).join('')}
      </div>
      <div class="quiz-feedback" id="quiz-feedback"></div>
    `;

    const btns = quizBox.querySelectorAll('.quiz-btn');
    const feedback = quizBox.querySelector('#quiz-feedback');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = parseInt(btn.getAttribute('data-index'), 10);
        if (choice === item.correctIndex) {
          feedback.className = 'quiz-feedback correct';
          feedback.textContent = item.correctMsg;
          setTimeout(() => {
            currentQ++;
            renderQuestion(currentQ);
          }, 2500);
        } else {
          feedback.className = 'quiz-feedback wrong';
          feedback.textContent = item.wrongMsg;
        }
      });
    });
  }

  renderQuestion(currentQ);
}

/* -------------------------------------------------------------------
 * 6. OUR SOUNDTRACK & WEB AUDIO SYNTHESIZER
 * ------------------------------------------------------------------- */
function initSoundtrack(config) {
  const grid = document.getElementById('soundtrack-grid');
  const btnMusic = document.getElementById('btn-music');
  grid.innerHTML = '';

  let currentAudio = null;
  let currentActiveCard = null;
  let audioElements = [];

  config.soundtrack.forEach((song, idx) => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.8rem;">
        <div>
          <h4 class="song-title serif-heading">${song.title}</h4>
          <div class="song-artist">${song.artist}</div>
        </div>
        <button class="song-play-btn" aria-label="Play ${song.title}">▶</button>
      </div>
      <p class="song-desc">${song.description}</p>
      <audio id="audio-track-${idx}" src="${song.audioUrl}" preload="metadata" loop></audio>
    `;

    const playBtn = card.querySelector('.song-play-btn');
    const audio = card.querySelector('audio');
    audio.loop = true;
    audioElements.push({ audio, playBtn, card });

    const togglePlay = (e) => {
      e.stopPropagation();

      // Pause currently playing audio if different
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        if (currentActiveCard) {
          const oldBtn = currentActiveCard.querySelector('.song-play-btn');
          if (oldBtn) oldBtn.innerHTML = '▶';
          currentActiveCard.classList.remove('playing');
        }
      }

      if (audio.paused) {
        audio.play().then(() => {
          currentAudio = audio;
          currentActiveCard = card;
          playBtn.innerHTML = '❚❚';
          card.classList.add('playing');
          updateMainMusicBtn(true);
        }).catch(err => {
          console.log("Audio play error:", err);
        });
      } else {
        audio.pause();
        playBtn.innerHTML = '▶';
        card.classList.remove('playing');
        updateMainMusicBtn(false);
      }
    };

    // Make BOTH card click and button click trigger play/pause
    card.addEventListener('click', togglePlay);
    playBtn.addEventListener('click', togglePlay);

    audio.addEventListener('ended', () => {
      playBtn.innerHTML = '▶';
      card.classList.remove('playing');
      updateMainMusicBtn(false);
    });

    grid.appendChild(card);
  });

  // Main "Play our song" button toggles current or first uploaded song
  btnMusic.addEventListener('click', () => {
    if (currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
        updateMainMusicBtn(true);
        if (currentActiveCard) {
          const btn = currentActiveCard.querySelector('.song-play-btn');
          if (btn) btn.innerHTML = '❚❚';
        }
      } else {
        currentAudio.pause();
        updateMainMusicBtn(false);
        if (currentActiveCard) {
          const btn = currentActiveCard.querySelector('.song-play-btn');
          if (btn) btn.innerHTML = '▶';
        }
      }
    } else {
      // Play first uploaded song (song1.mp3) by default
      if (audioElements.length > 0) {
        audioElements[0].card.click();
      }
    }
  });

  function updateMainMusicBtn(playing) {
    if (playing) {
      btnMusic.innerHTML = `<span>Pause Song</span> <div class="soundwave"><div class="soundwave-bar"></div><div class="soundwave-bar"></div><div class="soundwave-bar"></div><div class="soundwave-bar"></div></div>`;
    } else {
      btnMusic.innerHTML = `<span>Play our song ♫</span>`;
    }
  }
}

/* -------------------------------------------------------------------
 * 7. LOVE LETTER ENVELOPE INTERACTION
 * ------------------------------------------------------------------- */
function initLoveLetter(config) {
  const envelope = document.getElementById('envelope-trigger');
  const modal = document.getElementById('letter-modal');
  const closeBtn = document.getElementById('letter-close');
  const contentElem = document.getElementById('letter-content');

  const l = config.loveLetter;
  let html = `
    <h3 class="serif-heading" style="font-size:1.8rem; color: var(--accent-burgundy); margin-bottom:1.5rem; text-align:center;">${l.heading}</h3>
    <p style="font-weight:600; font-size:1.2rem; margin-bottom:1rem;">${l.salutation}</p>
  `;

  l.bodyParagraphs.forEach(p => {
    html += `<p>${p}</p>`;
  });

  html += `
    <div class="letter-signature-block">
      <p style="font-style:italic;">${l.closing}</p>
      <p class="signature-text">${l.signature} 🌸</p>
    </div>
  `;

  contentElem.innerHTML = html;

  envelope.addEventListener('click', () => {
    modal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* -------------------------------------------------------------------
 * 8. FINALE CINEMATIC SURPRISE
 * ------------------------------------------------------------------- */
function initFinale(config, lilyEngine) {
  const btnTrigger = document.getElementById('btn-finale-trigger');
  const finaleScreen = document.getElementById('finale-screen');

  btnTrigger.addEventListener('click', () => {
    finaleScreen.classList.add('active');
  });

  const finalLilyBtn = document.getElementById('btn-final-lily');
  const finaleContent = document.getElementById('finale-content');

  finalLilyBtn.addEventListener('click', () => {
    finalLilyBtn.style.display = 'none';
    lilyEngine.startFinaleSurprise();

    const f = config.finale;
    finaleContent.innerHTML = `
      <h2 class="serif-heading" style="font-size: 2.5rem; color: var(--accent-gold); margin-bottom: 1rem;">${f.name}</h2>
      <p style="font-size: 1.25rem; color: var(--text-blush); white-space: pre-line; margin-bottom: 1.5rem;">${f.choiceQuote}</p>
      <img class="finale-photo" src="${f.finalPhoto}" alt="Aziel & Ryan">
      <h3 class="serif-heading" style="font-size: 1.8rem; color: var(--text-ivory); margin-top: 1rem;">${f.dayGreeting}</h3>
      <p style="color: var(--text-muted); font-size: 1.1rem; margin-top: 0.5rem;">${f.thankYou}</p>
      <p class="signature-text" style="margin-top: 1.5rem;">${f.always}</p>
      <p style="font-size: 1.1rem; color: var(--accent-gold); margin-top: 0.5rem;">${f.signature}</p>
    `;
  });
}

/* -------------------------------------------------------------------
 * 9. SCROLL OBSERVER FOR REVEALS
 * ------------------------------------------------------------------- */
function initScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.memory-card, .quiet-photo-section').forEach(el => {
    observer.observe(el);
  });
}
