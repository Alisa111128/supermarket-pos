/**
 * 小超市扫码查价系统 - 纯前端版（localStorage）
 * 无需服务端，手机添加到主屏幕即可独立运行
 */

// ===== 默认数据 =====
const DEFAULT_DATA = {
  products: [
    { id: 'p1', barcode: '6901234567890', name: '康师傅红烧牛肉面', category: '方便食品', price: 4.50, cost: 3.20, stock: 48, unit: '袋', lowStock: 10, updatedAt: '' },
    { id: 'p2', barcode: '6901234567891', name: '统一老坛酸菜面', category: '方便食品', price: 4.50, cost: 3.10, stock: 35, unit: '袋', lowStock: 10, updatedAt: '' },
    { id: 'p3', barcode: '6901234567892', name: '农夫山泉550ml', category: '饮料', price: 2.00, cost: 1.20, stock: 120, unit: '瓶', lowStock: 20, updatedAt: '' },
    { id: 'p4', barcode: '6901234567893', name: '百事可乐500ml', category: '饮料', price: 3.00, cost: 2.10, stock: 80, unit: '瓶', lowStock: 15, updatedAt: '' },
    { id: 'p5', barcode: '6901234567894', name: '可口可乐500ml', category: '饮料', price: 3.00, cost: 2.10, stock: 72, unit: '瓶', lowStock: 15, updatedAt: '' },
    { id: 'p6', barcode: '6901234567895', name: '雪碧500ml', category: '饮料', price: 3.00, cost: 2.05, stock: 60, unit: '瓶', lowStock: 15, updatedAt: '' },
    { id: 'p7', barcode: '6901234567896', name: '伊利纯牛奶250ml', category: '乳制品', price: 3.50, cost: 2.60, stock: 40, unit: '盒', lowStock: 10, updatedAt: '' },
    { id: 'p8', barcode: '6901234567897', name: '蒙牛纯牛奶250ml', category: '乳制品', price: 3.50, cost: 2.55, stock: 36, unit: '盒', lowStock: 10, updatedAt: '' },
    { id: 'p9', barcode: '6901234567898', name: '奥利奥饼干原味', category: '零食', price: 8.90, cost: 6.50, stock: 25, unit: '盒', lowStock: 5, updatedAt: '' },
    { id: 'p10', barcode: '6901234567899', name: '乐事薯片原味', category: '零食', price: 7.50, cost: 5.20, stock: 30, unit: '袋', lowStock: 8, updatedAt: '' },
    { id: 'p11', barcode: '6901234567900', name: '海飞丝洗发水200ml', category: '日用品', price: 29.90, cost: 22.00, stock: 15, unit: '瓶', lowStock: 3, updatedAt: '' },
    { id: 'p12', barcode: '6901234567901', name: '佳洁士牙膏120g', category: '日用品', price: 12.90, cost: 9.50, stock: 20, unit: '支', lowStock: 5, updatedAt: '' },
    { id: 'p13', barcode: '6901234567902', name: '心相印抽纸3包装', category: '日用品', price: 9.90, cost: 7.20, stock: 40, unit: '包', lowStock: 10, updatedAt: '' },
    { id: 'p14', barcode: '6901234567903', name: '旺仔牛奶245ml', category: '乳制品', price: 5.00, cost: 3.80, stock: 28, unit: '罐', lowStock: 8, updatedAt: '' },
    { id: 'p15', barcode: '6901234567904', name: '双汇王中王火腿肠', category: '方便食品', price: 2.50, cost: 1.70, stock: 100, unit: '根', lowStock: 20, updatedAt: '' },
    { id: 'p16', barcode: '6901234567905', name: '红牛维生素饮料250ml', category: '饮料', price: 6.00, cost: 4.50, stock: 45, unit: '罐', lowStock: 10, updatedAt: '' },
    { id: 'p17', barcode: '6901234567906', name: '德芙巧克力80g', category: '零食', price: 15.90, cost: 11.50, stock: 18, unit: '块', lowStock: 5, updatedAt: '' },
    { id: 'p18', barcode: '6901234567907', name: '三只松鼠每日坚果', category: '零食', price: 24.90, cost: 18.00, stock: 12, unit: '袋', lowStock: 3, updatedAt: '' },
    { id: 'p19', barcode: '6901234567908', name: '金龙鱼调和油1.8L', category: '粮油调味', price: 35.90, cost: 28.00, stock: 20, unit: '瓶', lowStock: 5, updatedAt: '' },
    { id: 'p20', barcode: '6901234567909', name: '海天酱油500ml', category: '粮油调味', price: 8.50, cost: 6.00, stock: 28, unit: '瓶', lowStock: 6, updatedAt: '' },
    { id: 'p21', barcode: '6901234567910', name: '老干妈风味豆豉280g', category: '粮油调味', price: 11.50, cost: 8.50, stock: 22, unit: '瓶', lowStock: 5, updatedAt: '' },
    { id: 'p22', barcode: '6901234567911', name: '清风卷纸10卷装', category: '日用品', price: 25.90, cost: 19.00, stock: 15, unit: '提', lowStock: 3, updatedAt: '' }
  ],
  scanLogs: [],
  settings: { shopName: '我的小超市', shopPhone: '', shopAddress: '' },
  nextId: { products: 23, scanLogs: 1 }
};

