import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'

const schema = yup.object().shape({
  password: yup.string().min(6, 'Minimum 6 caractères').required('Mot de passe requis')
})

export default function ResetPassword() {
  const { token } = useParams()
  const [success, setSuccess] = useState('')
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/auth/reset-password/${token}`, data)
      setSuccess(res.data.message)
      setServerError('')
    } catch (err) {
      setServerError(err.response?.data?.message || 'Erreur inconnue')
      setSuccess('')
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Nouveau mot de passe</h2>

        {success && <p className="text-green-600 text-sm">{success}</p>}
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

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
          Réinitialiser le mot de passe
        </button>
      </form>
    </div>
  )
}
