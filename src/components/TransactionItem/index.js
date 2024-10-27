import { Component } from "react";
import './index.css'
class TransactionItem extends Component{
    render(){
        const{details,deleteTransaction}=this.props
        const{title,amount,option,id}=details
        return(
            <tr>
            <td>{title}</td>
            <td>Rs {amount}</td>
            <td>{option}</td>
            <td><img src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png " onClick={()=>deleteTransaction(id)}/></td>
          </tr>
        )
    }
}
export default TransactionItem