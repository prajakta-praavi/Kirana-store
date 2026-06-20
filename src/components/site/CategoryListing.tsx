import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { categories, type Department, type Product } from "@/data/products";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating" | "name";

export function CategoryListing({
  title,
  products,
  department,
}: {
  title: string;
  description: string;
  banner: string;
  products: Product[];
  department: Department;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [subcategory, setSubcategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const departmentCategories = title.toLowerCase().includes("all")
    ? categories
    : categories.filter((cat) => cat.department === department);

  const list = useMemo(() => {
    let arr = products.filter((p) =>
      [p.name, p.shortDesc, p.tags.join(" ")].join(" ").toLowerCase().includes(q.toLowerCase()),
    );
    if (subcategory !== "all") arr = arr.filter((p) => p.subcategory === subcategory);
    if (inStockOnly) arr = arr.filter((p) => p.inStock);
    if (maxPrice !== "") arr = arr.filter((p) => p.price <= Number(maxPrice));
    arr = [...arr];
    if (sort === "popular") arr.sort((a, b) => b.popularity - a.popularity);
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    if (sort === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [products, q, sort, inStockOnly, maxPrice, subcategory]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <div className="mb-6 grid gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center">
        <label className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-medium"
        >
          <option value="all">All categories</option>
          {departmentCategories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-xl border border-border bg-secondary px-3 py-2 text-sm font-medium"
        >
          <option value="popular">Popularity</option>
          <option value="rating">Top rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name A-Z</option>
        </select>
        <input
          type="number"
          inputMode="numeric"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-secondary px-3 py-2 text-sm md:w-28"
        />
        <label className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="size-4 accent-primary"
          />
          In stock
        </label>
      </div>

      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2"><SlidersHorizontal className="size-4" /> {list.length} products</span>
        <span className="hidden sm:inline">Free delivery above Rs.499</span>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center text-muted-foreground">
          No products match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      )}
    </section>
  );
}
