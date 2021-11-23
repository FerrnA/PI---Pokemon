import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import App from './App';
import Home from './components/Home/index.js';
import Form from './components/Form/index.js';
import NavBar from './components/NavBar/NavBar.js';
import configureStore from 'redux-mock-store';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk'

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  let view;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore({
      types: [],
      pokemons: [],
      pokemonscreados: [],
      pokemonData: [],
      message: ""
    });
    view = render(App)
  });

  describe("El componente NavBar deberia renderizarse en todas las rutas del home.", () => {
    it('Debería renderizarse en la ruta "/home"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(NavBar)).toHaveLength(1);
    });
    it('Debería renderizarse en la ruta "/home/algo"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home/types"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(NavBar)).toHaveLength(1);
    });
    //chai.use(chaiEnzyme());
  });

  it('El componente Home debe renderizar en la ruta y sólo en la ruta "/home")', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(NavBar)).toHaveLength(1);
  });

  it("El componente Form deberia renderizarse en la ruta /home/crea.", () => {
    const container = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/home/crea"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(container.find(NavBar)).toHaveLength(1);
    expect(container.find(Home)).toHaveLength(0);
    expect(container.find(Form)).toHaveLength(1);
  });
});