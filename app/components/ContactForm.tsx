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
import { toast } from "@/components/ui/use-toast"

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
  project_type: z.string().min(1, { message: "Por favor, seleccioná un tipo de proyecto." }),
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
      instagram_followers: "",
      tiktok: "",
      tiktok_followers: "",
      youtube: "",
      youtube_subscribers: "",
      project_type: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Convertir los valores de seguidores a números
      const formattedValues = {
        ...values,
        instagram_followers: values.instagram_followers ? parseInt(values.instagram_followers) : 0,
        tiktok_followers: values.tiktok_followers ? parseInt(values.tiktok_followers) : 0,
        youtube_subscribers: values.youtube_subscribers ? parseInt(values.youtube_subscribers) : 0,
        status: 'nuevo',
        created_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from('leads')
        .insert([formattedValues])
        .select()

      if (error) {
        console.error('Error detallado:', error)
        toast({
          title: "Error al enviar el formulario",
          description: error.message,
          variant: "destructive"
        })
        throw error
      }

      toast({
        title: "¡Formulario enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
        variant: "default"
      })
      form.reset()
    } catch (error) {
      console.error('Error completo:', error)
      alert("Hubo un error al enviar el formulario. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-background py-8 sm:py-20" id="contact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">Contactanos</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            ¿Listo para dar vida a tu visión? Creemos algo increíble juntos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card p-4 sm:p-8 rounded-lg shadow-sm"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
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
                name="project_type"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="instagram_followers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Seguidores IG</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Cantidad" {...field} className="text-sm" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tiktok_followers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Seguidores TikTok</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Cantidad" {...field} className="text-sm" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtube_subscribers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Suscriptores YouTube</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Cantidad" {...field} className="text-sm" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full mt-6 sm:mt-8" 
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}

