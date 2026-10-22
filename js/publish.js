// ===== 发布闲置 =====
let pickedEmoji = '📚';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#emojiPicker button').forEach(btn => {
    btn.addEventListener('click', () => {
      pickedEmoji = btn.dataset.emoji;
      document.querySelectorAll('#emojiPicker button').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  document.getElementById('publishForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const priceRaw = document.getElementById('price').value.trim();
    const price = Number(priceRaw);
    const place = document.getElementById('location').value.trim();

    if (!title) return showError('请填写商品名称');
    if (priceRaw === '' || Number.isNaN(price) || price < 0) return showError('请填写正确的价格');
    if (!place) return showError('请填写交易地点');

    const post = {
      id: Date.now(),                       // 用时间戳当 id，保证比内置商品大
      title,
      price,
      category: document.getElementById('category').value,
      condition: document.getElementById('condition').value,
      desc: document.getElementById('desc').value.trim() || '卖家没有写补充说明。',
      seller: '郭驰 · 本机发布',
      location: place,
      emoji: pickedEmoji,
      keywords: '',
      time: '刚刚'
    };

    const list = getUserPosts();
    list.unshift(post);
    saveUserPosts(list);

    location.href = 'index.html';
  });
});

function showError(msg) {
  const err = document.getElementById('formError');
  err.textContent = msg;
  err.hidden = false;
}
