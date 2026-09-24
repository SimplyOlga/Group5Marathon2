import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    // try {
    //   const { token, user } = await login(email.trim(), password);
    //   navigate('/dashboard');
    // } catch (err) {
    //   setMessage(err.message || 'Invalid email or password.');
    // }
  }

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
                

              <form onSubmit={handleSubmit}>
                <h2 className='text-3xl text-center font-semibold mb-6'>Login</h2>
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

                {/* Error message */}
                {message && (
                  <p>
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  variant="primary"
                  className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                >
                  Login
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-gray-200" />

                  <span className="text-sm text-gray-500">or</span>

                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Sign up */}
                <Link to="/signup" className="block">
                  <button
                    className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                    type="button"
                    variant="secondary"
                  >
                    Sign up
                  </button>
                </Link>
              </form>
            
            </div>
         </div>
    </section>
  );
}

export default Login;