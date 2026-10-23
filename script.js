/* Serviços: para incluir um serviço novo, basta acrescentar uma linha nesta lista.
   As categorias e os filtros são montados automaticamente. */
const SERVICOS = [
  { nome: 'Departamento Contábil', categoria: 'Rotina da empresa', descricao: 'Balanços, DRE e relatórios para acompanhar a saúde da empresa e cumprir as obrigações contábeis.' },
  { nome: 'Departamento Fiscal', categoria: 'Rotina da empresa', descricao: 'Apuração de impostos e entrega das obrigações fiscais dentro do prazo.' },
  { nome: 'Departamento Pessoal', categoria: 'Rotina da empresa', descricao: 'Admissões, demissões, férias, folha de pagamento e benefícios dos seus funcionários.' },
  { nome: 'BPO Financeiro', categoria: 'Rotina da empresa', descricao: 'Contas a pagar e a receber, conciliação bancária e fluxo de caixa organizados pela nossa equipe.' },
  { nome: 'Legalização Societária', categoria: 'Abertura e legalização', descricao: 'Abertura, alteração e encerramento de empresas, alvarás e licenças.' },
  { nome: 'Certificado Digital', categoria: 'Abertura e legalização', descricao: 'Emissão de e-CPF e e-CNPJ para emitir notas, assinar documentos e acessar os sistemas do governo.' },
  { nome: 'Registro de Marcas', categoria: 'Abertura e legalização', descricao: 'Acompanhamos o processo de registro da sua marca no INPI.' },
  { nome: 'Planejamento Tributário', categoria: 'Estratégia e patrimônio', descricao: 'Estratégias legais para reduzir os encargos fiscais e escolher o melhor regime.' },
  { nome: 'Holding Patrimonial', categoria: 'Estratégia e patrimônio', descricao: 'Organização do patrimônio da família e planejamento da sucessão.' },
  { nome: 'Assessoria de Importações', categoria: 'Atendimento especializado', descricao: 'Suporte contábil e fiscal para empresas que importam.' },
  { nome: 'Contabilidade para o Terceiro Setor', categoria: 'Atendimento especializado', descricao: 'Contabilidade para ONGs, igrejas, OSCIPs e entidades sem fins lucrativos.' }
];

