/**
 * HYPERNOVA TECHNOLOGY — CAREERS PORTAL LAUNCH
 * Vanilla JavaScript Logic with song.mp3 Background Audio Integration, Preloader & Progress Bar
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     00. PRELOADER CONTROL & SONG.MP3 AUDIO PLAYBACK
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const preloaderSubtext = document.getElementById('preloaderSubtext');
  const preloaderActions = document.getElementById('preloaderActions');
  const preloaderProgressBox = document.getElementById('preloaderProgressBox');
  const preloaderProgressBar = document.getElementById('preloaderProgressBar');
  const preloaderProgressPercent = document.getElementById('preloaderProgressPercent');
  const preloaderStatusText = document.getElementById('preloaderStatusText');

  const enterWithAudioBtn = document.getElementById('enterWithAudioBtn');
  const enterNoAudioBtn = document.getElementById('enterNoAudioBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundStatus = soundToggleBtn?.querySelector('.sound-status');
  const bgAudio = document.getElementById('bgAudio');

  let currentProgress = 0;
  let progressInterval = null;
  let isSoundOn = false;

  function updateSoundUI(active) {
    isSoundOn = active;
    if (soundStatus) {
      soundStatus.textContent = isSoundOn ? '[ ON ]' : '[ OFF ]';
      soundStatus.style.color = isSoundOn ? '#10B981' : '#FF9933';
    }
  }

  function playMusic() {
    if (!bgAudio) return;
    bgAudio.play().then(() => {
      updateSoundUI(true);
    }).catch(err => {
      console.warn('Audio playback prevented by browser policy:', err);
      updateSoundUI(false);
    });
  }

  function stopMusic() {
    if (!bgAudio) return;
    bgAudio.pause();
    updateSoundUI(false);
  }

  // Step 2: Animate Loader Progress Bar after user selects Audio Choice
  function runProgressBarAndUnveil(audioSelected = false) {
    // Hide choice buttons & update prompt text
    if (preloaderActions) preloaderActions.classList.add('is-hidden');
    if (preloaderSubtext) preloaderSubtext.textContent = 'Initializing HyperNova Careers Portal ecosystem...';
    
    // Show Progress Bar Box
    if (preloaderProgressBox) preloaderProgressBox.classList.remove('is-hidden');

    currentProgress = 0;
    progressInterval = setInterval(() => {
      let increment = Math.floor(Math.random() * 5) + 2;
      currentProgress += increment;

      if (currentProgress > 100) currentProgress = 100;

      // Update fill width & text
      if (preloaderProgressBar) preloaderProgressBar.style.width = `${currentProgress}%`;
      if (preloaderProgressPercent) preloaderProgressPercent.textContent = `${currentProgress}%`;

      if (preloaderStatusText) {
        if (currentProgress < 30) {
          preloaderStatusText.textContent = 'INITIALIZING CAREERS PORTAL...';
        } else if (currentProgress < 70) {
          preloaderStatusText.textContent = 'CONNECTING HYPERNOVA CORE...';
        } else if (currentProgress < 99) {
          preloaderStatusText.textContent = 'PREPARING 15 AUGUST 2026 @ 4:00 PM IST...';
        } else {
          preloaderStatusText.textContent = 'ACCESS GRANTED';
        }
      }

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        
        // Final Unveil after brief pause
        setTimeout(() => {
          if (preloader) preloader.classList.add('is-hidden');
          if (audioSelected) {
            playMusic();
          } else {
            stopMusic();
          }
        }, 350);
      }
    }, 30);
  }

  // Event Listeners for Audio Selection Buttons (Step 1 -> Step 2)
  enterWithAudioBtn?.addEventListener('click', () => {
    runProgressBarAndUnveil(true);
  });

  enterNoAudioBtn?.addEventListener('click', () => {
    runProgressBarAndUnveil(false);
  });

  // Floating Sound Toggle Button Listener
  soundToggleBtn?.addEventListener('click', () => {
    if (bgAudio && !bgAudio.paused) {
      stopMusic();
    } else {
      playMusic();
    }
  });

  /* ------------------------------------------------------------------------
     01. ANIMATED VIBRANT INDIAN FLAG & ASHOKA CHAKRA CANVAS BACKGROUND
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('flagCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let step = 0;
    let chakraAngle = 0;
    const particles = [];
    const particleCount = 60;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle Constructor
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.9 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;

        const colors = [
          'rgba(255, 153, 51, ',  // Vibrant Saffron
          'rgba(255, 255, 255, ', // Pure White
          'rgba(16, 185, 129, '   // Vibrant Emerald Green
        ];
        this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.y -= this.speedY;
        this.x += Math.sin(step * 0.025 + this.y * 0.01) * 0.6 + this.speedX;
        if (this.y < -10) this.reset();
      }
      draw() {
        ctx.fillStyle = `${this.colorBase}${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw Smooth Wave Ribbon
    function drawWaveRibbon(offsetY, waveHeight, wavelength, speed, colorStop1, colorStop2) {
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width + 20; x += 16) {
        const y = offsetY + Math.sin((x * wavelength) + (step * speed)) * waveHeight + Math.cos((x * wavelength * 0.6) + (step * speed * 0.8)) * (waveHeight * 0.45);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, offsetY - 80, 0, height);
      grad.addColorStop(0, colorStop1);
      grad.addColorStop(1, colorStop2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Draw 24-Spoke Ashoka Chakra Wheel (Optimized: No shadowBlur for 60fps performance)
    function drawAshokaChakra(cx, cy, radius) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(chakraAngle);

      const chakraColor = 'rgba(59, 130, 246, 0.55)';
      ctx.strokeStyle = chakraColor;
      ctx.fillStyle = chakraColor;

      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      const spokes = 24;
      for (let i = 0; i < spokes; i++) {
        const angle = (i * Math.PI * 2) / spokes;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        ctx.stroke();
      }

      ctx.restore();
    }

    function animateFlagCanvas() {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#060609';
      ctx.fillRect(0, 0, width, height);

      step += 0.022;
      chakraAngle += 0.003;

      // 1. Saffron Wave
      drawWaveRibbon(
        height * 0.18,
        45,
        0.0032,
        0.022,
        'rgba(255, 153, 51, 0.45)',
        'rgba(255, 128, 0, 0.02)'
      );

      // 2. White Wave
      drawWaveRibbon(
        height * 0.45,
        50,
        0.0028,
        0.02,
        'rgba(255, 255, 255, 0.32)',
        'rgba(240, 240, 245, 0.02)'
      );

      // 3. India Green Wave
      drawWaveRibbon(
        height * 0.70,
        55,
        0.0022,
        0.016,
        'rgba(16, 185, 129, 0.42)',
        'rgba(5, 150, 105, 0.02)'
      );

      // Ashoka Chakra
      const chakraRadius = Math.min(width, height) * 0.24;
      drawAshokaChakra(width * 0.82, height * 0.32, chakraRadius);

      // Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateFlagCanvas);
    }

    animateFlagCanvas();
  }

  /* ------------------------------------------------------------------------
     02. COUNTDOWN TIMER TO 15 AUGUST 2026 AT 4:00 PM IST (16:00:00 IST)
     ------------------------------------------------------------------------ */
  const targetLaunchDate = new Date('2026-08-15T16:00:00+05:30').getTime();

  const daysEl = document.getElementById('cntDays');
  const hoursEl = document.getElementById('cntHours');
  const minutesEl = document.getElementById('cntMinutes');
  const secondsEl = document.getElementById('cntSeconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetLaunchDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days < 10 ? `0${days}` : days;
    if (hoursEl) hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
    if (minutesEl) minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsEl) secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ------------------------------------------------------------------------
     03. STICKY HEADER & MOBILE DRAWER NAVIGATION
     ------------------------------------------------------------------------ */
  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-btn-full');

  let isScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!isScrollTicking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          siteHeader?.classList.add('scrolled');
        } else {
          siteHeader?.classList.remove('scrolled');
        }
        
        // Timeline Scroll Line Progress inside throttled loop
        if (timelineSection && timelineProgress) {
          const rect = timelineSection.getBoundingClientRect();
          const totalHeight = rect.height;
          const currentPos = window.innerHeight - rect.top;
          
          if (currentPos > 0 && rect.top < window.innerHeight) {
            let percentage = (currentPos / (totalHeight + window.innerHeight * 0.5)) * 100;
            percentage = Math.min(Math.max(percentage, 10), 100);
            timelineProgress.style.height = `${percentage}%`;
          }
        }
        isScrollTicking = false;
      });
      isScrollTicking = true;
    }
  }, { passive: true });

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        mobileDrawer.classList.remove('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     04. INTERSECTION OBSERVER FOR SCROLL REVEALS & TIMELINE
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-element, .reveal-text');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  const timelineProgress = document.getElementById('timelineProgress');
  const timelineSection = document.getElementById('timeline');

  /* ------------------------------------------------------------------------
     05. FAQ ACCORDION TOGGLE
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = '0px';
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight + 40}px`;
      }
    });
  });

  /* ------------------------------------------------------------------------
     06. COPY ADMIN EMAIL TO CLIPBOARD
     ------------------------------------------------------------------------ */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const copyFeedback = document.getElementById('copyFeedback');
  const adminEmail = 'admin.hypernovatech@gmail.com';

  copyEmailBtn?.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(adminEmail);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = adminEmail;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      if (copyBtnText) copyBtnText.textContent = 'COPIED!';
      if (copyFeedback) copyFeedback.textContent = 'Email address copied to clipboard!';

      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'COPY EMAIL';
        if (copyFeedback) copyFeedback.textContent = '';
      }, 3000);
    } catch (err) {
      console.warn('Failed to copy email:', err);
      if (copyFeedback) copyFeedback.textContent = `Please copy manually: ${adminEmail}`;
    }
  });

});
