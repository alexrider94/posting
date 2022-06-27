- 실행방법
  1. 각 프런트, 백엔드 파일 경로 이동 후 패키지 설치 - yarn
  2. Frontend 파일경로 - yarn start
  3. Backend 파일경로 - yarn start
  4. ormconfig.json - mysql 설정

## [개발 과정]

### < FrontEnd >

#### 1. StoryBook

    1. Button, Input 과 같은 엘리먼트 단위의 story 작성 [x]
    2. 여러 컴포넌트의 조합 단위로 story 작성 [x]
    3. 페이지 단위의 story 작성 [o]

    <스토리북 에러 사항>
       1. 페이지단위로 story작성하기로 결정하고 부분적으로만 storybook으로 만들고 프로젝트 범위의 모든 페이지를 storybook으로 작성하지 못함.
       특정 페이지 단위에서 recoil-selector를 통해 사용자 데이터 가져오는 부분이나 특정 게시판 번호를 통해 가져오는 부분이 storybook으로는 정의되지않아있어서 에러표시.

       1. storybook-addon-apollo-client 에드온을 사용해서 데이터 표시를 할려고했는데 Component의 paremter로 Apollo query를 정의해줘도 스토리북 페이지 내에서 표시가 안됨. 이유는 버전에러 또는 코드내 문제?

    storybook-addon-apollo-client 참고 사이트:
       1. https://storybook.js.org/addons/storybook-addon-apollo-client
       2. https://github.com/lifeiscontent/realworld/blob/master/web/src/containers/editor-page/index.stories.js
       3. https://github.com/apollographql/apollo-client/issues/7081

#### 2. Rocoil

    - selector로 필요한 페이지마다 token 값을 통해 user 데이터 가져오기.
    - 게시판의 상세정보들도 selector를 통해서 가져오고 게시판 상세정보를 가져오기 위한 특정 번호값은 atom을 통해서 처리.
    - 페이지 이동관련 상태관리는 atom을 통해 처리.

#### 3. Apollo client

    - 백엔드와 graphql API 통신.
    - mutation, query 사용

#### 4. Jest

    - 실행방법: yarn test
    - jest.config.js 작성 (.js를 .ts로 바꾸면 에러발생->원인 아직 모름..) / ts-jest 사용. (typescript)
    - enzyme 테스트 라이브러리 사용.
    - 컴포넌트별 렌더링 및 특정 API 테스팅.
    - graphql Helper Testing - 모든게시판가져오는 API만 진행.

    - 에러 해결 방안
        1. "fetch" has not been found globally and no fetcher has been configured. -> cross-fetch 인스톨 하고 apolloClient 부분에 httpLink내부에 fetch와 uri옵션으로 처리
        2. ReferenceError: window is not defined. Consider using the "jsdom" test environment -> jest.config.js에   testEnvironment: 'jsdom' 추가
        3. 이미지 파일들 및 css 파일 jest 테스팅 에러
        error message : ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){�PNG
        -> assertsTransformer.js 파일 추가 후 jest.config.js에 moduleNameMapper:'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':'<rootDir>/assetsTransformer.js' 추가.
        참고 링크: https://github.com/facebook/jest/issues/2663

### < 백엔드 >

#### 1. 백엔드 주요 프레임워크 및 라이브러리

    1. typescript
    2. express
    3. typegraphql
    4. graphql
    5. typeorm

    - typeorm 이랑 typegraphql 사용.
    - query들은 전프로젝트 쿼리 그대로 사용.
    - NBP서버 mariaDB 사용.
    - dataloader는 type-graphql-dataloader 라이브러리를 사용.
