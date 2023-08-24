import { useCallback, useState } from 'react';

export const useToggle = (initialState = false): [boolean, Function] => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle: Function = useCallback(() => {
    setState(state => !state);
  }, []);

  return [state, toggle];
};
