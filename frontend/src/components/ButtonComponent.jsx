import { Button } from "flowbite-react";

function ButtonComponent({ type, color, size, label }) {
  return (
    <>
      <Button type={type} color={color} size={size}>
        {label}
      </Button>
    </>
  );
}
export default ButtonComponent;
