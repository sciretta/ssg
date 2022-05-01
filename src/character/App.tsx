import React, { useEffect, useState } from "react";
import "../App.css";

function App({ characterHTMLData }: { characterHTMLData?: string }) {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log("ejecutando use effect");
  // }, [count]);

  return (
    <>
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `${characterHTMLData}`,
        }}
      />
      {/* {count}
      <button onClick={() => setCount((prev) => prev + 1)}>count </button> */}
    </>
  );
}

export default App;
