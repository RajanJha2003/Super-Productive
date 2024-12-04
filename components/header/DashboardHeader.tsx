import { getAuthSession } from '@/lib/auth';
import { cn } from '@/lib/utils';
import React from 'react'
import OpenSidebar from './OpenSidebar';
import Welcoming from '../common/Welcoming';

interface Props {
    addManualRoutes?: {
      name: string;
      href: string;
      useTranslate?: boolean;
      emoji?: string;
    }[];
    className?: string;
    children?: React.ReactNode;
    workspaceHref?: string;
    hideBreadCrumb?: boolean;
    showingSavingStatus?: boolean;
    showBackBtn?: boolean;
  }

const DashboardHeader = async({addManualRoutes,className,children,workspaceHref,hideBreadCrumb,showingSavingStatus,showBackBtn}:Props) => {
  const session=await getAuthSession();
  if(!session)  return null;

  
    return (
    <header className={cn("flex w-full justify-between items-center mb-4 py-2 gap-2",className)}>

        <div className='flex items-center gap-2'>
            <OpenSidebar />
            <Welcoming
          hideOnMobile
          hideOnDesktop
          username={session?.user.username!}
          name={session?.user.name}
          surname={session?.user.surname}
          showOnlyOnPath="/en/dashboard"
        />

        </div>


    </header>
  )
}

export default DashboardHeader