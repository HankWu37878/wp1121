import React from "react";


type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function AuthInput({ label, type, value, setValue }: Props) {
  return (
    <div className="w-full">
      <p>{label}</p>
      <input
        id={label}
        type={type}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="bg-gray-200 rounded-md w-full mt-1"
      />
    </div>
  );
}

export default AuthInput;