// ===== localStorage 数据层（替代后端API） =====
const storage = {
  _key: 'supermarket_data',

  _read() {
    try {
      const raw = localStorage.getItem(this._key);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    // 首次使用，写入默认数据
    const defaults = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this._write(defaults);
    return defaults;
  },

  _write(data) {
    localStorage.setItem(this._key, JSON.stringify(data));
  },

  // --- 商品 ---
  getProducts() {
    return this._read().products;
  },

  getCategories() {
    const cats = this._read().products.map(p => p.category).filter(Boolean);
    return [...new Set(cats)];
  },

  getProduct(id) {
    return this._read().products.find(p => p.id === id) || null;
  },

  getProductByBarcode(barcode) {
    return this._read().products.find(p => p.barcode === barcode) || null;
  },

  addProduct(data) {
    const d = this._read();
    if (d.products.some(p => p.barcode === data.barcode)) {
      throw new Error('该条码已存在');
    }
    d.nextId = d.nextId || { products: 1, scanLogs: 1 };
    if (!d.nextId.products) d.nextId.products = 1;
    const id = 'p' + d.nextId.products;
    d.nextId.products++;
    const product = { ...data, id, updatedAt: new Date().toISOString() };
    d.products.push(product);
    this._write(d);
    return product;
  },

  updateProduct(id, data) {
    const d = this._read();
    const idx = d.products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('商品不存在');
    // 条码唯一性检查（排除自身）
    if (data.barcode !== d.products[idx].barcode &&
        d.products.some(p => p.id !== id && p.barcode === data.barcode)) {
      throw new Error('该条码已被其他商品使用');
    }
    d.products[idx] = { ...d.products[idx], ...data, updatedAt: new Date().toISOString() };
    this._write(d);
    return d.products[idx];
  },

  deleteProduct(id) {
    const d = this._read();
    d.products = d.products.filter(p => p.id !== id);
    this._write(d);
  },

  // --- 库存操作 ---
  stockOp(id, qty) {
    const d = this._read();
    const p = d.products.find(x => x.id === id);
    if (!p) throw new Error('商品不存在');
    const newStock = p.stock + qty;
    if (newStock < 0) throw new Error('库存不足，当前仅剩 ' + p.stock + ' ' + (p.unit || '件'));
    if (newStock > 99999) throw new Error('库存数量过大');
    p.stock = newStock;
    p.updatedAt = new Date().toISOString();
    this._write(d);
    return { product: p, qty: qty, operation: qty > 0 ? '入库' : '出库' };
  },

  // --- 扫码记录 ---
  addScanLog(log) {
    const d = this._read();
    d.scanLogs = d.scanLogs || [];
    d.nextId = d.nextId || { products: 1, scanLogs: 1 };
    if (!d.nextId.scanLogs) d.nextId.scanLogs = 1;
    const id = 's' + d.nextId.scanLogs;
    d.nextId.scanLogs++;
    const entry = { id, ...log, time: new Date().toISOString() };
    d.scanLogs.unshift(entry);
    if (d.scanLogs.length > 500) d.scanLogs = d.scanLogs.slice(0, 500);
    this._write(d);
    return entry;
  },

  getScanLogs(limit) {
    const logs = this._read().scanLogs || [];
    return logs.slice(0, limit || 100);
  },

  // --- 设置 ---
  getSettings() {
    return this._read().settings || { shopName: '我的小超市', shopPhone: '', shopAddress: '' };
  },

  updateSettings(data) {
    const d = this._read();
    d.settings = { ...d.settings, ...data };
    this._write(d);
    return d.settings;
  },

  // --- 导出/导入 ---
  exportAll() {
    const d = this._read();
    return {
      products: d.products,
      settings: d.settings,
      exportTime: new Date().toISOString()
    };
  },

  importAll(data) {
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('无效的备份文件格式');
    }
    const d = this._read();
    // 用导入的商品替换现有商品
    const importedProducts = data.products.map((p, i) => {
      // 确保每个商品有唯一 ID
      if (!p.id) p.id = 'p' + (d.nextId.products + i);
      return p;
    });
    d.products = importedProducts;
    // 更新 nextId
    const maxPid = Math.max(0, ...importedProducts.map(p => {
      const n = parseInt(String(p.id).replace('p', ''));
      return isNaN(n) ? 0 : n;
    }));
    d.nextId.products = maxPid + 1;
    if (data.settings) d.settings = { ...d.settings, ...data.settings };
    this._write(d);
    return d.products.length;
  }
};

