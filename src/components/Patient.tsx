import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";

const PatientPage = () => {
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  useEffect(() => {
    if (!id) return;
    patientService.getOne(id).then((p) => {
      setPatientInfo(p);
    });
    diagnosisService.getAll().then((data) => {
      setDiagnoses(data);
    });
  }, [id]);

  const getDiagnose = (code: string): string => {
    if (!diagnoses) return "";
    const d = diagnoses.find((d) => d.code === code);
    return d ? d.name : "";
  };

  if (!patientInfo) return <div>Loading...</div>;
  return (
    <div>
      <h2>{patientInfo.name}</h2>
      <ul>
        <li>gender: {patientInfo.gender}</li>
        <li>ssn: {patientInfo.ssn}</li>
        <li>occupation: {patientInfo.occupation}</li>
      </ul>
      <h3>entries</h3>
      <ul>
        {patientInfo.entries.map((e) => (
          <li>
            <div>
              <p>
                {e.date} <i>{e.description}</i>
              </p>
              <ul>
                {e.diagnosisCodes?.map((c) => (
                  <li>
                    {c} {getDiagnose(c)}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientPage;
