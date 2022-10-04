const NotFound = () => (
  <div className='welcome shadow-lg rounded p-5 mx-auto mb-5'>
    <div className='auth-form'>
      <div className='mt-5 d-flex flex-column'>
        <p className='intro h2 text-secondary mb-4'>Whoops!</p>
        <p className='intro h2 text-secondary mb-4'>
          The page you are looking for does not exist!
        </p>
        <p className='intro h2 text-secondary mb-4'>
          Please try again with a correct URL.
        </p>
      </div>
    </div>
  </div>
);

export default NotFound;
