import {useParams} from "react-router-dom";
import Table from "react-bootstrap/Table";
import JobTableRows from "./JobTableRows";
import JobTableForm from "./JobTableForm";

const JobTable = ({
  isNew,
  jobId,
  jobs,
  onUpdate,
  onSortByDate,
  onFilter,
  onShowModal,
  onSetMessage,
}) => {
  let {id} = useParams();

  return (
    <Table
      responsive='xl'
      bordered
      hover
      striped
      variant='info'
      className='shadow border-info'>
      <thead>
        <tr>
          <th>Company</th>
          <th>Position</th>
          <th>Location</th>
          <th>Contact</th>
          <th>Email</th>
          {typeof id === "undefined" && !isNew && !jobs.isFiltered ? (
            <th
              className='filter-select'
              onChange={(e) => onFilter(e.target.value)}>
              <select
                className='no-style'
                name='status'
                aria-label='Job status'>
                <option>Status</option>
                <option value='eligible'>eligible</option>
                <option value='applied'>applied</option>
                <option value='interviewed'>interviewed</option>
                <option value='declined'>declined</option>
              </select>
            </th>
          ) : (
            <th>Status</th>
          )}
          {typeof id === "undefined" && !isNew ? (
            <th className='sort-button' onClick={(e) => onSortByDate()}>
              Created
            </th>
          ) : (
            <th>Created</th>
          )}
          <th>Updated</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody className='table-group-divider'>
        {jobs.items.length > 0 && (
          <JobTableRows
            jobId={jobId}
            jobs={jobs.items}
            onUpdate={onUpdate}
            onShowModal={onShowModal}
            onSetMessage={onSetMessage}
          />
        )}
        {isNew && (
          <JobTableForm
            job={{}}
            onUpdate={onUpdate}
            onSetMessage={onSetMessage}
          />
        )}
      </tbody>
    </Table>
  );
};

export default JobTable;
