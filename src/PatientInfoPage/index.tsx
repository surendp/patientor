import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { addPatientDetailsAC, useStateValue } from '../state';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();

  useEffect(() => {
      if (patientDetails && patientDetails[id]) {
        return;
      }

      const fetchPatientInfo = () => {
        axios.get(`${apiBaseUrl}/patients/${id}`)
          .then(({ data }) => {
            dispatch(addPatientDetailsAC(data));
          });
      };

      fetchPatientInfo();
    }, [id, dispatch]);

  if (!patientDetails[id]) {
    return null;
  }

  const {
    name,
    occupation,
    gender,
    ssn,
  } = patientDetails[id];

  const genderIcon = () => {
    if (gender === 'male') {
      return <Icon name="venus"/>;
    }

    if (gender === 'female') {
      return <Icon name="mercury"/>;
    }

    return <Icon name="mars"/>;
  };

  return (
    <div>
      <Header as="h2">
        {name}
        {genderIcon()}
      </Header>
      <div>{`ssn: ${ssn}`}</div>
      <div>{`occupation: ${occupation}`}</div>
    </div>
  );
};

export default PatientInfoPage;