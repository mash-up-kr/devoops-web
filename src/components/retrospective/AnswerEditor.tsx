'use client';

import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Tabs from '@/components/common/Tabs/Tabs';
import TabsContent from '@/components/common/Tabs/TabsContent';
import TabsTrigger from '@/components/common/Tabs/TabsTrigger';

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
      <Tabs defaultValue={activeTab} className={'mb-2'}>
        <div className={'border-dark-grey-100 flex border-b'}>
          <TabsTrigger
            value={'edit'}
            onClick={() => onTabChange(questionId, 'edit')}
            className={
              'border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary'
            }
          >
            {'편집'}
          </TabsTrigger>
          <TabsTrigger
            value={'preview'}
            onClick={() => onTabChange(questionId, 'preview')}
            className={
              'border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary'
            }
          >
            {'미리보기'}
          </TabsTrigger>
        </div>

        <TabsContent value={'edit'} className={'min-h-[120px]'}>
          <div className={`w-full rounded-md border ${isError ? 'border-red-500' : 'border-dark-grey-100'}`}>
            <MDEditor
              value={content}
              onChange={(val) => onChange(questionId, val || '')}
              data-color-mode={'dark'}
              height={180}
              textareaProps={{
                placeholder: '어떻게 문제를 해결했는지 어떤 고민을 했었는지 생각하며 기록해보세요.',
                style: {
                  fontSize: '14px',
                  lineHeight: '1.5',
                },
              }}
              preview={'edit'}
              hideToolbar={false}
              visibleDragbar={false}
            />
          </div>
        </TabsContent>

        <TabsContent value={'preview'} className={'min-h-[120px]'}>
          <div className={'bg-dark-grey-100 min-h-[120px] overflow-auto rounded-md px-4 py-2'}>
            {content ? (
              <div className={'prose prose-invert prose-sm max-w-none'}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className={'text-on-surface-low italic'}>{'회고 내용이 없습니다.'}</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
