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
});
