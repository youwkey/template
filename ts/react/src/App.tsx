import React, { ChangeEventHandler, useEffect, useState } from 'react';

export const SearchInput: React.FC<{ value: string; onChange: ChangeEventHandler<HTMLInputElement> }> = ({
  value,
  onChange,
  children,
}) => (
  <div>
    <label htmlFor="search">{children}</label>
    <input id="search" type="text" value={value} onChange={onChange} />
  </div>
);

export const useSearch = () => {
  const [search, setSearch] = useState('');
  const clear = () => {
    setSearch('');
  };

  return { search, setSearch, clear };
};

export const SearchArea: React.FC = () => {
  const { search, setSearch } = useSearch();
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  // emulate fetch api
  const fetchUser = () => Promise.resolve({ id: 1, name: 'Username' });

  useEffect(() => {
    const loadUser = async () => {
      const u = await fetchUser();
      setUser(u);
    };
    loadUser();
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      {user ? <p>Username {user.name}</p> : null}
      <SearchInput value={search} onChange={handleChange}>
        Search:
      </SearchInput>
      <p>Searches for {search || '...'}</p>
    </div>
  );
};

export const App: React.FC = () => (
  <React.StrictMode>
    <SearchArea />
  </React.StrictMode>
);
