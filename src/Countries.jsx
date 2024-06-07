import React, { useState, useEffect } from 'react';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const CountryCard = ({ country }) => (
    <div className="country-card">
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <p>{country.name.common}</p>
    </div>
  );

  const content = () => {
    if (loading) {
      return <p>Loading countries...</p>;
    } else if (error) {
      return <p>Error: {error}</p>;
    } else {
      return (
        <ul className="countries-list">
          {countries.map((country) => (
            <li key={country.cca3}>
              <CountryCard country={country} />
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="App">
      {content()}
      <style jsx>{`
        .App {
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          padding: 0;
        }

        .countries-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          width: 80%;
        }

        .countries-list li {
          margin: 10px;
        }

        .country-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          width: 250px; /* Adjust width as needed */
          margin: 0 auto; /* Center cards horizontally */
        }

        img {
          width: 100%;
          height: 150px; /* Adjust height as needed */
          object-fit: cover;
          border-radius: 4px 4px 0 0; /* Rounded top corners */
        }

        p {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Countries;