// ===== 工具函数 =====
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const fmtMoney = n => '￥' + (Number(n) || 0).toFixed(2);
const fmtDateTime = d => {
  if (!d) return '-';
  const dt = new Date(d);
  const now = new Date();
  if (dt.toDateString() === now.toDateString()) {
    return '今天 ' + String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
  }
  return (dt.getMonth() + 1) + '/' + dt.getDate() + ' ' + String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
};

function toast(msg, type) {
  type = type || '';
  var el = $('#toast');
  el.textContent = msg;
  el.className = 'toast ' + type;
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(function () { el.style.display = 'none'; }, 2000);
}

// ===== 状态 =====
var state = {
  view: 'scan',
  products: [],
  categories: [],
  selectedCategory: '全部',
  productSearch: '',
  scanResult: null,
  scanner: null,
  cameraActive: false,
  settings: {}
};

// ===== 导航 =====
function navigate(view) {
  state.view = view;
  $$('.bn-item').forEach(function (el) { el.classList.toggle('active', el.dataset.view === view); });
  var titles = { scan: '扫码查价', products: '商品列表', stock: '库存管理', history: '扫码记录' };
  $('#topbar-title').textContent = titles[view] || '小超市';
  $('#main-content').scrollTop = 0;
  stopScanner();
  state.cameraActive = false;

  switch (view) {
    case 'scan': renderScan(); break;
    case 'products': renderProducts(); break;
    case 'stock': renderStock(); break;
    case 'history': renderHistory(); break;
  }
}

