import React, { createContext, useMemo, useState, useEffect, useCallback } from 'react';
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

  const mudaFiltroColuna = ({ target: { value } }) => setFiltroColuna(value);

  const mudaFiltroComp = ({ target: { value } }) => setFiltroComparacao(value);

  const mudaFiltroNumero = ({ target: { value } }) => setFiltroNumero(value);

  const botaoFiltro = useCallback(() => {
    const listaFiltrada = planetsInfo.filter((elemento) => {
      switch (filtroComparacao) {
      case 'maior que':
        return Number(elemento[filtroColuna]) > Number(filtroNumero);
      case 'menor que':
        return Number(elemento[filtroColuna]) < Number(filtroNumero);
      default:
        return Number(elemento[filtroColuna]) === Number(filtroNumero);
      }
    });
    setPlanetsInfo(listaFiltrada);
  }, [filtroColuna, filtroComparacao, filtroNumero, planetsInfo]);

  const contextValue = useMemo(() => ({
    planetsInfo,
    filtroNome,
    filtroColuna,
    filtroComparacao,
    filtroNumero,
    mudaFiltroColuna,
    mudaFiltroComp,
    mudaFiltroNumero,
    mudaFiltro,
    botaoFiltro,
  }), [planetsInfo,
    filtroNome, filtroColuna, filtroComparacao, filtroNumero, botaoFiltro]);

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
