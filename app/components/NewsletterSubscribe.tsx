"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, ingresá un correo electrónico válido." }),
})

export default function NewsletterSubscribe() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{
          email: values.email,
          created_at: new Date().toISOString(),
          status: 'activo'
        }])
        .select()

      if (error) {
        console.error('Error:', error)
        toast({
          title: "Error al suscribirse",
          description: "Hubo un problema al procesar tu suscripción. Por favor, intenta nuevamente.",
          variant: "destructive"
        })
        return
      }

      toast({
        title: "¡Gracias por suscribirte!",
        description: "Te mantendremos actualizado con las últimas novedades.",
        variant: "default"
      })
      form.reset()
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error al suscribirse",
        description: "Hubo un problema al procesar tu suscripción. Por favor, intenta nuevamente.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 text-center">
            Mantente Inspirado
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 text-center px-2 sm:px-0">
            Suscríbete a nuestro newsletter para recibir las últimas actualizaciones.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Ingresa tu email" 
                        {...field} 
                        className="rounded-full text-sm sm:text-base" 
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full rounded-full" 
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Suscribiendo..." : "Suscribirse"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}