// ===== 模态框 =====
function showModal(title, bodyHtml, footerHtml, onClose) {
  var overlay = $('#modal-overlay');
  var box = $('#modal-box');
  box.innerHTML =
    '<div class="modal-header">' +
    '<span class="modal-title">' + title + '</span>' +
    '<button class="modal-close" onclick="closeModal()">&times;</button>' +
    '</div>' +
    '<div class="modal-body">' + bodyHtml + '</div>' +
    (footerHtml ? '<div class="modal-footer">' + footerHtml + '</div>' : '');
  overlay.style.display = 'flex';
  overlay._onClose = onClose;
}
function closeModal() {
  var overlay = $('#modal-overlay');
  overlay.style.display = 'none';
  if (overlay._onClose) overlay._onClose();
}
$('#modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// ===== 初始化 =====
function init() {
  // 注册 Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(function () {});
  }

  // 首次加载数据
  loadProducts();

  // 事件绑定
  $$('.bn-item').forEach(function (el) {
    el.addEventListener('click', function () { navigate(el.dataset.view); });
  });
  $('#btn-settings').addEventListener('click', function () { renderSettings(); });
  navigate('scan');
}

function loadProducts() {
  try {
    state.products = storage.getProducts();
    state.categories = storage.getCategories();
  } catch (e) {
    console.error('加载数据失败', e);
  }
}

// =====================================================
// 扫码页
// =====================================================
function renderScan() {
  $('#main-content').innerHTML =
    '<div class="scan-container">' +
    '<div class="scan-area" id="scan-area">' +
    '<div id="reader" style="width:100%"></div>' +
    '</div>' +
    '<div id="scan-result-area"></div>' +
    '<div class="scan-manual">' +
    '<input type="text" class="input" id="manual-barcode" placeholder="或手动输入条码号后点查询" inputmode="numeric">' +
    '<button class="btn btn-primary" id="btn-manual-scan">查询</button>' +
    '</div>' +
    '</div>';

  $('#btn-manual-scan').addEventListener('click', function () {
    var code = $('#manual-barcode').value.trim();
    if (code) queryBarcode(code);
  });
  $('#manual-barcode').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var code = e.target.value.trim();
      if (code) queryBarcode(code);
    }
  });

  startScanner();
}

function startScanner() {
  if (state.cameraActive) return;
  if (typeof Html5Qrcode === 'undefined') {
    $('#scan-area').innerHTML = '<div style="padding:30px;color:#999;text-align:center">扫码库加载中，请稍后刷新重试...</div>';
    return;
  }

  var scanner = new Html5Qrcode('reader');
  state.scanner = scanner;

  scanner.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 250, height: 100 }, aspectRatio: 1 },
    function (decodedText) {
      scanner.pause(true);
      state.cameraActive = true;
      queryBarcode(decodedText);
    },
    function () {}
  ).then(function () {
    state.cameraActive = true;
  }).catch(function (err) {
    console.error('摄像头启动失败:', err);
    state.cameraActive = false;
    $('#scan-area').innerHTML =
      '<div style="padding:40px 20px;color:#999;text-align:center">' +
      '<div style="font-size:48px;margin-bottom:12px">📷</div>' +
      '<div>无法启动摄像头</div>' +
      '<div style="font-size:13px;margin-top:4px">请确保已授予相机权限</div>' +
      '<div style="font-size:13px">或使用下方手动输入条码</div>' +
      '</div>';
  });

  scanner._resumeScanner = function () {
    scanner.resume();
    state.cameraActive = true;
  };
}

function stopScanner() {
  if (state.scanner) {
    try { state.scanner.stop().catch(function () {}); } catch (e) {}
    state.scanner = null;
    state.cameraActive = false;
  }
}

function queryBarcode(barcode) {
  try {
    var product = storage.getProductByBarcode(barcode);

    // 记录扫码日志
    var log = storage.addScanLog({
      barcode: barcode,
      found: !!product,
      productName: product ? product.name : '',
      price: product ? product.price : null
    });

    var result = { found: !!product, product: product, log: log };
    state.scanResult = result;
    showScanResult(result);
  } catch (e) {
    toast('查询失败: ' + e.message, 'error');
    resumeCamera();
  }
}

