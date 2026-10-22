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
