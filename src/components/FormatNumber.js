import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';

const FormatNumber = ({value, style}) => {
  const [angkaBaru, setAngkaBaru] = useState('');
  useEffect(() => {
    const formator = angka => {
      // split angka dan dibalik
      const split = angka.toString().split('').reverse();
      // buat arraw kosong baru
      const newAngkaArray = [];
      // melakukan perulang ke semua angka
      split.forEach((k, i) => {
        // jika index modulus 3 = 0 dan index tidak sama dengan 0
        if (i % 3 === 0 && i !== 0) {
          // push titik ke newAngkaArray
          newAngkaArray.push('.');
          // lalu push angka (k) ke newAngkaArray
          newAngkaArray.push(k);
        } else {
          newAngkaArray.push(k);
        }
      });
      const newAngkaFix = newAngkaArray.reverse().join('');

      setAngkaBaru(newAngkaFix);
      return newAngkaFix;
    };

    formator(value);
  }, [value]);

  return (
    <>
      <Text style={style}>{angkaBaru}</Text>
    </>
  );
};

export default FormatNumber;
