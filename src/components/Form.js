import {Formik, Form as FormikForm, Field, ErrorMessage} from 'formik';
import { isNumeric } from '../utils/utility';

const Form = ({ desc, initialValues, handleSubmit }) => {
  return (
    <Formik
        initialValues={initialValues}
        validate={values => {
            const errors = {};
            if(!values.productID){
                errors.productID = 'Product ID must not be empty';
            } else if(!isNumeric(values.productID)){
                errors.productID = 'Product ID must be numerical';
            }

            if(!values.productName){
                errors.productName = 'Product name is empty';
            }

            if(values.amount <= 0){
                errors.amount = 'Amount must be more than 0';
            }

            if(!values.customerName){
                errors.customerName = 'Customer name must not be empty';
            }

            if(!(Number(values.status) === 0 || Number(values.status) === 1)){
                errors.status = 'Status must be selected';
            }

            if(!values.transactionDate){
                errors.transactionDate = 'Transaction date must not be empty';
            }

            if(!values.createBy) {
                errors.createBy = 'Create by must not be empty';
            }

            return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
                handleSubmit(values);
                setSubmitting(false);
            }, 400);
        }}
        enableReinitialize={true}
    >
        {({ isSubmitting }) => (
            <FormikForm>
                <div className="mb-6">
                    <label htmlFor="customerName" className="input_label">Customer Name</label>
                    <Field type="text" name='customerName' id='customerName' placeholder='the customer name' className='input_box'/>
                    <ErrorMessage name='customerName' component='p' className="error_msg"/>
                </div>

                <div className="mb-6">
                    <label htmlFor="productID" className="input_label">Product ID</label>
                    <Field type="text" name='productID' id='productID' placeholder='must be numerical' className='input_box'/>
                    <ErrorMessage name='productID' component='p' className="error_msg"/>
                </div>

                <div className="mb-6">
                    <label htmlFor="productName" className="input_label">Product Name</label>
                    <Field type="text" name='productName' id='productName' placeholder='the product name' className='input_box'/>
                    <ErrorMessage name='productName' component='p' className="error_msg"/>
                </div>

                <div className="mb-6 max-w-2xl">
                    <label htmlFor="amount" className="input_label">Amount</label>
                    <Field type="number" name='amount' id='amount' placeholder='min. Rp. 1' className='input_box'/>
                    <ErrorMessage name='amount' component='p' className="error_msg"/>
                </div>

                <div className="mb-6 max-w-2xl">
                    <label htmlFor="status" className="input_label">Status</label>
                    <Field as='select' name='status' id='status' className='input_box'>
                        <option value={-1}>Select status</option>
                        <option value={0}>Failed</option>
                        <option value={1}>Success</option>
                    </Field>
                    <ErrorMessage name='status' component='p' className="error_msg"/>
                </div>

                <div className="mb-6 max-w-2xl">
                    <label htmlFor="transactionDate" className="input_label">Transaction Date</label>
                    <Field type="datetime-local" name='transactionDate' id='transactionDate' placeholder='' className='input_box'/>
                    <ErrorMessage name='transactionDate' component='p' className="error_msg"/>
                </div>

                <div className="mb-6 max-w-2xl">
                    <label htmlFor="createBy" className="input_label">Create by</label>
                    <Field type="text" name='createBy' id='createBy' placeholder='who create this?' className='input_box'/>
                    <ErrorMessage name='createBy' component='p' className="error_msg"/>
                </div>

                <button type="submit" className="submit_btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Loading..' : desc}
                </button>
            </FormikForm>
        )}
    </Formik>
  )
}

export default Form