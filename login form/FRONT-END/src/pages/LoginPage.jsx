import { motion } from "framer-motion";
import Input from '../components/input';
import { User,Mail,Lock,Loader} from "lucide-react";
import { useState } from 'react';
import {Link} from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading=false  

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page
    console.log('Sign Up form submitted. Name:', name);
   
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" max-w-md w-full  bg-gray-700 bg-opacity-50 email rounded-2xl backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden p-8 mx-auto mt-10"
      >
        <h2 className="text-lg font-bold text-green-950 text-center mb-4">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          
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
          
          <Link to={'/forgot-password'} className="text-green-400 hover:underline mb-3">Forgot Password?</Link>
            <motion.button
              className="w-full m-3 p-3 rounded-lg font-bold bg-green-500 hover:bg-green-900  focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              type="submit"
              disabled={isLoading}>
               
             
              {isLoading?<Loader className="w-6 h-6 animate-spin mx-auto"/>:"Login"}
            </motion.button>
           
          
        </form>
        
       <div className="flex flex-col h-full"> {/* Parent container must have height */}
    <div className="flex px-8 py-4 bg-gray-900 bg-opacity-50 justify-center">
        <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to={'/signup'} className="text-green-400 hover:underline">Signup</Link>
        </p>
    </div>
</div>



      </motion.div>
    </>
  );
};

export default LoginPage;
