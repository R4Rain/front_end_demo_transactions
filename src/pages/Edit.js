import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const Edit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState({
    isLoad: true,
    message: 'Loading...'
  });
  const [initialValues, setInitialValues] = useState({
    productID: '',
    productName: '',
    amount: '',
    customerName: '',
    status: -1,
    transactionDate: '',
    createBy: ''
  })
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try{
      const response = await fetch(`http://localhost:5000/transactions/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      })
      if(response.ok) {
        navigate('/');
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/transactions/${id}`);
      const { data } = await response.json();
      if(response.ok) {
        setInitialValues({ ...data,
          transactionDate: format(new Date(data.transactionDate), 'yyyy-MM-dd hh:mm').replace(' ', 'T')
        });
        setLoading({...loading, isLoad: false});
      } else{
        setLoading({...loading, message: 'Invalid ID'});
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full py-4">
      <h2 className="text-white text-lg font-semibold mb-6">Edit Transaction</h2>
      { loading.isLoad ? 
        <p className="text-white font-light">{loading.message}</p>
      :
        <Form
          desc='Edit'
          initialValues={initialValues}
          handleSubmit={handleSubmit}
        />
      }
    </div>
  )
}

export default Edit