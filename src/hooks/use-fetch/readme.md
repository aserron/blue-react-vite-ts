# useFetch
Reusable web request resource fetch API implementation.

```tsx
import React from 'react';
import useApiFetch from './useApiFetch';

const MyComponent = () => {
  const { data, loading, error, refetch } = 
      useApiFetch<MyDataType>('https://api.example.com/data', {}, { limit: 30 });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={refetch}>Refetch Data</button>
    </div>
  );
};

export default MyComponent;
```
