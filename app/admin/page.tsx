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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

// Definir la interfaz para un lead
interface Lead {
  id: string
  company: string
  name: string
  email: string
  phone: string
  instagram: string | null
  instagram_followers: number | null
  tiktok: string | null
  tiktok_followers: number | null
  youtube: string | null
  youtube_subscribers: number | null
  project_type: string
  message: string
  status: string
  created_at: string
}

export default function AdminPanel() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState("todos")
  const [minFollowers, setMinFollowers] = useState(0)
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchLeads()
  }, [filter, minFollowers, dateFilter, searchTerm])

  async function fetchLeads() {
    let query = supabase
      .from('leads')
      .select('*')
      
    if (minFollowers > 0) {
      query = query.or(`instagram_followers.gte.${minFollowers},tiktok_followers.gte.${minFollowers},youtube_subscribers.gte.${minFollowers}`)
    }

    if (dateFilter === "today") {
      const today = new Date().toISOString().split('T')[0]
      query = query.gte('created_at', today)
    } else if (dateFilter === "week") {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      query = query.gte('created_at', weekAgo)
    } else if (dateFilter === "month") {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      query = query.gte('created_at', monthAgo)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error:', error)
      return
    }

    let filteredData = data
    if (searchTerm) {
      filteredData = data.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.instagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.tiktok.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setLeads(filteredData)
  }

  function clearFilters() {
    setFilter("todos")
    setMinFollowers(0)
    setDateFilter("all")
    setSearchTerm("")
  }

  const exportToExcel = () => {
    // Preparar los datos para Excel
    const exportData = leads.map(lead => ({
      Empresa: lead.company,
      Nombre: lead.name,
      Email: lead.email,
      Teléfono: lead.phone,
      Instagram: lead.instagram,
      'Seguidores IG': lead.instagram_followers,
      TikTok: lead.tiktok,
      'Seguidores TT': lead.tiktok_followers,
      YouTube: lead.youtube,
      'Suscriptores YT': lead.youtube_subscribers,
      'Tipo de Proyecto': lead.project_type,
      Mensaje: lead.message,
      Estado: lead.status,
      'Fecha de Creación': new Date(lead.created_at).toLocaleDateString()
    }))

    // Crear el libro de Excel
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Leads")

    // Generar el archivo
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    
    // Descargar el archivo
    saveAs(data, `leads-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">Panel de Administración</h1>
        <Button onClick={exportToExcel} className="w-full sm:w-auto">
          Exportar a Excel
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="en_proceso">En Proceso</SelectItem>
            <SelectItem value="completado">Completado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por fecha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las fechas</SelectItem>
            <SelectItem value="today">Hoy</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="month">Último mes</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={clearFilters}
          variant="outline"
          className="w-full"
        >
          Limpiar filtros
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Empresa</TableHead>
              <TableHead className="whitespace-nowrap">Contacto</TableHead>
              <TableHead className="whitespace-nowrap">Instagram</TableHead>
              <TableHead className="whitespace-nowrap">Seg. IG</TableHead>
              <TableHead className="whitespace-nowrap">TikTok</TableHead>
              <TableHead className="whitespace-nowrap">Seg. TT</TableHead>
              <TableHead className="whitespace-nowrap">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className="text-sm">
                <TableCell className="font-medium">{lead.company}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell className="truncate max-w-[100px]">{lead.instagram}</TableCell>
                <TableCell>{lead.instagram_followers?.toLocaleString()}</TableCell>
                <TableCell className="truncate max-w-[100px]">{lead.tiktok}</TableCell>
                <TableCell>{lead.tiktok_followers?.toLocaleString()}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 