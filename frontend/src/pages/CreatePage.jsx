import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { api } from '../lib/axios.js';
import { ArrowLeftIcon } from 'lucide-react';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill all the fields properly.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/notes', { title, content });
      toast.success('Note created successfully.');
      navigate('/');
    } catch (error) {
      console.log('Error creating note.', error);

      if (error.status.response === 429) {
        toast.error('Slow down, you are creating notes too fast!', {
          duration: 4000,
          icon: '✋',
        });
      } else {
        toast.error('Failed to create note.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className=''>
        <div className='container mx-auto px4 py-8'>
          <div className='max-w-2xl mx-auto'>
            {/* back button */}
            <Link to={'/'} className='btn btn-ghost mb-6'>
              <ArrowLeftIcon className='size-5' />
              Back to Notes
            </Link>

            <div className='card bg-base-100'>
              <div className='card-body'>
                <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                <form onSubmit={handleSubmit}>
                  {/* fieldset is the new replacement for the form-control in daisyui */}
                  {/* form-control for title */}
                  <fieldset className='fieldset mb-4'>
                    <legend className='fieldset-legend'>Title</legend>
                    <input
                      type='text'
                      placeholder='Note Title'
                      className='input'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </fieldset>

                  {/* form-control for content */}
                  <fieldset className='fieldset mb-4'>
                    <legend className='fieldset-legend'>Content</legend>
                    <textarea
                      type='text'
                      placeholder='Write your note here ...'
                      className='textarea h-32'
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </fieldset>

                  {/* submit button */}
                  <div className='card-actions justify-end'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Create Note'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
