import React from 'react';

interface DiagnosisCodesProps {
  codes: string[] | undefined;
}

const DiagnosisCodes: React.FC<DiagnosisCodesProps> = ({ codes }) => {
  if (!codes) {
    return null;
  }

  return (
    <ul>
      {
        codes.map(code => <li key={code}>{code}</li>)
      }
    </ul>
  );
};

export default DiagnosisCodes;