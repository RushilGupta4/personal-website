'use client';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const shadow = 'shadow-[0px_1px_2px_1px_rgba(0,0,0,0.2)]';
  const inputClass = `${shadow} border-2 border-double border-slate-700 rounded-md mb-[10px] py-[5px] px-2 text-slate-700`;

  return (
    <div>
      <h1
        className={`base-heading underline decoration-3 md:decoration-4 underline-offset-[6px] sm:underline-offset-[8px] text-[40px] sm:text-[44px] md:text-[50px] lg:text-[56px]`}
      >
        Contact Me
      </h1>
      <form onSubmit={handleSubmit} className={`flex flex-col mx-auto mt-4`}>
        <label className="px-1">Name</label>
        <input type={`text`} name={`name`} className={inputClass} required />

        <label className="px-1">Email</label>
        <input type={`email`} name={`email`} className={inputClass} required />

        <label className="px-1">Message</label>
        <textarea name="message" className={inputClass} required></textarea>

        <button type="submit" className={`${shadow} mt-2 mx-auto w-full sm:w-5/6 md:w-2/3 lg:w-1/3 py-2 rounded-md bg-slate-800 text-white`}>
          Submit
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} closeOnClick draggable pauseOnHover theme="dark" />
    </div>
  );
}
