# ReadMe

4주차 진행상황

### 문제 추천 알고리즘

[solved.ac](http://solved.ac) api를 이용해서 문제 date를 DB에 저장한다.

유저가 푼 전체 문제와 최근의 푼 문제를 백준에서 크롤링한다.
최근 문제의 난이도를 기준으로 DB에서 백준 문제를 가져오고 그 중 안 푼 문제에서 코사인 유사도 계산을 진행하고 유사도가 높은 문제를 제공한다. (CBF)

다른 유저의 질문이 많은 문제를 추가로 제공한다.

구현은 완료되었으나 요청시 시간이 오래 걸려서 개선이 필요하다.

### 웹 컴파일러

유저가 보낸 코드와 입력값으로 서버에서 코드를 실행한다.

기본 구현 및 무한루프 및 시간초과에 대한 처리는 완료되었다. 

추가로 세부적인 에러처리나, 보안적인 개선사항이 필요하다.

### 동시 편집 기술

채팅방에서 유저들이 텍스트 에디터를 동시에 편집한다.

CRDT를 사용하는 외부 라이브러리인 yorkie를 사용해서 구현했다.

추가로 undo, redo 기능을 구현했다.

차후 history를 제공하기 위해 history데이터를 압축해서 저장하도록 했다.

java script로 구현했기 때문에 프론트엔드와의 실적용 테스트가 필요하다.

git에는 없다.

    import './style.css'
    import javascriptLogo from './javascript.svg'
    import viteLogo from '/vite.svg'
    import { setupCounter } from './counter.js'
    import yorkie from 'yorkie-js-sdk'

    document.querySelector('#app').innerHTML = `
    <div>
        <a href="https://vitejs.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
        </a>
        <h1>Hello Vite!</h1>
        <div class="card">
        <button id="counter" type="button"></button>
        </div>
        <p class="read-the-docs">
        Click on the Vite logo to learn more
        </p>
        <div contenteditable="true" id="editor">Edit me</div>
        <button id="undoButton">Undo</button>
        <button id="redoButton">Redo</button>
    </div>
    `

    setupCounter(document.querySelector('#counter'))

    async function main() {
    console.log('Loading');
    const client = new yorkie.Client('https://api.yorkie.dev', {
    apiKey: 'cmstd7lafcg8gj9h6pig',
    });
    await client.activate();

    const doc = new yorkie.Document('editor');
    await client.attach(doc);

    const editor = document.getElementById('editor');

    const undo = [];
    const redo = [];

    const startTime = new Date();
    const history = [];

    doc.update((root) => {
        if(root.text){ // 텍스트가 있는 경우
        editor.innerHTML = root.text;
        } else{ // 텍스트가 없는 경우
        root.text = 'Edit me.';
        }
    });

    editor.addEventListener('input', (event) => {
        doc.update((root) => {
        undo.push(root.text);
        root.text = editor.innerHTML;
        addHistory(undo[undo.length-1], editor.innerHTML);
        console.log("event:"+root.text);
        });
    });

    doc.subscribe((event) => {
        if(event.type === 'remote-change'){ // 원격에서 변경
        undo.push(editor.innerHTML);
        editor.innerHTML = doc.getRoot().text;
        addHistory(undo[undo.length-1], editor.innerHTML);

        }
    })

    const undoButton = document.getElementById('undoButton');

    undoButton.addEventListener('click', function() {
        if(undo.length==0) return;
        redo.push(editor.innerHTML);
        
        doc.update((root) => {
        let targetText = undo.pop();
        root.text = targetText;
        editor.innerHTML = targetText;
        addHistory(redo[redo.length-1], targetText);

        });
    });

    const redoButton = document.getElementById('redoButton');

    redoButton.addEventListener('click', function() {

        if(redo.length==0) return;
        undo.push(editor.innerHTML);

        doc.update((root) => {
        let targetText = redo.pop();
        root.text = targetText;
        editor.innerHTML = targetText;
        addHistory(undo[undo.length-1], targetText);
        // console.log(history)
        });

    });

    function addHistory(preStr, nextStr){
        let preIdx = 0;
        let reverseIdx = 1;
        let shortLen = (preStr.length<nextStr.length)?preStr.length:nextStr.length;

        while(preIdx<shortLen && preStr[preIdx]==nextStr[preIdx]){
        preIdx++;
        }
        if (preIdx==preStr.length && preIdx==nextStr.length) return;
        while(preIdx<=shortLen-reverseIdx && preStr[preStr.length-reverseIdx]==nextStr[nextStr.length-reverseIdx]){
        reverseIdx++;
        }
    
        history.push({idx:preIdx, pre:preStr.substring(preIdx,preStr.length-reverseIdx+1),
        next: nextStr.substring(preIdx, nextStr.length-reverseIdx+1), duration: new Date()-startTime });
        console.log(history);
    }



    }
    main();

