import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

const TodoForm = (props) => {
  const validationSchema = Yup.object().shape({
    text: Yup.string().required("Text is required"),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    props.onSubmit({
      text: values.text,
      id: Date.now(),
    })
    setSubmitting(false)
  }

  return (
    <div>
      <Formik
        initialValues={{ text: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex items-center">
            <Field
              name="text"
              placeholder="Enter a to-do item"
              className="border border-gray-300 rounded-md"
            />
            <button type="submit" disabled={isSubmitting}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TodoForm
