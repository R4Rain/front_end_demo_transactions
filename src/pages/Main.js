import Table from "../components/Table";
import { useState, useEffect } from 'react';
import { formatDate } from "../utils/utility";

const Main = () => {
  const [groupedTransactions, setGroupedTransactions] = useState({});

  useEffect(() => {
    const groupByYearAndMonth = (transactions) => {
      const result = {};
      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.transactionDate);
        const year = transactionDate.getFullYear();
        const month = transactionDate.toLocaleString('default', {month: 'long'});
        const key = `${year}-${month}`;
  
        transaction.transactionDate = formatDate(transactionDate);
        transaction.createOn = formatDate(new Date(transaction.createOn));
  
        if(result[key]) {
          result[key].totalAmount += transaction.amount;
          result[key].totalTransactions += 1;
          result[key].transactions.push(transaction);
        } else{
          result[key] = {
            year: year,
            month: month,
            totalAmount: transaction.amount,
            totalTransactions: 1,
            transactions: [transaction]
          }
        }
      })
      return result;
    }
    
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/transactions');
      const { data } = await response.json();
      const groupedData = groupByYearAndMonth(data);
      setGroupedTransactions(groupedData);
    };
    fetchData();
  }, []);
  

  return (
    <div className="w-full">
      <div className="p-5 text-lg font-semibold text-left text-white flex items-center justify-between">
        <div className="max-w-5xl">
          Demo Transactions
          <p className="mt-1 text-sm font-normal text-white">Transactions grouped by year and month</p>
        </div>
        <a href="/add" className="add_btn">Add transaction</a>
      </div>
      {Object.keys(groupedTransactions).map(key => {
        const group = groupedTransactions[key];
        return (
          <Table
            transactions={group.transactions}
            totalAmount={group.totalAmount}
            totalTransactions={group.totalTransactions}
            month={group.month}
            year={group.year}
            key={key}
          />
        )
      })}
    </div>
  )
}

export default Main