# 펜타클 과제 - 안효진

- [x] React + TypeScript 를 기본으로 합니다.
- [x] UI 개발에는 Material Design 을 적용하기 위해 Material UI 를 사용합니다.
- [x] Component-Driven Development 방식으로 개발하고, 이 개발방식을 쉽게 하기 위한 Storybook 을 사용해 컴포넌트를 개발하고 관리할 수 있도록 합니다.
- [ ] State Management: 여러 컴포넌트의 상태는 Recoil 을 사용하고, 단일 컴포넌트 내의 상태관리는 Hooks 를 사용합니다.
- [ ] Test-Driven Development : jest를 사용하여 테스트를 만듭니다.
- [x] API는 GraphQL로 만들고, Frontend에서 Client는 Apollo Client 를 사용합니다.

## React StoryBook installment

    cd project
    npx -p @storybook/cli sb init

    testing
    - yarn test --watchAll

    storybook
    yarn storybook

### Story 활용 방법

    1. Button, Input 과 같은 엘리먼트 단위의 story 작성
    2. 여러 컴포넌트의 조합 단위로 story 작성
    3. 페이지 단위의 story 작성