function showScanResult(data) {
  var area = $('#scan-result-area');
  if (data.found && data.product) {
    var p = data.product;
    var stockClass = p.stock <= 0 ? 'stock-out' : (p.stock <= (p.lowStock || 5) ? 'stock-low' : 'stock-ok');
    area.innerHTML =
      '<div class="scan-result">' +
      '<div class="product-name">' + p.name + '</div>' +
      '<div class="product-barcode">' + p.barcode + '</div>' +
      '<div class="product-info">' +
      '<div class="info-item"><div class="info-value price">' + fmtMoney(p.price) + '</div><div class="info-label">售价</div></div>' +
      '<div class="info-item"><div class="info-value ' + stockClass + '">' + p.stock + ' ' + (p.unit || '件') + '</div><div class="info-label">' + (p.stock <= 0 ? '❌ 已售罄' : p.stock <= (p.lowStock || 5) ? '⚠️ 库存偏低' : '库存充足') + '</div></div>' +
      '</div>' +
      '<div class="scan-actions">' +
      '<button class="btn btn-outline" onclick="resumeCamera()">继续扫描</button>' +
      '<button class="btn btn-primary" onclick="editProduct(\'' + p.id + '\')">编辑商品</button>' +
      '</div></div>';
  } else {
    area.innerHTML =
      '<div class="scan-not-found">' +
      '<div class="icon">📭</div>' +
      '<div class="msg">未找到此商品</div>' +
      '<div class="barcode-show">' + data.log.barcode + '</div>' +
      '<div class="scan-actions">' +
      '<button class="btn btn-outline" onclick="resumeCamera()">继续扫描</button>' +
      '<button class="btn btn-primary" onclick="addProductWithBarcode(\'' + data.log.barcode + '\')">录入新商品</button>' +
      '</div></div>';
  }
}

function resumeCamera() {
  $('#scan-result-area').innerHTML = '';
  state.scanResult = null;
  if (state.scanner && state.scanner._resumeScanner) {
    state.scanner._resumeScanner();
  }
}

function addProductWithBarcode(barcode) {
  showProductForm(null, barcode);
}

// =====================================================
// 商品列表
// =====================================================
function renderProducts() {
  loadProducts();
  drawProducts();
}

function drawProducts() {
  var filtered = state.products;
  if (state.productSearch) {
    var s = state.productSearch.toLowerCase();
    filtered = filtered.filter(function (p) {
      return p.name.toLowerCase().indexOf(s) !== -1 || p.barcode.indexOf(s) !== -1;
    });
  }
  if (state.selectedCategory !== '全部') {
    filtered = filtered.filter(function (p) { return p.category === state.selectedCategory; });
  }

  var allCats = ['全部'].concat(state.categories);
  var catHtml = allCats.map(function (c) {
    return '<span class="cat-chip' + (c === state.selectedCategory ? ' active' : '') + '" data-cat="' + c + '">' + c + '</span>';
  }).join('');

  var listHtml = filtered.length === 0
    ? '<div class="empty-state"><div class="empty-icon">📦</div><div>暂无商品</div></div>'
    : filtered.map(function (p) {
        var stockClass = '';
        var stockLabel = '库存: ' + p.stock + ' ' + (p.unit || '');
        if (p.stock <= 0) { stockClass = 'danger'; stockLabel = '已售罄'; }
        else if (p.stock <= (p.lowStock || 5)) { stockClass = 'warn'; }
        return '<div class="product-item" onclick="editProduct(\'' + p.id + '\')">' +
          '<div class="pi-left"><div class="pi-name">' + p.name + '</div>' +
          '<div class="pi-meta"><span>' + p.barcode + '</span><span>' + (p.category || '未分类') + '</span></div></div>' +
          '<div class="pi-right"><div class="pi-price">' + fmtMoney(p.price) + '</div>' +
          '<div class="pi-stock ' + stockClass + '">' + stockLabel + '</div></div></div>';
      }).join('');

  $('#main-content').innerHTML =
    '<div class="product-search"><input type="text" class="input" id="product-search-input" placeholder="搜索商品名称或条码..." value="' + (state.productSearch || '') + '"></div>' +
    '<div class="category-bar">' + catHtml + '</div>' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
    '<span style="font-size:13px;color:var(--text-light)">共 ' + filtered.length + ' 件商品</span>' +
    '<button class="btn btn-primary btn-sm" onclick="showProductForm()">+ 添加商品</button></div>' +
    '<div class="card" style="padding:0;">' + listHtml + '</div>';

  $('#product-search-input').addEventListener('input', function (e) {
    state.productSearch = e.target.value;
    drawProducts();
  });
  $$('.cat-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      state.selectedCategory = chip.dataset.cat;
      drawProducts();
    });
  });
}

