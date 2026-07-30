/**
 * 小超市扫码收银系统 - 纯前端版（localStorage）
 */
var DEFAULT_DATA = {
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
  sales: [],
  settings: { shopName: '我的小超市', shopPhone: '', shopAddress: '' },
  nextId: { products: 23, scanLogs: 1, sales: 1 }
};

// ===== localStorage 数据层 =====
var storage = {
  _key: 'supermarket_data',
  _read: function () {
    try {
      var raw = localStorage.getItem(this._key);
      if (raw) { var d = JSON.parse(raw); d.sales = d.sales || []; d.nextId = d.nextId || { products: 1, scanLogs: 1, sales: 1 }; if (!d.nextId.sales) d.nextId.sales = 1; return d; }
    } catch (e) {}
    var defaults = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this._write(defaults);
    return defaults;
  },
  _write: function (data) { localStorage.setItem(this._key, JSON.stringify(data)); },

  getProducts: function () { return this._read().products; },
  getCategories: function () { var cats = this._read().products.map(function (p) { return p.category; }).filter(Boolean); return Array.from(new Set(cats)); },
  getProduct: function (id) { return this._read().products.find(function (p) { return p.id === id; }) || null; },
  getProductByBarcode: function (barcode) { return this._read().products.find(function (p) { return p.barcode === barcode; }) || null; },

  addProduct: function (data) {
    var d = this._read();
    if (d.products.some(function (p) { return p.barcode === data.barcode; })) throw new Error('该条码已存在');
    var id = 'p' + d.nextId.products; d.nextId.products++;
    var product = Object.assign({}, data, { id: id, updatedAt: new Date().toISOString() });
    d.products.push(product); this._write(d);
    return product;
  },
  updateProduct: function (id, data) {
    var d = this._read();
    var idx = d.products.findIndex(function (p) { return p.id === id; });
    if (idx === -1) throw new Error('商品不存在');
    if (data.barcode !== d.products[idx].barcode && d.products.some(function (p) { return p.id !== id && p.barcode === data.barcode; })) throw new Error('该条码已被其他商品使用');
    d.products[idx] = Object.assign({}, d.products[idx], data, { updatedAt: new Date().toISOString() });
    this._write(d);
    return d.products[idx];
  },
  deleteProduct: function (id) { var d = this._read(); d.products = d.products.filter(function (p) { return p.id !== id; }); this._write(d); },

  stockOp: function (id, qty) {
    var d = this._read();
    var p = d.products.find(function (x) { return x.id === id; });
    if (!p) throw new Error('商品不存在');
    var newStock = p.stock + qty;
    if (newStock < 0) throw new Error('库存不足，当前仅剩 ' + p.stock + ' ' + (p.unit || '件'));
    p.stock = newStock; p.updatedAt = new Date().toISOString();
    this._write(d);
    return { product: p, qty: qty, operation: qty > 0 ? '入库' : '出库' };
  },

  addScanLog: function (log) {
    var d = this._read(); d.scanLogs = d.scanLogs || [];
    var id = 's' + d.nextId.scanLogs; d.nextId.scanLogs++;
    d.scanLogs.unshift(Object.assign({}, log, { id: id, time: new Date().toISOString() }));
    if (d.scanLogs.length > 500) d.scanLogs = d.scanLogs.slice(0, 500);
    this._write(d);
  },
  getScanLogs: function (limit) { var logs = this._read().scanLogs || []; return logs.slice(0, limit || 100); },

  // --- 销售记录 ---
  addSale: function (sale) {
    var d = this._read();
    d.sales = d.sales || [];
    var today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    var todaySales = d.sales.filter(function (s) { return s.orderNo && s.orderNo.indexOf(today) === 0; });
    var num = String(todaySales.length + 1);
    while (num.length < 3) num = '0' + num;
    sale.orderNo = today + '-' + num;
    sale.id = 'sl' + d.nextId.sales; d.nextId.sales++;
    sale.time = new Date().toISOString();
    d.sales.unshift(sale);
    // 自动扣库存
    sale.items.forEach(function (item) {
      var p = d.products.find(function (x) { return x.id === item.productId; });
      if (p) { p.stock = p.stock - item.qty; p.updatedAt = new Date().toISOString(); }
    });
    this._write(d);
    return sale;
  },
  getSales: function (limit) { var sales = this._read().sales || []; return sales.slice(0, limit || 200); },
  getTodaySales: function () {
    var sales = this._read().sales || [];
    var today = new Date().toISOString().split('T')[0];
    return sales.filter(function (s) { return s.time && s.time.indexOf(today) === 0; });
  },
  getTodayStats: function () {
    var todaySales = this.getTodaySales();
    var revenue = todaySales.reduce(function (sum, s) { return sum + s.total; }, 0);
    var orderCount = todaySales.length;
    var avgPrice = orderCount > 0 ? revenue / orderCount : 0;
    // 分类统计支付方式
    var byMethod = { cash: 0, wechat: 0, alipay: 0 };
    todaySales.forEach(function (s) { if (byMethod.hasOwnProperty(s.payMethod)) byMethod[s.payMethod] = (byMethod[s.payMethod] || 0) + s.total; });
    // 热销排行
    var itemMap = {};
    todaySales.forEach(function (s) {
      s.items.forEach(function (item) {
        var key = item.name;
        if (!itemMap[key]) itemMap[key] = { name: key, qty: 0, amount: 0 };
        itemMap[key].qty += item.qty;
        itemMap[key].amount += item.qty * item.price;
      });
    });
    var ranking = Object.values(itemMap).sort(function (a, b) { return b.qty - a.qty; });
    return { revenue: revenue, orderCount: orderCount, avgPrice: avgPrice, byMethod: byMethod, ranking: ranking };
  },

  getSettings: function () { return this._read().settings || { shopName: '我的小超市', shopPhone: '', shopAddress: '' }; },
  updateSettings: function (data) { var d = this._read(); d.settings = Object.assign({}, d.settings, data); this._write(d); return d.settings; },

  exportAll: function () {
    var d = this._read();
    return { products: d.products, sales: d.sales, scanLogs: d.scanLogs, settings: d.settings, exportTime: new Date().toISOString() };
  },
  importAll: function (data) {
    if (!data.products || !Array.isArray(data.products)) throw new Error('无效的备份文件格式');
    var d = this._read();
    d.products = data.products.map(function (p, i) { if (!p.id) p.id = 'p' + (d.nextId.products + i); return p; });
    if (data.sales) d.sales = data.sales;
    if (data.settings) d.settings = Object.assign({}, d.settings, data.settings);
    var maxPid = Math.max(0, d.products.reduce(function (m, p) { var n = parseInt(String(p.id).replace('p', '')); return isNaN(n) ? m : Math.max(m, n); }, 0));
    d.nextId.products = maxPid + 1;
    this._write(d);
    return d.products.length;
  }
};

