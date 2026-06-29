/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimelineItem, TimelineDivider } from '../timeline';

const baseProps = {
  id: 'test-1',
  title: 'Software Engineer',
  subtitle: 'Acme Corp',
  period: '2020 – 2023',
  category: 'experience' as const,
};

describe('TimelineItem', () => {
  test('renders title and subtitle', () => {
    render(<TimelineItem {...baseProps} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  test('renders period text', () => {
    render(<TimelineItem {...baseProps} />);
    expect(screen.getByText('2020 – 2023')).toBeInTheDocument();
  });

  test('no expand button when detailsTable is absent', () => {
    render(<TimelineItem {...baseProps} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('card is collapsed by default when detailsTable present', () => {
    render(<TimelineItem {...baseProps} detailsTable={<span>Course list</span>} />);
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-expanded', 'false');
  });

  test('toggles expanded on click', async () => {
    const user = userEvent.setup();
    render(<TimelineItem {...baseProps} detailsTable={<span>Course list</span>} />);
    const card = screen.getByRole('button');
    await user.click(card);
    expect(card).toHaveAttribute('aria-expanded', 'true');
    await user.click(card);
    expect(card).toHaveAttribute('aria-expanded', 'false');
  });

  test('toggles expanded on Enter key', async () => {
    const user = userEvent.setup();
    render(<TimelineItem {...baseProps} detailsTable={<span>Course list</span>} />);
    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');
    expect(card).toHaveAttribute('aria-expanded', 'true');
  });

  test('toggles expanded on Space key', async () => {
    const user = userEvent.setup();
    render(<TimelineItem {...baseProps} detailsTable={<span>Course list</span>} />);
    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard(' ');
    expect(card).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('TimelineDivider', () => {
  test('renders its label', () => {
    render(<TimelineDivider label="Education" />);
    expect(screen.getByText('Education')).toBeInTheDocument();
  });
});
