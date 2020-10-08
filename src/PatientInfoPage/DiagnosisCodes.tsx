import React from 'react';
import { useStateValue } from '../state';

interface DiagnosisCodesProps {
  codes: string[] | undefined;
}

const DiagnosisCodes: React.FC<DiagnosisCodesProps> = ({ codes }) => {
  const [{ diagnosis }] = useStateValue();

  if (!codes) {
    return null;
  }

  return (
    <ul>
      {
        codes.map(code =>
          <li key={code}>
            {code}
            {diagnosis[code] ? ` ${diagnosis[code].name}` : ''}
          </li>
        )
      }
    </ul>
  );
};

export default DiagnosisCodes;