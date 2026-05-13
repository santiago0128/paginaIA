import Link from "next/link";
import { brand } from "@/lib/config/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>{brand.monetization.disclosure}</p>
        <div className="flex gap-4">
          <Link href={brand.legal.privacyUrl}>Privacidad</Link>
          <Link href={brand.legal.termsUrl}>Términos</Link>
          <Link href={brand.legal.cookiesUrl}>Cookies</Link>
          <Link href={brand.legal.affiliateDisclosureUrl}>Afiliados</Link>
        </div>
      </div>
    </footer>
  );
}
