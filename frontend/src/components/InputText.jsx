//flowbite
import { Label, TextInput } from "flowbite-react";

function InputText({ labelId, labelValue, type, placeholder, name }) {
  return (
    <div>
      <div className='mb-2 block'>
        <Label htmlFor={labelId} value={labelValue} />
      </div>
      <TextInput
        id={labelId}
        type={type}
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
export default InputText;
