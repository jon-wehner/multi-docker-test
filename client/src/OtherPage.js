import React from 'react';
import { Link } from 'react-router-dom';

export default function OtherPage() {
  return (
    <div>
      Im some other Page!
      <Link to="/">Go back Home</Link>
    </div>
  );
}
