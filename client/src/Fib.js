import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    async function fetchData() {
      const values = await axios.get('/api/values/current');
      setValues(values.data);

      const indexes = await axios.get('/api/values/all');
      setSeenIndexes(indexes.data.map((obj) => obj.number));
    }
    fetchData();
  }, [setSeenIndexes, setValues]);

  function renderValues() {
    const entries = [];

    for (let key in values) {
      entries.push(<div key={key}>{`For Index ${key} I Calculated ${values[key]}`}</div>);
    }
    return entries;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post('/api/values', {
      index,
    });
    setIndex('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <h3>Indexes I have seen</h3>
      {seenIndexes.join(', ')}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
}
