import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [item, setText] = useState("");
  const [day, setDay] = useState("");
  const [completed, setCompleted] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!item) {
      alert("Please add a task");
      return;
    }

    onAdd({ item, completed })

    setText('')
    // setDay('')
    setCompleted(false)
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Task</label>
          <input
            type="text"
            placeholder="Add Task"
            value={item}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {/* <div className="form-control">
          <label>Day & Time</label>
          <input
            type="text"
            placeholder="Add Day & Time"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div> */}
        <div className="form-control form-control-check">
          <label>Set Completed</label>
          <input
            type="checkbox"
            value={completed}
            checked={completed}
            onChange={(e) => setCompleted(e.currentTarget.checked)}
          />
        </div>

      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  );
};

export default AddTask;
