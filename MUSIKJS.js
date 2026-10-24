function showPage(page) {
            document.querySelector("main").style.display = (page === "home") ? "block" : "none";
            ["about", "contact", "cart", "account", "settings", "shop"].forEach(function (id) {
                document.getElementById(id).style.display = (page === id) ? "block" : "none";
            });
            window.scrollTo(0, 0);
        }

        function homeClick() { showPage("home"); }
        function aboutClick() { showPage("about"); }
        function contactClick() { showPage("contact"); }

        function cartClick() { showPage("cart"); }
        function accountClick() { showPage("account"); }
        function settingsClick() { showPage("settings"); }

        function searchClick() {
            var text = document.getElementById("searchInput").value;
            alert("You searched for: " + text);
        }

        function submitContact(event) {
            event.preventDefault();
            var name = document.getElementById("contactName").value;
            alert("Thank you, " + name + "! Your message has been sent.");
            event.target.reset();
        }

        var cart = [
            { name: "Fender Vintage Guitar", price: 25000, qty: 1 },
            { name: "Guitar Strings Set", price: 450, qty: 2 }
        ];

        function formatPeso(amount) {
            return "₱" + amount.toLocaleString("en-PH");
        }

        function renderCart() {
            var list = document.getElementById("cartItems");
            var total = 0;
            var count = 0;
            var html = "";

            cart.forEach(function (item, i) {
                total += item.price * item.qty;
                count += item.qty;
                html += '<div class="cart-item">' +
                    '<div class="cart-item-name">' + item.name +
                    '<div class="cart-item-price">' + formatPeso(item.price) + ' each</div></div>' +
                    '<div class="qty-controls">' +
                    '<button class="btn btn-small" onclick="changeQty(' + i + ', -1)">−</button>' +
                    '<span>' + item.qty + '</span>' +
                    '<button class="btn btn-small" onclick="changeQty(' + i + ', 1)">+</button>' +
                    '</div>' +
                    '<strong>' + formatPeso(item.price * item.qty) + '</strong>' +
                    '<button class="btn btn-small" onclick="removeItem(' + i + ')">Remove</button>' +
                    '</div>';
            });

            if (cart.length === 0) {
                html = '<p class="empty-note">Your cart is empty. Browse the instruments on the Home page.</p>';
            }

            list.innerHTML = html;
            document.getElementById("cartTotal").textContent = formatPeso(total);

            var badge = document.getElementById("cartBadge");
            badge.textContent = count;
            badge.style.display = count > 0 ? "block" : "none";
        }

        function changeQty(index, change) {
            cart[index].qty += change;
            if (cart[index].qty <= 0) {
                cart.splice(index, 1);
            }
            renderCart();
        }

        function removeItem(index) {
            cart.splice(index, 1);
            renderCart();
        }

        function checkout() {
            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }
            alert("Thank you for your order!");
            cart = [];
            renderCart();
        }

        function addToCart(name, price) {
            var found = cart.find(function (item) { return item.name === name; });
            if (found) {
                found.qty += 1;
            } else {
                cart.push({ name: name, price: price, qty: 1 });
            }
            renderCart();
            showToast("Added to cart: " + name);
        }

        var toastTimer;
        function showToast(message) {
            var toast = document.getElementById("toast");
            toast.textContent = message;
            toast.classList.add("show");
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 1800);
        }

        function loginAccount(event) {
            event.preventDefault();
            var name = document.getElementById("accName").value;
            document.getElementById("welcomeName").textContent = name;
            document.getElementById("accEmailShown").textContent = document.getElementById("accEmail").value;
            document.getElementById("loginView").style.display = "none";
            document.getElementById("profileView").style.display = "block";
            event.target.reset();
        }

        function logoutAccount() {
            document.getElementById("profileView").style.display = "none";
            document.getElementById("loginView").style.display = "block";
        }

        function toggleDarkMode() {
            document.body.classList.toggle("dark", document.getElementById("darkToggle").checked);
        }

        function saveSettings() {
            alert("Settings saved.");
        }

        function resetSettings() {
            document.getElementById("darkToggle").checked = false;
            document.getElementById("emailToggle").checked = true;
            document.getElementById("orderToggle").checked = true;
            toggleDarkMode();
        }

        var shopData = {
            "guitars": {
                title: "Guitars",
                subs: ["Classical Guitars", "Electric Guitars", "Acoustic Guitars", "Bass Guitars", "Ukeleles"],
                items: [
                    { img: "data:image/jpeg;base64,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", n: "Gibson Les Paul Standard '50s Figured Top Electric Guitar - Blueberry Burst (LPS500B9NH1)", p: 203200, t: "guitar", c: "#1f4fb8", s: 1 },
                    { img: "data:image/jpeg;base64,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", n: "Gibson Firebird Platypus Electric Guitar - Vintage Cherry (DSFRP00VECH1)", p: 181500, t: "guitar", c: "#a01c24", s: 1 },
                    { img: "data:image/jpeg;base64,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", n: "Fender American Professional II Jaguar Rosewood Fingerboard - 3 Tone Sunburst (114990300)", p: 145600, t: "guitar", c: "#c2631a", s: 1 },
                    { img: "data:image/jpeg;base64,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", n: "Gibson Les Paul Junior Double Cut - TV Yellow (LPJD00TVNH1)", p: 123400, t: "guitar", c: "#f2c230", s: 1 },
                    { n: "Yamaha C40 Classical Guitar", p: 6800, t: "acoustic", c: "#d9a066", s: 0 },
                    { n: "Cordoba C5 Classical Guitar", p: 24500, t: "acoustic", c: "#c98a4b", s: 0 },
                    { n: "Valencia VC204 Classical Guitar", p: 7900, t: "acoustic", c: "#e0b27a", s: 0 },
                    { n: "Yamaha F310 Acoustic Guitar", p: 8500, t: "acoustic", c: "#c47a2c", s: 2 },
                    { n: "Fender CD-60S Dreadnought Acoustic Guitar", p: 14900, t: "acoustic", c: "#a8552a", s: 2 },
                    { n: "Taylor GS Mini Acoustic Guitar", p: 59000, t: "acoustic", c: "#d49a52", s: 2 },
                    { n: "Fender Player Precision Bass", p: 62000, t: "bass", c: "#222222", s: 3 },
                    { n: "Ibanez GSR200 Bass Guitar", p: 21500, t: "bass", c: "#8a1c1c", s: 3 },
                    { n: "Squier Affinity Jazz Bass", p: 24800, t: "bass", c: "#2f6fb5", s: 3 },
                    { n: "Kala KA-15S Soprano Ukelele", p: 6200, t: "uke", c: "#d9a066", s: 4 },
                    { n: "Makala Dolphin Soprano Ukelele", p: 2200, t: "uke", c: "#3f9aa8", s: 4 },
                    { n: "Lanikai Concert Ukelele", p: 7800, t: "uke", c: "#b8763a", s: 4 }
                ]
            },
            "piano": {
                title: "Pianos",
                subs: ["Digital Pianos", "Keyboards", "Upright Pianos", "Accessories"],
                items: [
                    { n: "Yamaha P-45 88-Key Digital Piano", p: 27500, t: "keys", c: "#444", s: 0 },
                    { n: "Casio Privia PX-S1100 Digital Piano", p: 41900, t: "keys", c: "#c0392b", s: 0 },
                    { n: "Roland FP-30X Digital Piano", p: 58000, t: "keys", c: "#2c3e50", s: 0 },
                    { n: "Yamaha PSR-E373 61-Key Keyboard", p: 14500, t: "keys", c: "#1f4fb8", s: 1 },
                    { n: "Casio CT-S300 61-Key Keyboard", p: 9800, t: "keys", c: "#e67e22", s: 1 },
                    { n: "Korg B2 88-Key Digital Piano", p: 38000, t: "keys", c: "#555", s: 1 },
                    { n: "Yamaha U1 Upright Piano", p: 520000, t: "keys", c: "#111", s: 2 },
                    { n: "Kawai K-300 Upright Piano", p: 650000, t: "keys", c: "#222", s: 2 },
                    { n: "Adjustable Keyboard Stand", p: 1800, t: "generic", c: "#555", s: 3 },
                    { n: "Sustain Pedal", p: 1200, t: "generic", c: "#2c3e50", s: 3 },
                    { n: "Padded Piano Bench", p: 3500, t: "generic", c: "#7a4a2a", s: 3 }
                ]
            },
            "drums": {
                title: "Drums",
                subs: ["Acoustic Kits", "Electronic Kits", "Snares", "Cymbals & Sticks"],
                items: [
                    { n: "Pearl Roadshow 5-Piece Drum Kit", p: 35500, t: "drum", c: "#a01c24", s: 0 },
                    { n: "Tama Imperialstar 5-Piece Drum Kit", p: 58000, t: "drum", c: "#222", s: 0 },
                    { n: "Yamaha Stage Custom 5-Piece Drum Kit", p: 98000, t: "drum", c: "#1f4fb8", s: 0 },
                    { n: "Roland TD-1DMK Electronic Drum Kit", p: 62000, t: "drum", c: "#333", s: 1 },
                    { n: "Alesis Nitro Mesh Electronic Kit", p: 31000, t: "drum", c: "#444", s: 1 },
                    { n: "Yamaha DTX402K Electronic Kit", p: 38500, t: "drum", c: "#2c3e50", s: 1 },
                    { n: "Ludwig Supraphonic 14\" Snare Drum", p: 28500, t: "drum", c: "#bbb", s: 2 },
                    { n: "Pearl Sensitone 14\" Snare Drum", p: 24000, t: "drum", c: "#999", s: 2 },
                    { n: "Zildjian A Custom 20\" Ride Cymbal", p: 18500, t: "cymbal", c: "#e0b030", s: 3 },
                    { n: "Sabian B8 Pro 14\" Hi-Hats", p: 9800, t: "cymbal", c: "#d9a520", s: 3 },
                    { n: "Vic Firth 5A Drumsticks", p: 650, t: "generic", c: "#8a5a2a", s: 3 }
                ]
            },
            "wind-brass": {
                title: "Wind & Brass",
                subs: ["Flutes", "Saxophones", "Trumpets", "Clarinets"],
                items: [
                    { n: "Yamaha YFL-222 Flute", p: 24000, t: "flute", c: "#d8d8d8", s: 0 },
                    { n: "Jupiter JFL700 Flute", p: 18500, t: "flute", c: "#c9c9c9", s: 0 },
                    { img: "https://cdn.shopify.com/s/files/1/0390/6987/6268/products/YAS280.jpg?v=1593696624", n: "Yamaha YAS-280 Alto Saxophone", p: 78000, t: "sax", c: "#e0b030", s: 1 },
                    { n: "Jupiter JAS500 Alto Saxophone", p: 62000, t: "sax", c: "#d9a520", s: 1 },
                    { n: "Yamaha YTR-2330 Trumpet", p: 36000, t: "horn", c: "#e0b030", s: 2 },
                    { n: "Bach TR300H2 Trumpet", p: 42500, t: "horn", c: "#d9a520", s: 2 },
                    { n: "Yamaha YCL-255 Clarinet", p: 29500, t: "flute", c: "#222", s: 3 },
                    { n: "Jupiter JCL700 Clarinet", p: 21000, t: "flute", c: "#333", s: 3 }
                ]
            },
            "violin": {
                title: "Violins & Strings",
                subs: ["Violins", "Violas", "Cellos", "Bows & Accessories"],
                items: [
                    { n: "Stentor Student I 4/4 Violin", p: 12500, t: "violin", c: "#a8501c", s: 0 },
                    { n: "Yamaha V3 4/4 Violin", p: 18900, t: "violin", c: "#8a3a14", s: 0 },
                    { n: "Cecilio CVN-300 Violin", p: 11200, t: "violin", c: "#b8651f", s: 0 },
                    { n: "Stentor Student II Viola", p: 16500, t: "violin", c: "#8f3f16", s: 1 },
                    { n: "Yamaha VC5S 4/4 Cello", p: 48000, t: "cello", c: "#8a3a14", s: 2 },
                    { n: "Stentor Student I 4/4 Cello", p: 36000, t: "cello", c: "#a8501c", s: 2 },
                    { n: "Brazilwood Violin Bow 4/4", p: 3800, t: "generic", c: "#6b3a1a", s: 3 },
                    { n: "Jade Violin Rosin", p: 650, t: "generic", c: "#c9892a", s: 3 },
                    { n: "Kun Violin Shoulder Rest", p: 1900, t: "generic", c: "#333", s: 3 }
                ]
            },
            "more": {
                title: "More",
                subs: ["Vinyl Records", "Microphones", "Amplifiers", "Accessories"],
                items: [
                    { n: "Fleetwood Mac - Rumours (Vinyl LP)", p: 2400, t: "vinyl", c: "#c0392b", s: 0 },
                    { n: "Queen - Greatest Hits (Vinyl LP)", p: 2300, t: "vinyl", c: "#e0b030", s: 0 },
                    { n: "Audio-Technica AT-LP60X Turntable", p: 11500, t: "vinyl", c: "#555", s: 0 },
                    { n: "Shure SM58 Dynamic Microphone", p: 9800, t: "mic", c: "#444", s: 1 },
                    { n: "Audio-Technica AT2020 Condenser Microphone", p: 6900, t: "mic", c: "#222", s: 1 },
                    { n: "Blue Yeti USB Microphone", p: 8900, t: "mic", c: "#888", s: 1 },
                    { n: "Fender Frontman 10G Guitar Amp", p: 5900, t: "amp", c: "#222", s: 2 },
                    { n: "Marshall MG15 Guitar Amp", p: 7500, t: "amp", c: "#111", s: 2 },
                    { n: "Boss Katana 50 MkII Guitar Amp", p: 18500, t: "amp", c: "#333", s: 2 },
                    { n: "Guitar Strings Set", p: 450, t: "generic", c: "#999", s: 3 },
                    { n: "Guitar Strap", p: 650, t: "generic", c: "#7a4a2a", s: 3 },
                    { n: "Clip-On Tuner", p: 550, t: "generic", c: "#2c3e50", s: 3 }
                ]
            }
        };

        var currentCat = "guitars";
        var currentSub = -1;
        var shownItems = [];

        function openCategory(slug) {
            currentCat = slug;
            currentSub = -1;
            renderShop();
            showPage("shop");
        }

        function pickSub(index) {
            currentSub = index;
            renderShop();
        }

        function renderShop() {
            var cat = shopData[currentCat];
            var heading = (currentSub === -1) ? ("Shop All " + cat.title) : ("Shop " + cat.subs[currentSub]);
            document.getElementById("shopTitle").textContent = heading;
            document.getElementById("shopSideTitle").textContent = "Shop " + cat.title;

            var side = '<a class="' + (currentSub === -1 ? 'active' : '') + '" onclick="pickSub(-1)">All ' + cat.title + '</a>';
            cat.subs.forEach(function (name, i) {
                side += '<a class="' + (currentSub === i ? 'active' : '') + '" onclick="pickSub(' + i + ')">' + name + '</a>';
            });
            document.getElementById("shopSideLinks").innerHTML = side;

            shownItems = cat.items.filter(function (item) {
                return currentSub === -1 || item.s === currentSub;
            });

            var html = "";
            shownItems.forEach(function (item, i) {
                var src = item.img ? item.img : photoFile(item);
                html += '<div class="product">' +
                    '<img src="' + src + '" onerror="photoMissing(this)" alt="' + item.n.replace(/"/g, '&quot;') + '">' +
                    '<div class="product-info">' +
                    '<div>' + item.n + '</div><hr>' +
                    '<div class="product-price">PHP ' + item.p.toLocaleString("en-PH", { minimumFractionDigits: 2 }) + '</div>' +
                    '<button class="btn btn-small" onclick="addShownItem(' + i + ')">Add to Cart</button>' +
                    '</div></div>';
            });
            if (shownItems.length === 0) {
                html = '<p class="shop-empty">No products here yet.</p>';
            }
            document.getElementById("shopGrid").innerHTML = html;

        }

        function photoFile(item) {
            var words = item.n.replace(/\(.*?\)/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ");
            return "images/" + words.slice(0, 7).join("-") + ".jpg";
        }

        function photoMissing(img) {
            img.onerror = null;
            var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200"><rect width="120" height="200" fill="#eeeeee"/><text x="60" y="105" font-size="11" text-anchor="middle" fill="#888" font-family="Arial">No photo yet</text></svg>';
            img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
        }

        function addShownItem(i) {
            var item = shownItems[i];
            addToCart(item.n, item.p);
        }

        document.addEventListener("DOMContentLoaded", function () {
            ["guitars", "piano", "drums", "wind-brass", "violin", "more"].forEach(function (slug) {
                var card = document.querySelector(".category-card." + slug);
                if (card) {
                    card.setAttribute("href", "#");
                    card.addEventListener("click", function (event) {
                        event.preventDefault();
                        openCategory(slug);
                    });
                }
            });
            renderCart();
        });
