import {useState, useEffect, useRef} from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {FaPlus, FaWindowClose} from "react-icons/fa";
import JobTableInput from "./JobTableInput";

const JobTableForm = ({isNew, job, onUpdate, onSetMessage}) => {
  const [company, setCompany] = useState(job.company || "");
  const [position, setPosition] = useState(job.position || "");
  const [location, setLocation] = useState(job.location || "");
  const [contact, setContact] = useState(job.contact || "");
  const [email, setEmail] = useState(job.email || "");
  const [status, setStatus] = useState(job.status || "eligible");
  const created = job.createdAt
    ? `${String(job.createdAt).slice(5, 10)}-${String(job.createdAt).slice(
        2,
        4
      )}`
    : "";
  const updated = job.updatedAt
    ? `${String(job.updatedAt).slice(5, 10)}-${String(job.updatedAt).slice(
        2,
        4
      )}`
    : "";

  const newRowRef = useRef();

  useEffect(() => {
    if (isNew && newRowRef.current)
      newRowRef.current.scrollIntoView({behavior: "smooth"});
  });

  const handleUpdateJob = (e) => {
    e.preventDefault();
    if (!company || !position) {
      onSetMessage("Names of the company and position are required.");
    } else if (company.length > 30 || position.length > 30) {
      onSetMessage("Company or position name must not exceed 30 characters.");
    } else {
      onUpdate(job._id, company, position, location, contact, email, status);
      setCompany("");
      setPosition("");
      setLocation("");
      setContact("");
      setEmail("");
      setStatus("eligible");
    }
  };

  return (
    <tr ref={newRowRef}>
      <td>
        <JobTableInput
          isFocused
          name='company'
          type='text'
          value={company}
          onSetValue={setCompany}
        />
      </td>
      <td>
        <JobTableInput
          name='position'
          type='text'
          value={position}
          onSetValue={setPosition}
        />
      </td>
      <td>
        <JobTableInput
          name='location'
          type='text'
          value={location}
          onSetValue={setLocation}
        />
      </td>
      <td>
        <JobTableInput
          name='contact'
          type='text'
          value={contact}
          onSetValue={setContact}
        />
      </td>
      <td>
        <JobTableInput
          name='email'
          type='email'
          value={email}
          onSetValue={setEmail}
        />
      </td>
      <td>
        <select
          className='no-style'
          name='status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value='eligible'>eligible</option>
          <option value='applied'>applied</option>
          <option value='interviewed'>interviewed</option>
          <option value='declined'>declinded</option>
        </select>
      </td>
      <td>{created || ""}</td>
      <td>{updated || ""}</td>
      <td>
        <ButtonGroup>
          <Button variant='outline-primary' size='sm' onClick={handleUpdateJob}>
            <FaPlus />
          </Button>
          <Button href='/jobs' variant='outline-secondary' size='sm'>
            <FaWindowClose />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

export default JobTableForm;
