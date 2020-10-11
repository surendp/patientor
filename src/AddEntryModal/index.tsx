import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { NewEntry } from '../types';
import AddEntryForm from './AddEntryForm';

interface Props {
  modal: { open: boolean; name: NewEntry['type'] | null };
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddPatientModal = ({ modal, onClose, onSubmit, error }: Props) => (
  <Modal open={modal.open} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {
        modal.name
          ? (
            <AddEntryForm
              onSubmit={onSubmit}
              onCancel={onClose}
              type={modal.name}
            />
          ) : null
      }
    </Modal.Content>
  </Modal>
);

export default AddPatientModal;
