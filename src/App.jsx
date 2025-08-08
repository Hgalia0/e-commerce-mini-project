

import { useMemo, useState } from 'react';
import './App.css'


const PRODUCTS = [
  { id: 1, name: "Fleet Runner Shoes", price: 85, category: "Sports", description: "Lightweight running shoes with breathable mesh.", rating: 4.5 },
  { id: 2, name: "Aero Yoga Mat", price: 40, category: "Sports", description: "Non-slip yoga mat, 6mm thick.", rating: 4.2 },
  { id: 3, name: "Studio Headphones", price: 120, category: "Electronics", description: "Over-ear headphones with passive noise isolation.", rating: 4.7 },
  { id: 4, name: "Pocket Notebook", price: 8, category: "Stationery", description: "Hardcover pocket notebook, 120 pages.", rating: 4.1 },
  { id: 5, name: "Smart Thermos", price: 32, category: "Home", description: "Keeps drinks hot or cold, shows temperature.", rating: 4.3 },
  { id: 6, name: "Trail Backpack", price: 95, category: "Outdoors", description: "30L comfortable backpack for day hikes.", rating: 4.4 },
  { id: 7, name: "Wireless Charger", price: 25, category: "Electronics", description: "Fast Qi wireless charger for phones.", rating: 4.0 },
  { id: 8, name: "Classic Sunglasses", price: 60, category: "Fashion", description: "UV400 protection, unisex.", rating: 4.2 },
  { id: 9, name: "Running Socks (3-pack)", price: 12, category: "Sports", description: "Moisture-wicking low-cut socks.", rating: 4.6 },
  { id: 10, name: "Desk Lamp", price: 45, category: "Home", description: "Adjustable desk lamp with brightness levels.", rating: 4.3 }
];

const uniq = (arr) => Array.from(new Set(arr));

function ProductCard({ product, onRecommend }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category} • ⭐ {product.rating}</p>
        <p className="mt-2 text-sm">{product.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-bold">${product.price}</div>
        <button
          onClick={() => onRecommend(product)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Recommend
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(9999);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recs, setRecs] = useState([]);

  const categories = useMemo(() => ["All", ...uniq(PRODUCTS.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (p.price > Number(maxPrice)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [query, category, maxPrice]);

  // Recommendation system (rule-based)
  // Strategy: prefer same category, then higher rating, then similar price range
  function getRecommendations(target, limit = 4) {
    if (!target) return [];
    const sameCategory = PRODUCTS
      .filter((p) => p.id !== target.id && p.category === target.category)
      .sort((a, b) => b.rating - a.rating || Math.abs(a.price - target.price) - Math.abs(b.price - target.price));

    const others = PRODUCTS
      .filter((p) => p.id !== target.id && p.category !== target.category)
      .sort((a, b) => b.rating - a.rating);

    return [...sameCategory, ...others].slice(0, limit);
  }

  function handleRecommend(product) {
    setSelectedProduct(product);
    const r = getRecommendations(product, 4);
    setRecs(r);
    // This simulates the "AI" decision-making: simple rule-based logic
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold">Mini E‑commerce — Product Catalog</h1>
          <p className="text-sm text-gray-600 mt-1">Static catalog (8–12 products) + simple recommendation AI (rule-based)</p>
        </header>

        <section className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Search</label>
              <input
                placeholder="Search by name, description or category"
                className="w-full border rounded px-3 py-2 mt-1"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="text-sm font-medium">Category</label>
                <select className="w-full border rounded px-2 py-2 mt-1" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <label className="text-sm font-medium">Max price</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-2 mt-1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Products ({filtered.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onRecommend={handleRecommend} />
            ))}
          </div>
        </section>

        <aside className="mt-8">
          {selectedProduct ? (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-md font-semibold">Recommendations for "{selectedProduct.name}"</h3>
              <p className="text-sm text-gray-600">Based on category and rating (rule-based AI)</p>

              {recs.length === 0 ? (
                <p className="mt-3 text-sm">No recommendations found.</p>
              ) : (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recs.map((r) => (
                    <div key={r.id} className="border rounded p-3">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{r.name}</div>
                          <div className="text-sm text-gray-600">{r.category} • ⭐ {r.rating}</div>
                        </div>
                        <div className="font-bold">${r.price}</div>
                      </div>
                      <div className="text-sm mt-2 text-gray-700">{r.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">No product selected</h3>
              <p className="text-sm text-gray-600">Click "Recommend" on any product card to see suggestions.</p>
            </div>
          )}
        </aside>

        <footer className="mt-8 text-sm text-gray-600">
          <div className="bg-white p-3 rounded shadow">
            <strong>Bonus — Blockchain integration idea:</strong>
            <p className="mt-2">This recommendation AI can be combined with blockchain by storing verified user preferences on-chain for privacy-preserving personalization, enabling token-gated pricing or loyalty rewards via smart contracts that automatically apply discounts to recommended items when tokens are presented.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

