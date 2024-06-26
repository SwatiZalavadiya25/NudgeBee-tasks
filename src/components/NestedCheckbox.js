import { useState } from "react";

const NestedCheckbx = () => {
  const [parentCheckStatus, setParentCheckStatus] = useState(false);
  const [childcheckboxesStatus, setChildCheckBoxesStatus] = useState([
    { id: 1, label: "Child Checkbox 1", checked: false },
    { id: 2, label: "Child Checkbox 2", checked: false },
    { id: 3, label: "Child Checkbox 3", checked: false },
    { id: 4, label: "Child Checkbox 4", checked: false },
    { id: 5, label: "Child Checkbox 5", checked: false },
  ]);

  const handleParentCheckboxEvent = (e) => {
    setParentCheckStatus(e.target.checked);
    setChildCheckBoxesStatus(
      childcheckboxesStatus.map((child) => ({
        ...child,
        checked: e.target.checked,
      }))
    );
  };

  const handleChildcheckboxEvent = (id) => {
    const childChecked = childcheckboxesStatus.map((child) =>
      child.id === id ? { ...child, checked: !child.checked } : child
    );
    setChildCheckBoxesStatus(childChecked);
    setParentCheckStatus(childChecked.every((child) => child.checked));
  };

  const checkedChildCount = childcheckboxesStatus.filter(
    ({ checked }) => checked
  ).length;

  return (
    <div className="nested-checkbox">
      <div className="parent-checkbox">
        <label>
          <input
            type="checkbox"
            checked={parentCheckStatus}
            onChange={handleParentCheckboxEvent}
            className="parent-check"
          />
          Parent Checkbox
        </label>
        {checkedChildCount > 0 && (
          <span>
            Checked count: {checkedChildCount + " " + "child is selected"}
          </span>
        )}
      </div>
      <div className="child-checkboxes">
        {childcheckboxesStatus.map(({ id, label, checked }) => (
          <div className={"child" + id} key={id}>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => handleChildcheckboxEvent(id)}
                className="child-check"
              />
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NestedCheckbx;
