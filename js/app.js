// ===== 页面状态 =====
let state = { category: '全部', onlyFav: false, keyword: '' };

// ===== 收藏：用浏览器本地存储，不需要后端 =====
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

// ===== 筛选逻辑 =====
function getFiltered() {
  return items.filter(it => {
    if (state.category !== '全部' && it.category !== state.category) return false;
    if (state.onlyFav && !isFav(it.id)) return false;
    if (state.keyword && !it.title.includes(state.keyword)) return false;
    return true;
  });
}

// ===== 渲染 =====
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
      <button class="fav-btn" onclick="toggleFav(${it.id})" aria-label="收藏">${isFav(it.id) ? '★' : '☆'}</button>
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
  state = { category: '全部', onlyFav: false, keyword: '' };
  document.querySelectorAll('#filters button').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === '全部');
  });
  document.getElementById('favFilter').classList.remove('on');
  render();
}

// ===== 绑定事件 =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat;
      document.querySelectorAll('#filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });

  document.getElementById('favFilter').addEventListener('click', (e) => {
    state.onlyFav = !state.onlyFav;
    e.currentTarget.classList.toggle('on', state.onlyFav);
    render();
  });

  render();
});