import React from 'react';
import { Header } from 'semantic-ui-react';
import { Entry } from '../types';
import EntryDetails from './EntryDetails';

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
        entries.map(entry => (
          <EntryDetails
            key={entry.id}
            entry={entry}
          />
        ))
      }
    </div>
  );
};

export default Entries;