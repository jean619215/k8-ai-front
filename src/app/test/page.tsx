"use client";

import React, { useMemo, useState } from "react";

export const ChildCompoment = ({ count }: { count?: number }) => {
  console.log("________ChildCompoment render");

  return <div>Child:{count}</div>;
};

const MemoChildCompoment = React.memo(ChildCompoment);

const DataCompoment = React.memo(
  ({
    dataCount,
  }: {
    dataCount?: {
      value: number;
    };
  }) => {
    console.log("________DataCompoment render");

    return <div>Data:{dataCount?.value}</div>;
  }
);

DataCompoment.displayName = "DataCompoment";

export default function TestPage() {
  const [count, setCount] = useState(0);

  const staticCount = useMemo(() => {
    return { value: 1 };
  }, []);

  console.log("________Father render");

  return (
    <div className="h-full w-full p-2">
      Father: {count}
      <DataCompoment dataCount={staticCount} />
      {/* <ChildCompoment count={staticCount.value} /> */}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
