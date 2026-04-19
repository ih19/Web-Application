# ShopNow - Amazon Clone (CSC353 Step 3)

## How to Run

### Terminal 1 — Backend
```bash
cd todo-backend
npm install
npm start
```
Runs at: http://localhost:5000

### Terminal 2 — Frontend
```bash
cd todo-frontend
npm install
npm start
```
Runs at: http://localhost:3000

---

## Components
- **App.jsx** — Main component, manages all state, fetches data, handles CRUD
- **NavBar.jsx** — Top navigation bar with logo, search, cart icon
- **SearchBar.jsx** — Search input with live filtering
- **Card.jsx** — Individual product card with image, rating, price, Add to Cart
- **ShoppingCart.jsx** — Cart page with qty controls, delete, and checkout summary

## React Concepts Used
- `useState` — products, cart, search query, current view
- `useEffect` — fetch products + cart from json-server on load
- **Props** — Card receives product + onAddToCart; ShoppingCart receives cartItems + handlers
- **CRUD** — GET (load), POST (add to cart), PATCH (update qty), DELETE (remove from cart)

## Features
- Amazon-style UI with dark navbar, yellow accents, Bootstrap 5
- Live search by product name or category
- Add to Cart persisted in json-server (survives refresh)
- Increment / decrement quantity in cart
- Delete items from cart
- Cart item count badge on navbar
- Subtotal calculation
- Loading spinner
