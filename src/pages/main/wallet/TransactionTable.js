import React from 'react'
import {Image, Table} from "react-bootstrap";
import actionicon from "../../../assets/actionicon.svg";


const data = [
    {id: "01", date: "2024-05-01", ref: "635537736HRT355", type: "debit", amount: 100, status: "pending" },
    { id: "02", date: "2024-05-02", ref: "635537736HRT355", type: "credit", amount: 200, status: "successful" },
    { id:"03", date: "2024-05-03", ref: "635537736HRT355", type: "debit", amount: 300, status: "pending" },
    { id: "04", date: "2024-05-04", ref: "635537736HRT355", type: "credit", amount: 400, status: "successful" },
    { id: "05", date: "2024-05-05", ref: "635537736HRT355", type: "debit", amount: 500, status: "pending" },
    { id:"06", date: "2024-05-06", ref: "635537736HRT355", type: "credit", amount: 600, status: "successful" },
    { id: "07", date: "2024-05-07", ref: "635537736HRT355", type: "debit", amount: 700, status: "pending" },
    { id:"08", date: "2024-05-08", ref: "635537736HRT355", type: "credit", amount: 800, status: "successful" },
    { id: "09", date: "2024-05-09", ref: "635537736HRT355", type: "debit", amount: 900, status: "pending" },
    { id: "10", date: "2024-05-10", ref: "635537736HRT355", type: "credit", amount: 1000, status: "successful" }
  ];


function TransactionTable() {
  return (
    <Table bordered hover  className="table-bordered" style={{ overflow: 'hidden'  }}>
       
     
    <tbody>
    {data.map((item, index) => (
      <tr >
      <td className="table-column" style={{fontSize:0.85+'rem', color:'#F8F8F8'}}>{item.id}</td>
      <td  style={{fontSize:0.85+'rem', color:'#F8F8F8'}}>{item.date}</td>
      <td className="table-column" style={{fontSize:0.85+'rem', color:'#F8F8F8'}}>{item.ref}</td>
      <td className="table-column" ><div style={{display:'flex',padding:0.2+'rem',backgroundColor:'#32364A',borderRadius:25+'px',color:item.type === 'credit' ? '#00FF00' : '#E31D1C',width:'5rem', alignItems: 'center',justifyContent: 'center',fontSize:0.85+'rem'}}>{item.type}</div></td>
      <td  style={{fontSize:0.85+'rem', color:'#F8F8F8'}}>
        {item.status}</td>
      <td  >
        <div style={{color:item.type === 'credit' ? '#00FF00' : '#E31D1C', }}>{item.type === 'credit' ? <span>+</span> : <span>-</span>}${item.amount}</div></td>
      <td className="table-column">   <Image src={actionicon} alt="icon" /></td>
    </tr>
    ))}
      
     
    </tbody>
  </Table>
  )
}

export default TransactionTable
