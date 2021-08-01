import React from 'react'
import { useForm } from 'react-hook-form'
import FieldArray from './fieldArray'

const defaultValues = {
  template: [
    {
      title: "This is your first content",
      description: "Tell me something about this content",
      questions: [{ title: "Add your questions", type: "short-answer", answer: "" }]
    }
  ]
};

const FormV3 = () => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue
  } = useForm({
    defaultValues
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldArray
        {...{ control, register, defaultValues, getValues, setValue, errors }}
      />

      <button type="button" onClick={() => reset(defaultValues)}>
        Reset
      </button>

      <input type="submit" />
    </form>
  );
}

export default FormV3;
