import { render, screen } from '@/testing/test-utils';
import { BRFlag, ESFlag, USFlag } from './flags';

describe('Flags', () => {
  it('should render svg flags', () => {
    render(
      <>
        <BRFlag />
        <ESFlag />
        <USFlag />
      </>
    );
    expect(screen.getByTestId('BRFlag')).toBeTruthy();
    expect(screen.getByTestId('ESFlag')).toBeTruthy();
    expect(screen.getByTestId('USFlag')).toBeTruthy();
  });
});
