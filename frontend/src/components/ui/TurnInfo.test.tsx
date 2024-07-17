import { render } from '@testing-library/react';
import TurnInfo from '@/components/ui/TurnInfo';

describe('TurnInfo tests', () => {
  let container: HTMLElement;

  it('should display an X if the player is 0', () => {
    container = render(
      <TurnInfo playerTurn={0} player={0} />
    ).container;

    const h2 = container.querySelector('h2');
    expect(h2).toHaveTextContent('X\'s turn');
  });

  it('should display an O if the player is 1', () => {
    container = render(
      <TurnInfo playerTurn={0} player={1} />
    ).container;

    const h2 = container.querySelector('h2');
    expect(h2).toHaveTextContent('O\'s turn');
  });

  it('should display neither X or O if the player is an invalid number', () => {
    container = render(
      <TurnInfo playerTurn={0} player={-1} />
    ).container;

    const h2 = container.querySelector('h2');
    expect(h2).not.toHaveTextContent('X\'s turn');
    expect(h2).not.toHaveTextContent('O\'s turn');
  });
});