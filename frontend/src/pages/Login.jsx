import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'

const schema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email requis'),
  password: yup.string().required('Mot de passe requis')
})

export default function Login() {
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', data)
      alert('Connexion réussie ! Token: ' + res.data.token)
      localStorage.setItem('token', res.data.token)
    } catch (err) {
      setServerError(err.response?.data?.message || 'Erreur inconnue')
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Connexion</h2>

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

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
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}
