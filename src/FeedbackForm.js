import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeedbackForm.css';

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/feedback');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !message) {
            alert('Name and message are required');
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/feedback', { name, email, message });
            setSuccessMessage(true);
            setName('');
            setEmail('');
            setMessage('');
            fetchFeedbacks();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <div className='main'>
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
            <hr />
            <div className="feedbacks">
                <h2>All Feedbacks</h2>
                <ul>
                    {feedbacks.map((feedback) => (
                        <li key={feedback.id}>
                            <p className='feedback-name'><strong>Name: </strong>{feedback.name}</p>
                            {feedback.email && <p className='feedback-email'><strong>Email: </strong>{feedback.email}</p>}
                            <p className='feedback-message'><strong>Message: </strong>{feedback.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default FeedbackForm;
