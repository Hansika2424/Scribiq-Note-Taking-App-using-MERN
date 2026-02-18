import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import axios from "axios";
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log("Notes from DB:", res.data);
        setNotes(res.data);
        setIsRateLimited(false);
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching Notes", error);
        if(error.response.status == 429) {
          setIsRateLimited(true);          
        }else{
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {notes.length === 0 && !loading && !isRateLimited && (
          <div className='text-center py-20'>
            <h1 className='text-base-content/60 font-semibold text-lg'>
              Want to write something you have in mind? Click the <span className='text-primary font-semibold'>"New Note"</span> button!
            </h1>
          </div>
        )}
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HomePage;
