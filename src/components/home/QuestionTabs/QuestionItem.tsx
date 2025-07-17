import React from 'react';

import { QuestionBriefResponseType } from '@/__generated__/@types';

export default function QuestionItem({ category, content }: QuestionBriefResponseType) {
  return (
    <div className={`bg-dark-grey-25 flex flex-col gap-2 rounded-xl p-5`}>
      <div className={'text-body-small text-dark-blue-700 font-semibold'}>{category}</div>
      <h5 className={'text-h5 text-dark-grey-800 font-medium'}>{content}</h5>
    </div>
  );
}
