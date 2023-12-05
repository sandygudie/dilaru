interface InputProps {
  label: string;
  name: string;
  defaultValue?: string;
  type: string;
  placeholder?: string;
  register: any;
  style?: any;
  Icon?: JSX.Element;
  accept?: any;
  min?: any;
  max?: any;

}

export const TextField = ({
  label,
  register,
  defaultValue,
  placeholder,
  type,
  name,
  style,
  accept,
  min,
  max,

}: InputProps) => {
  return (
    <>
      <div className="w-[20rem] my-3">
        <label className="text-base" htmlFor={name}>
          {label}
        </label>
        <input
          style={style}
          {...register}
          defaultValue={defaultValue}
          type={type ? type : "text"}
          placeholder={placeholder}
          className="rounded-lg w-full border-[1px] border-yellow py-3 px-5 outline-none focus:border-[1px] focus:border-gray"
          required
          min={min ? min : null}
          max={max ? max : null}
          accept={accept ? accept : null}
        />
      </div>
    </>
  );
};
