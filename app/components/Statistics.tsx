"use client"

import { motion } from "framer-motion"
import { Play, Heart, Users, Star } from "lucide-react"

const stats = [
  {
    number: "10M+",
    label: "Reproducciones Totales",
    description: "En todas nuestras producciones",
    icon: <Play className="w-8 h-8 mb-4 text-primary" />,
  },
  {
    number: "500K+",
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

export default function Statistics() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
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
                {stat.number}
              </motion.span>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{stat.label}</h3>
              <p className="text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 