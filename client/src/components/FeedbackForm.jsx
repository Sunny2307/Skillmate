import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { validateInput } from '../utils/validateInput';

const FeedbackForm = () => {
  const { swapId } = useParams();
  const { user, db } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput({ rating, comment })) {
      setError('Please provide a rating and comment');
      return;
    }
    try {
      await setDoc(doc(db, 'feedback', `${swapId}_${user.uid}`), {
        swapId,
        reviewerId: user.uid,
        rating,
        comment,
        createdAt: new Date(),
      });
      alert('Feedback submitted!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-8">
      <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
        <Link to="/" className="hover:text-accent">Home</Link> <Link to="/swaps" className="hover:text-accent">Swaps</Link>  Feedback
      </nav>
      <h1 className="text-3xl font-display text-dark mb-6">Leave Feedback</h1>
      <div className="card p-6 max-w-md mx-auto">
        {error && <p className="text-accent mb-4" role="alert">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${rating >= star ? 'text-accent' : 'text-gray-300'}`}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={500}
            placeholder="Your feedback..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
            aria-label="Feedback comment"
          />
          <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;