import React, { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

interface ValidationState {
  name: boolean;
  email: boolean;
  message: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    message: ''
  });

  const [validationState, setValidationState] = useState<ValidationState>({
    name: false,
    email: false,
    message: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validateName = (name: string): { isValid: boolean; error: string } => {
    if (name.length === 0) {
      return { isValid: false, error: '' };
    }
    if (name.length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters long' };
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return { isValid: false, error: 'Name can only contain letters and spaces' };
    }
    return { isValid: true, error: '' };
  };

  const validateEmail = (email: string): { isValid: boolean; error: string } => {
    if (email.length === 0) {
      return { isValid: false, error: '' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
    return { isValid: true, error: '' };
  };

  const validateMessage = (message: string): { isValid: boolean; error: string } => {
    if (message.length === 0) {
      return { isValid: false, error: '' };
    }
    if (message.length < 10) {
      return { isValid: false, error: 'Message must be at least 10 characters long' };
    }
    return { isValid: true, error: '' };
  };

  // Real-time validation
  useEffect(() => {
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const messageValidation = validateMessage(formData.message);

    setErrors({
      name: nameValidation.error,
      email: emailValidation.error,
      message: messageValidation.error
    });

    setValidationState({
      name: nameValidation.isValid,
      email: emailValidation.isValid,
      message: messageValidation.isValid
    });
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allValid = validationState.name && validationState.email && validationState.message;
    
    if (!allValid) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const getInputClassName = (field: keyof FormData) => {
    const baseClasses = "w-full px-4 py-3 pl-12 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
    
    if (formData[field].length === 0) {
      return `${baseClasses} border-gray-300 hover:border-gray-400 focus:border-blue-500`;
    }
    
    if (validationState[field]) {
      return `${baseClasses} border-green-500 bg-green-50 focus:border-green-500`;
    } else {
      return `${baseClasses} border-red-500 bg-red-50 focus:border-red-500`;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-100">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          <div className="animate-pulse text-sm text-gray-500">
            Redirecting back to form...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Get In Touch</h1>
          <p className="text-gray-600">We'd love to hear from you. Send us a message!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className={getInputClassName('name')}
              />
              {validationState.name && formData.name.length > 0 && (
                <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" />
              )}
            </div>
            {errors.name && (
              <div className="flex items-center space-x-2 text-red-600 text-sm animate-fadeIn">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className={getInputClassName('email')}
              />
              {validationState.email && formData.email.length > 0 && (
                <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" />
              )}
            </div>
            {errors.email && (
              <div className="flex items-center space-x-2 text-red-600 text-sm animate-fadeIn">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
              Message *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us what's on your mind..."
                rows={5}
                className={`${getInputClassName('message')} resize-none`}
              />
              {validationState.message && formData.message.length > 0 && (
                <CheckCircle className="absolute right-4 top-4 w-5 h-5 text-green-600" />
              )}
            </div>
            {errors.message && (
              <div className="flex items-center space-x-2 text-red-600 text-sm animate-fadeIn">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.message}</span>
              </div>
            )}
            <div className="text-right text-sm text-gray-500">
              {formData.message.length}/10 minimum characters
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!validationState.name || !validationState.email || !validationState.message || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-purple-600 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending Message...</span>
              </div>
            ) : (
              'Send Message'
            )}
          </button>
        </form>

        {/* Form Status */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
}

export default App;