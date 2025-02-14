"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const clientCategories = [
  "Todos",
  "Empresas",
  "Influencers",
  "Artistas",
  "Startups",
  "Indumentaria"
]

const clients = [
  {
    name: "Cliente 1",
    category: "Empresas",
    logo: "https://placeholder.com/150",
    description: "Proyecto de contenido audiovisual corporativo"
  },
  {
    name: "Influencer Lifestyle",
    category: "Influencers",
    logo: "https://placeholder.com/150",
    description: "Contenido semanal para Instagram y TikTok"
  },
  {
    name: "Marca de Ropa",
    category: "Indumentaria",
    logo: "https://placeholder.com/150",
    description: "Campaña de temporada primavera-verano"
  },
  {
    name: "Startup Tech",
    category: "Startups",
    logo: "https://placeholder.com/150",
    description: "Videos promocionales para lanzamiento de app"
  },
  {
    name: "Artista Musical",
    category: "Artistas",
    logo: "https://placeholder.com/150",
    description: "Producción de videoclip y contenido para RRSS"
  },
  {
    name: "Marca Deportiva",
    category: "Indumentaria",
    logo: "https://placeholder.com/150",
    description: "Campaña con atletas y embajadores de marca"
  },
  {
    name: "Empresa Industrial",
    category: "Empresas",
    logo: "https://placeholder.com/150",
    description: "Video institucional y fotografía de productos"
  },
  {
    name: "App Fintech",
    category: "Startups",
    logo: "https://placeholder.com/150",
    description: "Contenido educativo sobre finanzas personales"
  }
]

export default function ClientsGrid() {
  const [filter, setFilter] = useState("Todos")

  const filteredClients = filter === "Todos" 
    ? clients 
    : clients.filter((client) => client.category === filter)

  return (
    <section className="py-16 bg-background" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Nuestros Clientes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Empresas y creadores que confían en nosotros para dar vida a sus ideas.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {clientCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.name}
              className="group relative bg-card rounded-xl p-6 hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-square relative mb-4">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain p-4 filter group-hover:brightness-110 transition-all"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{client.name}</h3>
              <p className="text-sm text-muted-foreground">{client.description}</p>
              <span className="absolute top-4 right-4 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                {client.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 