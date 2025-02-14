import Link from "next/link"
import SocialIcons from "./SocialIcons"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {["About", "Work", "Services", "Contact", "Privacy", "Terms"].map((item) => (
            <div key={item} className="pb-6">
              <Link
                href="https://www.flowersandsaints.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-6 text-muted-foreground hover:text-foreground"
              >
                {item}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center">
          <SocialIcons />
        </div>
        <p className="mt-8 text-center text-sm leading-5 text-muted-foreground">
          Diseñado y Desarrollado con ❤️ por MaioSDP & Co. Copyright Heres Studio
        </p>
      </div>
    </footer>
  )
}

