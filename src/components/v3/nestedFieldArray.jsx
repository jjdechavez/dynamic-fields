import React from "react";
import { useFieldArray } from "react-hook-form";
import NestedCheckBox from './nestedCheckBox';

export default ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `template.${nestIndex}.questions`
  });

  const renderFields = (fields) => {
    return fields.map((field, k) => {
      switch (field.type) {
        case 'short-answer':
          return (
            <div key={field.id} style={{ marginLeft: 20, marginBottom: "1rem" }}>
              <label>Question:</label>
              <input
                {...register(`template.${nestIndex}.questions.${k}.title`, {
                  required: true
                })}
                style={{ marginRight: "25px" }}
              />
              <br />
              <label htmlFor={`template.${nestIndex}.questions.${k}.answer`}>Answer:</label>
              <input
                {...register(`template.${nestIndex}.questions.${k}.answer`, {
                  required: true
                })}
                style={{ marginRight: "25px" }}
              />
              <button type="button" onClick={() => remove(k)}>
                Delete Question
              </button>
            </div>
          )
        case 'multiple-choice':
          return (
            <div key={field.id} style={{ marginLeft: 20, marginBottom: "1rem" }}>
              <label>Question:</label>
              <input
                {...register(`template.${nestIndex}.questions.${k}.title`, {
                  required: true
                })}
                style={{ marginRight: "25px" }}
              />
              <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <NestedCheckBox
                    nestIndex={nestIndex}
                    nestedFieldIndex={k}
                    {...{ control, register }}
                  />
                </div>
              <button type="button" onClick={() => remove(k)}>
                Delete Question
              </button>
            </div>
          )
        default:
          return (
            <div>
              <span>Invalid Field type</span>
            </div>
          )
      }
    })
  }

  return (
    <div>
      {renderFields(fields)}

      <button
        type="button"
        onClick={() =>
          append({
            title: "field1",
            type: "short-answer",
            answer: ""
          })
        }
      >
        Append Question
      </button>

      <button
        type="button"
        onClick={() =>
          append({
            title: "field1",
            type: "multiple-choice",
            options: [{ name: "First option" }],
            answer: ""
          })
        }
      >
        Append Multiple Choice
      </button>
      <hr />
    </div>
  );
};
