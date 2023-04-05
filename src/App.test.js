import { render as rtlRender, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider} from 'react-redux'
import { store } from './store';
import App from './App';
const render = component => rtlRender(
  <Provider store={store}>
    {component}
  </Provider>
)
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByTestId('app')
  expect(linkElement).toBeInTheDocument();
});
