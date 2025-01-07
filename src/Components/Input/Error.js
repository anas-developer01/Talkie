import {Text} from 'react-native';
import React from 'react';

export default function Error({errors}) {
  return (
    <>
      {errors ? (
        <Text style={{color: 'red', alignSelf: 'flex-start'}}>
          {errors?.message}
        </Text>
      ) : (
        ''
      )}
    </>
  );
}