/* Depoimentos do Google: copie os textos e nomes como aparecem no Google */
const DEPOIMENTOS = [
  { nome: 'Reginaldo Júnior', estrelas: 5, texto: 'Empresa composta por uma equipe extremamente competente e preparada para atender os clientes da melhor forma e proporcionar uma experiência de acolhimento, sempre buscando entender a dor do empresário e minimizando as complexidades do dia a dia. Super recomendo!!!' },
  { nome: 'Gustavo Lorencete', estrelas: 5, texto: 'Excelência na prestação dos serviços, equipe competente, ótima estrutura profissional. Recomendo!' },
  { nome: 'Gabriel Borges', estrelas: 5, texto: 'Ótimos profissionais e atendimento competente e de qualidade TOP !!!' },
  { nome: 'Ana Adorni', estrelas: 5, texto: 'Otima empresa com profissionais excelentes e com um atendimento especializado.' },
  { nome: 'Nubia Sada - Especialista em reformas', estrelas: 5, texto: 'Equipe responsável , ótimo e diferenciadoatendimento , preço justo, super indico a TMS em Ribeirão Preto!' },
  { nome: 'Dubai Pedras', estrelas: 5, texto: 'Além de super profissionais, é uma empresa família. Obrigado família Tms' },
  { nome: 'Leiliane Coimbra', estrelas: 5, texto: 'O melhor escritório de contabilidade de Ribeirão Preto. Indico e Recomendo a todos!' },
  { nome: 'Erica Andrade', estrelas: 5, texto: 'Profissionais muito atenciosos e comprometidos.' },
  { nome: 'Flor Seda', estrelas: 5, texto: 'Atendimento excelente!' },
  { nome: 'Vander pavão', estrelas: 5, texto: '' },
  { nome: 'Andre Luiz Rodrigues De Oliveira Rodrigues', estrelas: 5, texto: '' },
  { nome: 'guido cesar moretti', estrelas: 5, texto: '' },
  { nome: 'carlos bellomo', estrelas: 5, texto: '' },
  { nome: 'Hidratube Parts', estrelas: 5, texto: '' },
  { nome: 'Lidiane Moraes Gonçalves', estrelas: 5, texto: '' },
  { nome: 'Rafaela Rodrigues Ortiz', estrelas: 5, texto: '' },
  { nome: 'Janiel Porto', estrelas: 5, texto: '' },
  { nome: 'Pedro Garaude Neto', estrelas: 1, texto: 'Tratamento hostil, processo de fechamento com mais de 30 dias. Experiência ruim, não recomendo' },
];

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* 1. Menu lateral no celular */
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const menuBtn = document.getElementById('menuBtn');
  function setMenu(open) {
    sidebar.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', () => setMenu(!sidebar.classList.contains('open')));
  overlay.addEventListener('click', () => setMenu(false));
  sidebar.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* 2. Menu acompanha a rolagem */
  const navLinks = document.querySelectorAll('.sidebar-nav .nav-item');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === e.target.id));
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  document.querySelectorAll('.spy').forEach((s) => spy.observe(s));

  /* 4. Contadores tipo odômetro: os dígitos giram até o número final */
  const counters = document.querySelectorAll('.count');
  if (!reduceMotion) {
    counters.forEach((el) => {
      const v = el.dataset.target;
      el.classList.add('odo');
      el.setAttribute('aria-label', v);
      el.innerHTML = [...v].map((_, i) =>
        `<i class="odo-col" style="--d:${i * 0.12}s" aria-hidden="true">${[...'0123456789'].map((n) => `<i>${n}</i>`).join('')}</i>`
      ).join('');
    });
    new IntersectionObserver((entries, obs) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      obs.disconnect();
      counters.forEach((el) => [...el.dataset.target].forEach((d, i) => {
        el.children[i].style.transform = `translateY(-${d * 10}%)`;
      }));
    }, { threshold: 0.4 }).observe(document.getElementById('counters'));
  }

  /* 5. Cards com inclinação 3D */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const rx = ((y - r.height / 2) / (r.height / 2)) * -9;
        const ry = ((x - r.width / 2) / (r.width / 2)) * 9;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `${-ry * 1.5}px ${rx * 1.5 + 15}px 35px rgba(13, 26, 46, 0.12)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.boxShadow = ''; });
    });
  }

  /* 8. Hub de serviços com filtro fluido */
  const servicesEl = document.getElementById('services');
  const chipsEl = document.getElementById('chips');
  const categorias = ['Todos', ...new Set(SERVICOS.map((s) => s.categoria))];
  let filtroId = 0;

  SERVICOS.forEach((s) => {
    const card = document.createElement('article'); card.className = 'service';
    const cat = document.createElement('span'); cat.className = 'cat'; cat.textContent = s.categoria;
    const h = document.createElement('h3'); h.textContent = s.nome;
    const p = document.createElement('p'); p.textContent = s.descricao;
    card.append(cat, h, p);
    s.el = card;
    servicesEl.append(card);
  });

  async function aplicarFiltro(filtro) {
    const id = ++filtroId;
    const entra = (s) => filtro === 'Todos' || s.categoria === filtro;
    const cards = SERVICOS.map((s) => s.el);

    const saindo = SERVICOS.filter((s) => !s.el.hidden && !entra(s)).map((s) => s.el);
    if (!reduceMotion && saindo.length) {
      await Promise.all(saindo.map((el) => el.animate(
        [{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.92)' }],
        { duration: 180, easing: 'ease-in', fill: 'forwards' }).finished));
      if (id !== filtroId) return;
    }

    const antes = new Map(cards.filter((el) => !el.hidden).map((el) => [el, el.getBoundingClientRect()]));
    SERVICOS.forEach((s) => { s.el.hidden = !entra(s); s.el.getAnimations().forEach((a) => a.cancel()); });
    if (reduceMotion) return;

    cards.filter((el) => !el.hidden).forEach((el, i) => {
      const a = antes.get(el);
      const d = el.getBoundingClientRect();
      if (a) {
        const dx = a.left - d.left, dy = a.top - d.top;
        if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
          { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)' });
      } else {
        el.animate([{ opacity: 0, transform: 'scale(.92) translateY(12px)' }, { opacity: 1, transform: 'none' }],
          { duration: 400, delay: i * 40, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      }
    });
  }

  categorias.forEach((c) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.textContent = c;
    b.setAttribute('aria-pressed', String(c === 'Todos'));
    b.addEventListener('click', () => {
      chipsEl.querySelectorAll('.chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      aplicarFiltro(c);
    });
    chipsEl.append(b);
  });

/* 9. Neon acendendo nos cards de Tecnologia */
const techCards = document.querySelectorAll('.tech-card');
if (!reduceMotion) {
  const ESPERA = 0.6;   // segundos antes do primeiro card acender
  const INTERVALO = 0.5; // segundos entre um card e o próximo
  techCards.forEach((c, i) => { c.classList.add('wait'); c.style.setProperty('--d', ESPERA + i * INTERVALO + 's'); });
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    techCards.forEach((c) => c.classList.replace('wait', 'on'));
  }, { threshold: 0.6, rootMargin: '0px 0px -15% 0px' }).observe(document.querySelector('.tech-cards'));
}

  /* 10. Caminho do cliente se desenhando com a rolagem */
  const steps = [...document.querySelectorAll('.journey .tilt-card')];
  if (!reduceMotion) {
    steps.forEach((s) => s.insertAdjacentHTML('afterbegin', '<span class="step-line"></span>'));
    const journey = document.querySelector('.journey');
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = journey.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
      steps.forEach((s, i) => {
        const f = Math.min(Math.max(p * steps.length - i, 0), 1);
        s.style.setProperty('--fill', f);
        s.classList.toggle('lit', f >= 1);
      });
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

/* 11. Depoimentos rolando em loop */
const track = document.getElementById('reviewsTrack');
const COM_TEXTO = DEPOIMENTOS;
const LIMITE = 160; // a partir de quantos caracteres aparece o "... mais"

function cardDepoimento(d, clone) {
  const card = document.createElement('figure');
  card.className = 'review-card';
  if (clone) card.setAttribute('aria-hidden', 'true');
  const stars = document.createElement('div'); stars.className = 'review-stars'; stars.textContent = '★'.repeat(d.estrelas);
  stars.setAttribute('aria-label', d.estrelas + ' de 5 estrelas');
  const txt = document.createElement('blockquote');
txt.className = d.texto.trim() ? 'review-text' : 'review-text review-empty';
txt.textContent = d.texto.trim() || 'Avaliou a TMS com 5 estrelas no Google.';
  const autor = document.createElement('figcaption'); autor.className = 'review-author';
  const nome = document.createElement('b'); nome.textContent = d.nome;
  const via = document.createElement('span'); via.textContent = 'via Google';
  autor.append(nome, via);
  card.append(stars, txt);

  if (d.texto.length > LIMITE) {
    const mais = document.createElement('button');
    mais.type = 'button'; mais.className = 'review-more'; mais.textContent = '... mais';
    if (clone) mais.tabIndex = -1;
    mais.addEventListener('click', () => {
      const aberto = card.classList.toggle('open');
      mais.textContent = aberto ? 'mostrar menos' : '... mais';
      track.classList.toggle('paused', !!track.querySelector('.review-card.open'));
    });
    card.append(mais);
  }

  card.append(autor);
  return card;
}

COM_TEXTO.forEach((d) => track.append(cardDepoimento(d, false)));
if (!reduceMotion) COM_TEXTO.forEach((d) => track.append(cardDepoimento(d, true)));

const marquee = track.parentElement;
const VELOCIDADE = 35; // pixels por segundo na rolagem automática
const passo = () => {
  const c = track.firstElementChild;
  return c.getBoundingClientRect().width + parseFloat(getComputedStyle(c).marginRight);
};

if (reduceMotion) {
  // Sem animação: as setas só rolam a lista
  document.getElementById('revPrev').addEventListener('click', () => marquee.scrollBy({ left: -passo(), behavior: 'smooth' }));
  document.getElementById('revNext').addEventListener('click', () => marquee.scrollBy({ left: passo(), behavior: 'smooth' }));
} else {
  let offset = 0, last = performance.now(), anim = null, hover = false;
  marquee.addEventListener('mouseenter', () => { hover = true; });
  marquee.addEventListener('mouseleave', () => { hover = false; });

  function ir(dir) {
    const p = passo();
    anim = { from: offset, to: (Math.round(offset / p) + dir) * p, t0: performance.now(), dur: 500 };
  }
  document.getElementById('revPrev').addEventListener('click', () => ir(-1));
  document.getElementById('revNext').addEventListener('click', () => ir(1));

  function frame(t) {
    const dt = Math.min((t - last) / 1000, 0.1);
    last = t;
    if (anim) {
      const k = Math.min((t - anim.t0) / anim.dur, 1);
      offset = anim.from + (anim.to - anim.from) * (1 - Math.pow(1 - k, 3));
      if (k === 1) anim = null;
    } else if (!hover && !track.querySelector('.review-card.open')) {
      offset += VELOCIDADE * dt;
    }
    const metade = track.scrollWidth / 2;
    const pos = ((offset % metade) + metade) % metade;
    track.style.transform = `translateX(${-pos}px)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}});
