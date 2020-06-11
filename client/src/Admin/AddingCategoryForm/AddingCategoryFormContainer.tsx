import AddingCategoryForm from "./AddingCategoryForm";
import {FormikErrors, withFormik} from "formik";

// The type of props MyForm receives
type MyFormProps = {}

// Wrap our form with the withFormik HoC
const AddingCategoryFormContainer = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            name: '',
            description: '',
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let errors: FormikErrors<FormValues> = {};

        return errors;
    },

    handleSubmit: values => {
        // do submitting things
    },
})(AddingCategoryForm);

export default AddingCategoryFormContainer;