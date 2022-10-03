import {useParams} from "react-router-dom";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FaPlus} from "react-icons/fa";
import JobTable from "./JobTable";

const BuildJobTable = ({
  isNew,
  jobs,
  onUpdate,
  onRemoveJob,
  onSetMessage,
  onSetShow,
}) => {
  const [show, setShow] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState("");
  let {id} = useParams();

  const handleClose = () => setShow(false);

  const handleShow = (deleteId) => {
    setDeleteJobId(deleteId);
    setShow(true);
  };

  const handleRemoveJob = () => {
    onRemoveJob(deleteJobId);
    setDeleteJobId("");
    handleClose();
  };

  return (
    <div className='shadow-lg rounded p-4 mb-5 bg-light'>
      {jobs[0] === "loading" && (
        <p className='intro h5 text-center text-secondary'>Loading ...</p>
      )}
      {jobs.length < 1 && (
        <p className='intro h5 text-center text-secondary'>
          Let's get started by creating your first rercord!
        </p>
      )}
      <JobTable
        isNew={isNew}
        jobId={id}
        jobs={jobs}
        onUpdate={onUpdate}
        onShowModal={handleShow}
        onSetMessage={onSetMessage}
      />
      {typeof id === "undefined" && !isNew && (
        <Button href='/jobs/new' variant='outline-primary' size='sm'>
          <FaPlus />
        </Button>
      )}
      <Modal show={show} onHide={handleClose} className=''>
        <Modal.Header closeButton>
          <Modal.Title>About to Delete Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your are about to permanently delete a job application record. This
          action is irreversible once you click the Delete button below. Are you
          sure you want to delete the record?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleClose}>
            Abort
          </Button>
          <Button variant='outline-primary' onClick={handleRemoveJob}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BuildJobTable;
