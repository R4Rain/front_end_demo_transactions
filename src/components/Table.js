const Table = ({ transactions, totalTransactions, totalAmount, month, year }) => {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-md mb-6">
        <table className="w-full text-sm text-left text-gray-400">
            <caption className="p-4 text-lg font-semibold text-left text-white bg-gray-800">
                {month}{" "}{year}
                <p className="mt-1 text-sm font-normal text-gray-400">There are a total of {totalTransactions} transactions with a total of Rp. {totalAmount}.</p>
            </caption>
            <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                <tr>
                    <th scope="col" className="column_gap">
                        No.
                    </th>
                    <th scope="col" className="column_gap">
                        Product ID
                    </th>
                    <th scope="col" className="column_gap">
                        Product
                    </th>
                    <th scope="col" className="column_gap">
                        Customer
                    </th>
                    <th scope="col" className="column_gap">
                        Status
                    </th>
                    <th scope="col" className="column_gap">
                        Date
                    </th>
                    <th scope="col" className="column_gap">
                        Created by
                    </th>
                    <th scope="col" className="column_gap">
                        Created on
                    </th>
                    <th scope="col" className="column_gap">
                        Amount
                    </th>
                    <th scope="col" className="column_gap">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr className="table_row" key={index}>
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {index + 1}
                        </th>
                        <td className="column_gap">
                            {transaction.productID}
                        </td>
                        <td className="column_gap">
                            {transaction.productName}
                        </td>
                        <td className="column_gap">
                            {transaction.customerName}
                        </td>
                        <td className="column_gap"> 
                            <span className={transaction.status === 0 ? 'failed_badge' : 'success_badge'}>
                                {transaction.status === 0 ? 'Failed' : 'Success'}
                            </span>
                        </td>
                        <td className="column_gap">
                            {transaction.transactionDate}
                        </td>
                        <td className="column_gap">
                            {transaction.createBy}
                        </td>
                        <td className="column_gap">
                            {transaction.createOn}
                        </td>
                        <td className="column_gap">
                            Rp.{" "}{transaction.amount}
                        </td>
                        <td className="column_gap">
                            <a href={`/edit/${transaction.id}`} className="font-medium text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table