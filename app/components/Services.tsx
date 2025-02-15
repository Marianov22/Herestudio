"use client"

import { motion, useInView } from "framer-motion"
import { Play, Heart, Users, Star } from "lucide-react"
import { useRef, useEffect, useState } from "react"

const stats = [
  {
    number: "10000000",
    label: "Reproducciones Totales",
    description: "En todas nuestras producciones",
    icon: <Play className="w-8 h-8 mb-4 text-primary" />,
  },
  {
    number: "500000",
    label: "Likes",
    description: "En redes sociales",
    icon: <Heart className="w-8 h-8 mb-4 text-primary" />,
  },
  {
    number: "50+",
    label: "Clientes Satisfechos",
    description: "Confían en nosotros",
    icon: <Users className="w-8 h-8 mb-4 text-primary" />,
  },
  {
    number: "100%",
    label: "Tasa de Satisfacción",
    description: "En todos nuestros proyectos",
    icon: <Star className="w-8 h-8 mb-4 text-primary" />,
  },
]

// Función auxiliar para formatear números
const formatNumber = (num: string) => {
  if (num.endsWith('%')) {
    return parseInt(num.slice(0, -1))
  }
  if (num.endsWith('+')) {
    return parseInt(num.slice(0, -1))
  }
  return parseInt(num)
}

// Función para formatear el número con separadores de miles
const formatWithSuffix = (num: number, originalFormat: string) => {
  if (originalFormat.endsWith('%')) return `${num}%`
  if (originalFormat.endsWith('+')) return `${num}+`
  return num.toLocaleString('es-ES')
}

export default function Services() {
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: true, margin: "-100px" })
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const target = formatNumber(stat.number)
        let current = 0
        const step = Math.ceil(target / 200)
        
        const timer = setInterval(() => {
          current += step
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setCounts(prev => prev.map((count, i) => i === index ? current : count))
        }, 50)

        return () => clearInterval(timer)
      })
    }
  }, [isInView])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background" id="services">
      <div className="container mx-auto">
        <div ref={statsRef}>
          <motion.h2
            className="text-4xl font-bold mb-16 text-center text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nuestros Números
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-card p-6 rounded-lg shadow-lg text-center hover:border-primary/10 border-2 border-transparent transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {stat.icon}
                <motion.span
                  className="text-4xl font-bold block mb-2 text-foreground"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {formatWithSuffix(counts[index], stat.number)}
                </motion.span>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{stat.label}</h3>
                <p className="text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

