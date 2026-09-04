import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';

export default function NavBar() {
  return (
    <header className='sticky top-0 z-50 bg-base-300 border-b border-base-content/10'>
      <div className='max-w-6xl mx-auto p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
            Journie🪶
            <span className='block text-sm text-base-content/55'>
              It stays here, free your mind.
            </span>
          </h1>

          <div className='flex items-center gap-4'>
            <Link to={'/create'} className='btn btn-primary'>
              <PlusIcon className='size-5' />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
