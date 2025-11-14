
import React from 'react';

type IconProps = {
  className?: string;
};

export const BrainCircuitIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5a3 3 0 1 0-5.993.129" />
    <path d="M12 5a3 3 0 1 0 5.993.129" />
    <path d="M12 19a3 3 0 1 0-5.993-.129" />
    <path d="M12 19a3 3 0 1 0 5.993-.129" />
    <path d="M12 12a3 3 0 1 0-5.993.129" />
    <path d="M12 12a3 3 0 1 0 5.993.129" />
    <path d="M12 5a3 3 0 1 0-5.993.129" />
    <path d="M12 5a3 3 0 1 0 5.993.129" />
    <path d="m14.5 10.5 3 1" />
    <path d="m9.5 13.5-3-1" />
    <path d="m14.5 13.5 3-1" />
    <path d="m9.5 10.5-3 1" />
    <path d="M6 12h12" />
    <path d="M6.5 8.5 9 7" />
    <path d="m17.5 15.5-2.5-1.5" />
    <path d="m6.5 15.5 2.5-1.5" />
    <path d="m17.5 8.5-2.5 1.5" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

export const BoltIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export const GlobeAltIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
  </svg>
);

export const ChartBarIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 100-13.5h9a9.75 9.75 0 100 13.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 12.75V15m-1.5-6.75V11.25m6-3.75h.008v.008H17.25V7.5zm-7.5 0h.008v.008H9.75V7.5z" />
  </svg>
);

export const AppleIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 384 512" fill="currentColor" {...props}>
    <path d="M318.7 268.7c-.2-36.7 35.4-64.6 35.4-64.6 3-4.2-2.3-10.4-6.9-10.4H284.8c-9.2 0-17.6 5.8-21.3 14.7-3.8 8.8-13.3 27-24.3 27-11 0-20.4-18.2-24.3-27-3.8-8.8-12.1-14.7-21.3-14.7H136.9c-4.7 0-10 6.2-7 10.4 0 0 35.3 27.9 35.3 64.6 0 36.7-31.4 55.2-31.4 55.2-4.5 3.3-3.3 10.1 1.2 11.8 13.5 5.1 27 10.1 41.2 10.1 14.1 0 27.6-5 41.1-10.1 4.6-1.7 5.7-8.5 1.2-11.8.1 0-31.3-18.5-31.3-55.2zM192 48C103.6 48 32 122.9 32 216c0 55.7 28.5 104.5 72.3 136.4-6.2 38.2 3.1 76.5 25.4 104.4 4.5 5.8 13.4 5.8 18 0 22.3-27.9 31.6-66.2 25.4-104.4C223.5 424.5 252 375.7 252 320c0-93.1-71.6-168-160-168z" />
  </svg>
);

export const GooglePlayIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0L11 27.3v457.4L47 512l220.5-127.6-60.1-60.1L47 0zm322.5 234.3l34.8-19.8-21-36.8-34.8 19.8zM432 256l-34.8 19.8 21 36.8 34.8-19.8z" />
  </svg>
);