// =====================================================
// 库存管理
// =====================================================
function renderStock() {
  loadProducts();
  var products = state.products;
  var lowStock = products.filter(function (p) { return p.stock <= (p.lowStock || 5); });
  var outOfStock = products.filter(function (p) { return p.stock <= 0; });
  var totalValue = products.reduce(function (sum, p) { return sum + p.stock * (p.cost || p.price); }, 0);

  var listHtml = products.length === 0
    ? '<div class="empty-state"><div class="empty-icon">📊</div><div>暂无商品</div></div>'
    : products.map(function (p) {
        var barClass = 'ok';
        if (p.stock <= 0) barClass = 'danger';
        else if (p.stock <= (p.lowStock || 5)) barClass = 'warn';
        var maxStock = Math.max(p.stock, (p.lowStock || 5) * 3, 50);
        var pct = Math.min(100, (p.stock / maxStock) * 100);
        return '<div class="stock-item">' +
          '<div class="si-left" style="cursor:pointer" onclick="editProduct(\'' + p.id + '\')">' +
          '<div class="si-name">' + p.name + '</div>' +
          '<div class="si-bar-wrap"><div class="si-bar"><div class="si-bar-fill ' + barClass + '" style="width:' + pct + '%"></div></div>' +
          '<span class="si-num" style="color:' + (barClass === 'danger' ? 'var(--danger)' : barClass === 'warn' ? 'var(--warning)' : 'var(--text-secondary)') + '">' + p.stock + ' ' + (p.unit || '') + '</span></div></div>' +
          '<div class="si-right">' +
          '<button class="btn btn-outline btn-sm" onclick="stockOp(\'' + p.id + '\', 1)">+1</button>' +
          '<button class="btn btn-outline btn-sm" onclick="stockOp(\'' + p.id + '\', -1)" style="color:var(--danger);border-color:var(--danger)">-1</button>' +
          '</div></div>';
      }).join('');

  $('#main-content').innerHTML =
    '<div class="stock-stats">' +
    '<div class="stock-stat-card"><div class="stock-stat-value info">' + products.length + '</div><div class="stock-stat-label">商品总数</div></div>' +
    '<div class="stock-stat-card"><div class="stock-stat-value warning">' + lowStock.length + '</div><div class="stock-stat-label">低库存预警</div></div>' +
    '<div class="stock-stat-card"><div class="stock-stat-value danger">' + outOfStock.length + '</div><div class="stock-stat-label">已售罄</div></div>' +
    '<div class="stock-stat-card"><div class="stock-stat-value info">' + fmtMoney(totalValue) + '</div><div class="stock-stat-label">库存总值</div></div>' +
    '</div>' +
    '<div class="card" style="padding:0;">' +
    '<div style="padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:13px;color:var(--text-light)">点击商品编辑 | 右侧按钮快速出入库</div>' +
    listHtml + '</div>';
}

function stockOp(id, qty) {
  try {
    var result = storage.stockOp(id, qty);
    toast(result.operation + ': ' + result.qty + ' ' + (result.product.unit || '件'), 'success');
    loadProducts();
    renderStock();
  } catch (e) {
    toast(e.message, 'error');
  }
}