// ===== 工具函数 =====
var $ = function (s) { return document.querySelector(s); };
var $$ = function (s) { return document.querySelectorAll(s); };
var fmtMoney = function (n) { return '￥' + (Number(n) || 0).toFixed(2); };
var fmtTime = function (d) {
  if (!d) return '-';
  var dt = new Date(d);
  return String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0');
};
var fmtDate = function (d) {
  var dt = new Date(d);
  return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0');
};

function toast(msg, type) {
  var el = $('#toast');
  el.textContent = msg;
  el.className = 'toast ' + (type || '');
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(function () { el.style.display = 'none'; }, 1800);
}

// ===== 全局状态 =====
var state = {
  view: 'pos',
  products: [],
  categories: [],
  selectedCategory: '全部',
  productSearch: '',
  scanner: null,
  cameraActive: false,
  cart: [], // [{productId, name, price, qty, unit}]
  settings: {}
};

// ===== 导航 =====
function navigate(view) {
  state.view = view;
  $$('.bn-item').forEach(function (el) { el.classList.toggle('active', el.dataset.view === view); });
  var titles = { pos: '扫码收银', products: '商品列表', stock: '库存管理', records: '销售记录', stats: '经营统计' };
  $('#topbar-title').textContent = titles[view] || '小超市';
  $('#main-content').scrollTop = 0;
  stopScanner();
  state.cameraActive = false;

  switch (view) {
    case 'pos': renderPos(); break;
    case 'products': renderProducts(); break;
    case 'stock': renderStock(); break;
    case 'records': renderRecords(); break;
    case 'stats': renderStats(); break;
  }
}

// ===== 模态框 =====
function showModal(title, bodyHtml, footerHtml, onClose) {
  var overlay = $('#modal-overlay');
  var box = $('#modal-box');
  box.innerHTML = '<div class="modal-header"><span class="modal-title">' + title + '</span><button class="modal-close" onclick="closeModal()">&times;</button></div><div class="modal-body">' + bodyHtml + '</div>' + (footerHtml ? '<div class="modal-footer">' + footerHtml + '</div>' : '');
  overlay.style.display = 'flex';
  overlay._onClose = onClose;
}
function closeModal() { var o = $('#modal-overlay'); o.style.display = 'none'; if (o._onClose) o._onClose(); }
$('#modal-overlay').addEventListener('click', function (e) { if (e.target === this) closeModal(); });

// ===== 初始化 =====
function init() {
  if ('serviceWorker' in navigator) { navigator.serviceWorker.register('./sw.js').catch(function () {}); }
  loadProducts();
  $$('.bn-item').forEach(function (el) { el.addEventListener('click', function () { navigate(el.dataset.view); }); });
  $('#btn-settings').addEventListener('click', function () { renderSettings(); });
  navigate('pos');
}
function loadProducts() {
  try { state.products = storage.getProducts(); state.categories = storage.getCategories(); } catch (e) {}
}

// =====================================================
// 收银 POS
// =====================================================
function renderPos() {
  $('#main-content').innerHTML =
    '<div class="scan-area" id="scan-area"><div id="reader" style="width:100%"></div></div>' +
    '<div class="scan-hint">对准条形码自动识别，扫到即加入购物车</div>' +
    '<div class="scan-manual" style="margin-bottom:8px"><input type="text" class="input" id="manual-barcode" placeholder="手动输入条码号" inputmode="numeric"><button class="btn btn-primary btn-sm" id="btn-manual-scan">添加</button></div>' +
    '<div class="cart-section" id="cart-section"></div>';

  $('#btn-manual-scan').addEventListener('click', function () {
    var code = $('#manual-barcode').value.trim();
    if (code) { queryBarcode(code); $('#manual-barcode').value = ''; }
  });
  $('#manual-barcode').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { var code = e.target.value.trim(); if (code) { queryBarcode(code); e.target.value = ''; } }
  });
  startScanner();
  renderCart();
}

function startScanner() {
  if (state.cameraActive) return;
  if (typeof Html5Qrcode === 'undefined') {
    $('#scan-area').innerHTML = '<div style="padding:30px;color:#999;text-align:center">扫码库加载中，请刷新重试...</div>';
    return;
  }
  var scanner = new Html5Qrcode('reader');
  state.scanner = scanner;

  // 防抖标记
  var lastScan = 0;
  scanner.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 250, height: 100 }, aspectRatio: 1 },
    function (decodedText) {
      var now = Date.now();
      if (now - lastScan < 2000) return; // 2秒防抖
      lastScan = now;
      scanner.pause(true);
      state.cameraActive = true;
      queryBarcode(decodedText);
    },
    function () {}
  ).then(function () { state.cameraActive = true; }).catch(function () {
    state.cameraActive = false;
    $('#scan-area').innerHTML = '<div style="padding:36px 20px;color:#999;text-align:center"><div style="font-size:44px;margin-bottom:10px">📷</div><div>无法启动摄像头</div><div style="font-size:12px;margin-top:4px">请授予相机权限，或使用下方手动输入</div></div>';
  });
  scanner._resume = function () { scanner.resume(); state.cameraActive = true; };
}

function stopScanner() {
  if (state.scanner) { try { state.scanner.stop().catch(function () {}); } catch (e) {} state.scanner = null; state.cameraActive = false; }
}

function queryBarcode(barcode) {
  try {
    var product = storage.getProductByBarcode(barcode);
    storage.addScanLog({ barcode: barcode, found: !!product, productName: product ? product.name : '', price: product ? product.price : null });

    if (product) {
      if (product.stock <= 0) {
        toast('⚠ ' + product.name + ' 已售罄', 'error');
        resumeCamera();
        return;
      }
      addToCart(product);
      toast(product.name + '  ' + fmtMoney(product.price) + '  x1', 'success');
    } else {
      if (confirm('未找到条码 ' + barcode + '\n\n是否录入新商品？')) {
        showProductForm(null, barcode);
      }
    }
    resumeCamera();
  } catch (e) { toast(e.message, 'error'); resumeCamera(); }
}

function resumeCamera() {
  if (state.scanner && state.scanner._resume) {
    setTimeout(function () { if (state.scanner && state.scanner._resume) state.scanner._resume(); }, 1000);
  }
}

// ===== 购物车 =====
function addToCart(product) {
  var existing = state.cart.find(function (c) { return c.productId === product.id; });
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ productId: product.id, name: product.name, price: product.price, qty: 1, unit: product.unit || '件' });
  }
  renderCart();
}

function removeFromCart(idx) {
  state.cart.splice(idx, 1);
  renderCart();
}

function changeCartQty(idx, delta) {
  var item = state.cart[idx];
  var newQty = item.qty + delta;
  if (newQty <= 0) { removeFromCart(idx); return; }
  item.qty = newQty;
  renderCart();
}

function renderCart() {
  var section = $('#cart-section');
  if (!section) return;
  var total = state.cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var count = state.cart.reduce(function (s, i) { return s + i.qty; }, 0);

  var cartHtml = '';
  if (state.cart.length === 0) {
    cartHtml = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><div>购物车为空</div><div style="font-size:12px;margin-top:4px">扫码自动添加商品</div></div>';
  } else {
    cartHtml =
      '<div class="cart-total"><div><div class="cart-total-label">合计</div><div class="cart-count">' + count + ' 件商品</div></div>' +
      '<div class="cart-total-amount">' + fmtMoney(total) + '</div></div>' +
      '<div class="card" style="padding:8px 16px 0;">' +
      state.cart.map(function (item, idx) {
        return '<div class="cart-item">' +
          '<div class="ci-name">' + item.name + '<div class="ci-price">' + fmtMoney(item.price) + '/' + item.unit + '</div></div>' +
          '<div class="ci-qty"><button class="ci-qty-btn" onclick="changeCartQty(' + idx + ',-1)">−</button>' +
          '<span class="ci-qty-num">' + item.qty + '</span>' +
          '<button class="ci-qty-btn" onclick="changeCartQty(' + idx + ',1)">+</button></div>' +
          '<div class="ci-subtotal">' + fmtMoney(item.price * item.qty) + '</div>' +
          '<button class="ci-del" onclick="removeFromCart(' + idx + ')">✕</button>' +
          '</div>';
      }).join('') + '</div>';
  }

  var checkoutBtn = state.cart.length > 0
    ? '<div style="padding:8px 0"><button class="btn btn-success btn-block btn-lg" onclick="showCheckout()">💰 结账 ' + fmtMoney(total) + '</button></div>'
    : '';

  section.innerHTML = cartHtml + checkoutBtn;
}

// ===== 结账流程 =====
var checkoutPayMethod = 'wechat';
var checkoutPayAmount = 0;

function showCheckout() {
  var total = state.cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  checkoutPayMethod = 'wechat';
  checkoutPayAmount = total;

  var itemsHtml = state.cart.map(function (item) {
    return '<div class="checkout-item"><span>' + item.name + ' x' + item.qty + '</span><span>' + fmtMoney(item.price * item.qty) + '</span></div>';
  }).join('');

  var body = '<div class="checkout-total"><div class="label">应收金额</div><div class="amount">' + fmtMoney(total) + '</div></div>' +
    '<div class="checkout-items">' + itemsHtml + '</div>' +
    '<div class="pay-methods">' +
    '<div class="pay-method active" data-method="wechat" onclick="selectPayMethod(\'wechat\')"><div class="pm-icon">💚</div><div class="pm-name">微信</div></div>' +
    '<div class="pay-method" data-method="alipay" onclick="selectPayMethod(\'alipay\')"><div class="pm-icon">💙</div><div class="pm-name">支付宝</div></div>' +
    '<div class="pay-method" data-method="cash" onclick="selectPayMethod(\'cash\')"><div class="pm-icon">💵</div><div class="pm-name">现金</div></div>' +
    '</div>' +
    '<div class="cash-input-area" id="cash-area" style="display:none"><input class="input" type="number" id="cash-amount" placeholder="输入实收金额" value="' + total.toFixed(2) + '" step="0.01" oninput="updateChange()"></div>' +
    '<div id="change-area" style="display:none"></div>';

  var footer = '<button class="btn btn-outline" onclick="closeModal()">取消</button><button class="btn btn-primary btn-lg" id="btn-confirm-pay">确认收款</button>';

  showModal('结账', body, footer);

  updateChange();

  $('#btn-confirm-pay').addEventListener('click', function () {
    if (checkoutPayMethod === 'cash') {
      var cashAmt = parseFloat($('#cash-amount').value);
      if (isNaN(cashAmt) || cashAmt < total) return toast('实收金额不能小于应收金额', 'error');
      checkoutPayAmount = cashAmt;
    } else {
      checkoutPayAmount = total;
    }
    processCheckout();
  });
}

function selectPayMethod(method) {
  checkoutPayMethod = method;
  $$('.pay-method').forEach(function (el) { el.classList.toggle('active', el.dataset.method === method); });
  $('#cash-area').style.display = method === 'cash' ? 'block' : 'none';
  $('#change-area').style.display = method === 'cash' ? 'block' : 'none';
  updateChange();
}

function updateChange() {
  if (checkoutPayMethod !== 'cash') return;
  var total = state.cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var cashEl = $('#cash-amount');
  if (!cashEl) return;
  var cashAmt = parseFloat(cashEl.value);
  var changeArea = $('#change-area');
  if (!changeArea) return;
  if (!isNaN(cashAmt) && cashAmt >= total) {
    changeArea.innerHTML = '<div class="change-info">找零: ' + fmtMoney(cashAmt - total) + '</div>';
    changeArea.style.display = 'block';
  } else {
    changeArea.style.display = 'none';
  }
}

function processCheckout() {
  var total = state.cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var sale = {
    items: state.cart.map(function (item) { return { productId: item.productId, name: item.name, price: item.price, qty: item.qty }; }),
    total: total,
    payMethod: checkoutPayMethod,
    payAmount: checkoutPayAmount,
    change: checkoutPayMethod === 'cash' ? checkoutPayAmount - total : 0
  };
  try {
    storage.addSale(sale);
    toast('收款成功！' + fmtMoney(total), 'success');
    state.cart = [];
    closeModal();
    loadProducts();
    renderPos();
  } catch (e) { toast(e.message, 'error'); }
}

// =====================================================
// 商品列表
// =====================================================
function renderProducts() { loadProducts(); drawProducts(); }
function drawProducts() {
  var filtered = state.products;
  if (state.productSearch) { var s = state.productSearch.toLowerCase(); filtered = filtered.filter(function (p) { return p.name.toLowerCase().indexOf(s) !== -1 || p.barcode.indexOf(s) !== -1; }); }
  if (state.selectedCategory !== '全部') { filtered = filtered.filter(function (p) { return p.category === state.selectedCategory; }); }
  var allCats = ['全部'].concat(state.categories);
  var catHtml = allCats.map(function (c) { return '<span class="cat-chip' + (c === state.selectedCategory ? ' active' : '') + '" data-cat="' + c + '">' + c + '</span>'; }).join('');
  var listHtml = filtered.length === 0 ? '<div class="empty-state"><div class="empty-icon">📦</div><div>暂无商品</div></div>' : filtered.map(function (p) {
    var sc = '', sl = '库存: ' + p.stock + ' ' + (p.unit || '');
    if (p.stock <= 0) { sc = 'danger'; sl = '已售罄'; } else if (p.stock <= (p.lowStock || 5)) { sc = 'warn'; }
    return '<div class="product-item" onclick="editProduct(\'' + p.id + '\')"><div class="pi-left"><div class="pi-name">' + p.name + '</div><div class="pi-meta"><span>' + p.barcode + '</span><span>' + (p.category || '未分类') + '</span></div></div><div class="pi-right"><div class="pi-price">' + fmtMoney(p.price) + '</div><div class="pi-stock ' + sc + '">' + sl + '</div></div></div>';
  }).join('');
  $('#main-content').innerHTML = '<div class="product-search"><input type="text" class="input" id="product-search-input" placeholder="搜索商品名称或条码..." value="' + (state.productSearch || '') + '"></div><div class="category-bar">' + catHtml + '</div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><span style="font-size:13px;color:var(--text-light)">共 ' + filtered.length + ' 件商品</span><button class="btn btn-primary btn-sm" onclick="showProductForm()">+ 添加商品</button></div><div class="card" style="padding:0;">' + listHtml + '</div>';
  $('#product-search-input').addEventListener('input', function (e) { state.productSearch = e.target.value; drawProducts(); });
  $$('.cat-chip').forEach(function (c) { c.addEventListener('click', function () { state.selectedCategory = c.dataset.cat; drawProducts(); }); });
}

// =====================================================
// 库存管理
// =====================================================
function renderStock() {
  loadProducts();
  var ps = state.products;
  var lowStock = ps.filter(function (p) { return p.stock <= (p.lowStock || 5); });
  var outOfStock = ps.filter(function (p) { return p.stock <= 0; });
  var totalValue = ps.reduce(function (s, p) { return s + p.stock * (p.cost || p.price); }, 0);
  var listHtml = ps.length === 0 ? '<div class="empty-state"><div class="empty-icon">📊</div><div>暂无商品</div></div>' : ps.map(function (p) {
    var bc = 'ok'; if (p.stock <= 0) bc = 'danger'; else if (p.stock <= (p.lowStock || 5)) bc = 'warn';
    var maxStock = Math.max(p.stock, (p.lowStock || 5) * 3, 50);
    var pct = Math.min(100, (p.stock / maxStock) * 100);
    return '<div class="stock-item"><div class="si-left" style="cursor:pointer" onclick="editProduct(\'' + p.id + '\')"><div class="si-name">' + p.name + '</div><div class="si-bar-wrap"><div class="si-bar"><div class="si-bar-fill ' + bc + '" style="width:' + pct + '%"></div></div><span class="si-num" style="color:' + (bc === 'danger' ? 'var(--danger)' : bc === 'warn' ? 'var(--warning)' : 'var(--text-secondary)') + '">' + p.stock + ' ' + (p.unit || '') + '</span></div></div><div class="si-right"><button class="btn btn-outline btn-sm" onclick="stockOp(\'' + p.id + '\',1)">+1</button><button class="btn btn-outline btn-sm" onclick="stockOp(\'' + p.id + '\',-1)" style="color:var(--danger);border-color:var(--danger)">-1</button></div></div>';
  }).join('');
  $('#main-content').innerHTML = '<div class="stock-stats"><div class="stock-stat-card"><div class="stock-stat-value info">' + ps.length + '</div><div class="stock-stat-label">商品总数</div></div><div class="stock-stat-card"><div class="stock-stat-value warning">' + lowStock.length + '</div><div class="stock-stat-label">低库存预警</div></div><div class="stock-stat-card"><div class="stock-stat-value danger">' + outOfStock.length + '</div><div class="stock-stat-label">已售罄</div></div><div class="stock-stat-card"><div class="stock-stat-value info">' + fmtMoney(totalValue) + '</div><div class="stock-stat-label">库存总值</div></div></div><div class="card" style="padding:0;"><div style="padding:12px 16px;border-bottom:1px solid #f0f0f0;font-size:13px;color:var(--text-light)">点击商品编辑 | 右侧按钮快速出入库</div>' + listHtml + '</div>';
}
function stockOp(id, qty) {
  try { var result = storage.stockOp(id, qty); toast(result.operation + ': ' + result.qty + ' ' + (result.product.unit || '件'), 'success'); loadProducts(); renderStock(); } catch (e) { toast(e.message, 'error'); }
}

// =====================================================
// 销售记录
// =====================================================
function renderRecords() {
  var sales = storage.getSales(200);
  if (sales.length === 0) {
    $('#main-content').innerHTML = '<div class="empty-state"><div class="empty-icon">📋</div><div>暂无销售记录</div><div style="font-size:13px;margin-top:4px">收银后将自动记录</div></div>';
    return;
  }
  // 按日期分组
  var groups = {};
  sales.forEach(function (sa) {
    var d = sa.time ? fmtDate(sa.time) : '未知';
    if (!groups[d]) groups[d] = [];
    groups[d].push(sa);
  });

  var html = '';
  Object.keys(groups).forEach(function (date) {
    var daySales = groups[date];
    var dayTotal = daySales.reduce(function (s, sa) { return s + sa.total; }, 0);
    html += '<div class="record-date-header">' + date + ' (' + daySales.length + '单, ' + fmtMoney(dayTotal) + ')</div>';
    daySales.forEach(function (sa) {
      var methodLabel = sa.payMethod === 'cash' ? '现金' : sa.payMethod === 'wechat' ? '微信' : '支付宝';
      var itemsText = sa.items.map(function (it) { return it.name + 'x' + it.qty; }).join(' ');
      html += '<div class="record-item"><div class="ri-time">' + fmtTime(sa.time) + '</div><div class="ri-body"><div class="ri-order">' + (sa.orderNo || '') + '</div><div class="ri-items">' + itemsText + '</div></div><div class="ri-right"><div class="ri-total">' + fmtMoney(sa.total) + '</div><div class="ri-method">' + methodLabel + '</div></div></div>';
    });
  });

  $('#main-content').innerHTML = '<div style="font-size:13px;color:var(--text-light);margin-bottom:12px">共 ' + sales.length + ' 笔记录</div><div class="card" style="padding:0 16px;">' + html + '</div>';
}

