export function setupAnimations() {
  const w = window as Window & { gsap?: any; ScrollTrigger?: any };
  const gsap = w.gsap;
  const ScrollTrigger = w.ScrollTrigger;
  if (!gsap || !ScrollTrigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 800px)' }, ({ conditions }: any) => {
    const { reduceMotion, desktop } = conditions;
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-eyebrow', { autoAlpha: 0, y: 18, duration: 0.65 })
        .from('.hero-title', { autoAlpha: 0, y: 28, duration: 0.8 }, '-=.35')
        .from('.hero-description', { autoAlpha: 0, y: 18, duration: 0.65 }, '-=.45')
        .from('.hero-actions', { autoAlpha: 0, y: 14, duration: 0.55 }, '-=.35')
        .from('.hero-product', { autoAlpha: 0, y: 30, rotation: desktop ? 5 : 2, duration: 1.05 }, '-=.55');

      gsap.fromTo('.statement-word', { opacity: 0.16 }, { opacity: 1, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top 75%', end: 'bottom 45%', scrub: true } });
      const bandScroll = { trigger: '.card-band', start: 'top bottom', end: 'bottom top', scrub: true };
      gsap.to('.card-band-bg', { yPercent: 18, ease: 'none', scrollTrigger: bandScroll });
      gsap.fromTo('.card-band-bg img', { scale: 0.62 }, { scale: 1, ease: 'none', scrollTrigger: bandScroll });
      gsap.fromTo('.band-word', { autoAlpha: 0, yPercent: 120, rotation: 3, transformOrigin: 'left bottom' }, { autoAlpha: 1, yPercent: 0, rotation: 0, duration: 0.9, stagger: 0.1, ease: 'power4.out', scrollTrigger: { trigger: '.card-band', start: 'top 60%', once: true } });

      gsap.utils.toArray<HTMLElement>('.reveal, .reveal-product').forEach((element) => {
        if (element.classList.contains('hero-product')) return;
        gsap.from(element, { autoAlpha: 0, y: 28, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 84%', once: true } });
      });
      gsap.to('.showcase-visual .product-card', { y: -30, rotation: -2, ease: 'none', scrollTrigger: { trigger: '.showcase-visual', start: 'top bottom', end: 'bottom top', scrub: 1 } });

      if (desktop) {
        const card = document.querySelector<HTMLElement>('.hero-product .product-card');
        const hero = document.querySelector<HTMLElement>('.hero');
        if (card && hero) hero.addEventListener('pointermove', (event) => {
          const rect = hero.getBoundingClientRect();
          gsap.to(card, { rotationY: ((event.clientX - rect.left) / rect.width - 0.5) * 5, rotationX: -((event.clientY - rect.top) / rect.height - 0.5) * 4, duration: 0.5, ease: 'power2.out' });
        });
      }
    });
    return () => ctx.revert();
  });
}
