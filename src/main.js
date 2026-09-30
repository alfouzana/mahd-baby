import "./style.css";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sar = (n) => `${n} ر.س`;

// ---------- colors & sizes ----------
const COLORS = {
  sage: { name: "مريمية", hex: "#b4c8bb" },
  cream: { name: "كريمي", hex: "#efe5d6" },
  blush: { name: "وردي هادئ", hex: "#efd2c9" },
  sky: { name: "سماوي", hex: "#cfdfe9" },
  oat: { name: "شوفاني", hex: "#e2d3bd" },
};

const SIZES = [
  { id: "nb", label: "مولود جديد", w: [0, 4], h: "حتى 56 سم" },
  { id: "0-3", label: "0-3 شهور", w: [4, 6], h: "56 - 62 سم" },
  { id: "3-6", label: "3-6 شهور", w: [6, 8], h: "62 - 68 سم" },
  { id: "6-12", label: "6-12 شهر", w: [8, 10], h: "68 - 80 سم" },
  { id: "12-18", label: "12-18 شهر", w: [10, 11.5], h: "80 - 86 سم" },
  { id: "18-24", label: "18-24 شهر", w: [11.5, 13], h: "86 - 92 سم" },
];
const ALL = SIZES.map((s) => s.id);

// ---------- illustrations ----------
let uid = 0;
const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt)).toString(16).padStart(2, "0");
  return `#${c(n >> 16)}${c((n >> 8) & 255)}${c(n & 255)}`;
};

