import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, limit, startAfter, getDocs } from 'firebase/firestore';
import { debounce } from 'lodash';
import { AuthContext } from '../context/AuthContext';
import SkillCard from '../components/SkillCard';

const BrowseSkills = () => {
  const { db } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [page, setPage] = useState(1);
  const [skills, setSkills] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      let q = collection(db, 'skills');
      if (searchTerm) {
        q = query(q, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
      }
      if (filterType !== 'all') {
        q = query(q, where('type', '==', filterType));
      }
      q = query(q, limit(10));
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const fetchedSkills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSkills(fetchedSkills);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setError(null);
    } catch (err) {
      setError('Failed to load skills');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [searchTerm, filterType, page]);

  const handleSearch = debounce((e) => {
    setSearchTerm(e.target.value);
    setPage(1);
    setLastDoc(null);
  }, 300);

  return (
    <div className="container py-8">
      <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
        <Link to="/" className="hover:text-accent">Home</Link>  Browse Skills
      </nav>
      <h1 className="text-3xl font-display text-dark mb-6">Find Skills to Swap</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search skills (e.g., Photoshop)"
          onChange={handleSearch}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
          aria-label="Search skills"
        />
        <select
          onChange={(e) => setFilterType(e.target.value)}
          className="p-3 border rounded-lg focus:ring-2 focus:ring-accent"
          aria-label="Filter by skill type"
        >
          <option value="all">All</option>
          <option value="offered">Offered</option>
          <option value="wanted">Wanted</option>
        </select>
      </div>
      {error && <p className="text-accent mb-4" role="alert">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:bg-gray-300 hover:bg-teal-600"
              aria-label="Previous page"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={skills.length < 10}
              className="px-4 py-2 bg-primary text-white rounded-lg disabled:bg-gray-300 hover:bg-teal-600"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseSkills;