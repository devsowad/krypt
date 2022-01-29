interface Props {
  placeholder: string;
  type?: string;
  value?: string | number;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
  placeholder,
  name,
  type = 'text',
  value = '',
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step='0.0001'
      value={value}
      name={name}
      onChange={(e) => onChange(e)}
      className='w-full p-2 my-2 text-sm text-white bg-transparent border-none rounded-sm outline-none white-glassmorphism'
    />
  );
};

export default Input;
