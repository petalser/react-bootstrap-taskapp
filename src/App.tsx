import { useAppSelector, useAppDispatch } from "./hooks";
import { edit } from "./features/isEditing";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ListItem from "./components/ListItem";
import Form from "./components/Form";
import { ListItemType } from "./features/todoList";

function App() {
  const [radio, setRadio] = useState<boolean>(true);
  const entireList = useAppSelector((state) => state.todoList);
  const [sorted, setSorted] = useState<ListItemType[]>([]);

  const status = useAppSelector((state) => state.isEditing.status);
  const title = useAppSelector((state) => state.isEditing.title);
  const description = useAppSelector((state) => state.isEditing.description);
  const index = useAppSelector((state) => state.isEditing.index);

  const dispatch = useAppDispatch();

  function sortTasksByCompleted(list, radio): ListItemType[] {
    const sortedList = [...list]; // Create a copy of the list to avoid mutating the original

    sortedList.sort((a, b) => {
      if (radio) {
        ``;
        return b.completed - a.completed;
      } else {
        return a.completed - b.completed;
      }
    });

    return sortedList;
  }
  useEffect(() => {
    setSorted(sortTasksByCompleted(entireList, radio));
  }, [radio, entireList]);

  const handleNewTask = () => {
    dispatch(edit({ status: true, index: -1, title: "", description: "" }));
  };

  return (
    <>
      <Stack gap={2} className="col-md-5 mx-auto">
        <Card className="bg-secondary text-white">
          <Card.Body className="position-relative">
            <Card.Title className="col-11">Sort by</Card.Title>
            <label htmlFor="done">
              <input
                type="radio"
                id="done"
                name="sortBy"
                className=""
                onChange={() => {
                  setRadio(!radio);
                }}
                checked={radio}
              />
              Done first
            </label>
            <br />
            <label htmlFor="undone">
              <input
                type="radio"
                id="undone"
                name="sortBy"
                className=""
                onChange={() => {
                  setRadio(!radio);
                }}
                checked={!radio}
              />
              Undone first
            </label>
            <Button
              onClick={handleNewTask}
              variant="dark"
              size="sm"
              className="position-absolute bottom-0 end-0 m-1 border-white"
            >
              New task
            </Button>
          </Card.Body>
        </Card>
        {sorted.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            description={item.description}
            completed={item.completed}
            index={item.id}
          />
        ))}
      </Stack>
      <Form
        id={index}
        titleText={title}
        descriptionText={description}
        show={status}
      />
    </>
  );
}

export default App;
