// ===== 页面状态 =====
let state = { category: '全部', onlyFav: false, keyword: '', sort: 'default' };
const CATS = ['全部', '教材', '数码', '生活', '运动', '其他'];

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
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

// ===== 筛选 + 排序 =====
function matchKeyword(it, kw) {
  const text = (it.title + ' ' + (it.keywords || '')).toLowerCase();
  return text.includes(kw);
}

function getFiltered() {
  const kw = state.keyword.trim().toLowerCase();

  let list = getAllItems().filter(it => {
    if (state.category !== '全部' && it.category !== state.category) return false;
    if (state.onlyFav && !isFav(it.id)) return false;
    if (kw && !matchKeyword(it, kw)) return false;
    return true;
  });

  if (state.sort === 'newest') list = list.slice().sort((a, b) => b.id - a.id);
  if (state.sort === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price);
  if (state.sort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);

  return list;
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
        <p>没找到相关商品</p>
        <button onclick="clearAll()">清空筛选条件</button>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(it => `
    <div class="card">
      <span class="cat-tag">${it.category}</span>
      <button class="fav-btn" onclick="toggleFav(${it.id})" aria-label="收藏 ${esc(it.title)}" aria-pressed="${isFav(it.id)}">${isFav(it.id) ? '★' : '☆'}</button>
      <a href="item.html?id=${it.id}" style="text-decoration:none;color:inherit">
        <div class="thumb">${it.emoji}</div>
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
  state = { category: '全部', onlyFav: false, keyword: '', sort: 'default' };

  const search = document.getElementById('search');
  if (search) search.value = '';

  const favFilter = document.getElementById('favFilter');
  favFilter.classList.remove('on');
  favFilter.setAttribute('aria-pressed', 'false');

  document.querySelectorAll('#sort button').forEach(b => {
    b.classList.toggle('active', b.dataset.sort === 'default');
  });

  renderFilters();
  render();
}

// ===== 绑定事件 =====
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search').addEventListener('input', (e) => {
    state.keyword = e.target.value;
    render();
  });

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

  renderFilters();
  render();
});
