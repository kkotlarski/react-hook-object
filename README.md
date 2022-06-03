# React hook object

An easy way to cache your inline object references.

```tsx
import { useState } from "react";
import { useObject } from "react-hook-object";

const ProductTable = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("DESC");
  const tableParams = useObject({
    sort,
    query,
    dateFrom: new Date(2022, 0, 1),
  });

  return <Table tableParams={tableParams} data={data} />;
};
```

- [x] 0 dependencies
- [x] supports primitive values (`boolean`, `string`, `number`...)
- [x] supports objects (as long as `object.valueOf()` returns a primitive value, ie `Date`)
- [x] TypeScript support
