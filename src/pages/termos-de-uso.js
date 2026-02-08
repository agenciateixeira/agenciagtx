import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function TermosDeUso() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/politica-privacidade#termos');
  }, [router]);

  return null;
}