import Table from "react-bootstrap/Table";
import JobTableRows from "./JobTableRows";
import JobTableForm from "./JobTableForm";

const JobTable = ({
  isNew,
  jobId,
  jobs,
  onUpdate,
  onShowModal,
  onSetMessage,
}) => (
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
        <th>Status</th>
        <th>Created</th>
        <th>Updated</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody className='table-group-divider'>
      {jobs.length > 0 && (
        <JobTableRows
          jobId={jobId}
          jobs={jobs}
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

export default JobTable;
