// ===== 页面状态 =====
let state = {
  category: '全部',
  onlyFav: false,
  keyword: '',
  sort: 'default',
  college: '全部',
  major: '全部'
};
const CATS = ['全部', '教材', '数码', '生活', '运动', '其他'];

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// 侧栏显示短名：去掉末尾的“学院”
function shortCollege(name) {
  return name.replace(/学院$/, '');
}

// ===== 收藏 =====
function getFavs() {
  return JSON.parse(localStorage.getItem('favs') || '[]');
}
function isFav(id) {
  return getFavs().includes(id);
}
function toggleFav(id) {
  let favs = getFavs();
  if (favs.includes(id)) favs = favs.filter(x => x !== id);
  else favs.push(id);
  localStorage.setItem('favs', JSON.stringify(favs));
  render();
}

// ===== 学院 / 专业 列表 =====
function collegeNames() {
  const set = new Set();
  getAllItems().forEach(it => { if (it.college) set.add(it.college); });
  return [...set];
}
function majorNames(college) {
  const set = new Set();
  getAllItems().forEach(it => {
    if (it.college === college && it.major) set.add(it.major);
  });
  return [...set];
}

// ===== 筛选 + 排序 =====
function matchKeyword(it, kw) {
  const text = (it.title + ' ' + (it.keywords || '')).toLowerCase();
  return text.includes(kw);
}

function getFiltered() {
  const kw = state.keyword.trim().toLowerCase();

  let list = getAllItems().filter(it => {
    if (state.category !== '全部' && it.category !== state.category) return false;
    if (state.college !== '全部' && it.college !== state.college) return false;
    if (state.major !== '全部' && it.major !== state.major) return false;
    if (state.onlyFav && !isFav(it.id)) return false;
    if (kw && !matchKeyword(it, kw)) return false;
    return true;
  });

  if (state.sort === 'newest') list = list.slice().sort((a, b) => b.id - a.id);
  if (state.sort === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price);
  if (state.sort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);

  return list;
}

// ===== 左侧学院 / 专业 =====
function renderSide() {
  const all = getAllItems();
  const box = document.getElementById('collegeList');
  const names = collegeNames();

  box.innerHTML = `
    <li><button data-college="全部" class="${state.college === '全部' ? 'active' : ''}">全部学院<span class="n">${all.length}</span></button></li>` +
    names.map(c => `
      <li><button data-college="${c}" class="${state.college === c ? 'active' : ''}">${shortCollege(c)}<span class="n">${all.filter(it => it.college === c).length}</span></button></li>
    `).join('');

  box.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.college = btn.dataset.college;
      state.major = '全部';
      renderSide();
      renderCrumb();
      render();
    });
  });

  const block = document.getElementById('majorBlock');
  const list = document.getElementById('majorList');

  if (state.college === '全部') {
    block.hidden = true;
    return;
  }

  block.hidden = false;
  const majors = majorNames(state.college);
  list.innerHTML = `
    <li><button data-major="全部" class="${state.major === '全部' ? 'active' : ''}">全部专业</button></li>` +
    majors.map(m => `
      <li><button data-major="${m}" class="${state.major === m ? 'active' : ''}">${m}</button></li>
    `).join('');

  list.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.major = btn.dataset.major;
      renderSide();
      renderCrumb();
      render();
    });
  });
}

// ===== 面包屑 =====
function renderCrumb() {
  const box = document.getElementById('crumb');
  let html = `<button data-reset="all">全部商品</button>`;
  if (state.college !== '全部') {
    html += `<span class="sep">›</span><button data-reset="college">${shortCollege(state.college)}</button>`;
  }
  if (state.major !== '全部') {
    html += `<span class="sep">›</span><span class="cur">${state.major}</span>`;
  }
  box.innerHTML = html;

  box.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.reset === 'all') {
        state.college = '全部';
        state.major = '全部';
      } else if (btn.dataset.reset === 'college') {
        state.major = '全部';
      }
      renderSide();
      renderCrumb();
      render();
    });
  });
}

// ===== 分类（带数量）=====
function renderFilters() {
  const all = getAllItems();
  const box = document.getElementById('filters');
  box.innerHTML = CATS.map(c => {
    const n = c === '全部' ? all.length : all.filter(it => it.category === c).length;
    return `<button data-cat="${c}" class="${state.category === c ? 'active' : ''}">${c}<span class="tag-n">${n}</span></button>`;
  }).join('');

  box.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat;
      renderFilters();
      render();
    });
  });
}

// ===== 渲染卡片 =====
function render() {
  const grid = document.getElementById('grid');
  const list = getFiltered();

  document.getElementById('count').textContent = '共 ' + list.length + ' 件';

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty">
        <p>这个条件下没有商品</p>
        <button onclick="clearAll()">清空筛选条件</button>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(it => `
    <div class="card">
      <span class="cat-tag">${it.major || it.category}</span>
      <button class="fav-btn" onclick="toggleFav(${it.id})" aria-label="收藏 ${esc(it.title)}" aria-pressed="${isFav(it.id)}">${isFav(it.id) ? '★' : '☆'}</button>
      <a href="item.html?id=${it.id}" style="text-decoration:none;color:inherit">
        <div class="thumb">${it.img ? `<img src="${it.img}" alt="${esc(it.title)}" loading="lazy">` : it.emoji}</div>
        <div class="info">
          <p class="title">${it.title}</p>
          <div class="price">${it.price}</div>
          <div class="meta">${it.condition} · ${it.location} · ${it.time}</div>
        </div>
      </a>
    </div>
  `).join('');
}

function clearAll() {
  state = { category: '全部', onlyFav: false, keyword: '', sort: 'default', college: '全部', major: '全部' };

  const search = document.getElementById('search');
  if (search) search.value = '';
  const inlineSearch = document.getElementById('searchInline');
  if (inlineSearch) inlineSearch.value = '';

  const favFilter = document.getElementById('favFilter');
  favFilter.classList.remove('on');
  favFilter.setAttribute('aria-pressed', 'false');

  document.querySelectorAll('#sort button').forEach(b => {
    b.classList.toggle('active', b.dataset.sort === 'default');
  });

  renderSide();
  renderCrumb();
  renderFilters();
  render();
}

// ===== 绑定事件 =====
document.addEventListener('DOMContentLoaded', () => {
  const heroSearch = document.getElementById('search');
  const inlineSearch = document.getElementById('searchInline');

  // 两个搜索框共用一份状态
  function onSearchInput(value) {
    state.keyword = value;
    if (heroSearch.value !== value) heroSearch.value = value;
    if (inlineSearch && inlineSearch.value !== value) inlineSearch.value = value;
    render();
  }

  heroSearch.addEventListener('input', (e) => onSearchInput(e.target.value));
  if (inlineSearch) inlineSearch.addEventListener('input', (e) => onSearchInput(e.target.value));

  // 滚过 Hero 后，把搜索并进通栏
  const heroEl = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    if (!heroEl) return;
    const pastHero = heroEl.getBoundingClientRect().bottom < 70;
    document.body.classList.toggle('scrolled', pastHero);
  }, { passive: true });

  document.querySelectorAll('#sort button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.sort = btn.dataset.sort;
      document.querySelectorAll('#sort button').forEach(b => b.classList.toggle('active', b === btn));
      render();
    });
  });

  document.getElementById('favFilter').addEventListener('click', (e) => {
    state.onlyFav = !state.onlyFav;
    e.currentTarget.classList.toggle('on', state.onlyFav);
    e.currentTarget.setAttribute('aria-pressed', state.onlyFav);
    render();
  });

  renderSide();
  renderCrumb();
  renderFilters();
  render();
});
