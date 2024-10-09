import React from 'react';

// PasswordCriteria Component
const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "At least 1 uppercase letter", met: /[A-Z]/.test(password) },
        { label: "At least 1 lowercase letter", met: /[a-z]/.test(password) },
        { label: "At least 1 number", met: /[0-9]/.test(password) },
        { label: "At least 1 special character (e.g., @, #, $, etc.)", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];

    return (
        <div className="mt-4">
            {criteria.map((item, index) => (
                <div key={index} className='flex items-center text-xs'>
                    {item.met ? (
                        <span className="text-green-600">✓</span>
                    ) : (
                        <span className="text-gray-400">✗</span>
                    )}
                    <span className={`ml-2 ${item.met ? 'text-green-600' : 'text-gray-400'}`}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

// PasswordStrengthMeter Component
const PasswordStrengthMeter = ({ password }) => {
    // Function to calculate password strength
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[a-z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;

        return strength;
    };

    const strength = getStrength(password);

    const getStrengthText = (strength) => {
        if (strength === 5) return "Very Strong";
        else if (strength === 4) return "Strong";
        else if (strength === 3) return "Moderate";
        else if (strength === 2) return "Weak";
        return "Very Weak"; // Default case
    };

    const getColor = (strength) => {
        if (strength === 0) return "bg-red-600";
        else if (strength === 1) return "bg-red-400";
        else if (strength === 2) return "bg-orange-400";
        else if (strength === 3) return "bg-yellow-400";
        else if (strength === 4) return "bg-green-400";
        return "bg-green-600"; // For strength 5
    };

    return (
        <div className="border p-4 rounded mt-4">
            <div className='flex justify-between items-center'>
                <span className='text-xs text-gray-400'>Password Strength:</span>
                <span className='text-xs text-gray-700'>{getStrengthText(strength)}</span>
            </div>

            <div className='flex space-x-1'>
                {[...Array(5)].map((_, index) => ( // Adjusted to 5 for full strength
                    <div
                        key={index}
                        className={`h-1 w-1/5 rounded-full transition-colors duration-300 ${strength > index ? getColor(strength) : 'bg-gray-300'}`}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    );
};

export { PasswordCriteria, PasswordStrengthMeter };