import React, { useEffect, useState } from 'react';
import ReservationForm from '../components/ReservationForm';
import ReservationList from '../components/ReservationList';
import axios from 'axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchReservations = async () => {
    const res = await axios.get('/api/reservations', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setReservations(res.data);
  };

  const handleCreate = async (data) => {
    await axios.post('/api/reservations', data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchReservations();
  };

  const handleUpdate = async (id, data) => {
    await axios.put(`/api/reservations/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setEditing(null);
    fetchReservations();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/reservations/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchReservations();
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Réservations</h1>
      <ReservationForm
        onSubmit={editing ? (data) => handleUpdate(editing.id, data) : handleCreate}
        initialData={editing}
      />
      <ReservationList
        reservations={reservations}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Reservations;