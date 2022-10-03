import JobTableRow from "./JobTableRow";
import JobTableForm from "./JobTableForm";

const JobTableRows = ({jobId, jobs, onUpdate, onShowModal, onSetMessage}) => (
  <>
    {jobs.map((job) =>
      job._id === jobId ? (
        <JobTableForm
          key={String(job.id)}
          job={job}
          onUpdate={onUpdate}
          onSetMessage={onSetMessage}
        />
      ) : (
        <JobTableRow
          key={String(job._id)}
          job={job}
          onShowModal={onShowModal}
        />
      )
    )}
  </>
);

export default JobTableRows;
