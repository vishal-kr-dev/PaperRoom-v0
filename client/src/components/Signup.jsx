import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const username = watch("username");

  const onSubmit = async (data) => {
    console.log(data);
    // Handle form submission
    try{
        const response = await axios.post('http://localhost:3000/signup', data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(isSubmitting);
        console.log(response.data);
        console.log("register object", register);
    }catch(error){
        console.log("Error while sending data", error);
        if(error.response && error.response.status === 409)
          setUsernameError("UserName already exist");
    }
  };
  React.useEffect(()=>{
    if(username){
      setUsernameError('');
    }
  }, [username]);
 
  const password = watch("password");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <div className="w-full max-w-md bg-white p-8">
        <h2 className="text-4xl font-extrabold mb-6 text-center">Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none "
              placeholder="Name"
            />
            {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              id="username"
              type="text"
              {...register("username", 
                { required: "Username is required",
                    validate: {
                        lowercase: value => /^[a-z0-9]+$/.test(value) || "Username must be lowercase without spaces and special characters",
                      }
                 },
                
            )}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none "
              placeholder="Username"
            />
            {errors.username && <p className="text-xs text-red-600">{errors.username.message}</p>}
            {<p className="text-xs text-red-600">{usernameError} </p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="year" className="sr-only">Year</label>
            <select
              id="year"
              {...register("year", { required: "Year is required" })}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none bg-white text-gray-500"
            >
              <option value="">Select Year</option>
              <option  value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
            {errors.year && <p className="text-xs text-red-600">{errors.year.message}</p>}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
                })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                placeholder="Password"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-600">{errors.password.message }</p>}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "The passwords do not match"
                })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
                placeholder="Confirm Password"
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white ${isSubmitting ? 'bg-gray-600 hover:bg-gray-700' : 'bg-black hover:bg-gray-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
            >
              {isSubmitting ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;