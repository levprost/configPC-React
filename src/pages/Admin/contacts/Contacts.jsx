import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../../components/Menu";
import axios from "axios";
import { Link } from "react-router-dom";

const ContactShow = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    displayContact();
  }, []);

  const displayContact = async () => {
    await axios.get("http://127.0.0.1:8000/api/contacts").then((res) => {
      setContact(res.data);
    });
  };

  const deleteContact = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/contacts/${id}`).then(displayContact);
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Objet du message</th>
              <th>Email</th>
              <th>Votre message</th>
              <th>Image</th>
              <th>Déjà répondu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contact.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.subject_contact}</td>
                <td>{contact.email_contact}</td>
                <td>{contact.message_contact}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/uploads/${contact.image_contact}`}
                    width="75px"
                    alt="pas d'images"
                  />
                </td>
                <td style={{ color: contact.is_read === 1 ? 'green' : 'red' }}>{contact.is_read === 1 ? 'Read' : 'Unread'}</td>
                <Link
                  to={`/admin/contacts/${contact.id}`}
                  className="btn btn-success me-2"
                >
                  Show
                </Link>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ContactShow;
