import React, { useEffect, useState } from "react";
import About from "./Components/About";
import TransactionList from "./Transaction/TransactionList";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";



import './App.css';

function App() {

  const [transaction, setTransaction] = useState([])
  const [query, setQuery] = useState("")
  const [order, setOrder] = useState("asc")
 

  useEffect(() => {

    const fetcha = () =>{
    fetch("http://localhost:3000/transactions/")
      .then((resp) => resp.json())
      .then(transaction => setTransaction(transaction)
               
       )
      .catch(e=>{
        console.log('error', e)
      })
}
 fetcha();
}, [query])
 
   function handleSearch(e) {
    setQuery(e.target.value)
  }
  function handleSort() {

    if(order==="asc"){
    const result = [...transaction].sort((a, b) => a.category.localeCompare(b.category));
        setTransaction(result);
        setOrder("desc")
    }
    if(order==="desc"){
      const result = [...transaction].sort((a, b) => b.category.localeCompare(a.category));
          setTransaction(result);
          setOrder("asc")
      }
  
  }

  function onDeleteTrans(id){
    const updateTransaction = transaction.filter(transa=>
      transa.id !==id      
    )
    setTransaction(updateTransaction)

  }
  return (
    <div >
     <Header />
      <About />
      <Search handleSearch={handleSearch} />
      <TransactionList transactions={transaction} sort={handleSort}   onDeleteTrans={onDeleteTrans} />   
     </div>

  );
}

export default App;
