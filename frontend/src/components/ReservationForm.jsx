import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  salleId: yup.number().required(),
  date: yup.string().required(),
  heureDebut: yup.string().required(),
  duree: yup.number().min(1).required(),
});

const ReservationForm = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      salleId: '',
      date: '',
      heureDebut: '',
      duree: 1,
    },
  });

  React.useEffect(() => {
    reset(initialData || {
      salleId: '',
      date: '',
      heureDebut: '',
      duree: 1,
    });
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <div>
        <label>Salle ID:</label>
        <input type="number" {...register('salleId')} className="input" />
        <p className="text-red-500 text-sm">{errors.salleId?.message}</p>
      </div>
      <div>
        <label>Date:</label>
        <input type="date" {...register('date')} className="input" />
        <p className="text-red-500 text-sm">{errors.date?.message}</p>
      </div>
      <div>
        <label>Heure Début:</label>
        <input type="time" {...register('heureDebut')} className="input" />
        <p className="text-red-500 text-sm">{errors.heureDebut?.message}</p>
      </div>
      <div>
        <label>Durée (heures):</label>
        <input type="number" {...register('duree')} className="input" min="1" />
        <p className="text-red-500 text-sm">{errors.duree?.message}</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {initialData ? 'Modifier' : 'Réserver'}
      </button>
    </form>
  );
};

export default ReservationForm;