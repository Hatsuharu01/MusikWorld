    // ---------- PAGE SWITCHING ----------
        // Shows one page and hides all the others
        function showPage(page) {
            document.querySelector("main").style.display = (page === "home") ? "block" : "none";
            ["about", "contact", "cart", "account", "settings"].forEach(function (id) {
                document.getElementById(id).style.display = (page === id) ? "block" : "none";
            });
            window.scrollTo(0, 0);
        }

        // Navigation links
        function homeClick() { showPage("home"); }
        function aboutClick() { showPage("about"); }
        function contactClick() { showPage("contact"); }

        // Header icons
        function cartClick() { showPage("cart"); }
        function accountClick() { showPage("account"); }
        function settingsClick() { showPage("settings"); }

        function searchClick() {
            var text = document.getElementById("searchInput").value;
            alert("You searched for: " + text);
        }

        // ---------- CONTACT FORM ----------
        function submitContact(event) {
            event.preventDefault();
            var name = document.getElementById("contactName").value;
            alert("Thank you, " + name + "! Your message has been sent.");
            event.target.reset();
        }

        // ---------- CART ----------
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

        // ---------- ACCOUNT ----------
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

        // ---------- SETTINGS ----------
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

        // Category links
        document.addEventListener("DOMContentLoaded", function () {
            ["guitars", "piano", "drums", "wind-brass", "violin", "more"].forEach(function (slug) {
                var card = document.querySelector(".category-card." + slug);
                if (card) {
                    card.setAttribute("href", slug + ".html");
                }
            });
            renderCart();
        });