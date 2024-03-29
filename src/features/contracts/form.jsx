import React from 'react';
import moment from 'moment';

import ContractNote from './notes/contract-note';
import GiNote from './notes/gi-note';
import NoGiNote from './notes/nogi-note';

import DateTimePicker from '../../ui/date-time-picker';
import Dropdown from '../../ui/dropdown';
import TextField from '../../ui/text-field';
import TextArea from '../../ui/text-area';
import Button from '../../ui/button';
import { toValueLabel } from '../../modules/object';

export default function Form({
  opponent,
  handleSubmit,
  values,
  setValues,
  matchTypes,
  weightClasses,
  validations,
  validate,
  errors,
  valid,
}) {
  return (
    <>
      <h3>
        You are challenging <br />{' '}
        <span>
          {opponent.firstName} {opponent.lastName}
        </span>{' '}
        to a match!
      </h3>

      <form onSubmit={handleSubmit} className="issue-form">
        <div>
          <label>Match type</label>
          <Dropdown
            options={toValueLabel(matchTypes)}
            onChange={(val) => {
              setValues((prev) => ({
                ...prev,
                type: val,
              }));
            }}
            value={values.type}
          />
        </div>


        {values.type ? (values.type === 'gi' ? <GiNote /> : <NoGiNote />) : null}

        <div>
          <label>Match Date and Starting Time</label>
          <DateTimePicker
            className="__rival_text-field-component"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            selected={values.startsAt}
            onChange={(val) => {
              const startsAt = val;
              if (moment(new Date()) > moment(val)) {
                alert('You cant select a time in the past');
                return;
              }
              setValues((prev) => ({
                ...prev,
                startsAt,
              }));
            }}
          />
        </div>

        <div>
          <label>Weight class</label>
          <Dropdown
            options={toValueLabel(weightClasses)}
            onChange={(val) => {
              const weightClass = val;
              setValues((prev) => ({
                ...prev,
                weightClass,
              }));
            }}
            value={values.weightClass}
            label="Select your competition weight class"
          />
        </div>
        <div>
          <TextField
            label="Enter the School Name"
            value={values.location}
            validate={() => validate('location', validations['location'])}
            errors={errors.location}
            onChange={(val) => {
              const location = val;
              setValues((prev) => ({
                ...prev,
                location,
              }));
            }}
          />
        </div>
        <div>
          <TextField
            label="Enter Referee Name"
            value={values.refereeName}
            validate={() => validate('refereeName', validations['refereeName'])}
            errors={errors.refereeName}
            onChange={(val) => {
              const refereeName = val;
              setValues((prev) => ({
                ...prev,
                refereeName,
              }));
            }}
          />
        </div>

        <div>
          <label>Request Rule Exceptions</label>
          <TextArea
            value={values.ruleExceptions}
            onChange={(val) => {
              const ruleExceptions = val;
              setValues((prev) => ({
                ...prev,
                ruleExceptions,
              }));
            }}
            placeholder="e.g. No Heel Hooks"
          />
        </div>
        <ContractNote />

        <div className="accept-rule">
          <label htmlFor="">
            <input
              type="checkbox"
              onChange={(e) => {
                const acceptsTos = e.target.checked;
                setValues((prev) => ({
                  ...prev,
                  acceptsTos,
                }));
              }}
              value={values.acceptsTos}
            />
            <span>
              I have read and accept the match<a href="/rules"> rules</a>
            </span>
          </label>
        </div>
        <Button type="submit" disabled={!valid()}>
          Send Contract to Opponent
        </Button>
      </form>
    </>
  );
}
