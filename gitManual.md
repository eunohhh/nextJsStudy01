## github 명령어

0. git log --oneline // 깃로그
1. git init // 깃 초기화
2. git status // 깃 상태보기
3. gitingnore 생성 // 파일명, 폴더명/
4. git add . // 모든 파일 스테이징
5. git commit -m '메세지' // 메시지와 함께 커밋
6. git remote add <작명> <주소> // 리모트 저장소로 '주소'를 사용하고 리모트 브랜치 이름은 '작명'으로
7. git push -u <리모트> <로컬> // 리모트 저장소에 로컬 브랜치 푸시 -u 옵션은 한번 사용하면 그 뒤로 <리모트> <로컬> 생략가능
8. git clone <리모트> <로컬> // 리모트 저장소에서 로컬 저장소로 복사 뒤 <로컬>은 받아올 디렉토리로 이동했으면 생략가능
9. git fetch <리모트> // 리모트 저장소에서 신규 커밋 받아오기 
10. git pull <리모트> <로컬> // 리모트 저장소에서 로컬 브랜치로 병합하여 가져오기 !!(git fetch 와 git merge 를 같이 해주는 것임)
11. git merge <기준브랜치> <합칠브랜치> 
12. git merge <합칠브랜치> // 기준 브랜치 위치에서 실행하면 <합칠브랜치> 를 기준브랜치에 머지
13. git merge --squash // 로그 깔끔하게 합치기(곁다리 브랜치 로그 없이 메인 브랜치에 합쳐줌)
14. git branch <브랜치명> // 브랜치 생성
15. git switch <브랜치명> // 해당 브랜치로 이동
16. git branch -d <브랜치명> // 브랜치 삭제
17. git branch -D <브랜치명> // 머지 안한 브랜치 삭제
18. git restore <파일명> // 최근 커밋으로 되돌려줌
19. git restore --source <커밋아이디> <파일명> // 특정 커밋으로 되돌려줌
20. git revert <커밋아이디> // 커밋 취소 === <커밋아이디> 시점으로 다시 커밋해줌
21. git revert HEAD // 직전 커밋 취소
22. git reset --hard <커밋아이디> // 커밋아이디 시점으로 리셋
23. git stash // 최근 커밋 상태로 돌아가면서, 방금 작성한 코드 보관해줌
24. git stash save "메시지" // 메시지와 함께 git stash
25. git stash pop // 보관한 코드 꺼내옴
