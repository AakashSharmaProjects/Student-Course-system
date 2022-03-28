import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import Spinner from 'react-bootstrap/Spinner';

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "http://localhost:3000/student";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/show/' + id
    });
  }

  // return (
  //   <div>
  //     { data.length !== 0
  //       ? <div>
  //         <table>
  //           <thead>
  //             <tr>
  //               <td>Student Number</td>
  //               <td>Name</td>
  //               <td>Program</td>
  //               <td>Email</td>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               <td>
                  
  //                 <ListGroup>
  //                   {data.map((item, idx) => (
  //                     <ListGroup.Item key={idx} >{item.studentNumber}</ListGroup.Item>
  //                       ))}
  //                 </ListGroup> 
  //               </td>
  //               <td>
  //                 <ListGroup>
  //                   {data.map((item, idx) => (
  //                     <ListGroup.Item key={idx} >{item.firstName} {item.lastName}</ListGroup.Item>
  //                       ))}
  //                 </ListGroup> 
  //               </td>
  //               <td>
  //                 <ListGroup>
  //                   {data.map((item, idx) => (
  //                     <ListGroup.Item key={idx} >{item.program}</ListGroup.Item>
  //                       ))}
  //                 </ListGroup> 
  //               </td>
  //               <td>
  //                 <ListGroup>
  //                   {data.map((item, idx) => (
  //                     <ListGroup.Item key={idx} >{item.email}</ListGroup.Item>
  //                       ))}
  //                 </ListGroup> 
  //               </td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       </div>
  //       : < Login />
  //     }
  //   </div>

  // );
  return (
    <div>
      { data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.firstName} {item.lastName}</ListGroup.Item>
              // <ListGroup.Item key={idx} >{item.firstName} {item.lastName}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(List);
