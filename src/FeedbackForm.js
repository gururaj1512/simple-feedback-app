import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name && message) {
            const feedback = { name, email, message };
            try {
                const response = await fetch('http://localhost:8080/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(feedback),
                });
                if (response.ok) {
                    setSuccessMessage('Thank you for your feedback!');
                    setName('');
                    setEmail('');
                    setMessage('');
                }
            } catch (error) {
                console.error('Error submitting feedback:', error);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div className="feedback-form">
            <div className="container">
                <div className="screen">
                    <div className="screen-header">
                        <div className="screen-header-left">
                            <div className="screen-header-button close"></div>
                            <div className="screen-header-button maximize"></div>
                            <div className="screen-header-button minimize"></div>
                        </div>
                        <div className="screen-header-right">
                            <div className="screen-header-ellipsis"></div>
                            <div className="screen-header-ellipsis"></div>
                            <div className="screen-header-ellipsis"></div>
                        </div>
                    </div>
                    <div className="flex-body">
                        <div className="screen-body">
                            <div className="screen-body-item left">
                                <div className="app-title">
                                    <span>FEEDBACK</span>
                                    <span>FORM</span>
                                </div>
                                <div className="app-contact">EMAIL ID : gururajgurram1512@gmail.com</div>
                            </div>
                            <div className="screen-body-item">
                                <form onSubmit={handleSubmit}>
                                    <div className="app-form">
                                        <div className="app-form-group">
                                            <input
                                                placeholder='Name (required):'
                                                className='app-form-control'
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="app-form-group">
                                            <input
                                                placeholder='Email (optional):'
                                                className='app-form-control'
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="app-form-group">
                                            <textarea
                                                placeholder='MESSAGE (required):'
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                                rows={5}
                                            ></textarea>
                                        </div>
                                        <div className="app-form-group buttons">
                                            <button className='app-form-button' type="submit">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="success-message">
                            {successMessage ? <p className="success-message-sent">{successMessage}</p> : <p className="success-message-unsent">Enter the feedback details..</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FeedbackForm;
