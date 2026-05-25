import { useState, useEffect, useRef } from "react";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

    :root {
      --ivory:#F8F4EE; --beige:#EDE5D8; --sand:#D9CCC0; --taupe:#B5A898;
      --umber:#7A6858; --espresso:#3A2E28; --black:#1A1510;
      --gold:#B8965A; --gold-lt:#D4AF7A; --gold-dk:#8C6E3C;
      --bg:var(--ivory); --bg2:var(--beige); --fg:var(--black); --fg2:var(--espresso);
      --muted:var(--taupe); --accent:var(--gold);
      --card:rgba(255,252,248,0.92); --border:rgba(181,168,152,0.35); --glass:rgba(248,244,238,0.7);
    }
    [data-theme="dark"] {
      --bg:#1A1510; --bg2:#251E18; --fg:#F0EAE0; --fg2:#D9CCC0; --muted:#7A6858;
      --accent:var(--gold-lt); --card:rgba(37,30,24,0.92);
      --border:rgba(90,75,60,0.4); --glass:rgba(37,30,24,0.75);
    }
    *{margin:0;padding:0;box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{background:var(--bg);color:var(--fg);font-family:'Jost',sans-serif;font-weight:300;letter-spacing:0.02em;transition:background 0.5s,color 0.5s;overflow-x:hidden;}
    h1,h2,h3,h4{font-family:'Cormorant Garamond',serif;font-weight:400;}
    ::selection{background:var(--gold);color:#fff;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:var(--bg2);}
    ::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px;}

    /* LOADER */
    .loader{position:fixed;inset:0;background:#1A1510;z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;transition:opacity 0.8s,visibility 0.8s;}
    .loader.done{opacity:0;visibility:hidden;pointer-events:none;}
    .loader-name{font-family:'Cormorant Garamond',serif;color:#F0EAE0;font-size:clamp(2rem,6vw,4rem);font-weight:300;letter-spacing:0.3em;animation:fadeUp 1.2s ease forwards;}
    .loader-bar{width:120px;height:1px;background:rgba(255,255,255,0.15);position:relative;overflow:hidden;}
    .loader-bar::after{content:'';position:absolute;left:-100%;top:0;width:100%;height:100%;background:var(--gold);animation:barSlide 1.6s ease forwards;}
    @keyframes barSlide{to{left:100%;}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}

    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 5vw;display:flex;align-items:center;justify-content:space-between;height:72px;backdrop-filter:blur(18px) saturate(1.4);background:var(--glass);border-bottom:1px solid var(--border);transition:all 0.4s;}
    .nav.scrolled{height:60px;}
    .nav-logo{font-family:'Cormorant Garamond',serif;font-weight:400;font-size:1.35rem;letter-spacing:0.18em;color:var(--fg);text-decoration:none;cursor:pointer;}
    .nav-links{display:flex;gap:2.5rem;list-style:none;}
    .nav-links a{font-size:0.72rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--fg2);text-decoration:none;transition:color 0.25s;position:relative;cursor:pointer;}
    .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--accent);transition:width 0.3s ease;}
    .nav-links a:hover{color:var(--accent);}
    .nav-links a:hover::after{width:100%;}
    .theme-toggle{width:38px;height:38px;border-radius:50%;border:1px solid var(--border);background:transparent;cursor:pointer;color:var(--fg);font-size:1rem;display:flex;align-items:center;justify-content:center;transition:all 0.3s;}
    .theme-toggle:hover{border-color:var(--accent);color:var(--accent);}

    /* HERO */
    .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:72px 8vw 0;position:relative;overflow:hidden;}
    .hero-bg{position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 80% 60% at 70% 50%,rgba(184,150,90,0.08) 0%,transparent 70%),radial-gradient(ellipse 50% 80% at 20% 80%,rgba(181,168,152,0.1) 0%,transparent 60%);}
    .hero-grain{position:absolute;inset:0;z-index:0;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px;}
    .hero-content{position:relative;z-index:1;}
    .hero-eyebrow{font-size:0.68rem;letter-spacing:0.35em;text-transform:uppercase;color:var(--accent);margin-bottom:1.8rem;display:flex;align-items:center;gap:12px;}
    .hero-eyebrow::before{content:'';display:block;width:32px;height:1px;background:var(--accent);}
    .hero-name{font-size:clamp(3.5rem,7vw,6.5rem);line-height:1.0;letter-spacing:0.03em;color:var(--fg);margin-bottom:0.5rem;}
    .hero-name em{font-style:italic;color:var(--gold);}
    .hero-title{font-size:clamp(0.9rem,1.5vw,1.05rem);letter-spacing:0.12em;color:var(--muted);text-transform:uppercase;margin-bottom:2rem;font-family:'Jost',sans-serif;font-weight:300;}
    .hero-line{width:60px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);margin:1.5rem 0;}
    .hero-intro{font-size:1.05rem;line-height:1.85;color:var(--fg2);max-width:460px;margin-bottom:3rem;}
    .hero-ctas{display:flex;gap:1.2rem;flex-wrap:wrap;}
    .btn-primary{padding:13px 36px;border:none;background:linear-gradient(135deg,var(--gold) 0%,var(--gold-dk) 100%);color:#fff;font-family:'Jost',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;transition:all 0.35s;box-shadow:0 8px 24px rgba(184,150,90,0.25);text-decoration:none;display:inline-block;}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(184,150,90,0.35);}
    .btn-ghost{padding:12px 34px;border:1px solid var(--border);background:transparent;color:var(--fg2);font-family:'Jost',sans-serif;font-size:0.72rem;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;transition:all 0.35s;text-decoration:none;display:inline-block;}
    .btn-ghost:hover{border-color:var(--accent);color:var(--accent);background:rgba(184,150,90,0.04);}

    /* PORTRAIT */
    .hero-portrait-wrap{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;}
    .hero-portrait-frame{position:relative;width:min(420px,90%);aspect-ratio:3/4;}
    .portrait-bg-shape{position:absolute;inset:0;background:linear-gradient(145deg,var(--beige) 0%,var(--sand) 100%);clip-path:polygon(10% 0%,100% 0%,90% 100%,0% 100%);}
    .portrait-image{position:absolute;inset:12px;display:flex;align-items:center;justify-content:center;overflow:hidden;}
    .portrait-img{width:100%;height:100%;object-fit:cover;}
    .portrait-placeholder{width:100%;height:100%;background:linear-gradient(160deg,#D4C4B0 0%,#B8A898 50%,#9A8878 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;}
    .portrait-placeholder-icon{width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;font-size:2.5rem;}
    .portrait-placeholder-text{font-family:'Cormorant Garamond',serif;font-size:0.85rem;letter-spacing:0.15em;color:rgba(255,255,255,0.7);text-transform:uppercase;}
    .portrait-corner{position:absolute;width:40px;height:40px;border-color:var(--gold);border-style:solid;}
    .portrait-corner.tl{top:-8px;left:-8px;border-width:2px 0 0 2px;}
    .portrait-corner.tr{top:-8px;right:-8px;border-width:2px 2px 0 0;}
    .portrait-corner.bl{bottom:-8px;left:-8px;border-width:0 0 2px 2px;}
    .portrait-corner.br{bottom:-8px;right:-8px;border-width:0 2px 2px 0;}
    .portrait-stat{position:absolute;background:var(--glass);backdrop-filter:blur(12px);border:1px solid var(--border);padding:12px 20px;}
    .portrait-stat-num{font-family:'Cormorant Garamond',serif;font-size:2rem;color:var(--gold);line-height:1;}
    .portrait-stat-label{font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);}
    .stat-years{bottom:-20px;left:-30px;}
    .stat-brands{top:10%;right:-35px;}

    /* SECTIONS */
    .section{padding:120px 8vw;}
    .section-alt{background:var(--bg2);}
    .section-header{margin-bottom:4rem;}
    .section-eyebrow{font-size:0.65rem;letter-spacing:0.38em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;display:flex;align-items:center;gap:10px;}
    .section-eyebrow::before{content:'';display:block;width:24px;height:1px;background:var(--accent);}
    .section-title{font-size:clamp(2.2rem,4.5vw,3.8rem);line-height:1.15;color:var(--fg);}
    .section-title em{font-style:italic;color:var(--gold);}
    .section-subtitle{font-size:1rem;color:var(--muted);line-height:1.7;max-width:520px;margin-top:1rem;}

    /* REVEAL */
    .reveal{opacity:0;transform:translateY(32px);transition:opacity 0.75s ease,transform 0.75s ease;}
    .reveal.visible{opacity:1;transform:translateY(0);}
    .reveal-delay-1{transition-delay:0.1s;}
    .reveal-delay-2{transition-delay:0.2s;}
    .reveal-delay-3{transition-delay:0.3s;}
    .reveal-delay-4{transition-delay:0.4s;}

    /* ABOUT */
    .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:5vw;align-items:center;}
    .about-text p{font-size:1.05rem;line-height:1.95;color:var(--fg2);margin-bottom:1.4rem;}
    .about-text p:last-child{margin-bottom:0;}
    .about-pull{font-family:'Cormorant Garamond',serif;font-size:clamp(1.4rem,2.5vw,1.9rem);line-height:1.5;font-style:italic;color:var(--fg);border-left:2px solid var(--gold);padding-left:28px;margin:2.5rem 0;}
    .about-values{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin-top:2rem;}
    .about-value{padding:18px 22px;border:1px solid var(--border);background:var(--glass);backdrop-filter:blur(8px);}
    .about-value-label{font-size:0.62rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--accent);margin-bottom:4px;}
    .about-value-text{font-size:0.88rem;color:var(--fg2);}
    .about-image-stack{position:relative;height:560px;}
    .about-img-main{position:absolute;left:0;top:0;width:78%;height:85%;overflow:hidden;}
    .about-img-main img{width:100%;height:100%;object-fit:cover;}
    .about-img-accent{position:absolute;right:0;bottom:0;width:52%;height:52%;overflow:hidden;}
    .about-img-accent img{width:100%;height:100%;object-fit:cover;}
    .about-img-fallback{width:100%;height:100%;background:linear-gradient(145deg,var(--beige),var(--sand));display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;}
    .about-img-fallback-dark{width:100%;height:100%;background:linear-gradient(145deg,var(--espresso),var(--black));display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;}
    .about-badge{position:absolute;left:-20px;bottom:30%;background:linear-gradient(135deg,var(--gold),var(--gold-dk));color:#fff;padding:20px 24px;font-family:'Cormorant Garamond',serif;z-index:2;box-shadow:0 12px 40px rgba(184,150,90,0.3);}
    .about-badge-num{font-size:2.4rem;line-height:1;}
    .about-badge-text{font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;opacity:0.85;}

    /* EXPERIENCE */
    .exp-container{display:flex;flex-direction:column;gap:3rem;}
    .exp-card{display:grid;grid-template-columns:auto 1fr;gap:0 3rem;position:relative;}
    .exp-timeline{display:flex;flex-direction:column;align-items:center;padding-top:6px;}
    .exp-dot{width:12px;height:12px;border-radius:50%;border:2px solid var(--gold);background:var(--bg);flex-shrink:0;transition:all 0.3s;}
    .exp-card:hover .exp-dot{background:var(--gold);}
    .exp-line{width:1px;flex:1;min-height:40px;background:linear-gradient(180deg,var(--gold) 0%,transparent 100%);margin-top:8px;}
    .exp-body{padding:0 0 3rem 0;border-bottom:1px solid var(--border);}
    .exp-card:last-child .exp-body{border-bottom:none;padding-bottom:0;}
    .exp-meta{display:flex;align-items:center;gap:12px;margin-bottom:0.75rem;}
    .exp-date{font-size:0.65rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--accent);background:rgba(184,150,90,0.1);padding:4px 12px;border:1px solid rgba(184,150,90,0.25);}
    .exp-type{font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);}
    .exp-role{font-size:clamp(1.4rem,2.5vw,2rem);color:var(--fg);margin-bottom:0.3rem;}
    .exp-company{font-size:0.8rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:1.5rem;}
    .exp-list{list-style:none;display:flex;flex-direction:column;gap:0.75rem;}
    .exp-list li{font-size:0.9rem;color:var(--fg2);padding-left:20px;position:relative;line-height:1.65;}
    .exp-list li::before{content:'—';position:absolute;left:0;color:var(--gold);}

    /* SKILLS */
    .skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.2rem;}
    .skill-card{padding:22px 24px;border:1px solid var(--border);background:var(--card);backdrop-filter:blur(8px);cursor:default;transition:all 0.35s;position:relative;overflow:hidden;}
    .skill-card::before{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--accent);transition:width 0.4s ease;}
    .skill-card:hover{transform:translateY(-4px);border-color:rgba(184,150,90,0.4);box-shadow:0 16px 40px rgba(0,0,0,0.07);}
    .skill-card:hover::before{width:100%;}
    .skill-icon{font-size:1.4rem;margin-bottom:10px;}
    .skill-name{font-size:0.78rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--fg);margin-bottom:6px;}
    .skill-desc{font-size:0.78rem;color:var(--muted);line-height:1.5;}

    /* PROJECTS GRID */
    .projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.8rem;}
    .project-card{background:var(--card);backdrop-filter:blur(10px);border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:all 0.4s;position:relative;}
    .project-card:hover{transform:translateY(-6px);border-color:rgba(184,150,90,0.45);box-shadow:0 24px 60px rgba(0,0,0,0.12);}
    .project-card:nth-child(1){grid-column:span 2;}
    .project-card:nth-child(4){grid-column:span 2;}
    .project-card:nth-child(7){grid-column:span 2;}
    .project-img-wrap{height:220px;position:relative;overflow:hidden;}
    .project-card:nth-child(1) .project-img-wrap,
    .project-card:nth-child(4) .project-img-wrap,
    .project-card:nth-child(7) .project-img-wrap{height:260px;}
    .project-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;}
    .project-card:hover .project-img-wrap img{transform:scale(1.04);}
    .project-img-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(26,21,16,0.55) 100%);}
    .project-content{padding:24px 26px;}
    .project-tag{font-size:0.6rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;}
    .project-title{font-size:1.2rem;color:var(--fg);margin-bottom:10px;line-height:1.3;}
    .project-desc{font-size:0.83rem;color:var(--muted);line-height:1.7;margin-bottom:16px;}
    .project-footer{display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid var(--border);}
    .project-tools{display:flex;gap:6px;flex-wrap:wrap;}
    .project-tool{font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;padding:3px 9px;border:1px solid var(--border);color:var(--muted);}
    .project-cta{font-size:0.68rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:6px;transition:gap 0.3s;}
    .project-card:hover .project-cta{gap:10px;}

    /* PROJECT MODAL */
    .modal-backdrop{position:fixed;inset:0;background:rgba(26,21,16,0.75);backdrop-filter:blur(8px);z-index:2000;display:flex;align-items:flex-start;justify-content:center;padding:40px 20px;overflow-y:auto;}
    .modal-backdrop.hidden{display:none;}
    .modal{background:var(--bg);border:1px solid var(--border);width:100%;max-width:860px;position:relative;animation:modalIn 0.4s ease forwards;}
    @keyframes modalIn{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
    .modal-close{position:absolute;top:20px;right:20px;width:40px;height:40px;border:1px solid var(--border);background:transparent;cursor:pointer;color:var(--fg);font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:all 0.3s;z-index:1;}
    .modal-close:hover{border-color:var(--accent);color:var(--accent);}
    .modal-hero-img{width:100%;height:320px;object-fit:cover;}
    .modal-hero-fallback{width:100%;height:320px;display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.5rem;letter-spacing:0.2em;color:rgba(255,255,255,0.5);}
    .modal-body{padding:44px 48px 52px;}
    .modal-tag{font-size:0.62rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;}
    .modal-title{font-size:clamp(1.8rem,3vw,2.6rem);line-height:1.2;color:var(--fg);margin-bottom:24px;}
    .modal-section-label{font-size:0.62rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;margin-top:28px;}
    .modal-overview{font-size:1rem;line-height:1.85;color:var(--fg2);}
    .modal-list{list-style:none;display:flex;flex-direction:column;gap:0.65rem;margin-top:4px;}
    .modal-list li{font-size:0.9rem;color:var(--fg2);padding-left:20px;position:relative;line-height:1.65;}
    .modal-list li::before{content:'—';position:absolute;left:0;color:var(--gold);}
    .modal-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;}
    .modal-chip{font-size:0.65rem;letter-spacing:0.14em;text-transform:uppercase;padding:5px 14px;border:1px solid var(--border);color:var(--fg2);}
    .modal-result{margin-top:28px;padding:20px 24px;background:rgba(184,150,90,0.08);border-left:3px solid var(--gold);}
    .modal-result-label{font-size:0.6rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;}
    .modal-result-text{font-size:0.95rem;color:var(--fg2);line-height:1.65;}
    .modal-gallery{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:28px;}
    .modal-gallery-img{width:100%;height:160px;object-fit:cover;}
    .modal-gallery-fallback{width:100%;height:160px;background:var(--bg2);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;}

    /* TESTIMONIALS */
    .testimonials-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.8rem;}
    .testimonial-card{padding:36px 32px;border:1px solid var(--border);background:var(--card);backdrop-filter:blur(8px);position:relative;overflow:hidden;transition:all 0.4s;}
    .testimonial-card::before{content:'"';position:absolute;top:-10px;left:20px;font-family:'Cormorant Garamond',serif;font-size:8rem;color:rgba(184,150,90,0.1);line-height:1;}
    .testimonial-card:hover{transform:translateY(-4px);border-color:rgba(184,150,90,0.35);box-shadow:0 20px 50px rgba(0,0,0,0.07);}
    .testimonial-text{font-size:1rem;line-height:1.8;color:var(--fg2);margin-bottom:2rem;font-style:italic;font-family:'Cormorant Garamond',serif;}
    .testimonial-author{display:flex;align-items:center;gap:14px;}
    .testimonial-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-dk));display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1rem;color:#fff;font-weight:600;flex-shrink:0;}
    .testimonial-name{font-size:0.85rem;font-weight:500;letter-spacing:0.08em;color:var(--fg);}
    .testimonial-role{font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);}
    .testimonial-stars{color:var(--gold);font-size:0.7rem;margin-top:2px;}

    /* CONTACT */
    .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:6vw;align-items:start;}
    .contact-info{display:flex;flex-direction:column;gap:2rem;}
    .contact-item{display:flex;align-items:flex-start;gap:16px;padding-bottom:2rem;border-bottom:1px solid var(--border);}
    .contact-item:last-of-type{border-bottom:none;padding-bottom:0;}
    .contact-item-icon{width:40px;height:40px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:1rem;flex-shrink:0;transition:all 0.3s;}
    .contact-item:hover .contact-item-icon{border-color:var(--gold);background:rgba(184,150,90,0.08);}
    .contact-item-label{font-size:0.62rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--muted);margin-bottom:4px;}
    .contact-item-val{font-size:0.93rem;color:var(--fg2);text-decoration:none;}
    .contact-item-val:hover{color:var(--accent);}
    .contact-availability{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border:1px solid rgba(120,180,100,0.4);background:rgba(120,180,100,0.07);}
    .avail-dot{width:7px;height:7px;border-radius:50%;background:#78B464;animation:pulse 2s infinite;}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.6;transform:scale(1.3);}}
    .avail-text{font-size:0.68rem;letter-spacing:0.18em;text-transform:uppercase;color:#78B464;}
    .contact-form{display:flex;flex-direction:column;gap:1.2rem;}
    .form-field{display:flex;flex-direction:column;gap:6px;}
    .form-label{font-size:0.62rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--muted);}
    .form-input,.form-textarea{background:transparent;border:1px solid var(--border);padding:12px 16px;color:var(--fg);font-family:'Jost',sans-serif;font-size:0.9rem;font-weight:300;outline:none;transition:border-color 0.3s;}
    .form-input:focus,.form-textarea:focus{border-color:var(--accent);}
    .form-textarea{min-height:130px;resize:vertical;}

    /* FOOTER */
    footer{padding:60px 8vw;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;}
    .footer-logo{font-family:'Cormorant Garamond',serif;font-size:1.3rem;letter-spacing:0.18em;color:var(--fg);cursor:pointer;}
    .footer-text{font-size:0.72rem;letter-spacing:0.12em;color:var(--muted);}
    .footer-links{display:flex;gap:2rem;}
    .footer-link{font-size:0.68rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted);text-decoration:none;cursor:pointer;transition:color 0.25s;}
    .footer-link:hover{color:var(--accent);}


    /* TOOLS TICKER STRIP */
    .tools-strip{background:var(--espresso);padding:14px 0;overflow:hidden;border-top:1px solid rgba(184,150,90,0.2);border-bottom:1px solid rgba(184,150,90,0.2);}
    .tools-strip-track{display:flex;gap:0;animation:ticker 28s linear infinite;width:max-content;}
    .tools-strip-track:hover{animation-play-state:paused;}
    .tools-strip-item{display:flex;align-items:center;gap:10px;padding:0 36px;white-space:nowrap;font-size:0.65rem;letter-spacing:0.28em;text-transform:uppercase;color:rgba(212,175,122,0.75);}
    .tools-strip-dot{width:3px;height:3px;border-radius:50%;background:var(--gold);opacity:0.5;}
    @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}

    /* CREATIVE TOOLS SECTION */
    .ct-intro{max-width:700px;margin-bottom:4rem;}
    .ct-intro-text{font-size:1.05rem;line-height:1.95;color:var(--fg2);}
    .ct-intro-text em{font-style:italic;color:var(--fg);font-family:'Cormorant Garamond',serif;}
    .ct-tools-badges{display:flex;flex-wrap:wrap;gap:10px;margin-top:2rem;}
    .ct-badge{display:flex;align-items:center;gap:8px;padding:7px 18px;border:1px solid var(--border);background:var(--glass);backdrop-filter:blur(8px);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--fg2);transition:all 0.3s;cursor:default;}
    .ct-badge:hover{border-color:var(--accent);color:var(--accent);}
    .ct-badge-dot{width:5px;height:5px;border-radius:50%;background:var(--accent);}
    .ct-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem;}
    .ct-card{background:var(--card);border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:all 0.4s;position:relative;display:flex;flex-direction:column;}
    .ct-card:hover{transform:translateY(-6px);border-color:rgba(184,150,90,0.5);box-shadow:0 28px 70px rgba(0,0,0,0.13);}
    .ct-card:nth-child(1){grid-column:span 2;}
    .ct-card:nth-child(5){grid-column:span 2;}
    .ct-card-visual{height:200px;position:relative;overflow:hidden;flex-shrink:0;}
    .ct-card:nth-child(1) .ct-card-visual,.ct-card:nth-child(5) .ct-card-visual{height:240px;}
    .ct-card-visual img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s ease;}
    .ct-card:hover .ct-card-visual img{transform:scale(1.05);}
    .ct-card-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(26,21,16,0.6) 100%);}
    .ct-card-tool-badge{position:absolute;top:14px;right:14px;background:rgba(26,21,16,0.75);backdrop-filter:blur(8px);border:1px solid rgba(184,150,90,0.3);padding:4px 12px;font-size:0.58rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold-lt);}
    .ct-card-body{padding:22px 24px;flex:1;display:flex;flex-direction:column;}
    .ct-card-tag{font-size:0.58rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--accent);margin-bottom:8px;}
    .ct-card-title{font-family:'Cormorant Garamond',serif;font-size:1.15rem;color:var(--fg);line-height:1.3;margin-bottom:10px;}
    .ct-card-desc{font-size:0.8rem;color:var(--muted);line-height:1.65;flex:1;}
    .ct-card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:18px;padding-top:16px;border-top:1px solid var(--border);}
    .ct-card-chips{display:flex;gap:5px;flex-wrap:wrap;}
    .ct-card-chip{font-size:0.55rem;letter-spacing:0.12em;text-transform:uppercase;padding:2px 8px;border:1px solid var(--border);color:var(--muted);}
    .ct-card-cta{font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);transition:gap 0.3s;display:flex;align-items:center;gap:5px;white-space:nowrap;}
    .ct-card:hover .ct-card-cta{gap:9px;}
    .ct-modal-backdrop{position:fixed;inset:0;background:rgba(26,21,16,0.82);backdrop-filter:blur(10px);z-index:2000;display:flex;align-items:flex-start;justify-content:center;padding:40px 20px;overflow-y:auto;}
    .ct-modal-backdrop.hidden{display:none;}
    .ct-modal{background:var(--bg);border:1px solid var(--border);width:100%;max-width:900px;position:relative;animation:modalIn 0.4s ease forwards;}
    .ct-modal-hero{position:relative;}
    .ct-modal-hero-img{width:100%;height:360px;object-fit:cover;}
    .ct-modal-hero-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,var(--bg) 100%);}
    .ct-modal-hero-title{position:absolute;bottom:28px;left:40px;right:40px;}
    .ct-modal-hero-tag{font-size:0.62rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold-lt);margin-bottom:10px;}
    .ct-modal-hero-h{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,3vw,2.8rem);color:#F0EAE0;line-height:1.15;}
    .ct-modal-close{position:absolute;top:16px;right:16px;width:40px;height:40px;border:1px solid rgba(255,255,255,0.2);background:rgba(26,21,16,0.6);backdrop-filter:blur(8px);cursor:pointer;color:#F0EAE0;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:all 0.3s;z-index:1;}
    .ct-modal-close:hover{border-color:var(--gold);color:var(--gold);}
    .ct-modal-body{padding:40px 48px 52px;display:grid;grid-template-columns:1fr 1fr;gap:3rem;}
    .ct-modal-label{font-size:0.6rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;margin-top:28px;}
    .ct-modal-label:first-child{margin-top:0;}
    .ct-modal-overview{font-size:0.97rem;line-height:1.85;color:var(--fg2);}
    .ct-modal-list{list-style:none;display:flex;flex-direction:column;gap:0.6rem;}
    .ct-modal-list li{font-size:0.88rem;color:var(--fg2);padding-left:20px;position:relative;line-height:1.65;}
    .ct-modal-list li::before{content:'—';position:absolute;left:0;color:var(--gold);}
    .ct-modal-chips{display:flex;flex-wrap:wrap;gap:8px;}
    .ct-modal-chip{font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;padding:5px 14px;border:1px solid var(--border);color:var(--fg2);}
    .ct-modal-result{padding:20px 24px;background:rgba(184,150,90,0.07);border-left:3px solid var(--gold);margin-top:28px;}
    .ct-modal-result-label{font-size:0.58rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;}
    .ct-modal-result-text{font-size:0.92rem;color:var(--fg2);line-height:1.65;}
    .ct-modal-visual-stack{display:flex;flex-direction:column;gap:12px;}
    .ct-modal-visual-img{width:100%;height:180px;object-fit:cover;}
    .ct-modal-visual-fallback{width:100%;height:180px;background:var(--bg2);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;}
    .ct-modal-workflow-steps{display:flex;flex-direction:column;gap:10px;margin-top:10px;}
    .ct-modal-workflow-step{display:flex;align-items:center;gap:12px;padding:10px 14px;border:1px solid var(--border);background:var(--glass);}
    .ct-modal-step-num{font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--gold);min-width:24px;}
    .ct-modal-step-text{font-size:0.8rem;color:var(--fg2);}
    .process-section{padding:120px 8vw;background:var(--espresso);position:relative;overflow:hidden;}
    .process-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(184,150,90,0.07) 0%,transparent 70%);}
    .process-section .section-eyebrow{color:rgba(212,175,122,0.8);}
    .process-section .section-title{color:#F0EAE0;}
    .process-section .section-title em{color:var(--gold-lt);}
    .process-section .section-eyebrow::before{background:rgba(212,175,122,0.8);}
    .process-timeline{display:flex;gap:0;margin-top:4rem;position:relative;z-index:1;}
    .process-timeline::before{content:'';position:absolute;top:36px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(184,150,90,0.4),rgba(184,150,90,0.4),transparent);}
    .process-step{flex:1;display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;padding:0 12px;}
    .process-step-num{width:72px;height:72px;border-radius:50%;border:1px solid rgba(184,150,90,0.35);background:rgba(184,150,90,0.07);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:var(--gold-lt);margin-bottom:1.4rem;position:relative;z-index:1;transition:all 0.5s;cursor:default;}
    .process-step:hover .process-step-num{background:rgba(184,150,90,0.18);border-color:rgba(184,150,90,0.7);transform:scale(1.08);}
    .process-step-icon{font-size:1.1rem;margin-bottom:1rem;opacity:0.8;}
    .process-step-title{font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:#F0EAE0;margin-bottom:8px;letter-spacing:0.05em;}
    .process-step-desc{font-size:0.75rem;line-height:1.65;color:rgba(212,175,122,0.6);letter-spacing:0.03em;}

    /* MOBILE */
    @media(max-width:900px){
      .hero{grid-template-columns:1fr;padding-top:100px;gap:3rem;}
      .hero-portrait-wrap{order:-1;}
      .hero-portrait-frame{width:280px;}
      .stat-brands{right:-10px;}
      .stat-years{left:-10px;}
      .about-grid,.contact-grid,.testimonials-grid{grid-template-columns:1fr;}
      .projects-grid{grid-template-columns:1fr;}
      .project-card:nth-child(1),.project-card:nth-child(4),.project-card:nth-child(7){grid-column:span 1;}
      .nav-links{display:none;}
      .about-image-stack{height:360px;}
      .modal-body{padding:28px 24px 36px;}
      .modal-gallery{grid-template-columns:1fr;}
      .ct-grid{grid-template-columns:1fr 1fr;}
      .ct-card:nth-child(1),.ct-card:nth-child(5){grid-column:span 2;}
      .ct-modal-body{grid-template-columns:1fr;padding:28px 24px 36px;}
      .process-timeline{flex-direction:column;gap:2rem;}
      .process-timeline::before{display:none;}
    }
    @media(max-width:600px){
      .section{padding:80px 6vw;}
      .about-values{grid-template-columns:1fr;}
      .skills-grid{grid-template-columns:1fr 1fr;}
      .ct-grid{grid-template-columns:1fr;}
      .ct-card:nth-child(1),.ct-card:nth-child(5){grid-column:span 1;}
    }
  `}</style>
);

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── Unsplash image IDs keyed by usage ────────────────────────────────────────
const IMG = {
  portrait:   "https://plain-apac-prod-public.komododecks.com/202605/25/fx4oewZk9jEzqmjm42mj/image.jpg",
  aboutMain:  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&fit=crop",
  aboutAccent:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop",
  p1hero:     "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&fit=crop",
  p1a:        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&fit=crop",
  p1b:        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80&fit=crop",
  p2hero:     "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80&fit=crop",
  p2a:        "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&q=80&fit=crop",
  p2b:        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80&fit=crop",
  p3hero:     "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80&fit=crop",
  p3a:        "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=600&q=80&fit=crop",
  p3b:        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&q=80&fit=crop",
  p4hero:     "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=80&fit=crop",
  p4a:        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80&fit=crop",
  p4b:        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop",
  p5hero:     "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80&fit=crop",
  p5a:        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80&fit=crop",
  p5b:        "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=600&q=80&fit=crop",
  p6hero:     "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=900&q=80&fit=crop",
  p6a:        "https://images.unsplash.com/photo-1434030216411-0b793f4b6f74?w=600&q=80&fit=crop",
  p6b:        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80&fit=crop",
  p7hero:     "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=80&fit=crop",
  p7a:        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80&fit=crop",
  p7b:        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80&fit=crop",
  p8hero:     "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=900&q=80&fit=crop",
  p8a:        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80&fit=crop",
  p8b:        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop",
  p9hero:     "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&fit=crop",
  p9a:        "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&q=80&fit=crop",
  p9b:        "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&q=80&fit=crop",
};

const skills = [
  { icon:"🎨", name:"Canva", desc:"Primary visual design tool — brand templates, content systems, and client-facing documents" },
  { icon:"✦", name:"Adobe Express", desc:"Rapid visual asset creation for press kits, campaigns, and brand communications" },
  { icon:"◻", name:"Figma", desc:"Collaborative design and moodboarding for creative direction and campaign planning" },
  { icon:"📱", name:"Social Media", desc:"Content coordination across fashion, beauty, and lifestyle platforms" },
  { icon:"📣", name:"PR Support", desc:"Press coordination, media kit production, and brand communication" },
  { icon:"⚙️", name:"Creative Ops", desc:"Workflow architecture, process design, and operational delivery management" },
  { icon:"🗂️", name:"Notion & Airtable", desc:"Project management hubs, client portals, and relational campaign tracking" },
  { icon:"🗓️", name:"Trello & Later", desc:"Content scheduling, editorial calendars, and publishing coordination" },
  { icon:"🎬", name:"CapCut", desc:"Story and reel template creation for vertical social content strategies" },
  { icon:"💾", name:"Google Workspace", desc:"Collaborative documentation, asset organisation, and team coordination" },
  { icon:"✨", name:"Brand Support", desc:"Visual and tonal consistency across every client touchpoint" },
  { icon:"🌐", name:"Remote Collab", desc:"Seamless async collaboration across time zones and creative teams" },
];

const projects = [
  {
    tag:"Luxury Operations",
    title:"Luxury Beauty Brand Workflow System",
    desc:"End-to-end operations framework from asset intake to delivery — reducing turnaround time by 40%.",
    tools:["Notion","Canva","Airtable"],
    heroImg: IMG.p1hero,
    galleryImgs: [IMG.p1a, IMG.p1b],
    overview:"Designed and implemented a comprehensive workflow system for a high-end beauty brand. The system covered every stage of the creative production cycle — from initial client brief and asset intake, through internal review stages, to final delivery and archiving. The goal was to bring structure to a previously ad-hoc process while maintaining the brand's premium feel.",
    responsibilities:[
      "Mapped and documented the existing workflow to identify bottlenecks and gaps",
      "Built a centralised Notion workspace with linked databases for clients, projects, and assets",
      "Created standardised brief templates and asset naming conventions",
      "Designed Airtable trackers for delivery timelines and approval stages",
      "Trained the team on the new system and iterated based on feedback",
      "Maintained Canva brand kit with all approved visual assets",
    ],
    result:"Reduced average project turnaround time by 40%. Client satisfaction scores improved, and the brand reported zero missed deadlines in the quarter following implementation.",
  },
  {
    tag:"Client Experience",
    title:"Fashion Client Onboarding Dashboard",
    desc:"Polished digital onboarding portal consolidating briefs, contracts, and brand assets in one place.",
    tools:["Canva","Google Drive","Notion"],
    heroImg: IMG.p2hero,
    galleryImgs: [IMG.p2a, IMG.p2b],
    overview:"Created a seamless digital onboarding experience for new fashion clients. Previously, onboarding involved scattered emails and manual file sharing. This dashboard brought everything into one elegant, branded portal that reflected the team's luxury positioning from the first touchpoint.",
    responsibilities:[
      "Interviewed existing clients to understand pain points in the onboarding process",
      "Designed a multi-page Notion client portal with brand-consistent styling",
      "Created a welcome Canva deck outlining the process, team contacts, and expectations",
      "Set up automated Google Drive folder structures triggered on new client setup",
      "Drafted onboarding email copy and a FAQ reference document",
      "Managed rollout and collected feedback from the first five client cohorts",
    ],
    result:"New client onboarding time cut from 3 days to under 4 hours. Clients consistently cited the onboarding experience as a reason for referrals.",
  },
  {
    tag:"Content Systems",
    title:"Canva Social Media Content Library",
    desc:"Systematized template library of 80+ branded assets for rapid on-brand social content creation.",
    tools:["Canva","Trello","Google Sheets"],
    heroImg: IMG.p3hero,
    galleryImgs: [IMG.p3a, IMG.p3b],
    overview:"Built a comprehensive, organised Canva brand kit and template library for a fashion client's social media team. The library enabled any team member to produce on-brand content independently, without needing to brief a designer for every post.",
    responsibilities:[
      "Audited existing social content to extract core visual patterns and brand rules",
      "Created 80+ Canva templates across Instagram feed, stories, reels covers, and carousels",
      "Established a folder and naming system within Canva for easy navigation",
      "Documented brand guidelines in a companion Google Sheet with do's and don'ts",
      "Built a Trello content request board for team submissions",
      "Ran a training session for the social media team on template usage",
    ],
    result:"Social team's content production time reduced by 65%. Brand consistency audit scores went from 72% to 96% over two months.",
  },
  {
    tag:"PR Management",
    title:"PR Coordination & Outreach Tracker",
    desc:"Comprehensive PR tracker spanning influencer outreach, press contacts, gifting logistics, and campaign metrics.",
    tools:["Airtable","Notion","Gmail"],
    heroImg: IMG.p4hero,
    galleryImgs: [IMG.p4a, IMG.p4b],
    overview:"Developed the team's single source of truth for all PR activity. Prior to this system, outreach was tracked across multiple spreadsheets, leading to duplicate contacts, missed follow-ups, and unclear campaign ROI. This Airtable-based solution unified everything.",
    responsibilities:[
      "Consolidated fragmented spreadsheets into one Airtable base with linked tables",
      "Built views for press contacts, influencer tiers, gifting status, and campaign deadlines",
      "Created email templates and a follow-up sequence tracker in Notion",
      "Set up automated status reminders using Airtable automations",
      "Maintained a live metrics dashboard showing outreach conversion rates",
      "Coordinated gifting logistics including address collection and shipping tracking",
    ],
    result:"PR team eliminated duplicate outreach entirely. Campaign reporting time dropped from 6 hours to under 45 minutes per report cycle.",
  },
  {
    tag:"Influencer Ops",
    title:"Influencer Campaign Organisation System",
    desc:"Structured campaign management system handling deliverables, deadlines, and briefs for 30+ influencer partnerships.",
    tools:["Notion","Canva","Google Sheets"],
    heroImg: IMG.p5hero,
    galleryImgs: [IMG.p5a, IMG.p5b],
    overview:"Managed the operational backbone of a multi-brand influencer programme running 30+ active partnerships per season. This system tracked every aspect of the influencer relationship from brief to content approval to payment, ensuring nothing slipped through the cracks.",
    responsibilities:[
      "Designed an influencer database in Notion with tier classification and contact details",
      "Created standardised brief templates in Canva for each content format",
      "Built a deliverables tracker in Google Sheets with automated status colour coding",
      "Maintained a content approval workflow with clear revision round limits",
      "Coordinated payment schedules and tracked invoices against campaign budgets",
      "Compiled end-of-campaign performance reports for brand sign-off",
    ],
    result:"Zero missed deliverables across a 3-month campaign season. Payment disputes reduced by 80% following introduction of the invoice tracker.",
  },
  {
    tag:"Brand Scheduling",
    title:"Editorial Brand Scheduling Workflow",
    desc:"Forward-planning editorial calendar integrating content pillars, shoot dates, and approval gates.",
    tools:["Trello","Canva","Asana"],
    heroImg: IMG.p6hero,
    galleryImgs: [IMG.p6a, IMG.p6b],
    overview:"Designed a quarterly editorial planning workflow for a lifestyle brand that was previously operating month-to-month with last-minute scrambles. The new system introduced a 12-week planning horizon with built-in approval gates and shoot scheduling.",
    responsibilities:[
      "Workshopped content pillars and seasonal themes with the creative director",
      "Built a Trello editorial calendar with swimlanes for each content category",
      "Created Canva planning templates for content briefs and mood boards",
      "Established approval gate checkpoints with clear owners and turnaround SLAs",
      "Integrated shoot dates, post-production timelines, and publishing windows",
      "Ran weekly editorial stand-ups using the Asana project as a live agenda",
    ],
    result:"Brand moved from reactive to proactive content planning. On-time publishing rate improved from 58% to 94% within the first quarter of the new system.",
  },
  {
    tag:"Social Media",
    title:"Cross-Platform Social Media Alignment System",
    desc:"Unified framework ensuring consistent tone, visuals, and messaging across Instagram, Pinterest, and LinkedIn.",
    tools:["Canva","Notion","Meta Suite"],
    heroImg: IMG.p7hero,
    galleryImgs: [IMG.p7a, IMG.p7b],
    overview:"Built a cross-platform alignment system for a multi-brand fashion client running active presences on Instagram, Pinterest, and LinkedIn. Each platform previously operated in isolation with inconsistent visual treatments and messaging. This system brought all three into coherent alignment.",
    responsibilities:[
      "Audited all three platforms against brand guidelines and documented inconsistencies",
      "Created platform-specific Canva template sets adapted from the master brand kit",
      "Wrote platform-specific tone of voice guidelines for each channel",
      "Built a Notion alignment hub where all platform content was reviewed side-by-side before publishing",
      "Set up a Meta Suite content calendar linking Instagram and Facebook scheduling",
      "Created a monthly cross-platform audit checklist for ongoing maintenance",
    ],
    result:"Off-brand content incidents dropped to zero within 6 weeks. Brand recognition survey scores increased by 22% among the target demographic.",
  },
  {
    tag:"Brand Voice",
    title:"Brand Voice & Visual Identity Guide",
    desc:"Living brand guide covering tone of voice, visual rules, and caption frameworks used as daily team reference.",
    tools:["Canva","Google Docs","Notion"],
    heroImg: IMG.p8hero,
    galleryImgs: [IMG.p8a, IMG.p8b],
    overview:"Compiled and maintained a comprehensive, living brand guide for a fashion and lifestyle client. The guide served as the team's daily reference document — covering everything from approved colour hex codes and typography rules to caption writing frameworks and hashtag strategy.",
    responsibilities:[
      "Interviewed stakeholders to extract and codify existing brand knowledge",
      "Designed the guide as a 40-page Canva document with visual examples throughout",
      "Wrote tone of voice guidelines with before/after caption rewrites for clarity",
      "Built a Notion version for easy daily reference with searchable sections",
      "Created a quick-reference one-pager for the social team's desktop",
      "Established a quarterly review cycle to keep the guide current",
    ],
    result:"Onboarding time for new team members reduced by 50%. Post-launch, the client noted a marked improvement in content quality from freelance contributors.",
  },
  {
    tag:"Content Audit",
    title:"Monthly Content Calendar Audit & Review",
    desc:"Recurring audit process reviewing scheduled content against brand benchmarks — reducing errors by 60%.",
    tools:["Google Sheets","Trello","Canva"],
    heroImg: IMG.p9hero,
    galleryImgs: [IMG.p9a, IMG.p9b],
    overview:"Established a formal monthly audit process for a fashion brand's content calendar. Before this system, errors — wrong hashtags, off-brand visuals, incorrect links — were only caught after publishing. The audit introduced a structured pre-publishing review layer.",
    responsibilities:[
      "Designed a 35-point content audit checklist in Google Sheets covering visual, copy, and technical elements",
      "Created a Trello workflow where each post moved through Draft → Audit → Approved → Scheduled",
      "Produced Canva audit report templates for monthly brand reviews",
      "Ran weekly pre-publishing spot checks as the final quality gate",
      "Documented recurring errors and worked with the content team to address root causes",
      "Presented monthly audit findings to the brand lead with actionable recommendations",
    ],
    result:"Content errors reduced by over 60% within two months. The audit process was later adopted by two additional brands in the client's portfolio.",
  },
];

const testimonials = [
  {
    text:"Simran has an extraordinary ability to bring calm and precision to even the most hectic production weeks. Her systems thinking transformed how our creative team operates — I can't imagine running a campaign without her.",
    name:"Aanya Mehta", role:"Creative Director, Fashion House", initials:"AM"
  },
  {
    text:"Working with Simran was a breath of fresh air. She understood the brand intuitively and her digital organisation skills meant our team always had what we needed, exactly when we needed it.",
    name:"Ritu Sharma", role:"PR Manager, Luxury Lifestyle Brand", initials:"RS"
  },
  {
    text:"Simran's eye for detail and her ability to maintain brand consistency across every touchpoint is remarkable. She elevated our social media workflow and brought a genuine aesthetic sensibility to everything she touched.",
    name:"Pooja Nair", role:"Head of Social, Beauty Brand", initials:"PN"
  },
  {
    text:"Simran is the kind of professional who makes the whole team better. Her remote collaboration skills are flawless, her communication is polished, and her work carries a level of care that is rare.",
    name:"Ishaan Kapoor", role:"Operations Lead, Creative Agency", initials:"IK"
  },
];


// ── Creative Tools Portfolio Data ────────────────────────────────────────────
const ctProjects = [
  {
    tag: "Visual Identity",
    title: "Luxury Beauty Brand Instagram Templates",
    primaryTool: "Canva",
    desc: "A cohesive suite of 40+ branded Instagram templates delivering visual consistency across feed, stories, and reels for a premium beauty client.",
    tools: ["Canva", "Adobe Express", "Google Drive"],
    heroImg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&fit=crop",
    galleryImg: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80&fit=crop",
    overview: "Developed a comprehensive template library for a luxury beauty brand requiring absolute visual discipline across every social touchpoint. The system was built to be operated independently by any team member without compromising brand integrity.",
    direction: "Editorial minimalism — generous white space, refined serif typography, and a palette drawn directly from the product line. Each template category carries a distinct grid logic while remaining unmistakably the same brand.",
    workflow: ["Brand audit and visual benchmark", "Template architecture across 6 content categories", "Master style guide for internal team use", "Approval workflow integrated into Google Drive"],
    consistency: "Colour hex codes, font pairings, and spacing rules embedded directly in every template. Zero guesswork for the production team.",
    result: "Brand consistency audit score rose from 71% to 97%. Social team's weekly content production time reduced by 60%.",
  },
  {
    tag: "Campaign Creative",
    title: "Fashion Campaign Moodboard System",
    primaryTool: "Figma",
    desc: "Structured moodboarding process used across seasonal campaign planning — translating creative direction into actionable visual briefs.",
    tools: ["Figma", "Notion", "Google Slides"],
    heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop",
    galleryImg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80&fit=crop",
    overview: "Created a replicable moodboarding framework for a fashion client's quarterly campaigns. Each board served as the creative north star — aligning stylists, photographers, and social teams before a single shot was taken.",
    direction: "Figma's collaborative canvas used as a live creative hub. Reference imagery, colour palettes, typography treatments, and prop direction all housed in one shareable document updated in real time.",
    workflow: ["Creative brief intake and stakeholder interviews", "Visual research and reference curation", "Figma moodboard build with annotated creative rationale", "Presentation deck export for client sign-off"],
    consistency: "All campaign assets traced back to the approved moodboard. Deviations flagged and resolved before production, not after.",
    result: "Creative alignment achieved before shoot day across all three seasonal campaigns. Post-shoot reshoots reduced to zero.",
  },
  {
    tag: "Brand Communication",
    title: "PR Media Kit Design",
    primaryTool: "Adobe Express",
    desc: "Polished, press-ready media kit built for a lifestyle brand's seasonal launch — covering brand story, product highlights, and press imagery.",
    tools: ["Adobe Express", "Canva", "Google Docs"],
    heroImg: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80&fit=crop",
    galleryImg: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80&fit=crop",
    overview: "Designed a premium, multi-page digital media kit for a lifestyle brand preparing for a major seasonal launch. The kit needed to impress editors and journalists at first glance while communicating the brand's story with editorial clarity.",
    direction: "Clean, magazine-quality layouts. Typography-led hierarchy with strategic use of product imagery. Built in Adobe Express for rapid iteration and seamless PDF export.",
    workflow: ["Content gathering and brand narrative development", "Layout design across 12 pages", "Press imagery curation and formatting", "PDF optimisation for email distribution"],
    consistency: "Brand voice and visual language consistent across every page. Approved by brand director with zero revision rounds.",
    result: "Media kit secured coverage in 4 regional publications within the first month of distribution.",
  },
  {
    tag: "Operations",
    title: "Influencer Campaign Tracker",
    primaryTool: "Airtable",
    desc: "End-to-end influencer operations system tracking 30+ partnerships from brief to delivery — eliminating missed deadlines and payment disputes.",
    tools: ["Airtable", "Notion", "Google Sheets"],
    heroImg: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=80&fit=crop",
    galleryImg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80&fit=crop",
    overview: "Built the operational backbone of a multi-brand influencer programme handling 30+ active partnerships per season. Every stage — from initial outreach and brief delivery through content approval, posting, and payment — tracked in a single Airtable base.",
    direction: "Airtable chosen for its relational database capability. Linked views for influencer profiles, campaign deadlines, deliverable status, and invoice tracking. Notion used for brief storage and creative guidelines.",
    workflow: ["Influencer database architecture with tier classification", "Deliverables tracker with automated status logic", "Content approval workflow with revision round limits", "Invoice and payment schedule management"],
    consistency: "Every influencer relationship governed by the same process. No exceptions, no gaps.",
    result: "Zero missed deliverables across a full 3-month campaign season. Payment disputes reduced by 80%.",
  },
  {
    tag: "Planning Systems",
    title: "Editorial Content Calendar",
    primaryTool: "Notion",
    desc: "12-week forward-planning editorial calendar with content pillars, shoot dates, and approval gates — moving the brand from reactive to proactive.",
    tools: ["Notion", "Trello", "Google Calendar"],
    heroImg: "https://images.unsplash.com/photo-1434030216411-0b793f4b6f74?w=900&q=80&fit=crop",
    galleryImg: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80&fit=crop",
    overview: "Designed a quarterly editorial planning workflow for a lifestyle brand operating month-to-month with last-minute content scrambles. The system introduced a 12-week planning horizon, structured approval gates, and a single source of truth for all content decisions.",
    direction: "Notion as the master planning hub with filtered views by content pillar, publishing date, and team owner. Trello for production tracking. Google Calendar for shoot scheduling and external team visibility.",
    workflow: ["Content pillar and seasonal theme workshop", "Notion editorial calendar build with swimlane views", "Approval gate design with owner accountability", "Weekly editorial stand-up cadence"],
    consistency: "All content reviewed against brand pillars before entering production. No reactive briefs.",
    result: "On-time publishing rate improved from 58% to 94% within the first quarter of the new system.",
  },
  {
    tag: "Brand Systems",
    title: "Brand Identity Guidelines",
    primaryTool: "Canva",
    desc: "Living 40-page brand guide covering tone of voice, visual rules, and caption frameworks — the team's daily creative reference.",
    tools: ["Canva", "Notion", "Google Docs"],
    heroImg: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=900&q=80&fit=crop",
    galleryImg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80&fit=crop",
    overview: "Compiled and maintained a comprehensive, living brand guide for a fashion and lifestyle client. The guide served as the definitive creative reference — covering hex codes, typography, caption writing frameworks, hashtag strategy, and visual do's and don'ts.",
    direction: "Designed as a 40-page Canva document with visual examples on every spread. A Notion version built in parallel for searchable daily reference. Quick-reference one-pager created for the social team's desktop.",
    workflow: ["Stakeholder interviews to extract existing brand knowledge", "Canva guide design with visual before/after examples", "Notion searchable reference build", "Quarterly review cycle established for ongoing currency"],
    consistency: "Every creative decision traceable to a page in the guide. Freelancers onboarded from day one using the same document.",
    result: "New team member onboarding time reduced by 50%. Marked improvement in content quality from freelance contributors noted by the client.",
  },
  {
    tag: "Client Experience",
    title: "Client Welcome Deck",
    primaryTool: "Canva",
    desc: "Polished, branded onboarding deck consolidating process overview, team contacts, expectations, and next steps in one elegant document.",
    tools: ["Canva", "Google Drive", "Notion"],
    heroImg: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80&fit=crop",
    galleryImg: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&q=80&fit=crop",
    overview: "Created a premium digital onboarding experience for new fashion clients. Previously, onboarding involved fragmented emails and manual file sharing. The welcome deck brought everything into one elegantly branded document that communicated luxury from the first interaction.",
    direction: "Multi-page Canva deck with brand-consistent styling, bespoke iconography, and a clear information hierarchy. Accompanied by a structured Google Drive folder and a Notion client portal for ongoing reference.",
    workflow: ["Client pain point research across existing accounts", "Welcome deck design across 10 pages", "Google Drive folder architecture setup", "Onboarding email sequence and FAQ document drafting"],
    consistency: "Every new client receives the identical, polished experience. No improvisation.",
    result: "New client onboarding time cut from 3 days to under 4 hours. Clients cited the onboarding experience as a primary reason for referrals.",
  },
  {
    tag: "Social Media",
    title: "Social Media Story Templates",
    primaryTool: "CapCut",
    desc: "Dynamic story and reel template system combining motion graphics with brand visual language for a fashion client's vertical content strategy.",
    tools: ["CapCut", "Canva", "Later"],
    heroImg: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=80&fit=crop",
    galleryImg: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80&fit=crop",
    overview: "Developed a library of animated story and reel templates for a fashion brand's vertical social strategy. The system combined motion graphics in CapCut with static design elements from the master Canva brand kit — creating a unified visual language across still and moving content.",
    direction: "CapCut for motion template creation and reel editing. Canva for static story frames and text overlays. Later for scheduling and cross-platform preview before publishing.",
    workflow: ["Audit of existing story and reel performance", "Template architecture across 5 content formats", "CapCut motion template build with brand colour grading", "Later scheduling workflow and team handover documentation"],
    consistency: "Motion and static content share identical colour grading, font treatments, and layout logic.",
    result: "Story engagement rate increased by 38% in the first month. Reel production time reduced by half through template reuse.",
  },
];

const processSteps = [
  { num:"01", icon:"🔍", title:"Research", desc:"Deep-dive into brand world, audience, and competitive landscape to establish creative context." },
  { num:"02", icon:"🖼", title:"Moodboarding", desc:"Visual direction translated into curated references — colour, texture, typography, and mood." },
  { num:"03", icon:"🗂", title:"Organisation", desc:"All assets, briefs, and timelines structured into airtight systems before a single design is created." },
  { num:"04", icon:"✦", title:"Design", desc:"Execution with precision — every element purposeful, every template built for team usability." },
  { num:"05", icon:"◎", title:"Review", desc:"Rigorous quality gates against brand standards before anything reaches the client or publishing queue." },
  { num:"06", icon:"✉", title:"Delivery", desc:"Clean, organised handover with documentation — so the team can operate the system independently." },
];

const toolBadges = [
  "Canva", "Adobe Express", "Figma", "Notion", "Airtable", "Trello", "Google Workspace", "CapCut", "Later", "Meta Suite",
];

// ── Creative Tools Modal ──────────────────────────────────────────────────────
function CreativeModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="ct-modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ct-modal">
        <button className="ct-modal-close" onClick={onClose}>✕</button>
        <div className="ct-modal-hero">
          <img src={project.heroImg} alt={project.title} className="ct-modal-hero-img"
            onError={e => { e.target.style.display="none"; }} />
          <div className="ct-modal-hero-overlay" />
          <div className="ct-modal-hero-title">
            <p className="ct-modal-hero-tag">{project.tag}</p>
            <h2 className="ct-modal-hero-h">{project.title}</h2>
          </div>
        </div>
        <div className="ct-modal-body">
          <div>
            <p className="ct-modal-label">Overview</p>
            <p className="ct-modal-overview">{project.overview}</p>

            <p className="ct-modal-label">Creative Direction</p>
            <p className="ct-modal-overview">{project.direction}</p>

            <p className="ct-modal-label">Tools Used</p>
            <div className="ct-modal-chips">
              {project.tools.map(t => <span className="ct-modal-chip" key={t}>{t}</span>)}
            </div>

            <div className="ct-modal-result">
              <div className="ct-modal-result-label">Result Achieved</div>
              <div className="ct-modal-result-text">{project.result}</div>
            </div>
          </div>
          <div>
            <div className="ct-modal-visual-stack">
              <img src={project.galleryImg} alt={project.title} className="ct-modal-visual-img"
                onError={e => { e.target.style.display="none"; }} />
              <img src={project.heroImg} alt={project.title} className="ct-modal-visual-img"
                style={{filter:"saturate(0.7) brightness(0.9)"}}
                onError={e => { e.target.style.display="none"; }} />
            </div>

            <p className="ct-modal-label" style={{marginTop:"24px"}}>Workflow Process</p>
            <div className="ct-modal-workflow-steps">
              {project.workflow.map((step, i) => (
                <div className="ct-modal-workflow-step" key={i}>
                  <span className="ct-modal-step-num">{String(i+1).padStart(2,"0")}</span>
                  <span className="ct-modal-step-text">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Project Modal ─────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <img src={project.heroImg} alt={project.title} className="modal-hero-img"
          onError={e => { e.target.style.display="none"; }} />
        <div className="modal-body">
          <p className="modal-tag">{project.tag}</p>
          <h2 className="modal-title">{project.title}</h2>

          <p className="modal-section-label">Overview</p>
          <p className="modal-overview">{project.overview}</p>

          <p className="modal-section-label">Responsibilities</p>
          <ul className="modal-list">
            {project.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
          </ul>

          <p className="modal-section-label">Tools Used</p>
          <div className="modal-chips">
            {project.tools.map(t => <span className="modal-chip" key={t}>{t}</span>)}
          </div>

          <div className="modal-result">
            <div className="modal-result-label">Result Achieved</div>
            <div className="modal-result-text">{project.result}</div>
          </div>

          <p className="modal-section-label">Project Imagery</p>
          <div className="modal-gallery">
            {project.galleryImgs.map((src, i) => (
              <img key={i} src={src} alt={`${project.title} ${i+1}`} className="modal-gallery-img"
                onError={e => { e.target.replaceWith(Object.assign(document.createElement("div"), { className:"modal-gallery-fallback", textContent:"Image" })); }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeCTProject, setActiveCTProject] = useState(null);

  useReveal();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div data-theme={dark ? "dark" : "light"}>
      <FontLoader />

      {/* Loader */}
      <div className={`loader${loaded ? " done" : ""}`}>
        <div className="loader-name">Simran Kaur</div>
        <div className="loader-bar" />
      </div>

      {/* Project Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
      {activeCTProject && (
        <CreativeModal project={activeCTProject} onClose={() => setActiveCTProject(null)} />
      )}

      {/* Nav */}
      <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
        <span className="nav-logo" onClick={() => scrollTo("hero")}>SK</span>
        <ul className="nav-links">
          {[["About","about"],["Experience","experience"],["Skills","skills"],["Work","projects"],["Creative Tools","creative-tools"],["Testimonials","testimonials"],["Contact","contact"]].map(([label, id]) => (
            <li key={id}><a onClick={() => scrollTo(id)}>{label}</a></li>
          ))}
        </ul>
        <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
          {dark ? "☀" : "◐"}
        </button>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-bg" /><div className="hero-grain" />
        <div className="hero-content">
          <p className="hero-eyebrow">Creative Operations Professional</p>
          <h1 className="hero-name">Simran<br /><em>Kaur</em></h1>
          <p className="hero-title">Creative Operations · Brand & Visual Systems · Social Media & PR</p>
          <div className="hero-line" />
          <p className="hero-intro">Creative operations and brand support professional with five years of experience across fashion, lifestyle, and digital media — combining operational precision with a highly adaptable creative toolkit spanning visual design, workflow systems, and cross-platform brand coordination.</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View My Work</button>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>Get in Touch</button>
          </div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="hero-portrait-frame">
            <div className="portrait-bg-shape" />
            <div className="portrait-image">
              <img src={IMG.portrait} alt="Simran Kaur" className="portrait-img"
                onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
              <div className="portrait-placeholder" style={{display:"none"}}>
                <div className="portrait-placeholder-icon">✦</div>
                <span className="portrait-placeholder-text">Portrait Photo</span>
              </div>
            </div>
            <div className="portrait-corner tl" /><div className="portrait-corner tr" />
            <div className="portrait-corner bl" /><div className="portrait-corner br" />
            <div className="portrait-stat stat-years">
              <div className="portrait-stat-num">5+</div>
              <div className="portrait-stat-label">Years Experience</div>
            </div>
            <div className="portrait-stat stat-brands">
              <div className="portrait-stat-num">2</div>
              <div className="portrait-stat-label">Luxury Brands</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section section-alt" id="about">
        <div className="about-grid">
          <div className="about-text">
            <div className="section-header reveal">
              <p className="section-eyebrow">About</p>
              <h2 className="section-title">Precision meets <em>aesthetic</em></h2>
            </div>
            <div className="reveal reveal-delay-1">
              <p>I am a creative operations and brand support professional with five years of experience and a deep passion for the intersection of organisation and aesthetics. My work spans fashion, beauty, lifestyle, and digital media — environments where precision is non-negotiable and visual excellence is expected.</p>
              <div className="about-pull">"I bring systems thinking to creative spaces — because great work deserves an equally great process behind it."</div>
              <p>From managing digital asset libraries for fashion clients to coordinating PR workflows and supporting social media teams, I thrive in fast-paced, detail-driven roles. I am equally comfortable working autonomously across remote setups as I am collaborating closely within a team.</p>
              <p>My toolkit spans Canva, scheduling systems, administrative coordination, and client communication — always delivered with a refined, polished approach that reflects the brands I work with.</p>
            </div>
            <div className="about-values reveal reveal-delay-2">
              {[["Approach","Aesthetically-driven, detail-first"],["Specialty","Creative ops & brand support"],["Availability","Open to remote opportunities"],["Industry","Fashion, Beauty, Lifestyle"]].map(([lbl,val]) => (
                <div className="about-value" key={lbl}>
                  <div className="about-value-label">{lbl}</div>
                  <div className="about-value-text">{val}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image-stack reveal reveal-delay-2">
            <div className="about-img-main">
              <img src={IMG.aboutMain} alt="Fashion workspace" onError={e => { e.target.parentNode.innerHTML='<div class="about-img-fallback">Portrait / Workspace</div>'; }} />
            </div>
            <div className="about-img-accent">
              <img src={IMG.aboutAccent} alt="Brand work" onError={e => { e.target.parentNode.innerHTML='<div class="about-img-fallback-dark">Brand Work</div>'; }} />
            </div>
            <div className="about-badge">
              <div className="about-badge-num">80+</div>
              <div className="about-badge-text">Canva Assets Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section" id="experience">
        <div className="section-header reveal">
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title">A career shaped by <em>luxury</em></h2>
          <p className="section-subtitle">Five years building operational excellence inside India's most recognised fashion and lifestyle teams.</p>
        </div>
        <div className="exp-container">
          {[
            {
              date:"2022 – 2025", type:"Full-time",
              role:"Creative Operations & Brand Support Assistant",
              company:"Niki Mehra Team",
              duties:[
                "Supported creative and operational workflows across campaigns and brand activations",
                "Organised digital asset libraries and maintained structured client material repositories",
                "Assisted with scheduling, calendar management, and cross-team coordination",
                "Maintained rigorous delivery systems ensuring all deadlines were met with consistency",
                "Supported remote administrative operations with seamless async communication",
                "Assisted in maintaining brand consistency across digital and physical materials",
                "Collaborated on creative workflow management, translating briefs into clear operational plans",
              ]
            },
            {
              date:"2019 – 2020", type:"Internship",
              role:"Social Media Curator & PR Intern",
              company:"Manish Malhotra",
              duties:[
                "Assisted with social media content coordination for one of India's most celebrated couturiers",
                "Curated and organised aesthetic digital content aligned with the brand's visual language",
                "Supported PR communication tasks including press outreach and media coordination",
                "Assisted with campaign coordination across fashion weeks and product launches",
                "Maintained visual consistency standards for brand content across all platforms",
                "Thrived in a high-pressure, fast-paced fashion environment with exacting standards",
              ]
            },
          ].map((exp, i) => (
            <div className={`exp-card reveal reveal-delay-${i+1}`} key={i}>
              <div className="exp-timeline">
                <div className="exp-dot" />
                {i === 0 && <div className="exp-line" />}
              </div>
              <div className="exp-body">
                <div className="exp-meta">
                  <span className="exp-date">{exp.date}</span>
                  <span className="exp-type">{exp.type}</span>
                </div>
                <h3 className="exp-role">{exp.role}</h3>
                <p className="exp-company">{exp.company}</p>
                <ul className="exp-list">
                  {exp.duties.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="section section-alt" id="skills">
        <div className="section-header reveal">
          <p className="section-eyebrow">Skills</p>
          <h2 className="section-title">A refined <em>toolkit</em></h2>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className={`skill-card reveal reveal-delay-${(i%4)+1}`} key={s.name}>
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <div className="skill-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="section" id="projects">
        <div className="section-header reveal">
          <p className="section-eyebrow">Portfolio</p>
          <h2 className="section-title">Selected <em>work</em></h2>
          <p className="section-subtitle">Click any project to explore the full case study — overview, responsibilities, tools, and results.</p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className={`project-card reveal reveal-delay-${(i%3)+1}`} key={i} onClick={() => setActiveProject(p)}>
              <div className="project-img-wrap">
                <img src={p.heroImg} alt={p.title}
                  onError={e => { e.target.style.display="none"; }} />
                <div className="project-img-overlay" />
              </div>
              <div className="project-content">
                <p className="project-tag">{p.tag}</p>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-footer">
                  <div className="project-tools">
                    {p.tools.map(t => <span className="project-tool" key={t}>{t}</span>)}
                  </div>
                  <span className="project-cta">View case study →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Tools Ticker Strip */}
      <div className="tools-strip">
        <div className="tools-strip-track">
          {[...toolBadges, ...toolBadges].map((t, i) => (
            <span className="tools-strip-item" key={i}>
              <span className="tools-strip-dot" />{t}
            </span>
          ))}
        </div>
      </div>

      {/* Creative Tools & Visual Portfolio */}
      <section className="section" id="creative-tools">
        <div className="section-header reveal">
          <p className="section-eyebrow">Creative Tools & Visual Portfolio</p>
          <h2 className="section-title">Selected visual <em>systems</em></h2>
          <p className="section-subtitle">Brand organisation, social media coordination, and creative workflow projects.</p>
        </div>
        <div className="ct-intro reveal reveal-delay-1">
          <p className="ct-intro-text">
            I primarily work within <em>Canva</em> for visual coordination and branded content systems — and am highly adaptable and comfortable using similar creative and collaborative platforms depending on project needs. Whether the brief calls for <em>Figma</em>, <em>Adobe Express</em>, <em>Airtable</em>, or <em>CapCut</em>, I approach every tool with the same operational discipline and aesthetic precision that defines the work.
          </p>
          <div className="ct-tools-badges">
            {toolBadges.map(t => (
              <span className="ct-badge" key={t}>
                <span className="ct-badge-dot" />{t}
              </span>
            ))}
          </div>
        </div>
        <div className="ct-grid">
          {ctProjects.map((p, i) => (
            <div
              className={`ct-card reveal reveal-delay-${(i % 3) + 1}`}
              key={i}
              onClick={() => setActiveCTProject(p)}
            >
              <div className="ct-card-visual">
                <img src={p.heroImg} alt={p.title} onError={e => { e.target.style.display="none"; }} />
                <div className="ct-card-overlay" />
                <span className="ct-card-tool-badge">{p.primaryTool}</span>
              </div>
              <div className="ct-card-body">
                <p className="ct-card-tag">{p.tag}</p>
                <h3 className="ct-card-title">{p.title}</h3>
                <p className="ct-card-desc">{p.desc}</p>
                <div className="ct-card-footer">
                  <div className="ct-card-chips">
                    {p.tools.map(t => <span className="ct-card-chip" key={t}>{t}</span>)}
                  </div>
                  <span className="ct-card-cta">View Project →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Process Timeline */}
      <section className="process-section">
        <div style={{position:"relative",zIndex:1}}>
          <div className="section-header reveal">
            <p className="section-eyebrow">Creative Process</p>
            <h2 className="section-title">How great work <em>gets made</em></h2>
          </div>
          <div className="process-timeline">
            {processSteps.map((step, i) => (
              <div className={`process-step reveal reveal-delay-${(i % 3) + 1}`} key={i}>
                <div className="process-step-num">{step.num}</div>
                <div className="process-step-icon">{step.icon}</div>
                <div className="process-step-title">{step.title}</div>
                <div className="process-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt" id="testimonials">
        <div className="section-header reveal">
          <p className="section-eyebrow">Testimonials</p>
          <h2 className="section-title">What clients <em>say</em></h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className={`testimonial-card reveal reveal-delay-${(i%2)+1}`} key={i}>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact">
        <div className="section-header reveal">
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">Let's <em>connect</em></h2>
          <p className="section-subtitle">Open to remote creative operations and brand support opportunities.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="contact-item">
              <div className="contact-item-icon">✉</div>
              <div>
                <div className="contact-item-label">Email</div>
                <a href="mailto:simrankaursohal131@gmail.com" className="contact-item-val">simrankaursohal131@gmail.com</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">☏</div>
              <div>
                <div className="contact-item-label">Phone</div>
                <a href="tel:+919888230350" className="contact-item-val">+91 98882 30350</a>
              </div>
            </div>
            <div className="contact-availability">
              <div className="avail-dot" />
              <span className="avail-text">Available for Remote Opportunities</span>
            </div>
          </div>
          <div className="contact-form reveal reveal-delay-1">
            <div className="form-field">
              <label className="form-label">Your Name</label>
              <input className="form-input" type="text" placeholder="Full name" />
            </div>
            <div className="form-field">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="email@company.com" />
            </div>
            <div className="form-field">
              <label className="form-label">Subject</label>
              <input className="form-input" type="text" placeholder="Opportunity, collaboration…" />
            </div>
            <div className="form-field">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" placeholder="Tell me about the role or project…" />
            </div>
            <button className="btn-primary" style={{alignSelf:"flex-start"}}
              onClick={() => window.location.href="mailto:simrankaursohal131@gmail.com"}>
              Send Message →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <span className="footer-logo" onClick={() => scrollTo("hero")}>Simran Kaur</span>
        <p className="footer-text">© 2025 · Creative Operations & Brand Support</p>
        <div className="footer-links">
          {[["Work","projects"],["Creative Tools","creative-tools"],["About","about"],["Contact","contact"]].map(([lbl,id]) => (
            <span key={id} className="footer-link" onClick={() => scrollTo(id)}>{lbl}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
