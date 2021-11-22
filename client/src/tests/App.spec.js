const React = require('react');
const { configure, mount } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { MemoryRouter } = require('react-router-dom');
const configureStore = require('redux-mock-store');
const { Provider } = require('react-redux');


const { App } = require("../App.js");
const { Home } = require('../components/Home/index.js');
const { Form } = require('../components/Form/index.js');
const { NavBar } = require('../components/NavBar/NavBar.js');

configure({ adapter: new Adapter() });

describe("App", () => {
    let store;
    const middlewares = [];
    const mockStore = configureStore(middlewares);
  
    beforeEach(() => {
      store = mockStore([]);
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
            <MemoryRouter initialEntries={["/home/algo"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );
        expect(wrapper.find(NavBar)).toHaveLength(1);
      });
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
  