import { Formik, Form, Field, ErrorMessage } from 'formik';
import './addnovel.css';

const AddNovel = () => {
  // Simple validation function
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Title is required';
    }

    if (!values.genre) {
      errors.genre = 'Genre is required';
    }

    if (!values.author) {
      errors.author = 'Author is required';
    }

    if (!values.profile) {
      errors.profile = 'Profile URL is required';
    }

    if (!values.publicationYear) {
      errors.publicationYear = 'Publication Year is required';
    } else if (!/^\d{4}$/.test(values.publicationYear)) {
      errors.publicationYear = 'Publication Year must be a 4-digit year';
    }

    if (!values.synopsis) {
      errors.synopsis = 'Synopsis is required';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
    const { title, genre, author, profile, publicationYear, synopsis } = values;

    const data = {
      title,
      genre,
      author,
      profile,
      publication_year: publicationYear,
      synopsis
    };

    let accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    try {
      let response = await fetch('https://phase-4-project-0zcg.onrender.com/novels/addnovel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok) {
        setErrors({ submit: responseData.msg || 'Failed to add novel' });
      } else {
        setStatus({ success: 'Novel added successfully' });
        // Reset form fields
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error adding novel:', error);
      setErrors({ submit: 'Failed to add novel' });
      setSubmitting(false);
    }
  };

  return (
    <div className="add-novel-form">
      <h2>Add Novel</h2>
      <Formik
        initialValues={{ title: '', genre: '', author: '', profile: '', publicationYear: '', synopsis: '' }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="form-group">
              <Field
                type="text"
                name="title"
                className="form-field"
              />
              <label>Title</label>
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field
                type="text"
                name="genre"
                className="form-field"
              />
              <label>Genre</label>
              <ErrorMessage name="genre" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field
                type="text"
                name="author"
                className="form-field"
              />
              <label>Author</label>
              <ErrorMessage name="author" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field
                type="text"
                name="profile"
                className="form-field"
              />
              <label>Profile</label>
              <ErrorMessage name="profile" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field
                type="number"
                name="publicationYear"
                className="form-field"
              />
              <label>Publication Year</label>
              <ErrorMessage name="publicationYear" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <Field
                as="textarea"
                name="synopsis"
                className="form-field"
              />
              <label>Synopsis</label>
              <ErrorMessage name="synopsis" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            {status && status.success && <div className="info">{status.success}</div>}
            <ErrorMessage name="submit" component="div" className="error" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNovel;
