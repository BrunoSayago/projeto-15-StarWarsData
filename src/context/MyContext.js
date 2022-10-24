import React, { createContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

const PLANET_API = 'https://swapi.dev/api/planets';

function Provider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(PLANET_API);
      const { results } = await data.json();
      setPlanetsInfo(results.map((elemento) => {
        delete elemento.residents;
        return elemento;
      }));
    };
    fetchData();
  }, []);

  const mudaFiltro = ({ target: { value } }) => setFiltroNome(value);

  const contextValue = useMemo(() => ({
    planetsInfo,
    filtroNome,
    mudaFiltro,
  }), [planetsInfo, filtroNome]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
