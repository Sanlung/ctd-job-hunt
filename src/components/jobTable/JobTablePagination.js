import Pagination from "react-bootstrap/Pagination";

const JobTablePagination = ({jobs, pageNum, onTurnPage}) => {
  const lastPage = Math.ceil(jobs.count / 10);
  const handleTurnPage = (page) => {
    if (page > 0 && page <= lastPage) {
      onTurnPage(page);
    }
  };

  return (
    <Pagination size='sm'>
      <Pagination.First onClick={() => handleTurnPage(1)} />
      <Pagination.Prev onClick={() => handleTurnPage(pageNum - 1)} />
      {pageNum !== 1 && (
        <>
          <Pagination.Item onClick={() => handleTurnPage(1)}>
            {1}
          </Pagination.Item>
          {pageNum !== 2 && <Pagination.Ellipsis />}
        </>
      )}
      <Pagination.Item active>{pageNum}</Pagination.Item>
      {pageNum !== lastPage && (
        <>
          {pageNum !== lastPage - 1 && <Pagination.Ellipsis />}
          <Pagination.Item onClick={() => handleTurnPage(lastPage)}>
            {lastPage}
          </Pagination.Item>
        </>
      )}
      <Pagination.Next onClick={() => handleTurnPage(pageNum + 1)} />
      <Pagination.Last onClick={() => handleTurnPage(lastPage)} />
    </Pagination>
  );
};

export default JobTablePagination;
