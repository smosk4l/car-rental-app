import React from 'react';
import CarForm from '../CarForm/CarForm';

interface EditCarFormProps {
  carId: string;
}

const EditCarForm: React.FC<EditCarFormProps> = ({ carId }) => {
  return <CarForm mode="edit" carId={carId} />;
};

export default EditCarForm;
