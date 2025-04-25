import { useEffect, useState, ComponentType } from 'react';
import { useRouter } from 'next/router';
import { hasToken } from '@/utils/auth';
import { NextPage } from 'next';


export default function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
): NextPage<P> {

  const WithAuth: NextPage<P> = (props: P) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

      if (!hasToken()) {
        router.replace('/sign-in');
      } else {
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  if (WrappedComponent.displayName) {
    WithAuth.displayName = `WithAuth(${WrappedComponent.displayName})`;
  }

  return WithAuth;
}