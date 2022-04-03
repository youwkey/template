import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, renderHook } from '@testing-library/react-hooks';
import { App, SearchInput, useSearch } from './App';

describe('useSearch', () => {
  test('input and clear', () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current.search).toBe('');

    act(() => {
      result.current.setSearch('input');
    });
    expect(result.current.search).toBe('input');

    act(() => {
      result.current.clear();
    });
    expect(result.current.search).toBe('');
  });
});

describe('SearchInput', () => {
  test('onChange handler', async () => {
    const onChange = jest.fn();

    render(
      <SearchInput value="" onChange={onChange}>
        Search:
      </SearchInput>
    );

    await userEvent.type(screen.getByRole('textbox'), 'userEvent');
    expect(onChange).toHaveBeenCalledTimes('userEvent'.length);
  });
});

describe('App', () => {
  test('render', async () => {
    render(<App />);

    // test first rendering
    expect(screen.queryByText(/Username/)).toBeNull();
    screen.debug();

    // await done useEffect callback
    expect(await screen.findByText(/Username/)).toBeInTheDocument();
    screen.debug();

    // test input event
    await userEvent.type(screen.getByRole('textbox'), 'userEvent');
    // implicit test, expect(...).toBeInTheDocument()
    screen.getByText(/Searches for userEvent/);
    screen.debug();
  });
});
