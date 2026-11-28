document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile hero: translucent header only at the start of the page.
    // The artwork extends beneath it; solid white returns upon scrolling.
    (() => {
      const nav = document.querySelector('.nav');
      const hero = document.querySelector('#home');
      if (!nav || !hero) return;
      const updateHeader = () => {
        const overHeroStart = window.innerWidth <= 720
          && window.scrollY < 24
          && hero.getBoundingClientRect().bottom > nav.getBoundingClientRect().bottom;
        nav.classList.toggle('nav--hero-overlay', overHeroStart);
      };
      window.addEventListener('scroll', updateHeader, {passive:true});
      window.addEventListener('resize', updateHeader, {passive:true});
      updateHeader();
    })();

    const menu = document.querySelector('.nav-menu');
    const links = document.querySelector('.nav-links');
    if (menu && links) {
      const closeMobileMenu = () => {
        links.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Toggle navigation');
        menu.textContent = '☰';
      };
      menu.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        menu.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-label', open ? 'Close navigation' : 'Toggle navigation');
        menu.textContent = open ? '×' : '☰';
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && links.classList.contains('open')) {
          closeMobileMenu();
          menu.focus();
        }
      });
      document.addEventListener('pointerdown', event => {
        if (links.classList.contains('open') && !event.target.closest('.nav')) closeMobileMenu();
      });
      window.addEventListener('resize', () => {
        if (window.innerWidth > 720 && links.classList.contains('open')) closeMobileMenu();
      }, { passive: true });
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        history.replaceState(null, '', id);
        const offset = document.querySelector('.nav')?.getBoundingClientRect().height
          ?? (window.innerWidth <= 720 ? 56 : 84);
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'instant' });
        if (links) links.classList.remove('open');
        if (menu) {
          menu.textContent = '☰';
          menu.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-label', 'Toggle navigation');
        }
      });
    });

    const sectionLinks = [...document.querySelectorAll('.nav-links a')];
    const sections = sectionLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach(entry => {
          sectionLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 });
      sections.forEach(section => observer.observe(section));
    }

    // Native-scroll reveal: only artwork moves while the sticky hero is held.
    // No wheel/touch event interception, so trackpads, swipes, keyboard and
    // reverse scrolling use the browser's standard scroll behavior.
    (() => {
      const shell=document.getElementById('hero-scroll-shell');
      const hero=shell?.querySelector('.hero');
      const art=shell?.querySelector('.hero-stage');
      const artImage=art?.querySelector('img');
      const cta=hero?.querySelector('.hero-cta-row');
      const desktop=window.matchMedia('(min-width: 961px)');
      const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
      if(!shell || !hero || !art || !artImage || !cta) return;
      let distance=0,frame=0;
      const enabled=()=>desktop.matches && !reduceMotion.matches;
      function measure(){
        art.style.setProperty('--hero-art-offset','0px');
        if(!enabled()){
          distance=0;
          shell.style.removeProperty('--hero-scroll-distance');
          return;
        }
        // The requested stopping point is the feet/dice level with the CTA.
        // Measure rendered elements rather than guessing a pixel displacement.
        const artworkBottom=artImage.getBoundingClientRect().bottom;
        const buttonBottom=cta.getBoundingClientRect().bottom;
        distance=Math.max(0,Math.min(650,Math.round(artworkBottom-buttonBottom)));
        shell.style.setProperty('--hero-scroll-distance',distance+'px');
        render();
      }
      function render(){
        frame=0;
        if(!enabled() || distance<=0){
          art.style.setProperty('--hero-art-offset','0px');
          return;
        }
        const navHeight=document.querySelector('.nav')?.getBoundingClientRect().height ?? 84;
        const progress=Math.max(0,Math.min(distance,navHeight-shell.getBoundingClientRect().top));
        art.style.setProperty('--hero-art-offset',(-progress)+'px');
      }
      function schedule(){if(!frame) frame=requestAnimationFrame(render)}
      window.addEventListener('scroll',schedule,{passive:true});
      window.addEventListener('resize',measure,{passive:true});
      desktop.addEventListener?.('change',measure);
      reduceMotion.addEventListener?.('change',measure);
      if(artImage.complete) measure(); else artImage.addEventListener('load',measure,{once:true});
      window.addEventListener('load',measure,{once:true});
      requestAnimationFrame(measure);
    })();

    // Portfolio reveal extends the hero's cinematic native-scroll interaction.
    // No wheel or touch listeners: browser scroll drives both directions.
    (() => {
      const cards=[...document.querySelectorAll('.cinematic-card')];
      const desktop=window.matchMedia('(min-width:961px)');
      const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
      if(!cards.length)return;
      let pending=0;
      const enabled=()=>desktop.matches && !reduced.matches;
      function measure(){
        for(const card of cards){
          const track=card.querySelector('.cinematic-track');
          const viewport=card.querySelector('.cinematic-viewport');
          if(!enabled()){
            card.style.setProperty('--cinematic-offset','0px');
            card.style.removeProperty('--cinematic-travel');
            card.dataset.travel='0';
            continue;
          }
          // Real rendered gallery height determines how long copy remains pinned.
          // The panel releases only after the last complete slide (including
          // its caption) is inside the viewport. This is the exact amount of
          // natural document scroll reserved by the parent card.
          const last=track.querySelector('.cinematic-slide:last-child');
          const trackStyle=getComputedStyle(track);
          const bottomPadding=parseFloat(trackStyle.paddingBottom)||0;
          const finalBottom=last ? last.offsetTop+last.offsetHeight+bottomPadding : track.scrollHeight;
          const travel=Math.max(0,Math.ceil(finalBottom-viewport.clientHeight));
          card.dataset.travel=String(travel);
          card.style.setProperty('--cinematic-travel',travel+'px');
        }
        render();
      }
      function render(){
        pending=0;
        if(!enabled())return;
        const nav=document.querySelector('.nav');
        const navHeight=nav?.getBoundingClientRect().height||84;
        for(const card of cards){
          const travel=Number(card.dataset.travel)||0;
          const progress=Math.max(0,Math.min(travel,navHeight-card.getBoundingClientRect().top));
          card.style.setProperty('--cinematic-offset',(-progress)+'px');
          const slides=[...card.querySelectorAll('.cinematic-slide')];
          const center=progress+(card.querySelector('.cinematic-viewport')?.clientHeight||0)*.52;
          let slideNum=1;
          slides.forEach((slide,i)=>{if(slide.offsetTop<=center)slideNum=i+1;});
          const count=card.querySelector('.cinematic-count');
          if(count)count.textContent=String(slideNum).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
        }
      }
      function schedule(){if(!pending)pending=requestAnimationFrame(render);}
      window.addEventListener('scroll',schedule,{passive:true});
      window.addEventListener('resize',measure,{passive:true});
      desktop.addEventListener?.('change',measure);
      reduced.addEventListener?.('change',measure);
      cards.forEach(card=>card.querySelectorAll('img').forEach(img=>{if(!img.complete)img.addEventListener('load',measure,{once:true});}));
      window.addEventListener('load',measure,{once:true});
      requestAnimationFrame(measure);
    })();
    // Visual activation is immediate, while outbound links retain native behaviour.
    document.querySelectorAll('.business-card .business-link').forEach(link => {
      let release;
      link.addEventListener('click', () => {
        link.classList.add('is-clicked');
        clearTimeout(release);
        release = setTimeout(() => link.classList.remove('is-clicked'), 1100);
      });
      link.addEventListener('blur', () => {
        clearTimeout(release);
        release = setTimeout(() => link.classList.remove('is-clicked'), 500);
      });
    });

// Horizontal showcase remains swipeable and supports keyboard navigation.
(() => {
  const gallery = document.querySelector('.jobpunter .jp-stage');
  if (!gallery) return;
  const mobileGallery = window.matchMedia('(max-width: 900px)');
  const syncGalleryAccessibility = () => {
    const horizontallyScrollable = mobileGallery.matches;
    gallery.tabIndex = horizontallyScrollable ? 0 : -1;
    gallery.setAttribute('aria-label', horizontallyScrollable
      ? 'JobPunter mobile app screenshots. Swipe horizontally or use left and right arrow keys to explore.'
      : 'JobPunter mobile app screenshots');
  };
  syncGalleryAccessibility();
  mobileGallery.addEventListener?.('change', syncGalleryAccessibility);
  gallery.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    if (gallery.scrollWidth <= gallery.clientWidth) return;
    const first = gallery.querySelector('img');
    const gap = parseFloat(getComputedStyle(gallery).gap) || 0;
    const step = (first?.getBoundingClientRect().width || gallery.clientWidth * .7) + gap;
    gallery.scrollBy({left: event.key === 'ArrowRight' ? step : -step, behavior: 'smooth'});
    event.preventDefault();
  });
})();