const SHAPES = {
  bodysuit: (f, s, k) => `
    <path d="M70 40 Q100 62 130 40 L165 60 L152 90 L135 82 L135 140 Q135 150 125 156 L112 170 L88 170 L75 156 Q65 150 65 140 L65 82 L48 90 L35 60 Z" fill="${f}" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M70 40 Q100 62 130 40 L165 60 L152 90 L135 82 L135 140 Q135 150 125 156 L112 170 L88 170 L75 156 Q65 150 65 140 L65 82 L48 90 L35 60 Z" fill="url(#${k})"/>
    <path d="M76 44 Q100 64 124 44" fill="none" stroke="${s}" stroke-width="2"/>
    <path d="M152 90 L135 82 M48 90 L65 82" stroke="${s}" stroke-width="2"/>
    <g fill="#fff" stroke="${s}" stroke-width="1.5"><circle cx="92" cy="165" r="3"/><circle cx="100" cy="165" r="3"/><circle cx="108" cy="165" r="3"/></g>`,
  longsleeve: (f, s, k) => `
    <path d="M70 38 Q100 60 130 38 L160 54 L180 122 L160 128 L135 80 L135 140 Q135 150 125 156 L112 170 L88 170 L75 156 Q65 150 65 140 L65 80 L40 128 L20 122 L40 54 Z" fill="${f}" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M70 38 Q100 60 130 38 L160 54 L180 122 L160 128 L135 80 L135 140 Q135 150 125 156 L112 170 L88 170 L75 156 Q65 150 65 140 L65 80 L40 128 L20 122 L40 54 Z" fill="url(#${k})"/>
    <path d="M78 44 Q92 70 122 96" fill="none" stroke="${s}" stroke-width="2"/>
    <g fill="#fff" stroke="${s}" stroke-width="1.5"><circle cx="122" cy="96" r="3"/><circle cx="130" cy="118" r="3"/></g>
    <path d="M160 128 L180 122 M40 128 L20 122" stroke="${s}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`,
  romper: (f, s, k) => `
    <path d="M72 28 Q100 46 128 28 L158 42 L174 100 L157 106 L134 68 L134 122 L132 172 Q132 184 120 184 L106 184 L102 132 L98 132 L94 184 L80 184 Q68 184 68 172 L66 122 L66 68 L43 106 L26 100 L42 42 Z" fill="${f}" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M72 28 Q100 46 128 28 L158 42 L174 100 L157 106 L134 68 L134 122 L132 172 Q132 184 120 184 L106 184 L102 132 L98 132 L94 184 L80 184 Q68 184 68 172 L66 122 L66 68 L43 106 L26 100 L42 42 Z" fill="url(#${k})"/>
    <path d="M100 40 L100 128" stroke="${s}" stroke-width="2" stroke-dasharray="3 3"/>
    <rect x="96" y="40" width="8" height="12" rx="2" fill="#fff" stroke="${s}" stroke-width="1.5"/>
    <path d="M70 172 Q87 176 94 170 M106 170 Q113 176 130 172" fill="none" stroke="${s}" stroke-width="1.5"/>`,
  pajama: (f, s, k) => `
    <g transform="translate(-6 -8) scale(.78)">
      <path d="M70 38 Q100 60 130 38 L160 54 L180 122 L160 128 L135 80 L135 150 L65 150 L65 80 L40 128 L20 122 L40 54 Z" fill="${f}" stroke="${s}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M70 38 Q100 60 130 38 L160 54 L180 122 L160 128 L135 80 L135 150 L65 150 L65 80 L40 128 L20 122 L40 54 Z" fill="url(#${k})"/>
      <path d="M76 44 Q100 64 124 44" fill="none" stroke="${s}" stroke-width="2.5"/>
      <path d="M65 142 L135 142" stroke="${s}" stroke-width="2.5"/>
    </g>
    <g transform="translate(92 88)">
      <path d="M8 4 L84 4 L90 96 L60 96 L46 36 L32 96 L2 96 Z" fill="${shade(f, -10)}" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M8 4 L84 4 L90 96 L60 96 L46 36 L32 96 L2 96 Z" fill="url(#${k})"/>
      <path d="M8 14 L84 14" stroke="${s}" stroke-width="2"/>
      <path d="M3 88 L31 88 M61 88 L89 88" stroke="${s}" stroke-width="2"/>
    </g>`,
  hatbib: (f, s, k) => `
    <g transform="translate(14 22)">
      <path d="M10 92 Q10 26 60 26 Q110 26 110 92 Z" fill="${f}" stroke="${s}" stroke-width="2"/>
      <path d="M10 92 Q10 26 60 26 Q110 26 110 92 Z" fill="url(#${k})"/>
      <rect x="4" y="84" width="112" height="22" rx="11" fill="${shade(f, -12)}" stroke="${s}" stroke-width="2"/>
      <path d="M50 26 Q60 6 70 26" fill="${f}" stroke="${s}" stroke-width="2"/>
    </g>
    <g transform="translate(96 92)">
      <path d="M44 4 A40 40 0 1 1 43.9 4 Z M44 22 A14 14 0 1 0 44.1 22 Z" fill-rule="evenodd" fill="${shade(f, 8)}" stroke="${s}" stroke-width="2"/>
      <path d="M44 4 A40 40 0 1 1 43.9 4 Z M44 22 A14 14 0 1 0 44.1 22 Z" fill-rule="evenodd" fill="url(#${k})"/>
      <circle cx="44" cy="10" r="3" fill="#fff" stroke="${s}" stroke-width="1.5"/>
    </g>`,
  socks: (f, s, k) => {
    const sock = (tx, ty, fill) => `
      <g transform="translate(${tx} ${ty})">
        <path d="M0 0 L34 0 L34 70 Q34 80 44 85 L70 97 Q84 104 78 118 Q72 130 56 126 L14 112 Q0 107 0 94 Z" fill="${fill}" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>
        <path d="M0 0 L34 0 L34 70 Q34 80 44 85 L70 97 Q84 104 78 118 Q72 130 56 126 L14 112 Q0 107 0 94 Z" fill="url(#${k})"/>
        <path d="M0 14 L34 14" stroke="${s}" stroke-width="2"/>
      </g>`;
    return sock(40, 30, shade(f, 10)) + sock(66, 44, f) + sock(92, 58, shade(f, -10));
  },
  swaddle: (f, s, k) => `
    <rect x="30" y="58" width="140" height="96" rx="14" fill="${shade(f, -10)}" stroke="${s}" stroke-width="2"/>
    <rect x="30" y="46" width="140" height="96" rx="14" fill="${f}" stroke="${s}" stroke-width="2"/>
    <rect x="30" y="46" width="140" height="96" rx="14" fill="url(#${k})"/>
    <g fill="#fff" opacity=".85">${Array.from({ length: 5 }, (_, r) => Array.from({ length: 7 }, (_, c) => `<circle cx="${48 + c * 17 + (r % 2) * 8}" cy="${62 + r * 17}" r="2.6"/>`).join("")).join("")}</g>
    <path d="M170 46 L170 100 L120 46 Z" fill="${shade(f, 12)}" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>
    <rect x="30" y="118" width="140" height="10" fill="${shade(f, -18)}" opacity=".35"/>`,
  outfit: (f, s, k) => `
    ${SHAPES.bodysuit(f, s, k)}
    <path d="M78 46 L92 72 L100 58 L108 72 L122 46" fill="#fff" stroke="${s}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M90 84 L100 90 L110 84 L110 96 L100 90 L90 96 Z" fill="${shade(f, -40)}" stroke="${s}" stroke-width="1.5" stroke-linejoin="round"/>`,
};

