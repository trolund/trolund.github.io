/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardCarousel, { CardContent } from '../card-carosel';

// jsdom doesn't implement IntersectionObserver or scrollsnapchange
const observeMock = jest.fn();
const disconnectMock = jest.fn();
global.IntersectionObserver = jest.fn(() => ({
  observe: observeMock,
  disconnect: disconnectMock,
  unobserve: jest.fn(),
})) as unknown as typeof IntersectionObserver;

const cards: CardContent[] = [
  { title: 'Card A', description: 'Desc A', className: '' },
  { title: 'Card B', description: 'Desc B', className: '' },
  { title: 'Card C', description: 'Desc C', className: '' },
];

describe('CardCarousel', () => {
  test('renders nothing when cards is undefined', () => {
    const { container } = render(<CardCarousel />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders nothing when cards is empty', () => {
    const { container } = render(<CardCarousel cards={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders one slide per card', () => {
    render(<CardCarousel cards={cards} />);
    expect(screen.getByText('Card A')).toBeInTheDocument();
    expect(screen.getByText('Card B')).toBeInTheDocument();
    expect(screen.getByText('Card C')).toBeInTheDocument();
  });

  test('prev button is disabled on first slide', () => {
    render(<CardCarousel cards={cards} />);
    expect(screen.getByLabelText('Previous card')).toBeDisabled();
  });

  test('next button is disabled on last slide when only one card', () => {
    render(<CardCarousel cards={[cards[0]]} />);
    expect(screen.getByLabelText('Next card')).toBeDisabled();
  });

  test('renders correct number of dot indicators', () => {
    const { container } = render(<CardCarousel cards={cards} />);
    // dots live inside aria-hidden div, so query by DOM
    const dots = container.querySelectorAll('[aria-hidden="true"] button');
    expect(dots).toHaveLength(cards.length);
  });
});
