'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

export type EditorTab = 'edit' | 'preview';

interface AnswerEditorProps {
  questionId: number;
  isError: boolean;
  activeTab: EditorTab;
  content: string;
  onTabChange: (questionId: number, tab: EditorTab) => void;
  onChange: (questionId: number, content: string) => void;
}

export default function AnswerEditor({
  questionId,
  isError,
  activeTab,
  content,
  onTabChange,
  onChange,
}: AnswerEditorProps) {
  return (
    <div className={'w-full'}>
      {/* 탭 헤더 - preview <-> edit */}
      <div className={'border-dark-grey-100 mb-2 flex border-b'}>
        <button
          type={'button'}
          onClick={() => onTabChange(questionId, 'edit')}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'edit'
              ? 'border-primary text-primary'
              : 'text-on-surface-low border-transparent hover:text-on-surface'
          }`}
        >
          {'편집'}
        </button>
        <button
          type={'button'}
          onClick={() => onTabChange(questionId, 'preview')}
          className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'border-primary text-primary'
              : 'text-on-surface-low border-transparent hover:text-on-surface'
          }`}
        >
          {'미리보기'}
        </button>
      </div>

      {/* 탭 내용 */}
      <div className={'min-h-[120px]'}>
        {activeTab === 'edit' ? (
          <textarea
            value={content}
            onChange={(e) => onChange(questionId, e.target.value)}
            placeholder={'어떻게 문제를 해결했는지 어떤 고민을 했었는지 생각하며 기록해보세요.'}
            className={`text-body-small border-dark-grey-100 w-full resize-none rounded-md border bg-transparent px-4 py-2 text-white focus:ring-primary focus:ring-1 focus:outline-none ${
              isError ? 'border-red-500' : ''
            }`}
            rows={4}
          />
        ) : (
          <div className={'bg-dark-grey-100 min-h-[120px] overflow-auto rounded-md px-4 py-2'}>
            {content ? (
              <div className={'prose prose-invert prose-sm max-w-none'}>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className={'text-on-surface-low italic'}>{'회고 내용이 없습니다.'}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
