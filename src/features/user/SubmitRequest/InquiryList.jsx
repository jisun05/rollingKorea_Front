import React, { useState, useEffect } from 'react';
import { Table, Pagination, Modal } from 'react-bootstrap';

export default function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // TODO: change to calling API  
    setInquiries([
      { id: 2, type: 'Incorrect', subject: 'Wrong information', date: '2025-07-01', status: 'Unanswered', description: '지도에 날짜 정보가 잘못 표시되어 있어요.', response: '' },
      { id: 1, type: 'Complaint', subject: 'you have to fix it1', date: '2025-01-01', status: 'Completed', description: '첫 페이지 로딩 속도가 너무 느립니다.', response: '최적화 완료했습니다. 확인 부탁드립니다.' },
    ]);
  }, []);

  const totalPages = Math.ceil(inquiries.length / itemsPerPage);
  const paged = inquiries
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const openDetail = (inq) => {
    setSelected(inq);
    setShowModal(true);
  };

  return (
    <>
      <h5>Your Inquiry History</h5>
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ width: 60 }}>NO</th>
            <th>Type</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((inq) => (
            <tr key={inq.id} style={{ cursor: 'pointer' }} onClick={() => openDetail(inq)}>
              <td>{inq.id}</td>
              <td>{inq.type}</td>
              <td>{inq.subject}</td>
              <td>{inq.date}</td>
              <td>{inq.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => setPage(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Inquiry Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <p><strong>Subject:</strong> {selected.subject}</p>
              <p><strong>Type:</strong> {selected.type}</p>
              <p><strong>Description:</strong> {selected.description}</p>
              <hr />
              <p><strong>Status:</strong> {selected.status}</p>
              <p><strong>Response:</strong> {selected.response || '— 아직 답변이 없습니다.'}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}