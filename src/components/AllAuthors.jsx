
import { Link ,useOutletContext,useParams,useNavigate } from "react-router-dom"
import axios from "axios";


function AllAuthors() {
  const{id} = useParams();
  const navigate = useNavigate()
  const  {authors}  = useOutletContext(); // bringing in albums from albums.jsx

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/api/authors/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/authors");
      })
      .catch((err) => console.log(err));
  };


  return (
    <table className="table">
      <thead>
      <tr>
        <th>Authors</th>
        <th>Actions Available</th>
      </tr>
      </thead>
      <tbody>
        {
          authors && authors.map(author => { // mapping over albums and making sure they exist
            return (                         // if they exxist we map over authors
              <tr key={author._id}>
                <td><Link to= {`/authors/${author._id}`} >{author.name}</Link></td> {/* here we render the author info // individ link to each name  */}
                <td> 
          <Link to={`/authors/${id}/edit`} className="btn btn-warning me-3">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(author._id)}
          >
            Delete
          </button></td>
              </tr>
            )
          }) 
        }
      </tbody>
    </table>
  )
}

export default AllAuthors