"use client"

import { motion } from "framer-motion"
import { Video, Camera, Edit, Megaphone } from "lucide-react"

const services = [
  {
    icon: <Video className="w-12 h-12 mb-4 text-primary" />,
    title: "Producción de Video",
    description: "Contenido de video de alta calidad para publicidades, redes sociales y comunicaciones corporativas.",
  },
  {
    icon: <Camera className="w-12 h-12 mb-4 text-primary" />,
    title: "Fotografía",
    description: "Servicios profesionales de fotografía para productos, eventos y narrativa de marca.",
  },
  {
    icon: <Edit className="w-12 h-12 mb-4 text-primary" />,
    title: "Post-Producción",
    description: "Edición experta, corrección de color y efectos visuales para perfeccionar tu contenido audiovisual.",
  },
  {
    icon: <Megaphone className="w-12 h-12 mb-4 text-primary" />,
    title: "Estrategia de Contenido",
    description:
      "Estrategias de contenido personalizadas para maximizar el impacto de tus campañas de marketing audiovisual.",
  },
]

export default function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background" id="services">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nuestros Servicios
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-card p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-2 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

