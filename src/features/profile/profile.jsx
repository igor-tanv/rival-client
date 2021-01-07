import React from "react";
import { withRouter } from "react-router-dom";

import Contracts from "./contracts";
import Rating from "./rating";

import Button from "../../ui/button";

import "./styles.css";

function filterAcceptedOrCompletedMatches(contracts) {
  return contracts.filter(
    (c) => c.status === "accepted" || c.status === "completed"
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
    <div>
      <div className="flex flex-col items-center justify-center w-full">
        <img
          className="item-avatar"
          src={
            avatar
              ? avatar
              : `${process.env.PUBLIC_URL}/assets/images/default.png`
          }
          alt=""
        />
        <div>
          quality rating <Rating value={qualityRating} />
        </div>
      </div>

      <div>
        Name: {firstName} {lastName}
      </div>
      <div>
        Fight Record (W/L/D): {wins}/{losses}/{draws}
      </div>
      <div>School: {school}</div>
      <div>Gi Rank: {gi}</div>
      <div>No Gi Rank: {nogi}</div>
      <div>Weight: {weightClass}</div>

      <div>
        {localStorage.getItem("playerId") !== _id && (
          <ul className="horizontal-list">
            <li>
              <Button onClick={() => history.push(`/contracts/new/${_id}`)}>
                Issue Challenge
              </Button>
            </li>
            <li>
              <Button onClick={() => history.push(`/chat/${_id}`)}>Chat</Button>
            </li>
          </ul>
        )}
        {localStorage.getItem("playerId") === _id && (
          <ul className="horizontal-list">
            {isAdmin ? <li>
              <Button onClick={() => history.push(`/admin`)}>Admin</Button>
            </li> : null}
            <li>
              <Button onClick={() => history.push(`/contracts`)}>
                My Contracts
              </Button>
            </li>
            <li>
              <Button onClick={() => history.push(`/profile/edit`)}>
                Update My Profile
              </Button>
            </li>
          </ul>
        )}

        <h3>Match history</h3>
        {showedContracts.length > 0 ? (
          <Contracts playerId={_id} contracts={showedContracts} />
        ) : (
            "This fighter has not fought yet"
          )}
      </div>
    </div>
  );
}

export default withRouter(Profile);
