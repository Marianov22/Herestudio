"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Definir la interfaz para un lead
interface Lead {
  id: number
  company: string
  name: string
  instagram: string
  instagram_followers: number
  tiktok: string
  tiktok_followers: number
  youtube: string
  youtube_subscribers: number
  created_at: string
}

export default function AdminPanel() {
  // Especificar el tipo Lead[] para el estado
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState("todos")
  const [minFollowers, setMinFollowers] = useState(0)

  useEffect(() => {
    fetchLeads()
  }, [filter, minFollowers])

  async function fetchLeads() {
    let query = supabase
      .from('leads')
      .select('*')
      
    if (minFollowers > 0) {
      query = query.or(`instagram_followers.gte.${minFollowers},tiktok_followers.gte.${minFollowers},youtube_subscribers.gte.${minFollowers}`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error:', error)
      return
    }

    setLeads(data)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Panel de Leads</h1>
      
      <div className="mb-6 space-x-4">
        <input
          type="number"
          placeholder="Mínimo de seguidores"
          className="input"
          onChange={(e) => setMinFollowers(Number(e.target.value))}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Instagram</TableHead>
            <TableHead>Seguidores IG</TableHead>
            <TableHead>TikTok</TableHead>
            <TableHead>Seguidores TT</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.company}</TableCell>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.instagram}</TableCell>
              <TableCell>{lead.instagram_followers}</TableCell>
              <TableCell>{lead.tiktok}</TableCell>
              <TableCell>{lead.tiktok_followers}</TableCell>
              <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 