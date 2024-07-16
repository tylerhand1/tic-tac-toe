import { render } from '@testing-library/react';
import App from '@/App';

describe('App tests', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <App />
    ).container;
  });

  it('should render the header with the text \'Tic Tac Toe\'', () => {
    expect(
      container.querySelector('h1')
    ).toHaveTextContent('Tic Tac Toe');
  });
});