// =====================================================
// 扫码记录
// =====================================================
function renderHistory() {
  var logs = storage.getScanLogs(100);
  var html = logs.length === 0
    ? '<div class="empty-state"><div class="empty-icon">📋</div><div>暂无扫码记录</div><div style="font-size:13px;margin-top:4px">扫码后将自动记录</div></div>'
    : logs.map(function (l) {
        var icon = l.found ? '✅' : '❓';
        return '<div class="log-item">' +
          '<div class="li-icon">' + icon + '</div>' +
          '<div class="li-content">' +
          '<div class="li-name">' + (l.productName || '未知商品') + '</div>' +
          '<div class="li-barcode">' + l.barcode + '</div>' +
          '<div class="li-time">' + fmtDateTime(l.time) + '</div></div>' +
          (l.price != null ? '<div class="li-price">' + fmtMoney(l.price) + '</div>' : '') +
          '</div>';
      }).join('');

  $('#main-content').innerHTML =
    '<div style="font-size:13px;color:var(--text-light);margin-bottom:12px">共 ' + logs.length + ' 条记录（最多保留500条）</div>' +
    '<div class="card" style="padding:0;">' + html + '</div>';
}

// =====================================================
// 商品表单（添加/编辑）
// =====================================================
function showProductForm(product, preBarcode) {
  var isEdit = !!product;
  var p = product || { name: '', barcode: preBarcode || '', category: '', price: '', cost: '', stock: '0', unit: '件', lowStock: '5' };

  var body =
    '<div class="form-group"><label class="form-label">商品条码 *</label>' +
    '<input class="input" id="f-barcode" value="' + (p.barcode || '') + '" placeholder="扫描或输入条码号"></div>' +
    '<div class="form-group"><label class="form-label">商品名称 *</label>' +
    '<input class="input" id="f-name" value="' + (p.name || '') + '" placeholder="如：康师傅红烧牛肉面"></div>' +
    '<div class="form-group"><label class="form-label">分类</label>' +
    '<input class="input" id="f-category" value="' + (p.category || '') + '" placeholder="如：饮料、零食、日用品" list="cat-list">' +
    '<datalist id="cat-list">' + state.categories.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist></div>' +
    '<div class="form-row"><div class="form-group"><label class="form-label">售价 (元) *</label>' +
    '<input class="input" id="f-price" type="number" step="0.01" value="' + (p.price || '') + '" placeholder="0.00"></div>' +
    '<div class="form-group"><label class="form-label">进价 (元)</label>' +
    '<input class="input" id="f-cost" type="number" step="0.01" value="' + (p.cost || '') + '" placeholder="0.00"></div></div>' +
    '<div class="form-row"><div class="form-group"><label class="form-label">当前库存</label>' +
    '<input class="input" id="f-stock" type="number" value="' + (p.stock || 0) + '" placeholder="0"></div>' +
    '<div class="form-group"><label class="form-label">单位</label>' +
    '<input class="input" id="f-unit" value="' + (p.unit || '件') + '" placeholder="件/瓶/袋"></div></div>' +
    '<div class="form-group"><label class="form-label">低库存预警线</label>' +
    '<input class="input" id="f-lowStock" type="number" value="' + (p.lowStock || 5) + '" placeholder="低于此数时预警"></div>';

  var footer =
    (isEdit ? '<button class="btn btn-danger" onclick="deleteProduct(\'' + p.id + '\')" style="margin-right:auto">删除</button>' : '') +
    '<button class="btn btn-outline" onclick="closeModal()">取消</button>' +
    '<button class="btn btn-primary" id="btn-save">' + (isEdit ? '保存修改' : '添加商品') + '</button>';

  showModal(isEdit ? '编辑商品' : '添加商品', body, footer);

  $('#btn-save').addEventListener('click', function () {
    var data = {
      barcode: $('#f-barcode').value.trim(),
      name: $('#f-name').value.trim(),
      category: $('#f-category').value.trim(),
      price: parseFloat($('#f-price').value),
      cost: parseFloat($('#f-cost').value) || 0,
      stock: parseInt($('#f-stock').value) || 0,
      unit: $('#f-unit').value.trim() || '件',
      lowStock: parseInt($('#f-lowStock').value) || 5
    };
    if (!data.barcode || !data.name || isNaN(data.price)) {
      return toast('请填写条码、名称和售价', 'error');
    }
    try {
      if (isEdit) {
        storage.updateProduct(p.id, data);
        toast('修改成功', 'success');
      } else {
        storage.addProduct(data);
        toast('添加成功', 'success');
      }
      closeModal();
      loadProducts();
      if (state.view === 'products') drawProducts();
      if (state.view === 'stock') renderStock();
    } catch (e) {
      toast(e.message, 'error');
    }
  });
}

