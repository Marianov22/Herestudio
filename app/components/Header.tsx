"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { SunIcon, MoonIcon, MenuIcon, XIcon } from "lucide-react"
import SocialIcons from "./SocialIcons"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Admin", href: "/admin" },
  { name: "Contacto", href: "/contacto" },
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      
      // Si no estamos en la página principal, primero navegamos a ella
      if (window.location.pathname !== '/') {
        window.location.href = '/' + href
        return
      }

      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
        setIsOpen(false)
      }
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Heres Studio</span>
              <img
                className="h-8 w-auto"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-SW6QDQbcVuwPgb6a2CYtYmRbsJa4k1.png"
                alt="Heres Studio Logo"
              />
            </Link>
          </div>

          {/* Menú hamburguesa para móvil */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Menú desktop */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Botones desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
            <Link href="/contacto">
              <motion.button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sé nuestro cliente
              </motion.button>
            </Link>
            <SocialIcons />
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Menú móvil */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="space-y-4 px-2 pb-4 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-primary/10"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-4 flex items-center justify-between px-3">
                  <SocialIcons />
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    </button>
                  )}
                </div>
                <Link 
                  href="/contacto" 
                  onClick={() => setIsOpen(false)}
                  className="block mt-4"
                >
                  <motion.button
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    Sé nuestro cliente
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

