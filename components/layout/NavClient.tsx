"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { DbCategory } from "@/lib/supabase/db";

type Props = { categories: DbCategory[]; brandName: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function NavClient({ categories, brandName }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCatOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!catOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!categoryMenuRef.current?.contains(event.target as Node)) {
        setCatOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [catOpen]);

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      onClick={() => setMobileOpen(false)}
      className={`transition hover:text-white ${
        isActive(pathname, href) ? "text-white" : "text-slate-300"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      {/* Logo */}
      <Link href="/" className="text-lg font-semibold text-white">
        {brandName}
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-5 text-sm md:flex">
        {navLink("/herramientas", "Herramientas")}

        {/* Categorías dropdown */}
        <div ref={categoryMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setCatOpen((v) => !v)}
            aria-expanded={catOpen}
            aria-haspopup="menu"
            className="flex items-center gap-1 text-slate-300 transition hover:text-white"
          >
            Categorías <ChevronDown className={`h-3.5 w-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`} />
          </button>
          {catOpen && (
            <div
              role="menu"
              className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-white/10 bg-slate-900 py-1 shadow-xl"
            >
              {categories.map((c) => (
                <a
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  role="menuitem"
                  onClick={() => setCatOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {c.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {navLink("/comparar", "Comparar")}
        {navLink("/noticias", "Noticias")}
        {navLink("/foro", "Foro IA")}
        {navLink("/blog", "Blog")}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:text-white md:hidden"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Menú"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-white/10 bg-slate-950 px-6 py-4 shadow-xl md:hidden">
          <nav className="flex flex-col gap-4 text-sm">
            {navLink("/herramientas", "Herramientas")}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">Categorías</p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((c) => (
                  <a
                    key={c.slug}
                    href={`/categoria/${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
            {navLink("/comparar", "Comparar")}
            {navLink("/noticias", "Noticias")}
            {navLink("/foro", "Foro IA")}
            {navLink("/blog", "Blog")}
          </nav>
        </div>
      )}
    </>
  );
}
