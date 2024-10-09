import { motion } from "framer-motion";
import Input from '../components/input';
import { User,Mail,Lock } from "lucide-react";
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { PasswordCriteria, PasswordStrengthMeter } from "../components/PasswordStrengthMeter";

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page
    console.log('Sign Up form submitted. Name:', name);
    // Add any additional sign-up logic here
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" max-w-md w-full  bg-gray-700 bg-opacity-50 email rounded-2xl overflow-hidden p-8 mx-auto mt-10"
      >
        <h2 className="text-lg font-bold text-green-950 text-center mb-4">
          Create Account
        </h2>
        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
            <PasswordStrengthMeter password={password}/>
            {/* <PasswordCriteria /> */}
            <motion.button
              className="w-full p-3  rounded-lg font-bold bg-green-500 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit">
               
              Sign Up
            </motion.button>
           
          
        </form>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={'/login'} className="text-green-400 hover-underline">login</Link>
          </p>
          
        </div>
      </motion.div>
    </>
  );
};

export default SignUpPage;
