import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber ] = useState('');
  const [gender, setGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [ street, setStreet] = useState('');
  const [ city, setCity ] = useState('');
  const [ zipcode, setZipcode ] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();


    async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone_number: phoneNumber,
          gender,
          date_of_birth: dateOfBirth,
          address: { street, city, zipCode: zipcode },
        }),
        });
        const user = await response.json();

        if (!response.ok) {
        setError(user.error);
        return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        console.log("success");
        navigate("/");
    }

 

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={handleSubmit}>
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
                type='password'
                id='password'
                name='password'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Phone number
              </label>
              <input
                type='tel'
                id='phoneNumber'
                name='phoneNumber'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Phone  Number'
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

             <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Gender
              </label>
              <select
                id='gender'
                name='gender'
                className='border rounded w-full py-2 px-3'
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
                
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Date of Birth
              </label>
              <input
                type='date'
                id='dateOfBirth'
                name='dateOfBirth'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                City
              </label>
              <input
                type='city'
                id='city'
                name='city'
                className='border rounded w-full py-2 px-3'
                placeholder='City'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Street
              </label>
              <input
                type='street'
                id='street'
                name='street'
                className='border rounded w-full py-2 px-3'
                placeholder='Street'
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            
            
            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Zipcode
              </label>
              <input
                type='zipcode'
                id='zipcode'
                name='zipcode'
                className='border rounded w-full py-2 px-3'
                placeholder='Zipcode'
                required
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>


            
            {error && <p className='text-red-500 mb-4'>{error}</p>}

            <button
              type='submit'
              className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default SignUpPage;
