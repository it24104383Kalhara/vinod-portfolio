import '../css/main.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Glow Micro-interaction
  const createGlow = () => {
    let glow = document.getElementById('mouse-glow');
    if (!glow) {
      glow = document.createElement('div');
      glow.id = 'mouse-glow';
      glow.style.position = 'fixed';
      glow.style.pointerEvents = 'none';
      glow.style.width = '400px';
      glow.style.height = '400px';
      glow.style.background = 'radial-gradient(circle, rgba(0, 219, 233, 0.03) 0%, rgba(0, 0, 0, 0) 70%)';
      glow.style.borderRadius = '50%';
      glow.style.zIndex = '0';
      glow.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(glow);
    }
    return glow;
  };

  document.addEventListener('mousemove', (e) => {
    const glow = createGlow();
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  // 2. Sticky Navbar scroll effect
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('shadow-2xl', 'bg-surface/95');
      } else {
        nav.classList.remove('shadow-2xl', 'bg-surface/95');
      }
    });
  }

  // 3. Global GSAP Scroll Reveals (Fade Up)
  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach((el) => {
    gsap.fromTo(el, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // 4. Skill bar animation on scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.skill-progress');
        bars.forEach(bar => {
          const targetWidth = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const skillSection = document.querySelector('.terminal-header')?.parentElement;
  if (skillSection) observer.observe(skillSection);

  // 5. Back to Top Button with Micro-interactions
  const createBackToTopBtn = () => {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'back-to-top';
      btn.className = 'fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-[9999px] border border-outline-variant bg-surface-container-low/80 backdrop-blur-md text-on-surface hover:text-primary-fixed-dim hover:border-primary-fixed-dim/50 shadow-lg cursor-pointer opacity-0 translate-y-4 pointer-events-none transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-primary-fixed-dim/5';
      
      // Arrow Up Icon
      btn.innerHTML = `
        <span class="material-symbols-outlined text-2xl transition-transform duration-300">arrow_upward</span>
      `;
      
      document.body.appendChild(btn);
      
      // Scroll to top on click with rocket-launch micro-interaction animation
      btn.addEventListener('click', () => {
        // Rocket effect: scale down, shoot up, fade out
        gsap.to(btn, {
          y: -48,
          opacity: 0,
          scale: 0.85,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Soft reset after scrolling starts to clear GSAP inline styles
            setTimeout(() => {
              gsap.set(btn, { clearProps: "all" });
            }, 600);
          }
        });
      });
    }
    return btn;
  };

  const backToTopBtn = createBackToTopBtn();

  // Scroll listener to toggle visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }
  });
});
