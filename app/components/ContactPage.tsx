"use client"

import { motion } from "framer-motion"
import ContactForm from "./ContactForm"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            <span className="text-gradient animate-text-gradient">Trabajemos juntos</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Cuéntanos sobre tu proyecto y nosotros nos encargaremos de darle vida a través de contenido audiovisual innovador.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">¿Por qué elegirnos?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✨</span>
                  <span>Experiencia en múltiples industrias y formatos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">🎯</span>
                  <span>Enfoque personalizado para cada proyecto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">⚡</span>
                  <span>Resultados que superan expectativas</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Nuestros servicios</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">🎥</span>
                  <span>Producción de video profesional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">📸</span>
                  <span>Fotografía de alta calidad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✏️</span>
                  <span>Diseño y post-producción</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card rounded-xl shadow-xl p-6"
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 