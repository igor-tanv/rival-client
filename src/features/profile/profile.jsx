import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Contracts from './match-history';
import Rating from './rating';

import Button from '../../ui/button';

import './styles.css';

function filterAcceptedOrCompletedMatches(contracts) {
  return contracts.filter(
    (c) => c.status === 'accepted' || c.status === 'completed'
  );
}

function Profile({
  history,
  _id,
  avatar,
  lastName,
  firstName,
  wins,
  losses,
  draws,
  school,
  gi,
  nogi,
  weightClass,
  qualityRating,
  contracts,
  isAdmin
}) {
  const showedContracts = filterAcceptedOrCompletedMatches(contracts);
  return (
    <>
      <div className="profile-wrapper">
        <div className="main-info">
          <div className="detail-info">
            <div className="profile-title">{`${firstName} ${lastName}`}</div>
            <div className="info-weight">
            <Link to="/rules/#rules" >
              <span>{weightClass}</span>
            </Link>
            </div>
          </div>
        </div>
        <div className="record-wrapper">
          <div className="record-info">
            <div className="section-info">
              <div className="type">Win:</div>
              <div className="value">{wins}</div>
            </div>
            <div className="section-info">
              <div className="type">Loss:</div>
              <div className="value">{losses}</div>
            </div>
            <div className="section-info">
              <div className="type">Draw:</div>
              <div className="value">{draws}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="evaluate-wrapper">
        <img
          src={avatar ? avatar : '/assets/images/default.png'}
          alt="..."
          className="profile-avatar"
        />
        <div className="evaluate-info">
          <Rating value={qualityRating} className="evaluate-stars" />
          <div className="evaluate-detail">
            <div className="info-school">
              <div className="school">Team:</div>
              <div className="school-name text-truncation">{school}</div>
            </div>
            <div className="info-rank">
              <div className="rank-type">Nogi Rank:</div>
              <div className="rank-score">{nogi}</div>
            </div>
            <div className="info-rank">
              <div className="rank-type">Gi Rank:</div>
              <div className="rank-score">{gi}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="history-wrapper">
        <div className="history-title">Match history</div>
        {
          showedContracts.length > 0 ? (
            <Contracts playerId={_id} contracts={showedContracts} />
          ) : (
              <div className="no-info">This fighter has not fought yet</div>
            )
        }
      </div>
      <div className="action-wrapper">
        {localStorage.getItem('playerId') !== _id && (
          <>
            <Button
              className="action"
              onClick={() => history.push(`/chat/${_id}`)}
              isSecondary={true}
            >
              Chat
            </Button>
            <Button
              className="action"
              onClick={() => history.push(`/contracts/new/${_id}`)}
            >
              Issue Challenge
            </Button>
          </>
        )}
        {localStorage.getItem('playerId') === _id && (
          <>
            {isAdmin ?
              <Button
                className="action"
                onClick={() => history.push(`/admin`)}
                isSecondary={true}
              >Admin
            </Button> : null}
            <Button
              className="action"
              onClick={() => history.push(`/contracts`)}
              isSecondary={true}
            >
              My Contracts
            </Button>
            <Button
              className="action"
              onClick={() => history.push(`/profile/edit`)}
            >
              Update My Profile
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default withRouter(Profile);
