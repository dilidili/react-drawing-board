import React, { FC } from 'react';

const UndoIcon: FC = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.34311 17.6569C7.08515 18.4009 7.96692 18.9909 8.93772 19.393C9.90852 19.7951 10.9492 20.0014 12 20C16.4182 20 20 16.4182 20 12C20 7.58178 16.4182 4 12 4C9.79111 4 7.79111 4.89556 6.34311 6.34311C5.60622 7.08 4 8.88889 4 8.88889" stroke="#0A38A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 5.33594V8.89149H7.55556" stroke="#0A38A1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default UndoIcon;