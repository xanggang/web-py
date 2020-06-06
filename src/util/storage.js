export function saveCache(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCache(key) {
  let val = localStorage.getItem(key);
  try {
    val = JSON.parse(val);
  } catch (error) {
    console.log('解析' + key + '出错！');
    val = '';
  }
  return val;
}

export function clearCacheAll() {
  localStorage.clear();
}

export function clearCacheByKey(key) {
  localStorage.removeItem(key);
}
