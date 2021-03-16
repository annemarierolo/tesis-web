import React from 'react';
import { useBarcode } from '@createnextapp/react-barcode';

function BarCode(props) {
  const { inputRef } = useBarcode({
    value: (props.value === "") ? "123456789" : props.value,
    options: {
      background: '#fff',
    }
  });

  return <img ref={inputRef} alt=''/>;
};

export default BarCode;