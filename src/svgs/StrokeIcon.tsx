import React, { FC } from 'react';

const StrokeIcon: FC = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.333 16.05L16.57 3.812C17.0534 3.34936 17.6988 3.0944 18.3679 3.10172C19.037 3.10903 19.6767 3.37803 20.1499 3.85112C20.6231 4.32421 20.8923 4.96378 20.8998 5.63288C20.9073 6.30198 20.6525 6.94742 20.19 7.431L7.951 19.669C7.6718 19.9482 7.31619 20.1386 6.929 20.216L3 21.002L3.786 17.072C3.86345 16.6848 4.05378 16.3292 4.333 16.05V16.05Z" stroke="#0A38A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 6.5L17.5 9.5" stroke="#0A38A1" strokeWidth="2" />
    </svg>
  )
}

export default StrokeIcon;