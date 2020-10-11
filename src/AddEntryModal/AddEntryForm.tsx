import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import {
  NewEntry,
  HealthCheckRating,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  SickLeave
} from '../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  type: NewEntry['type'];
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {
  const [{ diagnosis }] = useStateValue();

  const initialValues = (): NewEntry => {
    return {
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],

      ...(
        type === 'HealthCheck'
         ? {
          type: 'HealthCheck',
          healthCheckRating: HealthCheckRating.Healthy
         } : {}
      ),

      ...(
        type === 'Hospital'
         ? {
          type: 'Hospital',
          discharge: {
            date: '',
            criteria: '',
          }
         } : {}
      ),

      ...(
        type === 'OccupationalHealthcare'
         ? {
          type: 'OccupationalHealthcare',
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: ''
          }
         } : {}
      ),
    } as NewEntry;
  };

  const healthCheckFields = () => {
    return (
      <Field
        label="Health Check Rating"
        name="healthCheckRating"
        max={3}
        min={0}
        component={NumberField}
      />
    );
  };

  const hospitalFields = () => {
    return (
      <>
        <Field
          label="Discharge Date"
          placeholder="YYYY-MM-DD"
          name="discharge.date"
          component={TextField}
        />
        <Field
          label="Criteria"
          placeholder="criteria for the discharge"
          name="discharge.criteria"
          component={TextField}
        />
      </>
    );
  };

  const occupationalHealthcareFields = () => {
    return (
      <>
        <Field
          label="Employer Name"
          placeholder="Employer Name"
          name="employerName"
          component={TextField}
        />
        <Field
          label="Sick Leave start date"
          placeholder="YYYY-MM-DD"
          name="sickLeave.startDate"
          component={TextField}
        />
        <Field
          label="Sick Leave end date"
          placeholder="YYYY-MM-DD"
          name="sickLeave.endDate"
          component={TextField}
        />
      </>
    );
  };

  const validate = (values: NewEntry) => {
    const requiredError = "Field is required";
    const errors: {
      [field: string]: string | { [field: string]: string };
    } = {};
    const {
      description,
      date,
      specialist, 
    } = values;

    if (!description) {
      errors.description = requiredError;
    }
    if (!date) {
      errors.date = requiredError;
    }
    if (!specialist) {
      errors.specialist = requiredError;
    }
    if (type === 'HealthCheck') {
      const { healthCheckRating } = values as NewHealthCheckEntry;
      if (!Object.values(HealthCheckRating).includes(healthCheckRating)) {
        errors.healthCheckRating = "Invalid rating. Should contain either of these values: 0, 1, 2, 3";
      }
    }
    if (type === 'OccupationalHealthcare') {
      const {
        employerName,
        sickLeave,
      } = values as NewOccupationalHealthcareEntry;
      const {
        startDate,
        endDate,
      } = sickLeave as SickLeave;

      if (!employerName) {
        errors.employerName = requiredError;
      }

      if ((startDate && !endDate) || (!startDate && endDate)) {
        errors.sickLeave = {
          endDate: "Should contain either both start and end date or none",
        };
      }
    }
    if (type === 'Hospital') {
      const {
        date,
        criteria
      } = (values as NewHospitalEntry).discharge;

      if (!date) {
        errors.discharge = {
          date: requiredError
        };
      }

      if (!criteria) {
        errors.discharge = {
          criteria: requiredError
        };
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues()}
      onSubmit={onSubmit}
      validate={validate}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
      }) => {

        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            {
              type === 'HealthCheck'
                ? healthCheckFields()
                : null
            }
            {
              type === 'Hospital'
                ? hospitalFields()
                : null
            }
            {
              type === 'OccupationalHealthcare'
                ? occupationalHealthcareFields()
                : null
            }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;