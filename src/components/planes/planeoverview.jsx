import { useState, useEffect } from "react";
import usePlanes from "../../api/planes";
import { Modal, Form, Button } from "react-bootstrap";
import { useCallback } from "react";
import Error from "../Error";


function PlanesOverview() {
    const planesApi = usePlanes();
    const [planes, setPlanes] = useState([]);

    const refreshPlanes = useCallback(async() => {
        const planes = await planesApi.getAllFlownPlanes();
        setPlanes(planes);
    }, []);    

    useEffect(() => {
        refreshPlanes();
    }, [refreshPlanes]);


    if(planes.length === 0){
        return (
        <div data-cy="planepage">
            <Error error="Add flights to have an overview of flown planes." />
        </div>
        );
    }

    
    return (
        <div data-cy="planepage">
            {planes.map((plane) => (
                <Plane key={plane.Registration} planeInfo={plane} refreshPlanes={refreshPlanes} />

            ))}
            
        </div>
    );
    }

export default PlanesOverview;

function Plane({planeInfo, refreshPlanes}) {
    let {Registration, Type, MaxWeight, MaxFuel} = planeInfo;
    const [img, setImg] = useState(null);
    const [show, setShow] = useState(false);

    const handleEdit = () => {
        setShow(true);
    }

    useEffect(() => {
        getImg();
    }, []);

    if(!Registration){
        Registration = "Registration not set";
    }
    if(!Type){
        Type = "Type not set";
    }
    if(!MaxWeight){
        MaxWeight = "MaxWeight not set";
    }
    else{
        MaxWeight = MaxWeight + " lbs";
    }
    if(!MaxFuel){
        MaxFuel = "MaxFuel not set";
    }
    else{
        MaxFuel = MaxFuel + " US Gallons";
    }
    const getImg = async() => {
        const img = await fetch('https://api.planespotters.net/pub/photos/reg/'+Registration).then(response => response.json());
        setImg(img.photos[0]);
    }
    return (
        <>
        <Modal.Dialog className="plane">
            <Modal.Header>
                <Modal.Title data-cy="plane_reg">{Registration}</Modal.Title>
                <Button data-cy="plane_edit" variant="primary" onClick={handleEdit}>Edit</Button>
            </Modal.Header>
            <Modal.Body>
                <p data-cy="plane_type">Type: {Type}</p>
                <p data-cy="plane_weight">Max weight: {MaxWeight}</p>
                <p data-cy="plane_fuel">Max Fuel: {MaxFuel}</p>
                {img && <a href={img.link} target="_blank"><img src={img.thumbnail.src} /></a>}
                {img && <p>Photo by: {img.photographer}</p>}
            </Modal.Body>
        </Modal.Dialog>
        <EditPlane key={Registration} planeId={Registration} show={show} setShow={setShow} refreshPlanes={refreshPlanes}/>
        </>
    );
}

function EditPlane ({planeId, show, setShow, refreshPlanes}) {
    const planesApi = usePlanes();
    
    const [Registration, setRegistration] = useState("");
    const [Type, setType] = useState("");
    const [MaxWeight, setMaxWeight] = useState("");
    const [MaxFuel, setMaxFuel] = useState("");
    const fetchPlane = useCallback(async() => {
        const plane = await planesApi.getPlaneByRegistration(planeId);
            setRegistration(plane.Registration);
        if(plane.Type){
            setType(plane.Type);
        }
        if(plane.MaxWeight){
            setMaxWeight(plane.MaxWeight);
        }
        if(plane.MaxFuel){
            setMaxFuel(plane.MaxFuel);
        }
    }
    , []);

    useEffect(() => {
        fetchPlane();
    }
    , [fetchPlane]);


    const handleClose = () => {
        reset();
        setShow(false);
        
    }

    const reset = () => {
        setType("");
        setMaxWeight("");
        setMaxFuel("");
        fetchPlane();
    }

    const handleEdit = async() => {
        const plane = {
            Registration: Registration,
            Type: Type? Type : null,
            MaxWeight: MaxWeight? MaxWeight : null,
            MaxFuel: MaxFuel? MaxFuel : null
        }
        await planesApi.editPlane(plane);
        refreshPlanes();
        handleClose();
    }

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Edit plane</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Registration</Form.Label>
                        <Form.Control data-cy="plane_info_reg" type="text" placeholder="Enter registration" value={Registration} disabled />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Type</Form.Label>
                        <Form.Control data-cy="plane_info_type" type="text" placeholder="Enter type" value={Type} onChange={(e) => setType(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max weight</Form.Label>
                        <Form.Control data-cy="plane_info_weight" type="text" placeholder="Enter max weight" value={MaxWeight} onChange={(e) => setMaxWeight(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max fuel</Form.Label>
                        <Form.Control data-cy="plane_info_fuel" type="text" placeholder="Enter max fuel" value={MaxFuel} onChange={(e) => setMaxFuel(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                    Close
                </Button>
                <Button data-cy="plane_info_submit" variant="primary" onClick={handleEdit} >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );

}
