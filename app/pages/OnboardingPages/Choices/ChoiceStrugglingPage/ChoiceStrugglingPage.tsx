import React, { useCallback, useState } from 'react';

import Choice from '../Choice/Choice';
import { IWithOnClick, IWithSelectString } from '../../../../types/iWith';

const topics = [
  'Anxiety or fear',
  'Loneliness or heartbreak',
  'Doubt or uncertainty',
  'Relationships or conflict',
  'Stress or burnout',
  'Lack of motivation or hope',
  'Health or healing',
  'Finances or provision',
  'Other',
];

const ChoiceStrugglingPage = ({
  onClick,
  onSelect,
}: IWithOnClick & IWithSelectString) => {
  return (
    <Choice
      title={'What are you struggling with the most right now?'}
      options={topics}
      onSelect={onSelect}
      onClick={onClick}
    />
  );
};

export default ChoiceStrugglingPage;
