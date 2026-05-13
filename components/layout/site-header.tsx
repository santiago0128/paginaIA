import { getCategories } from "@/lib/supabase/db";
import { brand } from "@/lib/config/brand";
import { NavClient } from "./NavClient";

export async function SiteHeader() {
  const categories = await getCategories();

  return (
    <header className="relative z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <NavClient categories={categories} brandName={brand.name} />
      </div>
    </header>
  );
}
