import React from 'react';

const ReservationList = ({ reservations, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Salle</th>
            <th>Date</th>
            <th>Début</th>
            <th>Durée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reservations) && reservations.map(reservation => (
            <tr key={reservation.id} className="text-center">
              <td>{reservation.id}</td>
              <td>{reservation.salleId}</td>
              <td>{reservation.date}</td>
              <td>{reservation.heureDebut}</td>
              <td>{reservation.duree}h</td>
              <td>
                <button
                  onClick={() => onEdit(reservation)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(reservation.id)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;