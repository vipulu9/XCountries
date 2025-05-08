import React, { useEffect, useState } from 'react';

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://xcountries-backend.azurewebsites.net/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCountries(data))
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="country-grid">
      {countries.map(country => (
        <div key={country.name} className="country-item">
          <img src={country.flag} alt={`Flag of ${country.name}`} />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryFlags;
