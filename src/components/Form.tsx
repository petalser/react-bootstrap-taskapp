import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { edit } from "../features/isEditing";
import { deleteTodo, editTodo } from "../features/todoList";
import type { ListItemType } from "../features/todoList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

type FormProps = {
  id: number;
  titleText: string;
  descriptionText?: string;
  show: boolean;
};

const Form = ({ id, titleText, descriptionText, show }: FormProps) => {
  const [title, setTitle] = useState(titleText);
  const [description, setDescription] = useState(descriptionText);

  useEffect(() => {
    setTitle(titleText);
    setDescription(descriptionText);
  }, [titleText, descriptionText]);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(edit({ status: false, title: "", index: 0 }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const update: ListItemType = {
      id,
      title,
      description,
      completed: false,
    };

    if (id >= 0) {
      dispatch(deleteTodo(id));
    }
    dispatch(editTodo(update));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true} centered>
      <Modal.Header closeButton>
        <Modal.Title>{id >= 0 ? "Edit task" : "New task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Title (required):
          </span>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="form-control"
            value={title}
            aria-label="Title"
            aria-describedby="basic-addon1"
            required
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Description</span>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            value={description}
            className="form-control"
            aria-label="With textarea"
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Form;
