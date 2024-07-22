# 에누리 퍼블리싱 산출물 리스트

## 개요

이 프로젝트는 에누리 퍼블리싱 산출물의 리스트를 구글 시트에서 실시간으로 업데이트하고 제공합니다. 사용자는 구글 시트에 저장된 데이터를 통해 최신 정보를 얻을 수 있으며, 작성 권한을 요청하면 데이터를 수정할 수 있습니다.

## 작동 로직

- 이 프로젝트는 [구글 시트](https://docs.google.com/spreadsheets/d/1lXdQ9Ey_MUwkls8qGii8vxlpoUN1PW9xrFWDcu_eD7Q/edit#gid=1984009326) 데이터를 기반으로 실시간으로 업데이트됩니다.
- 구글 시트의 URL은 위 링크를 통해 접근할 수 있으며, 구글 시트에서 작성 권한을 요청하면 데이터 수정이 가능합니다.

## 설치 방법

1. **구글 시트 접근 권한 요청**
   - 위의 구글 시트 URL에 접근하여 작성 권한을 요청합니다. 권한이 부여되면 데이터를 수정할 수 있습니다.

2. **로컬 환경 설정**
   - 클론하거나 다운로드한 후, 본 프로젝트를 로컬 환경에서 실행하려면 아래의 단계를 따릅니다:
     ```bash
     git clone https://github.com/WangKooN-S/EnuriPublishMaster.git
     cd repository
     ```

3. **필요한 패키지 설치**
   - 프로젝트에 필요한 패키지를 설치합니다. 일반적으로 `requirements.txt` 또는 `package.json` 파일이 있을 수 있습니다. 아래는 예시입니다:
     ```bash
     npm install
     ```

4. **구성 파일 설정**
   - `.env` 파일 또는 설정 파일에서 구글 시트의 URL 및 기타 필요한 설정을 입력합니다.

5. **서버 실행**
   - 로컬 서버를 실행하여 프로젝트를 테스트합니다:
     ```bash
     npm start
     ```

## 기여 방법

기여를 원하시는 분들은 [이슈](https://github.com/WangKooN-S/EnuriPublishMaster/issues)를 통해 피드백을 주세요.

## 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE) 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참고해주세요.

## 연락처

궁금한 점이 있거나 도움이 필요하시면 [이메일](mailto:wangsub@enuri.com)로 연락주세요.

