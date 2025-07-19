// src/pages/Salles.jsx
import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import SalleForm from '../components/SalleForm'
import SalleList from '../components/SalleList'

export default function Salles() {
  const [salles, setSalles] = useState([])
  const [editingSalle, setEditingSalle] = useState(null)

  const fetchSalles = async () => {
    const res = await api.get('/salles')
    setSalles(res.data)
  }

  const handleCreate = async (data) => {
    if (editingSalle) {
      await api.put(`/salles/${editingSalle.id}`, data)
      setEditingSalle(null)
    } else {
      await api.post('/salles', data)
    }
    fetchSalles()
  }

  const handleDelete = async (id) => {
    if (confirm('Supprimer cette salle ?')) {
      await api.delete(`/salles/${id}`)
      fetchSalles()
    }
  }

  const handleEdit = (salle) => {
    setEditingSalle(salle)
  }

  useEffect(() => {
    fetchSalles()
  }, [])

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Salles</h1>
      <SalleForm onSubmit={handleCreate} defaultValues={editingSalle} />
      <SalleList salles={salles} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  )
}
