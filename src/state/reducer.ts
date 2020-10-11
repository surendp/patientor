import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAILS";
      payload: Patient; 
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        patientId: Patient['id'];
        entry: Entry;
      };
    };

export const addPatientAC = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const addPatientDetailsAC = (patientDetails: Patient): Action => {
  return {
    type: "ADD_PATIENT_DETAILS",
    payload: patientDetails
  };
};

export const addEntryAc = (entry: Entry, patientId: Patient['id']): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      patientId,
      entry,
    }
  };
};

export const setPatientListAC = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const setDiagnosisListAC = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    
    case "ADD_PATIENT_DETAILS":
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload
        }
      };
    
    case "ADD_ENTRY":
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.patientId]: {
            ...state.patientDetails[action.payload.patientId],
            entries: [
              ...state.patientDetails[action.payload.patientId].entries,
              action.payload.entry
            ]
          }
        }
      };

    default:
      return state;
  }
};
