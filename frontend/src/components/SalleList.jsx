// src/components/SalleList.jsx
import React from 'react'

export default function SalleList({ salles, onDelete, onEdit }) {
  return (
    <div className="space-y-4">
      {salles.map((salle) => (
        <div key={salle.id} className="p-4 border rounded flex justify-between items-center">
          <div>
            <h3 className="font-bold">{salle.nom} ({salle.capacite} places)</h3>
            <p>Type: {salle.type}</p>
            <p>Équipements: {salle.equipements}</p>
          </div>
          <div className="space-x-2">
            <button className="btn btn-sm btn-warning" onClick={() => onEdit(salle)}>Modifier</button>
            <button className="btn btn-sm btn-error" onClick={() => onDelete(salle.id)}>Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  )
}
