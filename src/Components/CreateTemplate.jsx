import React, { useState } from 'react';
import axios from 'axios'; // Assuming an API endpoint exists
import { useSelector } from 'react-redux';
import { ModalContent, ModalActions, Header, Icon, Modal, FormField, Button, Form } from 'semantic-ui-react';
import './CreateTemplate.css';
import { setname } from '../features/counter/roomslice';

const CreateTemplate = () => {
  const email = useSelector((state) => state.User.email);
  const [name, setName] = useState('');
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!name || !html) return alert('Please fill all the fields');
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:3000/usertemplates/newtemplate', {
        email,
        name,
        html,
      });

      if (response.status === 201) {
        setSuccess('Template created successfully!');
        setName('');
        setHtml('');
        setOpen(false);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='new-template-model'>
      <Modal
      closeIcon
      open={open}
      trigger={<Button>Create New Template</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header content='Create New Template from your Html' />
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <label>Name</label>
            <input placeholder='Enter Name'  onChange={(e)=>setName(e.target.value)} />
          </FormField>
          <FormField>
            <label>Html</label>
            <textarea  placeholder='Enter Html' rows="10" cols="50"  onChange={(e)=>setHtml(e.target.value)} />
          </FormField>
          <Button type='submit'>Create Template</Button>
          <p>{error}</p>
        </Form>
      </ModalContent>
      <ModalActions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
      </ModalActions>
    </Modal>
    </div>
    
  );
}

export default CreateTemplate;
