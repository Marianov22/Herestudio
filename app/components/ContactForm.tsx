"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { supabase } from "@/lib/supabase"

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, ingresá un correo electrónico válido." }),
  phone: z.string()
    .min(8, { message: "El teléfono debe tener al menos 8 dígitos." })
    .regex(/^[0-9+\s-()]*$/, { message: "Por favor, ingresá un número de teléfono válido." }),
  company: z.string().min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres." }),
  instagram: z.string().optional(),
  instagram_followers: z.string().optional(),
  tiktok: z.string().optional(),
  tiktok_followers: z.string().optional(),
  youtube: z.string().optional(),
  youtube_subscribers: z.string().optional(),
  projectType: z.string().min(1, { message: "Por favor, seleccioná un tipo de proyecto." }),
  budget: z.string().optional(),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      instagram: "",
      tiktok: "",
      youtube: "",
      projectType: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            ...values,
            status: 'nuevo',
            created_at: new Date().toISOString(),
          }
        ])

      if (error) throw error

      alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.")
      form.reset()
    } catch (error) {
      alert("Hubo un error al enviar el formulario. Por favor, intenta nuevamente.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-background py-20" id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">Contactanos</h2>
          <p className="text-lg text-muted-foreground">
            ¿Listo para dar vida a tu visión? Creemos algo increíble juntos.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="juan@ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">+</span>
                        <Input 
                          placeholder="54 9 11 1234-5678" 
                          className="pl-8" 
                          type="tel"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu Empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Proyecto</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 rounded-md border border-input bg-background text-foreground"
                      >
                        <option value="">Seleccioná un tipo de proyecto</option>
                        <option value="Producción de Video">Producción de Video</option>
                        <option value="Fotografía">Fotografía</option>
                        <option value="Post-Producción">Post-Producción</option>
                        <option value="Estrategia de Contenido">Estrategia de Contenido</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Contanos sobre tu proyecto..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                          <Input placeholder="usuario" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TikTok</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                          <Input placeholder="usuario" className="pl-8" {...field} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <Input placeholder="URL del canal" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="instagram_followers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seguidores en Instagram</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Cantidad de seguidores" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tiktok_followers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seguidores en TikTok</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Cantidad de seguidores" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="youtube_subscribers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suscriptores en YouTube</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Cantidad de suscriptores" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}

