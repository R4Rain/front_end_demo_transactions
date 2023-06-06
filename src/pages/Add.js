import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const Add = () => {
  const initialValues = {
    productID: '',
    productName: '',
    amount: '',
    customerName: '',
    status: -1,
    transactionDate: '',
    createBy: ''
  }
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try{
        const response = await fetch('http://localhost:5000/transactions/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        });
        if (response.ok) {
            navigate('/');
        }
    } catch(error) {
        console.log(error);
    }
  }
  return (
    <div className="w-full py-4">
        <h2 className="text-white text-lg font-semibold mb-6">Add Transaction</h2>
        <Form
            desc='Add'
            initialValues={initialValues}
            handleSubmit={handleSubmit}
        />
    </div>
  )
}

export default Add