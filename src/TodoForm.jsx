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
          <Form>
            <Field name="text" placeholder="Enter a to-do item" />
            <button type="submit" disabled={isSubmitting}>
              Add Todo
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TodoForm
