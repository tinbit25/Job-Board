import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    // Handle changes in the input fields
    const handleChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to the next input field if the current field is filled
        if (value && index < code.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle key down events for navigation and backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Auto-submit when all fields are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(); // Automatically submit if all fields are filled
        }
    }, [code]);

    // Handle form submission
    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        console.log("Code entered:", code.join(''));
        // You can navigate to another page or perform verification logic here
        // navigate('/next-page'); // Uncomment and update with your route
    };

    return (
        <div className='max-w-md w-full bg-gray-700 bg-opacity-50 email rounded-2xl backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden p-8 mx-auto mt-10'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-gray-700 bg-opacity-50 email rounded-2xl backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden p-8 mx-auto mt-10"
            >
                <h2 className="text-lg font-bold text-green-950 text-center mb-4">
                    Verify Your Email
                </h2>
                <p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address</p>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(eL) => (inputRefs.current[index] = eL)}
                                type="text"
                                maxLength='1'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-12 h-12 m-1 text-center font-bold bg-gray-800 rounded-lg focus:border-green-500 focus:ring-green-500 text-white transition duration-200'
                            />
                        ))}
                    </div>
                    <button type="submit" className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg'>
                        Verify Code
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default EmailVerificationPage;
