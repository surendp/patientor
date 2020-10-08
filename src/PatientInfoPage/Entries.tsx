import React from 'react';
import { Header } from 'semantic-ui-react';
import { Entry } from '../types';
import DiagnosisCodes from './DiagnosisCodes';

interface EntriesProps {
  entries: Entry[];
}

const Entries: React.FC<EntriesProps> = ({ entries }) => {
  if (!entries.length) {
    return null;
  }

  return (
    <div className="entry">
      <Header as="h2">entries</Header>
      {
        entries.map(({
          date,
          description,
          diagnosisCodes,
          id
        }) => (
          <div key={id}>
            <p>{date} {description}</p>
            <DiagnosisCodes codes={diagnosisCodes} />
          </div>
        ))
      }
    </div>
  );
};

export default Entries;