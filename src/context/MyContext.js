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
  const [listaColuna, setListaColuna] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(PLANET_API);
      const { results } = await data.json();
      setPlanetsInfo(results.map((elemento) => {
        delete elemento.residents;
        return elemento;
      }));
    };
    setListaColuna([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    fetchData();
  }, []);

  const mudaFiltro = ({ target: { value } }) => setFiltroNome(value);

  const mudaFiltroColuna = ({ target: { value } }) => setFiltroColuna(value);

  const mudaFiltroComp = ({ target: { value } }) => setFiltroComparacao(value);

  const mudaFiltroNumero = ({ target: { value } }) => setFiltroNumero(value);

  useEffect(() => {
    const atualizaColunaDefault = () => setFiltroColuna(listaColuna[0]);
    atualizaColunaDefault();
  }, [listaColuna]);

  const handleFilterByNumericValues = useCallback(() => {
    setFilterByNumericValues([
      ...filterByNumericValues,
      { coluna: filtroColuna, comparacao: filtroComparacao, numero: filtroNumero },
    ]);
    if (listaColuna.length > 1) {
      setListaColuna(listaColuna.filter((coluna) => coluna !== filtroColuna));
      const atualizaListaColuna = () => setFiltroColuna(listaColuna[0]);
      atualizaListaColuna();
    } else {
      setListaColuna([]);
    }
  }, [
    listaColuna,
    filterByNumericValues,
    filtroComparacao,
    filtroColuna,
    filtroNumero,
  ]);

  const botaoFiltro = useCallback((lista, coluna, comparacao, numero) => {
    const listaFiltrada = lista.filter((elemento) => {
      switch (comparacao) {
      case 'maior que':
        return Number(elemento[coluna]) > Number(numero);
      case 'menor que':
        return Number(elemento[coluna]) < Number(numero);
      default:
        return Number(elemento[coluna]) === Number(numero);
      }
    });
    return listaFiltrada;
  }, []);

  const botaoApagaTodosFiltros = useCallback(() => {
    setFilterByNumericValues([]);
    setListaColuna([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  }, []);

  const botaoApagaFiltro = useCallback((coluna) => {
    const retornaColuna = filterByNumericValues
      .filter((elemento) => elemento.coluna !== coluna);
    setFilterByNumericValues(retornaColuna);
    setListaColuna([...listaColuna, coluna]);
  }, [filterByNumericValues, listaColuna]);

  const contextValue = useMemo(() => ({
    planetsInfo,
    filtroNome,
    filtroColuna,
    filtroComparacao,
    filtroNumero,
    listaColuna,
    filterByNumericValues,
    botaoApagaTodosFiltros,
    handleFilterByNumericValues,
    mudaFiltroColuna,
    mudaFiltroComp,
    mudaFiltroNumero,
    mudaFiltro,
    botaoFiltro,
    botaoApagaFiltro,
  }), [planetsInfo,
    filtroNome,
    listaColuna,
    filtroColuna,
    filtroComparacao,
    filtroNumero,
    botaoFiltro,
    filterByNumericValues,
    handleFilterByNumericValues,
    botaoApagaTodosFiltros,
    botaoApagaFiltro,
  ]);

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
