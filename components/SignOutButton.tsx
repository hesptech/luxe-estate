'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button 
      onClick={handleSignOut}
      className="ml-4 text-sm font-medium text-nordic-dark hover:text-red-600 transition-colors"
    >
      Sign out
    </button>
  );
}
