import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";

const PatientPage = () => {
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  useEffect(() => {
    if (!id) return;
    patientService.getOne(id).then((p) => {
      setPatientInfo(p);
    });
  }, [id]);

  if (!patientInfo) return <div>Loading...</div>;
  return (
    <div>
      <h2>{patientInfo.name}</h2>
      <ul>
        <li>gender: {patientInfo.gender}</li>
        <li>ssn: {patientInfo.ssn}</li>
        <li>occupation: {patientInfo.occupation}</li>
      </ul>
    </div>
  );
};

export default PatientPage;
