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
    ? list.map(it => row(it, '下架', 'dropPost')).join('')
    : emptyBox('还没有发布过商品', '去发布');
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
  updateCounts();
});
