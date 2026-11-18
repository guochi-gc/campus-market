// ===== 个人主页 =====
function getFavs() {
  return JSON.parse(localStorage.getItem('favs') || '[]');
}
function getHistory() {
  return JSON.parse(localStorage.getItem('history') || '[]');
}

// 切换左侧菜单：不跳页面，只换右边的内容
function switchTab(name) {
  document.querySelectorAll('.p-item').forEach(b => {
    const on = b.dataset.tab === name;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on);
  });
  document.getElementById('panel-fav').hidden = name !== 'fav';
  document.getElementById('panel-history').hidden = name !== 'history';
  document.getElementById('panel-posts').hidden = name !== 'posts';
  const pOrder = document.getElementById('panel-orders');
  if (pOrder) pOrder.hidden = name !== 'orders';
}

// 三个菜单共用同一套列表行
function row(it, actionText, action) {
  return `
    <div class="row-item">
      <div class="row-thumb">${it.img ? `<img src="${it.img}" alt="">` : it.emoji}</div>
      <div class="row-info">
        <a class="row-title" href="item.html?id=${it.id}">${it.title}</a>
        <div class="row-meta">${it.condition} · ${it.location} · ${it.time}</div>
      </div>
      <div class="row-price">${it.price}</div>
      <button class="row-action" onclick="${action}(${it.id})">${actionText}</button>
    </div>`;
}

function emptyBox(text, linkText) {
  return `
    <div class="empty">
      <p>${text}</p>
      <a href="index.html" class="empty-link">${linkText || '去逛逛'}</a>
    </div>`;
}

function updateCounts() {
  const nFav = getFavs().length;
  const nHist = getHistory().length;
  const nPost = getUserPosts().length;

  document.getElementById('statFav').textContent = nFav;
  document.getElementById('statHist').textContent = nHist;
  document.getElementById('statPost').textContent = nPost;

  document.getElementById('menuFav').textContent = nFav;
  document.getElementById('menuHist').textContent = nHist;
  document.getElementById('menuPost').textContent = nPost;
  const nOrder = getOrders().length;
  const menuOrder = document.getElementById('menuOrder');
  if (menuOrder) menuOrder.textContent = nOrder;
}

function renderFavs() {
  const list = getAllItems().filter(it => getFavs().includes(it.id));
  document.getElementById('favList').innerHTML = list.length
    ? list.map(it => row(it, '取消收藏', 'unfav')).join('')
    : emptyBox('还没有收藏任何商品');
}

function renderHistory() {
  const ids = getHistory();
  const list = ids.map(id => getAllItems().find(it => it.id === id)).filter(Boolean);
  document.getElementById('historyList').innerHTML = list.length
    ? list.map(it => row(it, '删除记录', 'dropHistory')).join('')
    : emptyBox('还没有浏览记录');
}

function renderPosts() {
  const list = getUserPosts();
  document.getElementById('postList').innerHTML = list.length
    ? list.map(it => {
        const sold = it.status === 'sold';
        return `
    <div class="row-item">
      <div class="row-thumb">${it.img ? `<img src="${it.img}" alt="">` : it.emoji}</div>
      <div class="row-info">
        <a class="row-title" href="item.html?id=${it.id}">${it.title}</a>
        <div class="row-meta">${it.condition} · ${it.location} · ${it.time}${sold ? ' · <b class="sold-badge">已售</b>' : ''}</div>
      </div>
      <div class="row-price">${it.price}</div>
      <button class="row-action" onclick="toggleSold(${it.id})">${sold ? '恢复在售' : '标为已售'}</button>
    </div>`;
      }).join('')
    : emptyBox('还没有发布过商品', '去发布');
}

// 在售 ⇄ 已售
function toggleSold(id) {
  const list = getUserPosts();
  const it = list.find(x => x.id === id);
  if (!it) return;
  it.status = it.status === 'sold' ? 'on' : 'sold';
  saveUserPosts(list);
  renderPosts();
}

function renderOrders() {
  const list = getOrders();
  const box = document.getElementById('orderList');
  if (!box) return;
  box.innerHTML = list.length
    ? list.map(o => `
    <div class="row-item">
      <div class="row-thumb">🧾</div>
      <div class="row-info">
        <a class="row-title" href="item.html?id=${o.itemId}">${o.title}</a>
        <div class="row-meta">${o.time} · 交易地点 ${o.place || '—'} · 已支付</div>
      </div>
      <div class="row-price">¥${o.price}</div>
      <span class="order-state">待当面交易</span>
    </div>`).join('')
    : emptyBox('还没有订单，去详情页点「立即购买」试试');
}

function unfav(id) {
  localStorage.setItem('favs', JSON.stringify(getFavs().filter(x => x !== id)));
  renderFavs();
  updateCounts();
}

function dropHistory(id) {
  localStorage.setItem('history', JSON.stringify(getHistory().filter(x => x !== id)));
  renderHistory();
  updateCounts();
}

function dropPost(id) {
  saveUserPosts(getUserPosts().filter(x => x.id !== id));
  renderPosts();
  updateCounts();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.p-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  renderFavs();
  renderHistory();
  renderPosts();
  renderOrders();
  updateCounts();
  // 演示与截图用：地址带 ?tab=orders 直接打开订单面板
  const want = new URLSearchParams(location.search).get('tab');
  if (want) switchTab(want);
});
