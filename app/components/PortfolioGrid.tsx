"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Campaña de Storytelling de Marca",
    description: "Serie de videos emotivos mostrando historias de éxito de clientes",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Producción de Video",
  },
  {
    id: 2,
    title: "Lanzamiento de Producto",
    description: "Cobertura de evento en vivo y video resumen para una startup tecnológica",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Cobertura de Eventos",
  },
  {
    id: 3,
    title: "Paquete de Contenido para Redes Sociales",
    description: "Conjunto de videos cortos e imágenes para Instagram y TikTok",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Redes Sociales",
  },
  {
    id: 4,
    title: "Serie de Capacitación Corporativa",
    description: "Videos educativos atractivos para la incorporación de empleados",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Corporativo",
  },
  {
    id: 5,
    title: "Publicidad para TV",
    description: "Spot de 30 segundos para una campaña publicitaria nacional",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Publicidad",
  },
  {
    id: 6,
    title: "Cinematografía con Drones",
    description: "Tomas aéreas para un desarrollador inmobiliario de lujo",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Especialidad",
  },
]

const categories = ["All", ...projects.map(project => project.category).filter((value, index, self) => self.indexOf(value) === index)]

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <section className="py-20 bg-background" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Nuestro Trabajo</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mostrando nuestros mejores proyectos audiovisuales y soluciones creativas.
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-lg shadow-lg overflow-hidden hover-lift"
              >
                <div className="relative h-64">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-primary mb-1">{project.category}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <a href="#" className="text-primary hover:underline inline-flex items-center">
                    Ver Proyecto
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

