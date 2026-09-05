import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { api } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

export default function NoteDetailPage() {
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await api.get(`notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log('Error in fetchNote', error);
        toast.error('Failed to fetch the note.');
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm('Are your sure you want to delete this note?')) return;

    try {
      await api.delete(`notes/${id}`);
      toast.success('Note deleted successfully.');
      navigate('/');
    } catch (error) {
      console.log('Error in handleDelete.', error);
      toast.error('Failed to delete the note.');
    }
  }

  async function handleSave() {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Please fill all the fields properly.');
      return;
    }

    setSaving(true);

    try {
      await api.put(`notes/${note._id}`, note);
      toast.success('Note updated successfully.');
      navigate('/');
    } catch (error) {
      console.log('Error in handleSave.', error);
      toast.error('Failed to update the note.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex justify-center items-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            {/* back button */}
            <Link to={'/'} className='btn btn-ghost'>
              <ArrowLeftIcon className='size-5' />
              Back to Notes
            </Link>

            {/* delete button */}
            <button
              onClick={handleDelete}
              className='btn btn-error btn-outline'
            >
              <Trash2Icon className='size-5' />
              Delete Note
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
              {/* fieldset is the new replacement for the form-control in daisyui */}
              {/* form-control for title */}
              <fieldset className='fieldset mb-4'>
                <legend className='fieldset-legend'>Title</legend>
                <input
                  type='text'
                  placeholder='Note Title'
                  className='input'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </fieldset>

              {/* form-control for content */}
              <fieldset className='fieldset mb-4'>
                <legend className='fieldset-legend'>Content</legend>
                <textarea
                  type='text'
                  placeholder='Write your note here...'
                  className='textarea h-32'
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </fieldset>

              {/* submit button */}
              <div className='card-actions justify-end'>
                <button
                  className='btn btn-primary'
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
