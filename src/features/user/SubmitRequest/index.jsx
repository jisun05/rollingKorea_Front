import React from 'react';
import InquiryList from './InquiryList';
import RequestForm from './RequestForm';

export default function SubmitRequest() {
  return (
    <div className="d-flex">
      <div className="flex-fill pe-3"><InquiryList /></div>
      <div className="flex-fill ps-3"><RequestForm /></div>
    </div>
  );
}