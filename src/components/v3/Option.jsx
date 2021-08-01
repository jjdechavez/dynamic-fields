import React from "react";
import { useFieldArray } from "react-hook-form";

export default ({ nestIndex, nestedFieldIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `template.${nestIndex}.questions.${nestedFieldIndex}.options`
  });

  const handleAppendOptionField = () => 
    append({
      name: "Option name"
    });

  return (
    <div style={{ marginBottom: "1rem" }}>
      {fields.map((field, index) => (
        <div key={field.id} style={{ marginBottom: ".75rem" }}>
          <input
            {...register(`template.${nestIndex}.questions.${nestedFieldIndex}.answer`, {
              required: true
            })}
            value={field.name}
            type="radio"
            style={{ marginRight: "25px" }}
          />
          <input
            {...register(`template.${nestIndex}.questions.${nestedFieldIndex}.options.${index}.name`, {
              required: true
            })}
            style={{ marginRight: "25px" }}
          />
          <button type="button" onClick={() => remove(index)}>
            Delete option
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAppendOptionField}
      >
        Append Option
      </button>
    </div>
  );
};
