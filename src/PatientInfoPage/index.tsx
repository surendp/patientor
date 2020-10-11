import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Divider, Grid, Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { addEntryAc, addPatientDetailsAC, useStateValue } from '../state';
import AddEntryModal from '../AddEntryModal';
import Entries from './Entries';
import {
  Entry,
  NewEntry,
} from '../types';

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();
  const [model, setModel] = useState<{
    open: boolean;
    name: NewEntry['type'] | null;
  }>({
    open: false,
    name: null,
  });
  const [error, setError] = React.useState<string | undefined>();

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
    entries,
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

  const handleClickOpenModel = (text: NewEntry['type']) => {
    return () => setModel({
      open: true,
      name: text,
    });
  };

  const handleCloseModal = () => {
    setModel({
      open: false,
      name: null,
    });
    setError(undefined);
  };

  const handleSubmitEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntryAc(newEntry, id));
      handleCloseModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <Header as="h2">
        {name}
        {genderIcon()}
      </Header>
      <div>{`ssn: ${ssn}`}</div>
      <div>{`occupation: ${occupation}`}</div>
      <Divider hidden />
      <Entries entries={entries}/>
      <Divider hidden />
      <Grid>
        <Grid.Column floated="left" width={5}>
          <Button
            type="button"
            onClick={handleClickOpenModel('Hospital' as NewEntry['type'])}
          >
            New hospital entry
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="button"
            onClick={handleClickOpenModel('HealthCheck' as NewEntry['type'])}
          >
            New health check entry
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="button"
            onClick={handleClickOpenModel('OccupationalHealthcare' as NewEntry['type'])}
          >
            New occupational healthcare entry
          </Button>
        </Grid.Column>
      </Grid>
      <AddEntryModal
        onClose={handleCloseModal}
        onSubmit={handleSubmitEntry}
        error={error}
        modal={model}
      />
    </div>
  );
};

export default PatientInfoPage;