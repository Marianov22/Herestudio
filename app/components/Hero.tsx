"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function Hero() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative isolate overflow-hidden bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 lg:flex lg:items-center lg:gap-x-8 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <motion.h1
            className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-gradient animate-text-gradient">Heres Studio</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-lg leading-8 text-muted-foreground"
            variants={itemVariants}
          >
            Creamos historias audiovisuales cautivantes que inspiran. Le damos vida a tu marca a través de contenido
            innovador.
          </motion.p>
          <motion.div
            className="mt-8 flex items-center gap-x-4"
            variants={itemVariants}
          >
            <Link href="/contacto">
              <motion.span 
                className="apple-button inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contactanos
              </motion.span>
            </Link>
            <Link href="#portfolio">
              <motion.span 
                className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                Mirá nuestro trabajo <span aria-hidden="true">→</span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-SW6QDQbcVuwPgb6a2CYtYmRbsJa4k1.png"
            alt="Heres Studio Logo"
            width={600}
            height={600}
            className="w-[500px] rounded-2xl shadow-xl ring-1 ring-gray-900/10 hover:shadow-2xl transition-shadow duration-300"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

