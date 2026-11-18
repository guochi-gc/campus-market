// ===== 数据访问：内置商品 + 本机发布的商品 =====
function getUserPosts() {
  return JSON.parse(localStorage.getItem('posts') || '[]');
}
function saveUserPosts(list) {
  localStorage.setItem('posts', JSON.stringify(list));
}
// 用户发布的排前面，内置的跟在后面
function getAllItems() {
  return getUserPosts().concat(items);
}

// ===== 订单与成交状态 =====
function getOrders() {
  return JSON.parse(localStorage.getItem('orders') || '[]');
}
function saveOrders(list) {
  localStorage.setItem('orders', JSON.stringify(list));
}
function getSoldIds() {
  return JSON.parse(localStorage.getItem('soldIds') || '[]');
}
function markSold(id) {
  const list = getSoldIds();
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem('soldIds', JSON.stringify(list));
  }
}
// 卖家自己标的已售，或者已经被人买走，都算已售出
function isItemSold(it) {
  return it.status === 'sold' || getSoldIds().includes(it.id);
}
function hasOrdered(id) {
  return getOrders().some(o => o.itemId === id);
}
