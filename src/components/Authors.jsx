import { Outlet } from "react-router-dom"
import axios from 'axios';
import {useEffect , useState} from 'react';


function Authors() {
  const [authors, setAuthors] = useState([]); // send this piece of state down with context prop
  const [flag, setFlag] = useState(false)

  useEffect(() => {
  const controller = new AbortController();
  axios
    .get('http://localhost:5001/api/authors', {signal: controller.signal})
    .then(res => {
      setAuthors(res.data)
      setFlag(!flag)
    })
    .catch(err => console.log(err))
  return () => controller.abort();
  }, [flag]);

  return (
    <div>
      
      <Outlet context={{authors , flag , setFlag}} /> 
      {/* this is our context prop to display info */}
    </div>
    
    
  )
}

export default Authors