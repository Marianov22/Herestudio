"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"

const timelineEvents = [
  {
    year: 2018,
    title: "Fundación de Heres Studio",
    description: "Nuestro viaje comenzó con una pasión por el diseño minimalista y el arte audiovisual.",
    details:
      "Fundado por Lautaro Heres, Heres Studio comenzó como un pequeño estudio en Buenos Aires, combinando su amor por el diseño minimalista y la belleza audiovisual.",
  },
  {
    year: 2019,
    title: "Primera Exposición Importante",
    description:
      "Mostramos nuestra mezcla única de arte digital y producción audiovisual en el Festival de Diseño de Buenos Aires.",
    details:
      "Nuestra exposición 'Bloom Digital' atrajo a más de 10,000 visitantes y recibió elogios de la crítica por su enfoque innovador en la fusión de tecnología con elementos naturales.",
  },
  {
    year: 2020,
    title: "Lanzamiento de Servicios Online",
    description: "Expandimos nuestro alcance llevando nuestras creaciones al mundo digital.",
    details:
      "En respuesta a los cambios globales, pivoteamos hacia servicios en línea, ofreciendo nuestros diseños únicos y talleres virtuales de producción audiovisual a una audiencia mundial.",
  },
  {
    year: 2021,
    title: "Colaboración con Marcas Top",
    description: "Nos asociamos con marcas líderes de estilo de vida para crear colecciones exclusivas.",
    details:
      "Nuestras colaboraciones incluyeron una serie de videos limitados con la marca de moda argentina Jazmín Chebar y una línea de contenido audiovisual personalizado para Mercado Libre.",
  },
  {
    year: 2022,
    title: "Reconocimiento Internacional",
    description: "Recibimos el prestigioso Premio Internacional de Diseño Audiovisual.",
    details:
      "Nuestra instalación 'Ecos Etéreos', que combinaba proyecciones holográficas con elementos naturales, ganó la medalla de oro en el Festival Internacional de Cine de Mar del Plata.",
  },
  {
    year: 2023,
    title: "Expansión de Estudios",
    description: "Abrimos nuestro primer estudio insignia en el corazón de Buenos Aires.",
    details:
      "Nuestra ubicación en Palermo ofrece una experiencia inmersiva, combinando instalaciones digitales con un espacio de producción audiovisual de vanguardia.",
  },
]

const CameraIcon = ({ progress }: { progress: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    style={{ transform: `scale(${progress})` }}
  >
    <path
      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Nuestra Historia</h2>
          <p className="mt-4 text-lg text-muted-foreground">La evolución de Heres Studio a través de los años</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"
            style={{ scaleY: scaleX }}
          />

          {/* Camera icon */}
          <motion.div
            className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-primary"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
            <CameraIcon progress={useTransform(scrollYProgress, [0, 1], [0.5, 1]) as any} />
          </motion.div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof timelineEvents)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="p-4 bg-background rounded-lg shadow-md border border-primary/10">
          <span className="font-bold text-primary">{event.year}</span>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-sm text-muted-foreground">{event.details}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