function editProduct(id) {
  var p = state.products.find(function (x) { return x.id === id; });
  if (p) showProductForm(p);
}

function deleteProduct(id) {
  if (!confirm('确定删除此商品？此操作不可恢复。')) return;
  try {
    storage.deleteProduct(id);
    toast('已删除', 'success');
    closeModal();
    loadProducts();
    if (state.view === 'products') drawProducts();
    if (state.view === 'stock') renderStock();
  } catch (e) {
    toast(e.message, 'error');
  }
}

// =====================================================
// 系统设置
// =====================================================
function renderSettings() {
  var s = storage.getSettings();

  var body =
    '<div class="form-group"><label class="form-label">店铺名称</label>' +
    '<input class="input" id="s-name" value="' + (s.shopName || '') + '" placeholder="我的小超市"></div>' +
    '<div class="form-group"><label class="form-label">联系电话</label>' +
    '<input class="input" id="s-phone" value="' + (s.shopPhone || '') + '" placeholder="手机号"></div>' +
    '<div class="form-group"><label class="form-label">店铺地址</label>' +
    '<input class="input" id="s-address" value="' + (s.shopAddress || '') + '" placeholder="详细地址"></div>' +
    '<div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">' +
    '<div style="font-size:13px;color:var(--text-light);margin-bottom:8px">数据管理</div>' +
    '<button class="btn btn-outline btn-block" onclick="exportData()">📤 导出数据备份</button>' +
    '<div style="height:8px"></div>' +
    '<button class="btn btn-outline btn-block" onclick="importData()" style="color:var(--warning);border-color:var(--warning)">📥 导入数据恢复</button>' +
    '</div>';

  var footer =
    '<button class="btn btn-outline" onclick="closeModal()">取消</button>' +
    '<button class="btn btn-primary" id="btn-save-settings">保存设置</button>';

  showModal('系统设置', body, footer);

  $('#btn-save-settings').addEventListener('click', function () {
    var data = {
      shopName: $('#s-name').value.trim(),
      shopPhone: $('#s-phone').value.trim(),
      shopAddress: $('#s-address').value.trim()
    };
    storage.updateSettings(data);
    state.settings = storage.getSettings();
    toast('设置已保存', 'success');
    closeModal();
  });
}

function exportData() {
  try {
    var data = storage.exportAll();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    var today = new Date().toISOString().split('T')[0];
    a.download = 'supermarket-backup-' + today + '.json';
    a.click();
    toast('数据已导出', 'success');
  } catch (e) {
    toast('导出失败', 'error');
  }
}

function importData() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var data = JSON.parse(ev.target.result);
        if (!data.products || !Array.isArray(data.products)) {
          return toast('无效的备份文件', 'error');
        }
        if (!confirm('即将导入 ' + data.products.length + ' 件商品。当前数据将被覆盖，确定继续？')) return;
        var count = storage.importAll(data);
        toast('已导入 ' + count + ' 件商品', 'success');
        closeModal();
        loadProducts();
        if (state.view === 'products') drawProducts();
        if (state.view === 'stock') renderStock();
      } catch (err) {
        toast('导入失败: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', init);