// =====================================================
// 经营统计（今日）
// =====================================================
function renderStats() {
  var stats = storage.getTodayStats();
  var rankingHtml = stats.ranking.length === 0
    ? '<div style="padding:20px;text-align:center;color:var(--text-light)">今日暂无销售</div>'
    : stats.ranking.slice(0, 10).map(function (r, i) {
        var cls = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'other';
        return '<div class="ranking-item"><div class="rk-num ' + cls + '">' + (i + 1) + '</div><div class="rk-name">' + r.name + '</div><div class="rk-qty">x' + r.qty + '</div><div class="rk-amount">' + fmtMoney(r.amount) + '</div></div>';
      }).join('');

  var methodHtml =
    '<div style="display:flex;gap:8px;margin-bottom:8px">' +
    '<div style="flex:1;background:#fff;border-radius:8px;padding:10px;text-align:center"><div style="font-size:12px;color:var(--text-light)">💚 微信</div><div style="font-size:16px;font-weight:700;color:var(--success)">' + fmtMoney(stats.byMethod.wechat || 0) + '</div></div>' +
    '<div style="flex:1;background:#fff;border-radius:8px;padding:10px;text-align:center"><div style="font-size:12px;color:var(--text-light)">💙 支付宝</div><div style="font-size:16px;font-weight:700;color:var(--primary)">' + fmtMoney(stats.byMethod.alipay || 0) + '</div></div>' +
    '<div style="flex:1;background:#fff;border-radius:8px;padding:10px;text-align:center"><div style="font-size:12px;color:var(--text-light)">💵 现金</div><div style="font-size:16px;font-weight:700;color:var(--warning)">' + fmtMoney(stats.byMethod.cash || 0) + '</div></div>' +
    '</div>';

  $('#main-content').innerHTML =
    '<div class="card"><div class="card-title" style="margin-bottom:12px">📅 今日概览</div>' +
    '<div class="stats-overview">' +
    '<div class="stats-ov-card"><div class="ov-icon">💰</div><div class="ov-value primary">' + fmtMoney(stats.revenue) + '</div><div class="ov-label">营业额</div></div>' +
    '<div class="stats-ov-card"><div class="ov-icon">🧾</div><div class="ov-value primary">' + stats.orderCount + '</div><div class="ov-label">订单数</div></div>' +
    '<div class="stats-ov-card"><div class="ov-icon">📊</div><div class="ov-value success">' + fmtMoney(stats.avgPrice) + '</div><div class="ov-label">客单价</div></div>' +
    '<div class="stats-ov-card"><div class="ov-icon">🛒</div><div class="ov-value primary">' + stats.ranking.reduce(function (s, r) { return s + r.qty; }, 0) + '</div><div class="ov-label">售出件数</div></div>' +
    '</div>' +
    '<div class="card-title" style="margin-top:8px;margin-bottom:8px">💳 支付方式</div>' + methodHtml +
    '</div>' +
    '<div class="card"><div class="card-title" style="margin-bottom:8px">🏆 热销排行（今日）</div>' + rankingHtml + '</div>';
}

