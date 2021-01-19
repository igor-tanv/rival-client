import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

import Button from '../../ui/button';
import DateTimePicker from '../../ui/date-time-picker';
import HoriztonalList from '../../ui/horizontal-list';
import ContractTable from '../../ui/table';
import matchTypes from '../../data/match-types.json';

import { apiFetch } from '../../modules/api-fetch';

import PDFContract from './pdf-contract';

import './styles.css';

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const filters = [
    "Sent",
    "Received",
    "Declined",
    "Accepted",
    "Cancelled",
  ];
  const [filter, setFilter] = useState(filters[0]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    apiFetch(`contracts?playerId=${localStorage.getItem('playerId')}`).then(
      (json) => {
        setContracts(json.contracts);
      }
    );
  }, []);

  function accept() {
    apiFetch(`contracts/${selectedContract.id}/accept`, 'post').then((json) => {
      updateContractStatus(json.contract.status);
    });
  }

  function decline() {
    apiFetch(`contracts/${selectedContract.id}/decline`, 'post').then(
      (json) => {
        updateContractStatus(json.contract.status);
      }
    );
  }

  function cancel() {
    apiFetch(`contracts/${selectedContract.id}/cancel`, 'post', {
      playerId: localStorage.getItem('playerId'),
    }).then((json) => {
      updateContractStatus(json.contract.status);
    });
  }

  function updateContractStatus(status) {
    setContracts((prev) =>
      prev.map((contract) =>
        contract.id === selectedContract.id
          ? {
            ...contract,
            status: status,
          }
          : contract
      )
    );
    setSelectedContract(null);
    setOpenDetails(false);
  }

  function filterBy(contracts) {
    return contracts.filter((contract) => {
      if (
        filter === 'Sent' &&
        localStorage.getItem('playerId') === contract.playerId &&
        contract.status === 'sent'
      )
        return contract;
      if (
        filter === 'Received' &&
        localStorage.getItem('playerId') !== contract.playerId &&
        contract.status === 'sent'
      )
        return contract;
      if (filter === 'Declined' && contract.status === 'declined')
        return contract;
      if (filter === 'Accepted' && contract.status === 'accepted')
        return contract;
      if (filter === 'Cancelled' && contract.status === 'cancelled')
        return contract;
    });
  }

  const saveAsPdf = () => {
    const doc = new jsPDF();
    const contractDetail = window.document.getElementById('contract-jumbotron');
    doc.html(contractDetail, {
      callback: function (doc) {
        doc.save('contract-detail');
      },
      html2canvas: {
        scale: 0.19,
      },
      x: 10,
      y: 10,
    });
  };

  function fullName(firstName, lastName) {
    return firstName + ' ' + lastName;
  }

  const renderResultClass = (result) => {
    switch (result) {
      case 'pending':
      case 'win':
        return 'result-win';
      case 'loss':
        return 'result-loss';
      case 'draw':
        return 'result-draw';
      default:
        return '';
    }
  };

  return (
    <div className="my-contract-container">
      <h1>My contracts</h1>

      <HoriztonalList
        items={filters}
        renderItem={(item) => (
          <span
            className={filter === item && 'active'}
            onClick={() => setFilter(item)}
          >
            {item}
          </span>
        )}
      />

      <ContractTable
        data={filterBy(contracts)}
        renderHead={() => {
          return (
            <tr>
              <td>
                <div className="col-head result-head">Result</div>
              </td>
              <td>
                <div className="col-head">Match type</div>
              </td>
              <td>
                <div className="col-head">Opponent</div>
              </td>
              <td>
                <div className="col-head">Method</div>
              </td>
              <td></td>
            </tr>
          );
        }}
        renderItem={(contract) => {
          return (
            <tr>
              <td>
                {
                  <div
                    className={`result-win margin-auto ${renderResultClass(
                      contract.result
                    )}`}
                  >
                    {contract.result}
                  </div>
                }
              </td>
              <td>
                <div className="single-row text-truncation-second-line">
                  {matchTypes[contract.type]}
                </div>
              </td>
              <td>
                <div className="row-container">
                  <div className="first-row text-truncation-second-line">
                    {localStorage.getItem('playerId') === contract.playerId
                      ? fullName(
                        contract.opponentFirstName,
                        contract.opponentLastName
                      )
                      : fullName(
                        contract.playerFirstName,
                        contract.playerLastName
                      )}
                  </div>
                </div>
              </td>
              <td>
                <div className="single-row text-truncation-second-line">
                  {contract.method}
                </div>
              </td>
              <td>
                <div className="single-row text-truncation-second-line">
                  {(filter === 'Received' || filter === 'Accepted') && (
                    <a
                      onClick={() => {
                        setSelectedContract(contract);
                        setOpenDetails(true);
                      }}
                    >
                      See details
                    </a>
                  )}
                </div>
              </td>
            </tr>
          );
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '1rem',
          width: '60%',
          zIndex: 100,
          borderRadius: '0.25rem',
          backgroundColor: 'white',
          display: openDetails ? 'block' : 'none',
          border: '1px solid black',
          padding: '2rem',
        }}
      >
        <div id="contract-detail">
          {selectedContract && selectedContract.playerFirstName} vs.{' '}
          {selectedContract && selectedContract.opponentFirstName}
          <p>Where: {selectedContract && selectedContract.location}</p>
          <p style={{ display: 'flex' }}>
            When:{' '}
            <span>
              {selectedContract && selectedContract.startsAt ? (
                <DateTimePicker
                  className="date-picker"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  selected={selectedContract.startsAt * 1000}
                  readOnly
                />
              ) : null}
            </span>
          </p>
          <p>Type: {selectedContract && selectedContract.type}</p>
          <p>Weightclass: {selectedContract && selectedContract.weightClass}</p>
          <p>
            Rule Exceptions:{' '}
            {selectedContract && selectedContract.ruleExceptions}
          </p>
          <p>Referee: {selectedContract && selectedContract.refereeName}</p>
        </div>

        {filter === 'Accepted' ? (
          <div>
            <Button type="primary" onClick={cancel}>
              Cancel Match
            </Button>
            <button onClick={saveAsPdf}>Print PDF</button>
            <button onClick={() => setOpenDetails(false)}>Close</button>
          </div>
        ) : (
            <div>
              <Button type="primary" onClick={accept}>
                Accept
            </Button>
              <Button type="secondary" onClick={decline}>
                Decline
            </Button>
              <button onClick={() => setOpenDetails(false)}>Close</button>
            </div>
          )}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: openDetails ? 'block' : 'none',
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 99,
        }}
      />
      {selectedContract ? (
        <PDFContract selectedContract={selectedContract} />
      ) : null}
    </div>
  );
}
