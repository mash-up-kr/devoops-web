import React from 'react';

import { Question } from '@/types/questionTabs';

export default function QuestionItem({ id, title, description }: Question) {
  return (
    <div key={id} className={`bg-dark-grey-25 flex flex-col gap-2 rounded-xl p-5`}>
      <div className={'text-body-small text-dark-blue-700 font-semibold'}>{title}</div>
      <h5 className={'text-h5 text-dark-grey-800 font-medium'}>{description}</h5>
    </div>
  );
}