// =====================================================
// 商品表单（添加/编辑）
// =====================================================
function showProductForm(product, preBarcode) {
  var isEdit = !!product;
  var p = product || { name: '', barcode: preBarcode || '', category: '', price: '', cost: '', stock: '0', unit: '件', lowStock: '5' };
  var body = '<div class="form-group"><label class="form-label">商品条码 *</label><input class="input" id="f-barcode" value="' + (p.barcode || '') + '" placeholder="扫描或输入条码号"></div>' +
    '<div class="form-group"><label class="form-label">商品名称 *</label><input class="input" id="f-name" value="' + (p.name || '') + '" placeholder="如：康师傅红烧牛肉面"></div>' +
    '<div class="form-group"><label class="form-label">分类</label><input class="input" id="f-category" value="' + (p.category || '') + '" placeholder="如：饮料、零食" list="cat-list"><datalist id="cat-list">' + state.categories.map(function (c) { return '<option value="' + c + '">'; }).join('') + '</datalist></div>' +
    '<div class="form-row"><div class="form-group"><label class="form-label">售价 (元) *</label><input class="input" id="f-price" type="number" step="0.01" value="' + (p.price || '') + '" placeholder="0.00"></div><div class="form-group"><label class="form-label">进价 (元)</label><input class="input" id="f-cost" type="number" step="0.01" value="' + (p.cost || '') + '" placeholder="0.00"></div></div>' +
    '<div class="form-row"><div class="form-group"><label class="form-label">当前库存</label><input class="input" id="f-stock" type="number" value="' + (p.stock || 0) + '" placeholder="0"></div><div class="form-group"><label class="form-label">单位</label><input class="input" id="f-unit" value="' + (p.unit || '件') + '" placeholder="件/瓶/袋"></div></div>' +
    '<div class="form-group"><label class="form-label">低库存预警线</label><input class="input" id="f-lowStock" type="number" value="' + (p.lowStock || 5) + '" placeholder="低于此数时预警"></div>';
  var footer = (isEdit ? '<button class="btn btn-danger" onclick="deleteProduct(\'' + p.id + '\')" style="margin-right:auto">删除</button>' : '') + '<button class="btn btn-outline" onclick="closeModal()">取消</button><button class="btn btn-primary" id="btn-save">' + (isEdit ? '保存修改' : '添加商品') + '</button>';
  showModal(isEdit ? '编辑商品' : '添加商品', body, footer);
  $('#btn-save').addEventListener('click', function () {
    var data = { barcode: $('#f-barcode').value.trim(), name: $('#f-name').value.trim(), category: $('#f-category').value.trim(), price: parseFloat($('#f-price').value), cost: parseFloat($('#f-cost').value) || 0, stock: parseInt($('#f-stock').value) || 0, unit: $('#f-unit').value.trim() || '件', lowStock: parseInt($('#f-lowStock').value) || 5 };
    if (!data.barcode || !data.name || isNaN(data.price)) return toast('请填写条码、名称和售价', 'error');
    try {
      if (isEdit) { storage.updateProduct(p.id, data); toast('修改成功', 'success'); }
      else { storage.addProduct(data); toast('添加成功', 'success'); }
      closeModal(); loadProducts();
      if (state.view === 'products') drawProducts();
      if (state.view === 'stock') renderStock();
    } catch (e) { toast(e.message, 'error'); }
  });
}
function editProduct(id) { var p = state.products.find(function (x) { return x.id === id; }); if (p) showProductForm(p); }
function deleteProduct(id) {
  if (!confirm('确定删除此商品？此操作不可恢复。')) return;
  try { storage.deleteProduct(id); toast('已删除', 'success'); closeModal(); loadProducts(); if (state.view === 'products') drawProducts(); if (state.view === 'stock') renderStock(); } catch (e) { toast(e.message, 'error'); }
}

// =====================================================
// 系统设置
// =====================================================
function renderSettings() {
  var s = storage.getSettings();
  var body = '<div class="form-group"><label class="form-label">店铺名称</label><input class="input" id="s-name" value="' + (s.shopName || '') + '" placeholder="我的小超市"></div><div class="form-group"><label class="form-label">联系电话</label><input class="input" id="s-phone" value="' + (s.shopPhone || '') + '" placeholder="手机号"></div><div class="form-group"><label class="form-label">店铺地址</label><input class="input" id="s-address" value="' + (s.shopAddress || '') + '" placeholder="详细地址"></div><div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)"><div style="font-size:13px;color:var(--text-light);margin-bottom:8px">数据管理</div><button class="btn btn-outline btn-block" onclick="exportData()">📤 导出数据备份</button><div style="height:8px"></div><button class="btn btn-outline btn-block" onclick="importData()" style="color:var(--warning);border-color:var(--warning)">📥 导入数据恢复</button></div>';
  var footer = '<button class="btn btn-outline" onclick="closeModal()">取消</button><button class="btn btn-primary" id="btn-save-settings">保存设置</button>';
  showModal('系统设置', body, footer);
  $('#btn-save-settings').addEventListener('click', function () {
    storage.updateSettings({ shopName: $('#s-name').value.trim(), shopPhone: $('#s-phone').value.trim(), shopAddress: $('#s-address').value.trim() });
    state.settings = storage.getSettings(); toast('设置已保存', 'success'); closeModal();
  });
}
function exportData() {
  try {
    var data = storage.exportAll();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'supermarket-backup-' + new Date().toISOString().split('T')[0] + '.json';
    a.click(); toast('数据已导出', 'success');
  } catch (e) { toast('导出失败', 'error'); }
}
function importData() {
  var input = document.createElement('input'); input.type = 'file'; input.accept = '.json';
  input.onchange = function (e) {
    var file = e.target.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var data = JSON.parse(ev.target.result);
        if (!data.products || !Array.isArray(data.products)) return toast('无效的备份文件', 'error');
        if (!confirm('即将导入 ' + data.products.length + ' 件商品。当前数据将被覆盖，确定继续？')) return;
        storage.importAll(data); toast('导入成功', 'success'); closeModal(); loadProducts();
        if (state.view === 'products') drawProducts();
        if (state.view === 'stock') renderStock();
      } catch (err) { toast('导入失败: ' + err.message, 'error'); }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', init);
