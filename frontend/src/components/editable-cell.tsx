import { Input } from '@mantine/core';
import { useState } from 'react';

const EditableCell = ({ getValue, ...props }) => {
  const initialState = getValue();
  const [input, setInput] = useState(initialState);
  // console.log('edit, props', props);
  return (
    <Input
      w='100%'
      h='100%'
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default EditableCell;
