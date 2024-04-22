import { Button } from "flowbite-react";

function ButtonComponent({ type, color, size, label, onClick }) {
  return (
    <>
      <Button type={type} color={color} size={size} onClick={onClick}>
        {label}
      </Button>
    </>
  );
}
export default ButtonComponent;
