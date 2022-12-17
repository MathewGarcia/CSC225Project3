import {useEffect, useState} from "react";
import axios from 'axios';
import Loader from './Loader'
import {Card} from 'react-bootstrap';
import { Button, ListGroup} from "react-bootstrap";

function Employees(){
    const[employees, setEmployee] = useState([]);
    const [isLoading, setLoading] = useState(true);  
    const [selectedEmployee,setSelectedEmployee] = useState(null);
        
    useEffect(()=> {
        setLoading(true);
        axios.get('https://api.matgargano.com/employees/')
        .then((response) => {
            console.log(response);
            setEmployee(response.data);
        })
        .finally(() => setLoading(false));
    

    },[]);


    const Clicked = (id) =>{
        setLoading(true);
        axios.get(`https://api.matgargano.com/employees/${id}`)
        .then((response) => {
            setSelectedEmployee(response.data);
        })
        .finally(() => setLoading(false));

    }


    if(isLoading) return <Loader></Loader>
    return (
        <div className="container text-center mt-5">
        {isLoading && <Loader />}
        {!isLoading && !selectedEmployee && (
          <div>
            <h2>Select an Employee</h2>
            <ListGroup>
              {employees.map(employee => (
                <Button className = "btn mb-2" variant = "dark" key={employee.id} onClick={() => Clicked(employee.id)}>
                  {employee.name} 
                </Button>
              ))}
            </ListGroup>
          </div>
        )}
        {selectedEmployee && (
            <div className = "mx-auto w-25">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={selectedEmployee.photo} />
            <Card.Body>
              <Card.Title>{selectedEmployee.name}</Card.Title>
              <Card.Text>
                Start Date: {selectedEmployee.startDate}<br />
                Role: {selectedEmployee.role}<br />
                Department: {selectedEmployee.department} <br/>
                ID : {selectedEmployee.id}
              </Card.Text>
            </Card.Body>
            <Button variant = "dark"onClick={() =>  setSelectedEmployee(null)}> Back To List</Button>
          </Card>
          </div>
        )}
  
      </div>
    
    )



}


export default Employees;