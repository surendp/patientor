import React from 'react';
import { Card, Header, Icon } from 'semantic-ui-react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;

    default:
      return assertNever(entry);
  }
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <Card fluid>
    <Card.Content>
      <Header as="h3">
        {entry.date}
        <Icon name="doctor" />
      </Header>
      <Card.Meta>{entry.description}</Card.Meta>
    </Card.Content>
  </Card>
);

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
  <Card fluid>
    <Card.Content>
      <Header as="h3">
        {entry.date}
        <Icon name="stethoscope" />
        {entry.employerName}
      </Header>
      <Card.Meta>{entry.description}</Card.Meta>
    </Card.Content>
  </Card>
);

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const healthColor = (healthRating: number) => {
    switch (healthRating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "pink";
      default:
        return "red";
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Header as="h3">
          {entry.date}
          <Icon name="doctor" />
        </Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Icon name="like" color={healthColor(entry.healthCheckRating)} />
      </Card.Content>
    </Card>
  );
};

export default EntryDetails;
