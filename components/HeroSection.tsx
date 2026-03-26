import { cookies } from 'next/headers';
import HeroSearch from "./HeroSearch";
import { getDictionary, getLocaleFromCookie } from "../i18n/getDictionary";

export default async function HeroSection() {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookie(cookieStore.get('NEXT_LOCALE')?.value);
  const dict = await getDictionary(locale);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
          {dict.hero.title1} <span className="relative inline-block">
            <span className="relative z-10 font-medium">{dict.hero.title2}</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
          </span>
        </h1>
        <p className="text-xl text-nordic-muted max-w-2xl mx-auto">
          {dict.hero.subtitle}
        </p>
        <HeroSearch translations={dict.hero} />
      </div>
    </section>
  );
}
