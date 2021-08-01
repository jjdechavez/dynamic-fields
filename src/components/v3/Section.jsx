import React from "react";
import { useFieldArray } from "react-hook-form";
import Question from "./Question";

let renderCount = 0;

export default function Section({ control, register, setValue, getValues }) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "template"
  });

  renderCount++;

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <label htmlFor={`template.${index}.title`}>Title: </label>
              <input {...register(`template.${index}.title`)} />
              <br />
              <label htmlFor={`template.${index}.description`}>Description: </label>
              <input {...register(`template.${index}.description`)} />

              <button type="button" onClick={() => remove(index)} style={{ marginBottom: "1rem" }}>
                Delete
              </button>
              <Question nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ title: "New Section", description: "add description", questions: [] });
          }}
        >
          New Section
        </button>
      </section>

      <span className="counter">Render Count: {renderCount}</span>
    </>
  );
}

// <button
//   type="button"
//   onClick={() => {
//     setValue("template", [
//       ...(getValues().template || []),
//       {
//         title: "append",
//         description: "append description",
//         questions: [{ title: "append", type: "short-answer", answer: "" }]
//       }
//     ]);
//   }}
// >
//   Append Nested
// </button>
