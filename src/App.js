import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacemos la consulta a la API
    fetch('http://127.0.0.1:5000/users/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);  // Establecemos los usuarios en el estado
        setLoading(false);  // Cambiamos el estado de carga
      })
      .catch((err) => {
        setError(err.message);  // Si ocurre un error, lo almacenamos en el estado
        setLoading(false);
      });
  }, []);  // El arreglo vacío asegura que esto se ejecute solo una vez al montar el componente

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
