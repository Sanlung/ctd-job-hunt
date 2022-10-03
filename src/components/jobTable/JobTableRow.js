import {Button, ButtonGroup} from "react-bootstrap";
import {FaTrashAlt, FaEdit} from "react-icons/fa";

const JobTableRow = ({job, onShowModal}) => {
  const created = `${String(job.createdAt).slice(5, 10)}-${String(
    job.createdAt
  ).slice(2, 4)}`;
  const updated = `${String(job.updatedAt).slice(5, 10)}-${String(
    job.updatedAt
  ).slice(2, 4)}`;
  return (
    <tr>
      <td>{job.company}</td>
      <td>{job.position}</td>
      <td>{job.location}</td>
      <td>{job.contact}</td>
      <td>{job.email}</td>
      <td>{job.status}</td>
      <td>{created}</td>
      <td>{updated}</td>
      <td>
        <ButtonGroup>
          <Button
            href={`/jobs/edit/${job._id}`}
            variant='outline-primary'
            size='sm'>
            <FaEdit />
          </Button>
          <Button
            variant='outline-danger'
            size='sm'
            onClick={(e) => onShowModal(job._id)}>
            <FaTrashAlt />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default JobTableRow;
