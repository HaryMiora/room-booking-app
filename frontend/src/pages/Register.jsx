import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'

const schema = yup.object().shape({
  name: yup.string().required('Nom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().min(6, '6 caractères minimum').required('Mot de passe requis')
})

export default function Register() {
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', data)
      alert('Inscription réussie ! Token: ' + res.data.token)
    } catch (err) {
      setServerError(err.response?.data?.message || 'Erreur inconnue')
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Inscription</h2>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <input
            {...register('name')}
            className="w-full p-2 border rounded-md"
            placeholder="Votre nom"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register('email')}
            className="w-full p-2 border rounded-md"
            placeholder="email@example.com"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded-md"
            placeholder="********"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          S'inscrire
        </button>
      </form>
    </div>
  )
}
