import { render, screen } from '@testing-library/react';
import StockSelect from './StockSelect';
import Enzyme, { shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()})

let stockSelectComponent;
beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(()=>{
  stockSelectComponent = shallow(<StockSelect/>);
});

test('Snapshot Testing for Stock Select component', () => {
  const stockPriceSnap = renderer.create(<StockSelect ></StockSelect>).toJSON();
  expect(stockPriceSnap).toMatchSnapshot();
});

afterEach(() => {
  stockSelectComponent.unmount();
})

test('Check presense of all company names in document', () => {
  render(<StockSelect/>);
  expect(screen.getByText('Facebook')).toBeInTheDocument();
  expect(screen.getByText('Microsoft')).toBeInTheDocument();
  expect(screen.getByText('IBM')).toBeInTheDocument();
});