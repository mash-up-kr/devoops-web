module.exports = {
  types: [
    { value: "feat", name: "✨ feat: 새로운 기능 추가 " },
    { value: "fix", name: "🐛 fix: 버그 수정" },
    { value: "refactor", name: "⚡️ refactor: 리팩토링 " },
    { value: "docs", name: "📄 docs: 문서 변경" },
    { value: "env", name: "🌱 env: 설정 변경" },
    { value: "chore", name: "🍯 chore: 자잘한 수정" },
    { value: "style", name: "💄 style: style만 변경하는 경우" },
  ],
  allowCustomScopes: false, 
  allowEmptyScopes: true,   
  skipQuestions: ['scope'],
  subjectLimit: 72,
};
