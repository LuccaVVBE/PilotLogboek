import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Modal } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import usePilots from '../../api/pilots';
function ProfilePage() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [birthday, setBirthday] = useState('');
  const pilotsApi = usePilots();
  const findPilot = useCallback(async () => {
      const pilot = await pilotsApi.getPilotById();
      const date = new Date(pilot.birthday);
      date.setDate(date.getDate() + 1);
      setFName(pilot.fName);
      setLName(pilot.lName);
      setBirthday(pilot.birthday?date.toISOString().split('T')[0]:'');
      //eslint-disable-next-line
  }, []);

  useEffect(() => {
    findPilot();
  }, [findPilot]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let date;
    if(birthday){
      date = new Date(birthday);
    }
    const pilot = {
      fName: fName,
      lName: lName,
      birthday: date?date.toISOString().split('T')[0]:null,
    };
    await pilotsApi.updatePilot(pilot);
  };

  return (
    <>
      <Modal.Dialog className="profile">
        <Modal.Header>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group controlId="formGridFn" as={Col}>
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" placeholder="John" onChange={(e) => setFName(e.target.value)} value={fName}  />
              </Form.Group>

              <Form.Group controlId="formGridLn" as={Col}>
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" placeholder="Doe" onChange={(e) => setLName(e.target.value)} value={lName} />
              </Form.Group>
            </Row>

            
            <Form.Group controlId="formGridNewPwConf" as={Col}>
              <Form.Label>Date of birth</Form.Label>
              <Form.Control type="date" placeholder="" onChange={(e) => setBirthday(e.target.value)} value={birthday} />
            </Form.Group>
            <br/>
            <Form.Group controlId="submit" as={Col}>
              <Button variant="primary" type="submit" onClick={handleSubmit} data-cy="update_profile">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </>
  );
}

export default ProfilePage;
