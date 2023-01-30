import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";



function EditAuthor() {
  const{id} = useParams();
  const navigate = useNavigate();
  const { flag, setFlag } = useOutletContext();
  const [formAuthor, setFormAuthor] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    axios 
      .get(`http://localhost:5001/api/authors/${id}`,{signal:controller.signal})
      .then(res => setFormAuthor(res.data))
      .catch(err => console.log(err));
    return () => controller.abort();
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/api/authors/${id}`, formAuthor) // must be .put for update
      .then((res) => {
        console.log(res.data);
        setFlag(!flag);
        setErrors(null); // set errors back to null because no errors (validations)
        navigate(`/authors/${id}`);
      })
      .catch((err) => {
        // validations // if we have a problem and it will be caught
        console.log(err);
        setErrors(err?.response?.data?.errors); // follow the axios error error to get these in order
        // chaining these with ? so we dont break when error occurs
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // were grabbing the name out of the input
    if (name === "topTen") {
      setFormAuthor({
        ...formAuthor,
        topTen: e.target.checked,
      });
    } else {
      setFormAuthor({
        ...formAuthor,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <div className="card-body">
        <h2> Edit Author</h2>
        {formAuthor &&       
          <form onSubmit={handleSubmit}>
          {/*  name input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={formAuthor.name}
              onChange={handleChange}
            />
            {errors?.name && (    // if errors.name && procceed    and generate error message
              <span className="form-text text-danger">
                {errors.name.message}
              </span>
            )}
          </div>
          {/* dropdown input */}
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Rate: <h6>(optional)</h6>
            </label>
            <select
              name="type"
              id="type"
              className="form-select"
              value={formAuthor.type}
              onChange={handleChange}
            >
              <option value="none"> Select Author Rating :</option>
              <option value="Top Favorite">Top favorite Authors</option>
              <option value="Good Author">Good Author</option>
            </select>
            {errors?.type && (    // if errors.type && procceed    and generate error message
              <span className="form-text text-danger">
                {errors.type.message}
              </span>
            )}
          </div>
          {/* textbox input */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={formAuthor.description}
              onChange={handleChange}
            ></textarea>
            {errors?.description && (    // if errors.description && procceed    and generate error message
              <span className="form-text text-danger">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* picture url */}
          <div className="mb-3">
            <label htmlFor="cover" className="form-label">
              Image Url:
            </label>
            <input
              type="text"
              name="cover"
              id="cover"
              className="form-control"
              value={formAuthor.cover}
              onChange={handleChange}
            />
            {errors?.cover && (    // if errors.cover && procceed    and generate error message
              <span className="form-text text-danger">
                {errors.cover.message}
              </span>
            )}
          </div>

          {/* checkbox input */}
          <input
            type="checkbox"
            name="topTen"
            id="topTen"
            className="form-check-input mr-1"
            checked={formAuthor.topTen}
            onChange={handleChange}
          />
          <label htmlFor="topTen" className="form-check-label">
            In your Top Ten?
          </label>

          {/* buttons */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary m-3">
              Delete 
            </button>
            <button type="submit" className="btn btn-primary m-3">
              Edit Author
            </button>
          </div>
        </form>}
      </div>
    </div>
  );
}

export default EditAuthor;
