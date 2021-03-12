import StockPrice from './StockPrice';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()})

let stockPriceComponent;
beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(()=>{
  stockPriceComponent = shallow(<StockPrice></StockPrice>);
});

test('Snapshot Testing for StockPrice component', () => {
    const stockPriceSnap = renderer.create(<StockPrice ></StockPrice>).toJSON();
     expect(stockPriceSnap).toMatchSnapshot();
});

afterEach(() => {
  stockPriceComponent.unmount();
})

