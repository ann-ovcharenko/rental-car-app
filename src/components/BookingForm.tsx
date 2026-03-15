'use client';

import React from 'react';
import toast from 'react-hot-toast';

interface BookingFormProps {
  carId: string | number;
}

export const BookingForm = ({ carId }: BookingFormProps) => {
  
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = {
      carId,
      name: formData.get('name'),
      email: formData.get('email'),
      date: formData.get('date'),
      comment: formData.get('comment'),
    };

    console.log('Booking Data:', data);

    toast.success('Rental successful! We will contact you soon.', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#3470FF',
        color: '#fff',
        borderRadius: '12px',
        fontSize: '16px',
      },
    });
    
    e.currentTarget.reset();
  };

  return (
    <div className="bg-white flex flex-col font-manrope shadow-sm p-8 border border-[#dadde1] rounded-[10px]">
      <h2 className="text-2xl font-semibold mb-2 text-[#121417]">Book your car now</h2>
      <p className="text-sm text-[rgba(18,20,23,0.5)] mb-10">
        Stay connected! We are always ready to help you.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
        <input 
          required 
          name="name"
          type="text"
          placeholder="Name*" 
          className="p-4 rounded-xl bg-[#F7F7FB] border-none outline-none focus:ring-1 ring-[#3470FF] placeholder:text-[rgba(18,20,23,0.3)] text-sm transition-all" 
        />
        <input 
          required 
          name="email"
          type="email" 
          placeholder="Email*" 
          className="p-4 rounded-xl bg-[#F7F7FB] border-none outline-none focus:ring-1 ring-[#3470FF] placeholder:text-[rgba(18,20,23,0.3)] text-sm transition-all" 
        />
        <input 
          required 
          name="date"
          type="date" 
          placeholder="Booking date" 
          className="p-4 rounded-xl bg-[#F7F7FB] border-none outline-none focus:ring-1 ring-[#3470FF] text-[rgba(18,20,23,0.5)] text-sm transition-all cursor-pointer" 
        />
        <textarea 
          name="comment"
          placeholder="Comment" 
          className="p-4 rounded-xl bg-[#F7F7FB] border-none h-[120px] resize-none outline-none focus:ring-1 ring-[#3470FF] placeholder:text-[rgba(18,20,23,0.3)] text-sm transition-all" 
        />
        
        <div className="flex justify-center mt-auto pt-4">
          <button 
            type="submit" 
            className="w-[160px] py-4 bg-[#3470FF] text-white font-semibold rounded-xl hover:bg-[#0B44ED] transition-all active:scale-95 text-sm cursor-pointer shadow-md"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};