import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    fetch('/api/influencers')
      .then((response) => response.json())
      .then((data) => setInfluencers(data));
  }, []);

  return (
    <pre>
      <code>{JSON.stringify(influencers, null, 2)}</code>
    </pre>
  );
}

export default App;
