import { Link, useParams, useNavigate } from "react-router-dom"; // using this to pull id
import axios from "axios";
import { useEffect, useState } from "react";

function OneAuthor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:5001/api/authors/${id}`, {
        signal: controller.signal,
      })
      .then((res) => setAuthor(res.data))
      .catch((err) => console.log(err));
    return () => controller.abort();
  }, [id]); // this should be dependent of our id so we put id in our watch list

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
    <div>
      <h2>Aurthor Details</h2>
      <div className="card mb-3">
        {author && (
          <>
            {author.cover && (
              <img
                src={author.cover}
                alt={author.name}
                className="card-img-top"
              />
            )}
            <div className="card-body">
              <h2>{author.name}</h2>
              <p>{author.description}</p>
              <p>{author.topTen}</p>
              <p>{author.type}</p>
            </div>
          </>
        )}
        <div className="card-footer d-flex justify-content-end">
          <Link to={`/authors/${id}/edit`} className="btn btn-warning me-3">
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(author._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default OneAuthor;
