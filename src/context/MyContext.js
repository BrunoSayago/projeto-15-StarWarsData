import React, { createContext, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const MyContext = createContext();

const PLANET_API = 'https://swapi.dev/api/planets';

function Provider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroColuna, setFiltroColuna] = useState('population');
  const [filtroComparacao, setFiltroComparacao] = useState('maior que');
  const [filtroNumero, setFiltroNumero] = useState(0);

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

  const botaoFiltro = (valorColuna, valorComparacao, valorNumero) => {
    setFiltroColuna(valorColuna);
    setFiltroComparacao(valorComparacao);
    setFiltroNumero(valorNumero);
  };

  const contextValue = useMemo(() => ({
    planetsInfo,
    filtroNome,
    filtroColuna,
    filtroComparacao,
    filtroNumero,
    mudaFiltro,
    botaoFiltro,
  }), [planetsInfo, filtroNome, filtroColuna, filtroComparacao, filtroNumero]);

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
