'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const capitalize = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const Input = ({ type = 'text', name, required, placeholder }: { type?: string; name: string; required: boolean; placeholder?: string }) => {
  const baseClassName = `transition-all duration-200 group-hover:brightness-[1.3] focus:group-hover:brightness-100 w-full outline-none text-slate-200 bg-slate-800 text-[0.95em]`;
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="group relative w-full">
      <input
        type={type}
        name={name}
        required={required}
        className={`pt-[26px] pb-2 px-4  ${baseClassName} rounded-[10px]`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
      />
      <label
        className={`absolute left-4 text-white ${
          isFocused || value.length > 0 ? 'top-[12.5%] text-[0.85em]' : 'top-[27.5%]'
        } pointer-events-none transition-all duration-200`}
      >
        {capitalize(name)}
      </label>
    </div>
  );
};

export default function ContactPage() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    e.target.reset();
    toast.success('Thanks for contacting me, I will be in touch soon!', {
      position: toast.POSITION.TOP_CENTER
    });

    await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  };

  return (
    <div>
      <h1
        className={`base-heading underline decoration-3 md:decoration-4 underline-offset-[6px] sm:underline-offset-[8px] text-[40px] sm:text-[44px] md:text-[48px] lg:text-[54px]`}
      >
        Contact Me
      </h1>
      <form onSubmit={handleSubmit} className={`flex flex-col mx-auto mt-4 gap-y-4`}>
        <Input type={`text`} name={`name`} required />
        <Input type={`email`} name={`email`} required />
        <div className="group w-full">
          <textarea
            name={`message`}
            placeholder={`Message ...`}
            className={`py-4 px-4 transition-all duration-200 group-hover:brightness-[1.3] focus:group-hover:brightness-100 w-full outline-none text-slate-200 bg-slate-800 text-[0.95em] rounded-md`}
          />
        </div>

        <button type="submit" className={`mt-2 mx-auto w-full sm:w-5/6 md:w-2/3 lg:w-1/3 py-2 rounded-md bg-slate-800 text-white`}>
          Submit
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} closeOnClick draggable pauseOnHover theme="dark" />
    </div>
  );
}