function garment(type, hex, bg = "#f6efe5") {
  const k = `knit${uid++}`;
  const s = shade(hex, -55);
  return `<svg viewBox="0 0 200 200" class="h-full w-full" role="img" aria-hidden="true">
    <defs><pattern id="${k}" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 1 L3 4 L6 1" fill="none" stroke="#000" stroke-opacity=".05" stroke-width="1"/></pattern></defs>
    <rect width="200" height="200" fill="${bg}"/>
    <ellipse cx="100" cy="186" rx="70" ry="6" fill="#000" opacity=".05"/>
    ${SHAPES[type](hex, s, k)}
  </svg>`;
}

function fabricArt(hex = "#b4c8bb") {
  const rows = [];
  for (let r = 0; r < 18; r++) {
    for (let c = 0; c < 26; c++) {
      const x = c * 16, y = r * 16;
      const t = r % 2 ? shade(hex, -8) : hex;
      rows.push(`<path d="M${x} ${y} Q${x + 4} ${y + 12} ${x + 8} ${y + 16} Q${x + 12} ${y + 12} ${x + 16} ${y}" fill="none" stroke="${t}" stroke-width="6" stroke-linecap="round"/>`);
    }
  }
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" class="h-full w-full" aria-hidden="true">
    <rect width="400" height="300" fill="${shade(hex, 18)}"/>
    ${rows.join("")}
    <rect width="400" height="300" fill="url(#fg)"/>
    <defs><radialGradient id="fg" cx="30%" cy="30%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></radialGradient></defs>
    <g transform="translate(24 222)"><rect width="190" height="54" rx="14" fill="#fff" opacity=".92"/><text x="170" y="24" font-size="15" font-weight="700" fill="#2f3a34" text-anchor="start" direction="rtl" font-family="IBM Plex Sans Arabic">تكبير ×20 على النسيج</text><text x="170" y="43" font-size="12" fill="#2f3a34" opacity=".6" text-anchor="start" direction="rtl" font-family="IBM Plex Sans Arabic">حياكة ناعمة ومتقاربة</text></g>
  </svg>`;
}

function boxArt() {
  return `<svg viewBox="0 0 400 400" class="h-full w-full" aria-hidden="true">
    <ellipse cx="200" cy="332" rx="150" ry="14" fill="#000" opacity=".18"/>
    <path d="M70 170 L200 215 L330 170 L330 300 L200 345 L70 300 Z" fill="#efe5d6"/>
    <path d="M200 215 L330 170 L330 300 L200 345 Z" fill="#e2d3bd"/>
    <path d="M70 170 L200 125 L330 170 L200 215 Z" fill="#f7f0e6"/>
    <path d="M92 168 Q140 120 200 150 Q260 118 308 168 L200 205 Z" fill="#fff" opacity=".9"/>
    <path d="M150 170 Q200 128 250 170 Q200 196 150 170 Z" fill="#b4c8bb"/>
    <path d="M160 168 Q200 140 240 168" fill="none" stroke="#8aa596" stroke-width="2"/>
    <path d="M130 196 L130 327 M130 196 L262 150" stroke="#5f8471" stroke-width="12"/>
    <path d="M70 108 L200 63 L330 108 L200 153 Z" fill="#f7f0e6" transform="translate(40 -30) rotate(-8 200 108)"/>
    <path d="M70 108 L70 124 L200 169 L200 153 Z" fill="#e2d3bd" transform="translate(40 -30) rotate(-8 200 108)"/>
    <path d="M200 153 L200 169 L330 124 L330 108 Z" fill="#d6c4aa" transform="translate(40 -30) rotate(-8 200 108)"/>
    <g transform="translate(236 70) rotate(-8)"><circle r="22" fill="#5f8471"/><text y="7" font-size="20" font-weight="700" fill="#fff" text-anchor="middle" font-family="IBM Plex Sans Arabic">م</text></g>
    <g transform="translate(200 250) rotate(-4)"><rect x="-10" y="0" width="120" height="74" rx="6" fill="#fff"/><text x="92" y="30" font-size="13" fill="#2f3a34" text-anchor="start" direction="rtl" font-family="IBM Plex Sans Arabic" font-weight="600">مبروك المولود</text><text x="92" y="52" font-size="10" fill="#2f3a34" opacity=".55" text-anchor="start" direction="rtl" font-family="IBM Plex Sans Arabic">بطاقة بخط اليد</text></g>
    <path d="M122 200 Q100 186 110 176 Q124 172 130 196 Q138 172 152 178 Q160 190 138 200" fill="#5f8471"/>
  </svg>`;
}

// ---------- catalogue ----------
const PRODUCTS = [
  { id: "p1", type: "bodysuit", name: "بودي قطن عضوي نص كم", price: 49, colors: ["sage", "cream", "blush", "sky"], sizes: ALL, tag: "الأكثر طلباً",
    desc: "القطعة الأساسية اللي يلبسها كل يوم. رقبة مفتوحة من الكتف تسهّل اللبس، وأزرار كبس تحت لتغيير الحفاض بسرعة.",
    fabric: ["قطن عضوي مُمشّط 100%", "وزن 220 جرام", "رقبة مغلّفة بدون ملصق"] },
  { id: "p2", type: "longsleeve", name: "بودي كم طويل بأزرار جانبية", price: 59, colors: ["cream", "sage", "oat"], sizes: ALL,
    desc: "تصميم لفّة جانبية ما يحتاج تلبسه من الراس، مثالي لأول أسابيع المولود. أطراف الكم تنطوي كقفاز يحمي من الخدش.",
    fabric: ["قطن عضوي مُمشّط 100%", "كم بقفاز قابل للطي", "أزرار كبس بدون نيكل"] },
  { id: "p3", type: "romper", name: "أفرول بسحاب مزدوج", price: 89, colors: ["sky", "sage", "cream"], sizes: ALL, tag: "جديد",
    desc: "سحاب يفتح من فوق ومن تحت، تغيّر الحفاض بدون ما تصحّيه. غطاء للسحاب عند الذقن عشان ما يلمس بشرته.",
    fabric: ["قطن عضوي مع 5% إيلاستين", "سحاب مزدوج بغطاء", "أقدام مقفلة"] },
  { id: "p4", type: "pajama", name: "طقم بيجامة قطعتين", price: 95, colors: ["oat", "blush", "sky"], sizes: ["6-12", "12-18", "18-24"],
    desc: "للي بدأ يحبي ويمشي. بلوزة وبنطلون بخصر مطاطي عريض ما يضغط على بطنه.",
    fabric: ["قطن عضوي ريب ناعم", "خصر مطاطي مغلّف", "مناسب للنوم واللعب"] },
  { id: "p5", type: "hatbib", name: "طقم قبعة ومريلة", price: 45, colors: ["cream", "blush", "sage"], sizes: ["nb", "0-3", "3-6"],
    desc: "قبعة ناعمة تحافظ على حرارته في المكيف، ومريلة بطبقتين تمتص بدون ما يوصل البلل لملابسه.",
    fabric: ["قطن عضوي مزدوج الطبقة", "زر كبس خلفي", "حواف مخيّطة بنعومة"] },
  { id: "p6", type: "socks", name: "شراب ناعم 3 أزواج", price: 35, colors: ["cream", "sage", "blush"], sizes: ["0-3", "3-6", "6-12", "12-18"],
    desc: "ثلاثة أزواج بألوان متناسقة، بحافة مرنة تثبت بدون ما تترك أثر على رجله.",
    fabric: ["قطن عضوي 85%", "حافة مرنة ناعمة", "نعل مانع للانزلاق من 6 شهور"] },
  { id: "p7", type: "swaddle", name: "بطانية لف موسلين", price: 79, colors: ["sage", "sky", "blush"], sizes: ["one"],
    desc: "موسلين خفيف يتنفس، يصير أنعم مع كل غسلة. للّف والتغطية والرضاعة. مقاس واحد 120×120 سم.",
    fabric: ["موسلين قطن عضوي طبقتين", "120 × 120 سم", "يتنفس ومناسب للصيف"] },
  { id: "p8", type: "outfit", name: "طقم خروج المولود", price: 139, colors: ["cream", "sky", "oat"], sizes: ["nb", "0-3", "3-6"], tag: "هدية مثالية",
    desc: "للطلعة الأولى من المستشفى والمناسبات: بودي بياقة وفيونكة، مع قبعة وشراب من نفس اللون.",
    fabric: ["قطن عضوي مُمشّط 100%", "3 قطع متناسقة", "يوصل في علبة الهدية"] },
];

const BUNDLES = [
  { id: "b1", name: "باقة المولود الأولى", items: "3 بودي نص كم · 2 بودي كم طويل · قبعة ومريلة · بطانية لف", price: 329, was: 389, type: "longsleeve", color: "cream", sizes: ["nb", "0-3"] },
  { id: "b2", name: "باقة الأساسيات اليومية", items: "5 بودي نص كم بخمس ألوان متناسقة", price: 199, was: 245, type: "bodysuit", color: "sage", sizes: ALL, tag: "الأوفر" },
  { id: "b3", name: "باقة هدية الولادة", items: "طقم خروج · بطانية لف · شراب 3 أزواج · علبة الهدية مجاناً", price: 219, was: 272, type: "outfit", color: "sky", sizes: ["nb", "0-3", "3-6"] },
];

const sizeLabel = (id) => (id === "one" ? "مقاس واحد" : SIZES.find((s) => s.id === id)?.label);

// ---------- cart ----------
const cart = { items: JSON.parse(localStorage.getItem("mahd-cart") || "[]"), gift: false };
const saveCart = () => { localStorage.setItem("mahd-cart", JSON.stringify(cart.items)); renderCart(); };
const subtotal = () => cart.items.reduce((a, i) => a + i.price * i.qty, 0) + (cart.gift ? 19 : 0);
const shipping = () => (subtotal() >= 250 || !cart.items.length ? 0 : 25);

function addToCart(item) {
  const found = cart.items.find((i) => i.key === item.key);
  found ? (found.qty += item.qty) : cart.items.push(item);
  saveCart();
  toast("انضافت للسلة ✓");
}

function toast(msg) {
  const t = $("[data-toast]");
  t.textContent = msg;
  t.style.opacity = "1";
  clearTimeout(toast.t);
  toast.t = setTimeout(() => (t.style.opacity = "0"), 1800);
}

function renderCart() {
  const count = cart.items.reduce((a, i) => a + i.qty, 0);
  $("[data-cart-count]").textContent = count;
  const box = $("[data-cart-items]");
  if (!cart.items.length) {
    box.innerHTML = `<div class="py-16 text-center text-ink/50"><p class="text-lg">السلة فاضية</p><p class="mt-1 text-sm">ابدأ بالقطع الأساسية 🤍</p></div>`;
  } else {
    box.innerHTML = cart.items.map((i, idx) => `
      <div class="flex gap-4 rounded-2xl bg-white p-3">
        <div class="h-20 w-20 shrink-0 overflow-hidden rounded-xl">${garment(i.type, COLORS[i.color].hex)}</div>
        <div class="flex-1">
          <p class="font-semibold leading-6">${i.name}</p>
          <p class="text-xs text-ink/50">${COLORS[i.color].name} · ${sizeLabel(i.size)}</p>
          <div class="mt-2 flex items-center justify-between">
            <div class="flex items-center gap-3 rounded-full border border-ink/15 px-3 py-1 text-sm">
              <button data-qty="${idx}" data-d="1">+</button><span>${i.qty}</span><button data-qty="${idx}" data-d="-1">−</button>
            </div>
            <span class="font-semibold">${sar(i.price * i.qty)}</span>
          </div>
        </div>
      </div>`).join("");
  }
  const left = 250 - (subtotal() - (cart.gift ? 19 : 0));
  $("[data-cart-footer]").innerHTML = cart.items.length ? `
    <label class="flex cursor-pointer items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm">
      <span class="flex items-center gap-3"><input type="checkbox" data-gift ${cart.gift ? "checked" : ""} class="h-4 w-4 accent-[#5f8471]" /> علبة الهدية مع بطاقة بخط اليد</span>
      <span class="font-semibold">+19 ر.س</span>
    </label>
    ${left > 0 ? `<p class="mt-3 text-center text-xs text-brand-dark">باقي ${left} ر.س وتحصل شحن مجاني</p>` : `<p class="mt-3 text-center text-xs text-brand-dark">مبروك! الشحن عليك مجاني 🎉</p>`}
    <div class="mt-4 space-y-1 text-sm">
      <div class="flex justify-between text-ink/60"><span>الشحن</span><span>${shipping() ? sar(shipping()) : "مجاني"}</span></div>
      <div class="flex justify-between text-lg font-bold"><span>الإجمالي</span><span>${sar(subtotal() + shipping())}</span></div>
    </div>
    <button data-checkout-open class="btn mt-4 w-full">إتمام الطلب</button>` : "";
}

// ---------- rendering ----------
let ageFilter = "all";

function renderFilters() {
  const opts = [{ id: "all", label: "الكل" }, ...SIZES];
  $("[data-age-filter]").innerHTML = opts.map((o) => `<button class="chip" data-age="${o.id}" aria-pressed="${o.id === ageFilter}">${o.label}</button>`).join("");
}

function renderGrid() {
  const list = PRODUCTS.filter((p) => ageFilter === "all" || p.sizes.includes(ageFilter) || p.sizes.includes("one"));
  $("[data-grid]").innerHTML = list.map((p) => `
    <button data-product="${p.id}" class="group rise text-right">
      <div class="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white transition group-hover:shadow-xl group-hover:shadow-ink/5">
        <div class="h-full w-full transition duration-500 group-hover:scale-105">${garment(p.type, COLORS[p.colors[0]].hex)}</div>
        ${p.tag ? `<span class="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-dark">${p.tag}</span>` : ""}
      </div>
      <div class="mt-3 flex gap-1.5">${p.colors.map((c) => `<span class="h-3.5 w-3.5 rounded-full ring-1 ring-ink/10" style="background:${COLORS[c].hex}"></span>`).join("")}</div>
      <p class="mt-2 font-semibold leading-6">${p.name}</p>
      <p class="text-sm text-ink/60">${sar(p.price)}</p>
    </button>`).join("");
}

function renderBundles() {
  $("[data-bundles]").innerHTML = BUNDLES.map((b) => `
    <div class="flex flex-col overflow-hidden rounded-3xl bg-white">
      <div class="relative aspect-[4/3]">${garment(b.type, COLORS[b.color].hex, "#f3ebe0")}
        ${b.tag ? `<span class="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">${b.tag}</span>` : ""}
        <span class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-dark">وفّر ${b.was - b.price} ر.س</span>
      </div>
      <div class="flex flex-1 flex-col p-6">
        <h3 class="text-lg font-bold">${b.name}</h3>
        <p class="mt-2 flex-1 text-sm leading-6 text-ink/60">${b.items}</p>
        <div class="mt-4 flex items-baseline gap-2"><span class="text-2xl font-bold">${sar(b.price)}</span><span class="text-sm text-ink/40 line-through">${sar(b.was)}</span></div>
        <select data-bundle-size="${b.id}" class="mt-4 rounded-xl border border-ink/15 bg-cream px-4 py-2.5 text-sm outline-none focus:border-brand">
          ${b.sizes.map((s) => `<option value="${s}">${sizeLabel(s)}</option>`).join("")}
        </select>
        <button data-bundle="${b.id}" class="btn mt-3 w-full">أضف الباقة للسلة</button>
      </div>
    </div>`).join("");
}

function renderSizeTable() {
  $("[data-size-table]").innerHTML = SIZES.map((s) => `<tr data-row="${s.id}"><td class="px-5 py-4 font-semibold">${s.label}</td><td class="px-5 py-4 text-ink/70">${s.w[0] ? `${s.w[0]} - ${s.w[1]} كجم` : `حتى ${s.w[1]} كجم`}</td><td class="px-5 py-4 text-ink/70">${s.h}</td></tr>`).join("");
}

const sizeForWeight = (w) => SIZES.find((s) => w <= s.w[1]) || SIZES[SIZES.length - 1];

function openProduct(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  const state = { color: p.colors[0], size: p.sizes.length === 1 ? p.sizes[0] : null, qty: 1 };
  const body = $("[data-product-body]");
  const draw = () => {
    body.innerHTML = `
      <div class="grid md:grid-cols-2">
        <div class="bg-white p-4 md:rounded-s-3xl">
          <div class="aspect-square overflow-hidden rounded-2xl">${garment(p.type, COLORS[state.color].hex)}</div>
          <div class="mt-3 grid grid-cols-2 gap-3">
            <div class="aspect-square overflow-hidden rounded-2xl">${fabricArt(COLORS[state.color].hex)}</div>
            <div class="flex aspect-square flex-col justify-center rounded-2xl bg-sand/60 p-4 text-sm">
              <p class="font-semibold">تفاصيل الخامة</p>
              <ul class="mt-2 space-y-1.5 text-ink/70">${p.fabric.map((f) => `<li>· ${f}</li>`).join("")}</ul>
            </div>
          </div>
        </div>
        <div class="p-6 md:p-8">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-2xl font-bold leading-9">${p.name}</h3>
            <button data-close class="text-3xl leading-none text-ink/40 hover:text-ink" aria-label="إغلاق">×</button>
          </div>
          <p class="mt-1 text-xl font-semibold text-brand-dark">${sar(p.price)}</p>
          <p class="mt-4 leading-7 text-ink/70">${p.desc}</p>

          <p class="mt-6 text-sm font-semibold">اللون: <span class="font-normal text-ink/60">${COLORS[state.color].name}</span></p>
          <div class="mt-2 flex gap-2">${p.colors.map((c) => `<button class="swatch" data-color="${c}" aria-pressed="${c === state.color}" style="background:${COLORS[c].hex}" aria-label="${COLORS[c].name}"></button>`).join("")}</div>

          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-semibold">المقاس</p>
            ${p.sizes[0] !== "one" ? `<button data-size-help class="text-xs font-semibold text-brand underline underline-offset-4">مو متأكد؟ احسبه بالوزن</button>` : ""}
          </div>
          <div class="mt-2 grid grid-cols-3 gap-2">${p.sizes.map((s) => `<button class="size-btn" data-size="${s}" aria-pressed="${s === state.size}">${sizeLabel(s)}</button>`).join("")}</div>
          <div data-size-helper class="hidden-el mt-3 flex gap-2 rounded-2xl bg-white p-3">
            <input type="number" step="0.1" placeholder="وزنه بالكيلو" class="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm outline-none focus:border-brand" data-w />
            <button class="rounded-xl bg-ink px-4 text-sm font-semibold text-white" data-w-go>اقترح</button>
          </div>
          <p data-size-msg class="mt-2 min-h-5 text-xs font-semibold text-brand-dark"></p>

          <div class="mt-4 flex gap-3">
            <div class="flex items-center gap-4 rounded-full border border-ink/15 bg-white px-4">
              <button data-q="1" class="text-lg">+</button><span>${state.qty}</span><button data-q="-1" class="text-lg">−</button>
            </div>
            <button data-add class="btn flex-1">أضف للسلة · ${sar(p.price * state.qty)}</button>
          </div>
          <p class="mt-4 text-center text-xs text-ink/50">يوصل في علبة مَهد مجاناً · استبدال خلال 14 يوم</p>
        </div>
      </div>`;
  };
  draw();
  $("[data-product-modal]").classList.remove("hidden-el");
  document.body.style.overflow = "hidden";

  body.onclick = (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.color) { state.color = t.dataset.color; draw(); }
    else if (t.dataset.size) { state.size = t.dataset.size; draw(); }
    else if (t.dataset.q) { state.qty = Math.max(1, state.qty + Number(t.dataset.q)); draw(); }
    else if (t.hasAttribute("data-size-help")) $("[data-size-helper]", body).classList.toggle("hidden-el");
    else if (t.hasAttribute("data-w-go")) {
      const w = parseFloat($("[data-w]", body).value);
      if (!w) return;
      const rec = sizeForWeight(w);
      const pick = p.sizes.includes(rec.id) ? rec.id : null;
      if (pick) { state.size = pick; draw(); $("[data-size-msg]", body).textContent = `المقاس المناسب لوزن ${w} كجم: ${rec.label} ✓`; }
      else $("[data-size-msg]", body).textContent = `المقاس المناسب ${rec.label}، وهذي القطعة غير متوفرة فيه حالياً`;
    } else if (t.hasAttribute("data-add")) {
      if (!state.size) { $("[data-size-msg]", body).textContent = "اختر المقاس أولاً 👆"; return; }
      addToCart({ key: `${p.id}-${state.color}-${state.size}`, name: p.name, type: p.type, color: state.color, size: state.size, price: p.price, qty: state.qty });
      closeAll();
    } else if (t.hasAttribute("data-close")) closeAll();
  };
}

function closeAll() {
  ["[data-product-modal]", "[data-cart]", "[data-checkout]"].forEach((s) => $(s).classList.add("hidden-el"));
  document.body.style.overflow = "";
}

// ---------- events ----------
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-age],[data-product],[data-bundle],[data-open-cart],[data-close],[data-qty],[data-checkout-open],[data-size-calc]");
  if (!t) return;
  if (t.dataset.age) { ageFilter = t.dataset.age; renderFilters(); renderGrid(); }
  else if (t.dataset.product) openProduct(t.dataset.product);
  else if (t.dataset.bundle) {
    const b = BUNDLES.find((x) => x.id === t.dataset.bundle);
    const size = $(`[data-bundle-size="${b.id}"]`).value;
    addToCart({ key: `${b.id}-${size}`, name: b.name, type: b.type, color: b.color, size, price: b.price, qty: 1 });
  } else if (t.hasAttribute("data-open-cart")) { renderCart(); $("[data-cart]").classList.remove("hidden-el"); document.body.style.overflow = "hidden"; }
  else if (t.hasAttribute("data-close") && !t.closest("[data-product-body]")) closeAll();
  else if (t.dataset.qty) {
    const i = cart.items[Number(t.dataset.qty)];
    i.qty += Number(t.dataset.d);
    if (i.qty < 1) cart.items.splice(Number(t.dataset.qty), 1);
    saveCart();
  } else if (t.hasAttribute("data-checkout-open")) {
    $("[data-cart]").classList.add("hidden-el");
    $("[data-checkout-total]").textContent = sar(subtotal() + shipping());
    $("[data-checkout]").classList.remove("hidden-el");
  } else if (t.hasAttribute("data-size-calc")) {
    const w = parseFloat($("#weight").value);
    $$("[data-row]").forEach((r) => r.classList.remove("bg-brand/10"));
    if (!w) { $("[data-size-result]").textContent = "اكتب الوزن بالكيلو"; return; }
    const s = sizeForWeight(w);
    $(`[data-row="${s.id}"]`).classList.add("bg-brand/10");
    $("[data-size-result]").textContent = `المقاس المقترح: ${s.label}`;
  }
});

document.addEventListener("change", (e) => {
  if (e.target.matches("[data-gift]")) { cart.gift = e.target.checked; renderCart(); }
});

$("[data-pay]").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  $$("[data-pay] button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
});

$("[data-checkout-form]").addEventListener("submit", (e) => {
  e.preventDefault();
  closeAll();
  cart.items = []; cart.gift = false; saveCart();
  toast("تم استلام طلبك (نموذج تجريبي) 🤍");
});

document.addEventListener("keydown", (e) => e.key === "Escape" && closeAll());

// ---------- init ----------
$("[data-hero-art]").innerHTML = garment("romper", COLORS.sage.hex, "#f1e8dc");
$("[data-fabric-art]").innerHTML = fabricArt();
$("[data-box-art]").innerHTML = boxArt();
renderFilters();
renderGrid();
renderBundles();
renderSizeTable();
renderCart();
$$("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));
