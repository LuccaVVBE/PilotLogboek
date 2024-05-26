import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState, useCallback } from "react";
import useLicense from "../../api/licenses";
import { useEffect } from 'react';


function ProgressBarComponent({setError}){
    const licensesApi = useLicense();
    const [isOpen, setIsOpen] = useState(false);
    const [licenses, setLicenses] = useState([]);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    const refreshLicenses = useCallback(async () => {
        try {
          const licenseList = await licensesApi.getAllLicenses();
          setLicenses(licenseList);
        } catch (error) {
            setError(error.message);
        }
          //eslint-disable-next-line
      }, []);

      useEffect(() => {
        refreshLicenses();
        }, [refreshLicenses]);



  return (
    <>
    <Modal.Dialog className="licenseList" size="lg">
        <Modal.Header>
            <Modal.Title>License status</Modal.Title>
            <Button variant="primary" onClick={openForm} data-cy="add_license">Add license</Button>
        </Modal.Header>
        <Modal.Body>
            {licenses.map((license) => (
                <ProgressBarRow type={license.Type} validfrom={license.ValidFrom} validityInYears={license.validityInYears} key={license.id} />
                ))}
        </Modal.Body>
    </Modal.Dialog>
    {isOpen && <AddLicense isOpen={isOpen} setError={setError} close={closeForm} refreshLicenses={refreshLicenses}/>}
    </>
    );
}

function ProgressBarRow(license){
    let {type, validfrom, validityInYears} = license;
    let variant = "success";
    let percentage;
    if(validityInYears===0){
        percentage=100;
         variant = "info"
        type= type + " - Non Expiry";
    }else{
    const today = new Date();
    const validUntil = new Date(validfrom);
    validUntil.setFullYear(validUntil.getFullYear() + validityInYears);
    const difference = validUntil - today;
    const differenceInDays = difference / (1000 * 3600 * 24);
    
    percentage = (differenceInDays / (validityInYears*365)) * 100;
    if(percentage<10 && percentage>0){
        type=type+ " - Expiring soon";
         variant = "warning";
    }
    if(percentage<=0){
        percentage=100;
        type=type+" - Expired";
         variant = "danger";
    }
}
    return (
        <>
        <div data-cy="license_info">
        <Form.Group className="mb-3">
        <Form.Label data-cy="license_info_type">{type}</Form.Label>
        <ProgressBar variant={variant} now={percentage} />
        </Form.Group>
        </div>
        </>
    );
}

function AddLicense({isOpen, close, refreshLicenses, setError}){
    const licensesApi = useLicense();
    const [type, setType] = useState("");
    const [validFrom, setValidFrom] = useState("");
    const [validityInYears, setValidityInYears] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!type || !validFrom || !validityInYears){
            setError("Please fill in all fields");
            return
        }
        await saveLicense();
        close();
        refreshLicenses();
    }

    const saveLicense = async() => {
        const license = {Type:type, ValidFrom:validFrom, validityInYears};
        await licensesApi.createLicense(license);
    }



    return (
        <>
        <Modal show={isOpen}>
            <Modal.Header>
                <Modal.Title>Add license</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Control data-cy="license_type" type="text" placeholder="Enter type" value={type} onChange={(e) => setType(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Valid from</Form.Label>
                    <Form.Control data-cy="license_date" type="date" placeholder="Enter valid from" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Validity in years (0 for non-expiry)</Form.Label>
                    <Form.Control data-cy="license_VIY" type="number" min='0' placeholder="Enter validity in years" value={validityInYears} onChange={(e) => setValidityInYears(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close} data-cy="license_cancel">Cancel</Button>
                <Button variant="primary" onClick={handleSubmit} data-cy="license_submit">Save</Button>
            </Modal.Footer>
            
        </Modal>
        </>
    );
}

export default ProgressBarComponent;