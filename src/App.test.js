import App from './App';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()})

let baseComponent;
beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(()=>{
  baseComponent = shallow(<App/>, {
    disableLifecycleMethods: true
  });
});

test('Snapshot Testing for App component', () => {
  const appSnap = renderer.create(<App/>).toJSON();
  expect(appSnap).toMatchSnapshot();
});

afterEach(() => {
  baseComponent.unmount();
})
