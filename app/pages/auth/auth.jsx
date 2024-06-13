import React, {useEffect, useMemo, useState} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import {View} from 'react-native';

export const Auth = ({children}) => {
  const [sensorAvailable, setSensorAvailable] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const rnBiometrics = useMemo(() => {
    return new ReactNativeBiometrics();
  }, []);

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available} = resultObject;
      setAuthSuccess(true);
      // !available && setAuthSuccess(true);
      // setSensorAvailable(available);
    });
  }, [rnBiometrics]);

  if (!authSuccess && sensorAvailable) {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          setAuthSuccess(true);
          console.log('successful biometrics provided');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  }
  return <View>{authSuccess ? children : <View />}</View>;
};
