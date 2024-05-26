import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Modal } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import useLicenses from '../../api/licenses';


function LicenseOverview() {
  const [licenses, setLicenses] = useState([]);
  const { getAllLicenses, deleteLicense } = useLicenses();

  const fetchLicenses = useCallback(async () => {
    const licenses = await getAllLicenses();
    setLicenses(licenses);
  }, [getAllLicenses]);

  useEffect(() => {
    fetchLicenses();
  }, [fetchLicenses]);

  const handleDelete = async (id) => {
    await deleteLicense(id);
    fetchLicenses();
  };

  return (
    <>
      <Modal.Dialog className="licenseTable">
        <Modal.Header>
          <Modal.Title>Licenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
      <Table striped>
      <thead>
        <tr>
          <th>Type</th>
          <th>Valid from</th>
          <th>Validity in years</th>
          <th></th>
        </tr>
      </thead>
      <tbody>

        {licenses.map((license) => (
          <License {...license} key={license.id}  handleDelete={handleDelete}/>
        ))}
      </tbody>
    </Table>
    </div>
        </Modal.Body>
      </Modal.Dialog>
    </>
  );
}

export default LicenseOverview;

const License = ({Type, ValidFrom, validityInYears, id, handleDelete}) => {
  const date = new Date(ValidFrom);
  date.setDate(date.getDate() + 1);
  if(validityInYears === 0) {
    validityInYears = "Lifetime";
  }

  return (
    <tr>
      <td>{Type}</td>
      <td>{date.toISOString().split('T')[0]}</td>
      <td>{validityInYears}</td>
      <td>
        <Button variant="danger" onClick={() => handleDelete(id)} data-cy="license_remove">Delete</Button>
      </td>
    </tr>
  );
};

