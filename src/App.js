import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = () => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: '',
  });
  const getter = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.adviceslip.com/advice');
      if (response.status !== 200) {
        throw new Error('THE API IS DOWN');
      }
      const data = await response.json();
      setAdvice(data.slip);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  useEffect(() => {
    getter();
  }, []);

  if (error.error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      <h1>hello Im app</h1>
      {loading ? <p>loading...</p> : <h2>{advice.advice}</h2>}
      <button onClick={getter}>get data</button>
    </div>
  );
};

export default App;
