import React, { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

function Error({error}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (error) {
      setShow(true);
    }
  }, [error]);

  const handleClose = () => setShow(false);

  return (
    <div
    aria-live="polite"
    aria-atomic="true"
    style={{ minHeight: '240px', maxWidth:'25%', position: 'fixed',top:'10%',right:'10%', zIndex: '1100' }}
  >
    <ToastContainer>
      <Toast show={show} onClose={handleClose} delay={5000} autohide bg="danger">
        <Toast.Header>
          <strong>Error</strong> 
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
    </ToastContainer>
  </div>
  );
}

export default Error;