import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import Provider from '../context/MyContext';
import renderWithContext from './renderWithContext';
import mockData from './mockData';
import userEvent from '@testing-library/user-event';

describe('Testes Star Wars', () => {
  afterEach(() => jest.restoreAllMocks());

  test('Teste 1 - Testa se a tabela renderiza corretamente', () => {
    renderWithContext(<App />);

    const tabela = screen.getByRole('table');

    const colunas = screen.getAllByRole('columnheader');

    const cabecalhoTabela = ['Name',
      'Rotation Period',
      'Orbital Period',
      'Diameter',
      'Climate',
      'Gravity',
      'Terrain',
      'Surface Water',
      'Population',
      'Films',
      'Created',
      'Edited',
      'URL'
    ];

    expect(tabela).toBeInTheDocument();
    expect(colunas).toHaveLength(13);

    cabecalhoTabela.forEach((coluna) => {
      const colunaCabecalho = screen.getByRole('columnheader', { name: coluna });
      expect(colunaCabecalho).toBeInTheDocument();
    });

  });

  test('Teste 2 - Testa se os filtros e botões são renderizados corretamente', () => {
    renderWithContext(<App />);

    const filtroNome = screen.getByTestId('name-filter');
    const filtroColuna = screen.getByTestId('column-filter');
    const filtroComp = screen.getByTestId('comparison-filter');
    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const botaoRemoverTodosFiltros = screen.getByTestId('button-remove-filters');

    expect(filtroNome).toBeInTheDocument();
    expect(filtroColuna).toBeInTheDocument();
    expect(filtroComp).toBeInTheDocument();
    expect(filtroNumero).toBeInTheDocument();
    expect(botaoFiltrar).toBeInTheDocument();
    expect(botaoRemoverTodosFiltros).toBeInTheDocument();
  });

  test('Teste 3 - Testa se a API é chamada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    expect(global.fetch).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });

  test('Teste 4 - Testa se as informações vindas da API são renderizadas na tabela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const { results } = mockData;
    results.forEach( async (planeta) => {
      const nomePlaneta = await screen.findByRole('cell', { name: planeta.name });
      expect(nomePlaneta).toBeInTheDocument();
    });
  });

  test('Teste 5 - Testa se o filtro por nome funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNome = screen.getByTestId('name-filter');

    const tatooine = screen.findByRole('cell', {
      name: /tatooine/i
    });
    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    // const yavinIV = screen.findByRole('cell', {
    //   name: /yavin iv/i
    // });
    // const hoth = screen.findByRole('cell', {
    //   name: /hoth/i
    // });
    // const dagobah = screen.findByRole('cell', {
    //   name: /dagobah/i
    // });
    // const bespin = screen.findByRole('cell', {
    //   name: /bespin/i
    // });
    // const endor = screen.findByRole('cell', {
    //   name: /endor/i
    // });
    // const naboo = screen.findByRole('cell', {
    //   name: /naboo/i
    // });
    // const coruscant = screen.findByRole('cell', {
    //   name: /coruscant/i
    // });
    // const kamino = screen.findByRole('cell', {
    //   name: /kamino/i
    // });

    userEvent.type(filtroNome, 'ine');
    expect(await tatooine).toBeInTheDocument();
    expect(await alderaan).not.toBeInTheDocument();
    userEvent.clear(filtroNome)

    // userEvent.clear(filtroNome)
    // userEvent.type(filtroNome, 'aan');
    // expect(await alderaan).toBeInTheDocument();
    // expect(await tatooine).not.toBeInTheDocument();
    // userEvent.clear(filtroNome)

    // userEvent.type(filtroNome, 'yav');
    // expect(await yavinIV).toBeInTheDocument();
    // expect(await alderaan).not.toBeInTheDocument();
    // userEvent.clear(filtroNome)

    // userEvent.type(filtroNome, 'oth');
    // expect(await hoth).toBeInTheDocument();
    // expect(await alderaan).not.toBeInTheDocument();
    // userEvent.clear(filtroNome)

    // userEvent.type(filtroNome, 'obah');
    // expect(await dagobah).toBeInTheDocument();
    // expect(await alderaan).not.toBeInTheDocument();
    // userEvent.clear(filtroNome)

    // userEvent.type(filtroNome, 'besp');
    // expect(await bespin).toBeInTheDocument();
    // expect(await alderaan).not.toBeInTheDocument();
    // userEvent.clear(filtroNome)

    // userEvent.type(filtroNome, 'endor');
    // expect(await endor).toBeInTheDocument();
    // expect(await alderaan).not.toBeInTheDocument();
    // userEvent.clear(filtroNome)

    // userEvent.type(filtroNome, 'boo');
    // expect(await naboo).toBeInTheDocument();
    // expect(await alderaan).not.toBeInTheDocument();
    // userEvent.clear(filtroNome)
  });

  test('Teste 6 - Testa se o filtro por numero "maior que" funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');

    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    const hoth = screen.getByRole('cell', {
      name: /hoth/i
    });
    const dagobah = screen.getByRole('cell', {
      name: /dagobah/i
    });
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });

    // const tatooine = screen.findByRole('cell', {
    //   name: /tatooine/i
    // });
    // const yavinIV = screen.findByRole('cell', {
    //   name: /yavin iv/i
    // });
    // const endor = screen.findByRole('cell', {
    //   name: /endor/i
    // });
    // const naboo = screen.findByRole('cell', {
    //   name: /naboo/i
    // });
    // const coruscant = screen.findByRole('cell', {
    //   name: /coruscant/i
    // });
    // const kamino = screen.findByRole('cell', {
    //   name: /kamino/i
    // });


    userEvent.type(filtroNumero, '200000');
    userEvent.click(botaoFiltrar);

    expect(await alderaan).toBeInTheDocument();
    expect(await bespin).toBeInTheDocument();
    expect(await dagobah).not.toBeInTheDocument();
    expect(await hoth).not.toBeInTheDocument();

  });

  test('Teste 7 - Testa se o filtro por numero "menor que" funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroComp = screen.getByTestId('comparison-filter');

    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    // const hoth = screen.getByRole('cell', {
    //   name: /hoth/i
    // });
    // const dagobah = screen.getByRole('cell', {
    //   name: /dagobah/i
    // });
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });

    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const yavinIV = screen.getByRole('cell', {
      name: /yavin iv/i
    });
    // const endor = screen.findByRole('cell', {
    //   name: /endor/i
    // });
    // const naboo = screen.findByRole('cell', {
    //   name: /naboo/i
    // });
    // const coruscant = screen.findByRole('cell', {
    //   name: /coruscant/i
    // });
    // const kamino = screen.findByRole('cell', {
    //   name: /kamino/i
    // });

    userEvent.selectOptions(filtroComp, 'menor que')
    userEvent.type(filtroNumero, '300000');
    userEvent.click(botaoFiltrar);

    expect(await alderaan).not.toBeInTheDocument();
    expect(await bespin).not.toBeInTheDocument();
    expect(await tatooine).toBeInTheDocument();
    expect(await yavinIV).toBeInTheDocument();

  });

  test('Teste 8 - Testa se o filtro por numero "igual a" funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroComp = screen.getByTestId('comparison-filter');

    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    // const hoth = screen.getByRole('cell', {
    //   name: /hoth/i
    // });
    // const dagobah = screen.getByRole('cell', {
    //   name: /dagobah/i
    // });
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });

    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const yavinIV = screen.getByRole('cell', {
      name: /yavin iv/i
    });
    // const endor = screen.findByRole('cell', {
    //   name: /endor/i
    // });
    // const naboo = screen.findByRole('cell', {
    //   name: /naboo/i
    // });
    // const coruscant = screen.findByRole('cell', {
    //   name: /coruscant/i
    // });
    // const kamino = screen.findByRole('cell', {
    //   name: /kamino/i
    // });

    userEvent.selectOptions(filtroComp, 'igual a')
    userEvent.type(filtroNumero, '200000');
    userEvent.click(botaoFiltrar);

    expect(await alderaan).not.toBeInTheDocument();
    expect(await bespin).not.toBeInTheDocument();
    expect(await tatooine).toBeInTheDocument();
    expect(await yavinIV).not.toBeInTheDocument();

  });

  test('Teste 9 - Testa se o filtro por numero coluna orbital funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroColuna = screen.getByTestId('column-filter');

    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    // const hoth = screen.getByRole('cell', {
    //   name: /hoth/i
    // });
    // const dagobah = screen.getByRole('cell', {
    //   name: /dagobah/i
    // });
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });

    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const yavinIV = screen.getByRole('cell', {
      name: /yavin iv/i
    });
    // const endor = screen.findByRole('cell', {
    //   name: /endor/i
    // });
    // const naboo = screen.findByRole('cell', {
    //   name: /naboo/i
    // });
    // const coruscant = screen.findByRole('cell', {
    //   name: /coruscant/i
    // });
    // const kamino = screen.findByRole('cell', {
    //   name: /kamino/i
    // });

    userEvent.selectOptions(filtroColuna, 'orbital_period')
    userEvent.type(filtroNumero, '500');
    userEvent.click(botaoFiltrar);

    expect(await alderaan).not.toBeInTheDocument();
    expect(await bespin).toBeInTheDocument();
    expect(await tatooine).not.toBeInTheDocument();
    expect(await yavinIV).toBeInTheDocument();

  });

  test('Teste 10 - Testa se o filtro por numero coluna diameter funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroColuna = screen.getByTestId('column-filter');

    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    // const hoth = screen.getByRole('cell', {
    //   name: /hoth/i
    // });
    // const dagobah = screen.getByRole('cell', {
    //   name: /dagobah/i
    // });
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });

    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const yavinIV = screen.getByRole('cell', {
      name: /yavin iv/i
    });
    // const endor = screen.findByRole('cell', {
    //   name: /endor/i
    // });
    // const naboo = screen.findByRole('cell', {
    //   name: /naboo/i
    // });
    // const coruscant = screen.findByRole('cell', {
    //   name: /coruscant/i
    // });
    // const kamino = screen.findByRole('cell', {
    //   name: /kamino/i
    // });

    userEvent.selectOptions(filtroColuna, 'diameter')
    userEvent.type(filtroNumero, '11000');
    userEvent.click(botaoFiltrar);

    expect(await alderaan).toBeInTheDocument();
    expect(await bespin).toBeInTheDocument();
    expect(await tatooine).not.toBeInTheDocument();
    expect(await yavinIV).not.toBeInTheDocument();

  });

  test('Teste 11 - Testa se o filtro por numero coluna rotation funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroColuna = screen.getByTestId('column-filter');

    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    // const hoth = screen.getByRole('cell', {
    //   name: /hoth/i
    // });
    // const dagobah = screen.getByRole('cell', {
    //   name: /dagobah/i
    // });
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });

    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const yavinIV = screen.getByRole('cell', {
      name: /yavin iv/i
    });
    // const endor = screen.findByRole('cell', {
    //   name: /endor/i
    // });
    // const naboo = screen.findByRole('cell', {
    //   name: /naboo/i
    // });
    // const coruscant = screen.findByRole('cell', {
    //   name: /coruscant/i
    // });
    // const kamino = screen.findByRole('cell', {
    //   name: /kamino/i
    // });

    userEvent.selectOptions(filtroColuna, 'rotation_period')
    userEvent.type(filtroNumero, '23');
    userEvent.click(botaoFiltrar);

    expect(await alderaan).toBeInTheDocument();
    expect(await bespin).not.toBeInTheDocument();
    expect(await tatooine).not.toBeInTheDocument();
    expect(await yavinIV).toBeInTheDocument();

  });

  test('Teste 12 - Testa se o filtro por numero coluna surface funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroColuna = screen.getByTestId('column-filter');

    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    // const hoth = screen.getByRole('cell', {
    //   name: /hoth/i
    // });
    // const dagobah = screen.getByRole('cell', {
    //   name: /dagobah/i
    // });
    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });

    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const yavinIV = screen.getByRole('cell', {
      name: /yavin iv/i
    });
    // const endor = screen.findByRole('cell', {
    //   name: /endor/i
    // });
    // const naboo = screen.findByRole('cell', {
    //   name: /naboo/i
    // });
    // const coruscant = screen.findByRole('cell', {
    //   name: /coruscant/i
    // });
    // const kamino = screen.findByRole('cell', {
    //   name: /kamino/i
    // });

    userEvent.selectOptions(filtroColuna, 'surface_water')
    userEvent.type(filtroNumero, '5');
    userEvent.click(botaoFiltrar);

    expect(await alderaan).toBeInTheDocument();
    expect(await bespin).not.toBeInTheDocument();
    expect(await tatooine).not.toBeInTheDocument();
    expect(await yavinIV).toBeInTheDocument();

  });

  test('Teste 13 - Testa se o filtro aplicado aparece em cima da tabela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroColuna = screen.getByTestId('column-filter');
    const botaoRemoverTodosFiltros = screen.getByTestId('button-remove-filters');

    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });
    const naboo = screen.getByRole('cell', {
      name: /naboo/i
    });
    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const kamino = screen.getByRole('cell', {
      name: /kamino/i
    });

    userEvent.selectOptions(filtroColuna, 'rotation_period')
    userEvent.type(filtroNumero, '24');
    userEvent.click(botaoFiltrar);
    expect(await screen.findByTestId('filter')).toBeInTheDocument();

  });

  test('Teste 14 - Testa se o botao de deletar filtros funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroColuna = screen.getByTestId('column-filter');
    const botaoRemoverTodosFiltros = screen.getByTestId('button-remove-filters');

    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });
    const naboo = screen.getByRole('cell', {
      name: /naboo/i
    });
    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const kamino = screen.getByRole('cell', {
      name: /kamino/i
    });

    await userEvent.selectOptions(filtroColuna, 'rotation_period')
    await userEvent.type(filtroNumero, '24');
    await userEvent.click(botaoFiltrar);

    expect(naboo).toBeInTheDocument();
    expect(bespin).not.toBeInTheDocument();
    expect(tatooine).not.toBeInTheDocument();
    expect(kamino).toBeInTheDocument();
    const mensagem = screen.getByTestId('filter');
    expect(mensagem).toBeInTheDocument();

    await userEvent.click(botaoRemoverTodosFiltros);
    expect(mensagem).not.toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /bespin/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /tatooine/i })).toBeInTheDocument();

  });

  test('Teste 14 - Testa se o botao de deletar um filtro funciona corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    await act(async () => {
      renderWithContext(<App />)
    });

    const filtroNumero = screen.getByTestId('value-filter');
    const botaoFiltrar = screen.getByTestId('button-filter');
    const filtroColuna = screen.getByTestId('column-filter');
    const botaoRemoverTodosFiltros = screen.getByTestId('button-remove-filters');

    const bespin = screen.getByRole('cell', {
      name: /bespin/i
    });
    const alderaan = screen.getByRole('cell', {
      name: /alderaan/i
    });
    const naboo = screen.getByRole('cell', {
      name: /naboo/i
    });
    const tatooine = screen.getByRole('cell', {
      name: /tatooine/i
    });
    const kamino = screen.getByRole('cell', {
      name: /kamino/i
    });

    await userEvent.selectOptions(filtroColuna, 'rotation_period')
    await userEvent.type(filtroNumero, '24');
    await userEvent.click(botaoFiltrar);

    expect(naboo).toBeInTheDocument();
    expect(bespin).not.toBeInTheDocument();
    expect(tatooine).not.toBeInTheDocument();
    expect(kamino).toBeInTheDocument();
    const mensagem = screen.getByTestId('filter');
    expect(mensagem).toBeInTheDocument();

    userEvent.selectOptions(filtroColuna, 'surface_water');
    userEvent.click(botaoFiltrar);

    expect(kamino).toBeInTheDocument();
    expect(naboo).not.toBeInTheDocument();
    
    const mensagens = await screen.findAllByRole('button');
    const primeiroFiltro = mensagens[2];
    // console.log(mensagens[2]);

    userEvent.click(primeiroFiltro);
    expect(kamino).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /alderaan/i })).toBeInTheDocument();
    expect(naboo).not.toBeInTheDocument();

    const mensagem2 = await screen.findByRole('button', { name: /excluir filtro/i });
    userEvent.click(mensagem2);
    expect(kamino).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /alderaan/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /naboo/i })).toBeInTheDocument();
    expect(mensagem).not.toBeInTheDocument();

  });
})


