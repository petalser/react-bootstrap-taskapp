import { useAppDispatch } from "../hooks";
import { deleteTodo, doneTodo } from "../features/todoList";
import { edit } from "../features/isEditing.js";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface ListItemProps {
  title: string;
  description?: string;
  completed: boolean;
  index: number;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  completed,
  index,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Card className="bg-secondary text-white">
      <Card.Body
        className={`position-relative ${
          completed ? "bg-success" : "bg-danger"
        }`}
      >
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className="position-absolute bottom-0 end-0 m-1 ">
          <Button
            onClick={() => {
              dispatch(doneTodo(index));
            }}
            variant="dark"
            size="sm"
            className="me-2 border-white"
          >
            {completed ? "Set Undone" : "Set Done"}
          </Button>
          <Button
            onClick={() => {
              dispatch(edit({ status: true, index, title, description }));
            }}
            variant="dark"
            size="sm"
            className="me-2 border-white"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteTodo(index));
            }}
            variant="dark"
            size="sm"
            className=" border-white"
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListItem;
