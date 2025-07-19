// src/components/SalleForm.jsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  nom: yup.string().required(),
  capacite: yup.number().required().positive().integer(),
  type: yup.string().required(),
  equipements: yup.string().required(),
})

export default function SalleForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      nom: '',
      capacite: '',
      type: '',
      equipements: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data)
        reset()
      })}
      className="space-y-4 border p-4 rounded-md"
    >
      <div>
        <label>Nom</label>
        <input {...register('nom')} className="input" />
        <p className="text-red-500 text-sm">{errors.nom?.message}</p>
      </div>
      <div>
        <label>Capacité</label>
        <input type="number" {...register('capacite')} className="input" />
        <p className="text-red-500 text-sm">{errors.capacite?.message}</p>
      </div>
      <div>
        <label>Type</label>
        <input {...register('type')} className="input" />
        <p className="text-red-500 text-sm">{errors.type?.message}</p>
      </div>
      <div>
        <label>Équipements</label>
        <input {...register('equipements')} className="input" />
        <p className="text-red-500 text-sm">{errors.equipements?.message}</p>
      </div>
      <button type="submit" className="btn btn-primary">Enregistrer</button>
    </form>
  )
}
