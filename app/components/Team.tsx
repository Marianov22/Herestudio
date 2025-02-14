"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const teamMembers = [
  {
    name: "Lautaro Heres",
    role: "Fundador y Director Creativo",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Lautaro es el visionario detrás de Heres Studio, aportando años de experiencia en producción audiovisual y una pasión por contar historias a través de medios visuales.",
  },
  {
    name: "Leon",
    role: "Jefe de Producción",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Leon es la mano derecha de Lautaro, supervisando todos los procesos de producción y asegurando la más alta calidad en cada proyecto que Heres Studio emprende.",
  },
]

export default function Team() {
  return (
    <section className="py-20 bg-background" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Conocé a Nuestro Equipo</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Las mentes creativas detrás de la magia audiovisual de Heres Studio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary mb-2">{member.role}</p>
              <p className="text-muted-foreground text-center">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

