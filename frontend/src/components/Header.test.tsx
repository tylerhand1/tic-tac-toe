import { render } from '@testing-library/react';
import Header from '@/components/Header';

describe('Header tests', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = render(
      <Header />
    ).container;
  });

  it('should render a header tag', () => {
    const header = container.querySelector('header');
    expect(header).toBeDefined();
  })

  it('should render the header with the text \'Tic Tac Toe\'', () => {
    expect(
      container.querySelector('header h1')
    ).toHaveTextContent('Tic Tac Toe');
  });
});