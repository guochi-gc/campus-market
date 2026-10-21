// ===== 个人主页 =====
function getFavs() {
  return JSON.parse(localStorage.getItem('favs') || '[]');
}
function getHistory() {
  return JSON.parse(localStorage.getItem('history') || '[]');
}

// 切换标签：不跳页面，只换下面的内容
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    const on = b.dataset.tab === name;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on);
  });
  document.getElementById('panel-fav').hidden = name !== 'fav';
  document.getElementById('panel-history').hidden = name !== 'history';
}

// 列表行：收藏和浏览记录用同一套结构
function row(it, actionText, action) {
  return `
    <div class="cart-row">
      <div class="cart-thumb">${it.emoji}</div>
      <div class="cart-info">
        <a class="cart-title" href="item.html?id=${it.id}">${it.title}</a>
        <div class="cart-meta">${it.condition} · ${it.location}</div>
      </div>
      <div class="cart-price">${it.price}</div>
      <button class="cart-remove" onclick="${action}(${it.id})">${actionText}</button>
    </div>`;
}

function emptyBox(text) {
  return `
    <div class="empty">
      <p>${text}</p>
      <a href="index.html" class="empty-link">去逛逛</a>
    </div>`;
}

function renderFavs() {
  const list = items.filter(it => getFavs().includes(it.id));
  const box = document.getElementById('favList');
  box.innerHTML = list.length
    ? list.map(it => row(it, '取消收藏', 'unfav')).join('')
    : emptyBox('还没有收藏任何商品');
}

function renderHistory() {
  const ids = getHistory();
  const list = ids.map(id => items.find(it => it.id === id)).filter(Boolean);
  const box = document.getElementById('historyList');
  box.innerHTML = list.length
    ? list.map(it => row(it, '删除记录', 'dropHistory')).join('')
    : emptyBox('还没有浏览记录');
}

function unfav(id) {
  localStorage.setItem('favs', JSON.stringify(getFavs().filter(x => x !== id)));
  renderFavs();
}

function dropHistory(id) {
  localStorage.setItem('history', JSON.stringify(getHistory().filter(x => x !== id)));
  renderHistory();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  renderFavs();
  renderHistory();
});
