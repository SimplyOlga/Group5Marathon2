import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpPage = ({ signupSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password
    };

    signupSubmit(newUser);

    toast.success('user Added Successfully');

    return navigate('/');
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Sign Up</h2>

            

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Email
              </label>
              <input
                type='email'
                id='contact_email'
                name='contact_email'
                className='border rounded w-full py-2 px-3'
                placeholder='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Password
              </label>
              <input
                type='text'
                id='password'
                name='password'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            
            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default SignUpPage;
