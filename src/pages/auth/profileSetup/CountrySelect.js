import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import "../../../App.css";

function CountrySelect({ value, onChange }) {

   

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries data from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        // Extract country names and flags from the response
        const countriesData = data.map((country) => ({
          value: country.cca2, // Country code
          label: country.name.common, // Country name
          flag: country.flags.png, // Country flag URL
        }));
        // Set the countries data in state
        setCountries(countriesData);
      })
      .catch((error) => {
        console.error('Error fetching countries data:', error);
      });
  }, []);

  return (
    <Select
   
      options={countries}
      value={value}
      onChange={onChange}
      placeholder="Select a country"
      getOptionLabel={(option) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={option.flag} alt={option.label} style={{ width: '22px', marginRight: '7px' }} />
          {option.label}
        </div>
      )}
      getOptionValue={(option) => option.value}
    />
  );
}

export default CountrySelect;
