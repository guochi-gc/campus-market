// ===== 收藏（和 app.js 里一样，为了独立不互相依赖）=====
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

// ===== 浏览记录：最近看的排前面，同一商品不重复，最多 20 条 =====
function recordHistory(id) {
  const hist = JSON.parse(localStorage.getItem('history') || '[]').filter(x => x !== id);
  hist.unshift(id);
  localStorage.setItem('history', JSON.stringify(hist.slice(0, 20)));
}

// ===== 浏览量 =====
function bumpView(id) {
  const views = JSON.parse(localStorage.getItem('views') || '{}');
  views[id] = (views[id] || 0) + 1;
  localStorage.setItem('views', JSON.stringify(views));
  return views[id];
}

let current = null;
let viewCount = 0;

// ===== 渲染详情 =====
function render() {
  const box = document.getElementById('detail');
  const it = current;
  if (!it) return;

  box.innerHTML = `
    <div class="detail">
      <div class="detail-thumb">${it.img ? `<img src="${it.img}" alt="${it.title}">` : it.emoji}</div>
      <div class="detail-info">
        <h2>${it.title}</h2>
        <div class="price">${it.price}</div>
        <div class="tags">
          <span>${it.category}</span>
          <span>${it.condition}</span>
        </div>
        <p class="desc">${it.desc}</p>
        <ul class="seller">
          <li>卖家：${it.seller}</li>
          <li>交易地点：${it.location}</li>
          <li>发布时间：${it.time}</li>
          <li>已浏览 ${viewCount} 次</li>
        </ul>
        <button class="fav-btn-big" onclick="toggleFav(${it.id})">
          ${isFav(it.id) ? '★ 已收藏' : '☆ 收藏'}
        </button>
      </div>
    </div>
  `;
}

// ===== 同类推荐 =====
function renderRelated(it, all) {
  const same = all.filter(x => x.category === it.category && x.id !== it.id).slice(0, 4);
  if (same.length === 0) return;

  document.getElementById('relatedWrap').hidden = false;
  document.getElementById('related').innerHTML = same.map(x => `
    <a class="card" href="item.html?id=${x.id}" style="text-decoration:none;color:inherit;display:block">
      <div class="thumb">${x.emoji}</div>
      <div class="info">
        <p class="title">${x.title}</p>
        <div class="price">${x.price}</div>
        <div class="meta">${x.condition} · ${x.location} · ${x.time}</div>
      </div>
    </a>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const id = Number(new URLSearchParams(location.search).get('id'));
  const all = getAllItems();
  current = all.find(x => x.id === id) || null;

  if (!current) {
    document.getElementById('detail').innerHTML = `
      <div class="empty">
        <p>商品不存在或已下架</p>
        <a href="index.html" class="empty-link">返回列表</a>
      </div>`;
    return;
  }

  recordHistory(current.id);
  viewCount = bumpView(current.id);
  render();
  renderRelated(current, all);
});
