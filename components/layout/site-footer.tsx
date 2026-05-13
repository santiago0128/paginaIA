import Link from "next/link";
import { brand } from "@/lib/config/brand";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-slate-400 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <p className="leading-6">{brand.monetization.disclosure}</p>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
            <nav className="flex gap-4">
              <Link href={brand.legal.privacyUrl} className="hover:text-white transition-colors">Privacidad</Link>
              <Link href={brand.legal.termsUrl} className="hover:text-white transition-colors">Términos</Link>
              <Link href={brand.legal.cookiesUrl} className="hover:text-white transition-colors">Cookies</Link>
              <Link href={brand.legal.affiliateDisclosureUrl} className="hover:text-white transition-colors">Afiliados</Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-slate-500">
            © {currentYear} {brand.name}. Todos los derechos reservados. | Hecho con cuidado para descubrir la mejor IA para ti.
          </p>
        </div>
      </div>
    </footer>
  );
}
