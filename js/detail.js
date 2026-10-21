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

// ===== 渲染详情 =====
function render() {
  const box = document.getElementById('detail');

  // 从 URL 里取 ?id=3 这个参数
  const id = Number(new URLSearchParams(location.search).get('id'));
  const it = items.find(x => x.id === id);

  // 找不到就显示提示（错误处理）
  if (!it) {
    box.innerHTML = `
      <div class="empty">
        <p>商品不存在或已下架</p>
        <a href="index.html">返回列表</a>
      </div>`;
    return;
  }

  recordHistory(it.id);

  box.innerHTML = `
    <div class="detail">
      <div class="detail-thumb">${it.emoji}</div>
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
        </ul>
        <button class="fav-btn-big" onclick="toggleFav(${it.id})">
          ${isFav(it.id) ? '★ 已收藏' : '☆ 收藏'}
        </button>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', render);

// 记一条浏览记录：最近看的排前面，同一个商品不重复，最多留 20 条
function recordHistory(id) {
  const hist = JSON.parse(localStorage.getItem('history') || '[]').filter(x => x !== id);
  hist.unshift(id);
  localStorage.setItem('history', JSON.stringify(hist.slice(0, 20)));
}