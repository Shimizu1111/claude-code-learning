export interface LessonStep {
  id: string;
  title: string;
  description: string; // やる前の説明（前提知識・文脈を丁寧に）
  prompt: string; // Claude Codeに貼り付ける指示（空ならcommandを使う）
  command?: string; // スラッシュコマンド等
  afterNote: string; // 実行後に表示する「何が起きたか」の解説
  why: string; // この操作で身につくこと（初心者向けに噛み砕いて）
  hint: string;
  verification: {
    type: "file_exists" | "dir_exists" | "file_contains" | "file_count";
    path: string;
    content?: string;
    count?: number;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  templateDir: string;
  estimatedMinutes: number;
  prerequisite?: string; // 前提となるレッスン（表示用テキスト）
  steps: LessonStep[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export const courses: Course[] = [
  // ===== 初級 =====
  {
    id: "beginner",
    title: "初級",
    subtitle: "Claude Codeの基本操作",
    description:
      "Claude Codeのインストールから、自然言語での指示の出し方、ファイル操作の基本まで。プログラミング経験がなくてもOKです。",
    icon: "seedling",
    color: "green",
    lessons: [
      {
        id: "first-instruction",
        title: "Claude Codeに指示を出してみよう",
        description:
          "Claude Codeは「AIと会話するだけでプログラミングの作業ができる」ツールです。このレッスンでは、日本語で話しかけるだけでファイルやフォルダが作れることを体験します。",
        category: "はじめの一歩",
        templateDir: "first-instruction",
        estimatedMinutes: 10,
        steps: [
          {
            id: "step-1",
            title: "日本語でフォルダを作る",
            description:
              "まずClaude Codeを起動しましょう。\n\n【準備】\n1. このダッシュボードとは別のターミナル（コマンドを打つ画面）を開いてください\n2. 作業フォルダに移動します（上に表示されている cd workspace/... をコピーして実行）\n3. claude と入力してEnterキーを押すと、Claude Codeが起動します\n\n起動すると入力待ちの画面になります。そこに下のプロンプト（指示文）をコピーして貼り付け、Enterを押してください。\n\n実行すると、右のファイルツリーに「my-project」というフォルダが現れるはずです。",
            prompt: "my-project というフォルダを作って",
            afterNote:
              "Claude Codeは裏側で mkdir my-project というコマンドを実行しました。mkdirは「フォルダを作る」コマンドです。あなたはこのコマンドを知らなくても、日本語で「フォルダを作って」と言うだけで同じことができました。これがClaude Codeの基本的な使い方です。",
            why: "Claude Codeの最大の特徴は「自然言語で指示するだけ」でコンピュータを操作できることです。専門的なコマンドを覚える必要はありません。日本語で「こうしてほしい」と伝えるだけでOKです。",
            hint: "Claude Codeが mkdir my-project というコマンドを自動で実行してくれます",
            verification: { type: "dir_exists", path: "my-project" },
          },
          {
            id: "step-2",
            title: "ファイルを作って中身も書かせる",
            description:
              "次は、フォルダの中にファイルを作ってみましょう。普通なら「ファイルを作る」→「開く」→「中身を書く」→「保存する」と何段階も必要な作業ですが、Claude Codeなら一言で済みます。\n\n下のプロンプトをコピーしてClaude Codeに貼り付けてください。\n\n実行後、右のファイルツリーに「my-project」フォルダの中に「hello.txt」が現れます。ファイル名をクリックすると中身も確認できます。",
            prompt:
              "my-project/hello.txt を作って、中身は Hello, Claude Code! にして",
            afterNote:
              "Claude Codeは「my-projectフォルダの中に、hello.txtというファイルを作成して、Hello, Claude Code! という文字を書き込む」という一連の作業を自動でやってくれました。通常のやり方だと3〜4ステップかかる作業が、一言の指示で完了しています。",
            why: "「ファイルを作って」「中身はこれにして」という2つの指示を一度にまとめて伝えられます。Claude Codeは指示の意図を理解して、必要な手順を自動で組み立ててくれます。",
            hint: "Claude Codeがファイルの作成と書き込みを自動でやります。右のファイルツリーでクリックすると中身を確認できます。",
            verification: {
              type: "file_contains",
              path: "my-project/hello.txt",
              content: "Hello, Claude Code!",
            },
          },
          {
            id: "step-3",
            title: "「いい感じに」でもOK",
            description:
              "Claude Codeのすごいところは、細かく指示しなくても「いい感じに」やってくれるところです。\n\nREADME.md（リードミー・エムディー）とは、プロジェクトの説明書のようなファイルです。ソフトウェアの世界では、フォルダに README.md を置いて「このプロジェクトは何か」を書くのが一般的な習慣です。\n\n下のプロンプトを貼り付けてみてください。「いい感じに」という曖昧な指示でも、Claude Codeが適切な内容を考えてくれます。",
            prompt:
              "my-project に README.md を作って。いい感じにプロジェクトの説明を書いて",
            afterNote:
              "Claude Codeは「README.mdを作成する」という指示だけでなく、「いい感じに」の部分もちゃんと解釈してくれました。マークダウン形式（見出しや箇条書きが使える書き方）で、プロジェクト名・説明・使い方などを含む、実用的な内容を自動で考えてくれています。\n\nファイルツリーでクリックして、どんな内容が書かれたか確認してみましょう。",
            why: "完璧な指示を考えなくても大丈夫です。「いい感じに」「適当に」といった曖昧な言い方でも、Claude Codeは文脈から適切な内容を判断してくれます。最初は気軽に試して、気に入らなかったら「もうちょっとこうして」と追加で指示すればOKです。",
            hint: "Claude Codeがマークダウン形式で適切な内容を自動で考えて書いてくれます",
            verification: { type: "file_exists", path: "my-project/README.md" },
          },
          {
            id: "step-4",
            title: "複数の操作をまとめて指示",
            description:
              "ここまで「1つの指示で1つの操作」をやってきましたが、実は複数の操作をまとめて一度に指示することもできます。\n\n「src」と「docs」は開発でよく使うフォルダ名です（srcはソースコード、docsはドキュメントの略）。これを2つ同時に作ってみましょう。\n\n下のプロンプトを貼り付けて、ファイルツリーの変化を見てみましょう。",
            prompt: "my-project の中に src フォルダと docs フォルダを作って",
            afterNote:
              "2つのフォルダが一度に作成されました。Claude Codeは「srcとdocsの2つのフォルダを作る」という指示を理解して、必要なコマンドを自動で2回実行してくれました。\n\nここまでで、my-project フォルダの中には hello.txt、README.md、srcフォルダ、docsフォルダ ができているはずです。ファイルツリーでプロジェクトの全体像を確認してみましょう。",
            why: "実際の作業では「これとこれとこれをやって」と複数のことを一度に頼むことがよくあります。Claude Codeは複数の指示を理解して順番に実行してくれるので、何度も指示を出す手間が省けます。",
            hint: "2つのフォルダが同時に作成されます",
            verification: { type: "dir_exists", path: "my-project/src" },
          },
        ],
      },
      {
        id: "init-and-memory",
        title: "/init と CLAUDE.md を知ろう",
        description:
          "Claude Codeには「このプロジェクトではこういうルールで作業してね」と伝える仕組みがあります。それが CLAUDE.md というファイルです。一度設定すれば、次回以降は自動で覚えてくれます。",
        category: "プロジェクト設定",
        templateDir: "init-and-memory",
        estimatedMinutes: 10,
        prerequisite: "Claude Codeに指示を出してみよう",
        steps: [
          {
            id: "step-1",
            title: "/init でプロジェクトを分析させる",
            description:
              "Claude Codeには「スラッシュコマンド」という便利な機能があります。通常の会話とは別に、スラッシュ（/）で始まる特別な命令です。\n\n/init は「このフォルダの中身を分析して、CLAUDE.md（プロジェクトの設定ファイル）を自動で作って」というコマンドです。\n\nClaude Codeの画面で、下のコマンドをそのまま入力してください。\n\n【CLAUDE.md って何？】\nClaude Codeを起動するたびに最初に読み込まれる「指示書」です。ここに書いたルールは、以降のすべての会話で自動的に適用されます。たとえば「コメントは日本語で書いて」と書いておけば、毎回言わなくてもそうしてくれます。",
            prompt: "",
            command: "/init",
            afterNote:
              "Claude Code がこのフォルダの中身を分析して、CLAUDE.md ファイルを自動で作成しました。\n\nこのファイルには、プロジェクトの説明やファイル構成などが書かれています。ファイルツリーで CLAUDE.md をクリックして中身を確認してみてください。\n\nこの CLAUDE.md は次回 claude を起動したときにも自動で読み込まれます。つまり、毎回同じ説明をしなくても Claude Code が「前回の続き」のように理解してくれるということです。",
            why: "毎回「このプロジェクトはこういうもので...」と説明するのは面倒ですよね。CLAUDE.md を置いておけば、Claude Codeが自動で読んで理解してくれます。チームで使う場合、全員のClaude Codeが同じルールに従うので、作業の品質が揃います。",
            hint: "/init と入力すると、Claude Codeがフォルダの中身を分析して CLAUDE.md を自動生成します",
            verification: { type: "file_exists", path: "CLAUDE.md" },
          },
          {
            id: "step-2",
            title: "CLAUDE.md にルールを追加する",
            description:
              "自動生成された CLAUDE.md に、自分だけのルールを追加してみましょう。\n\nたとえば「コメントは日本語で書いて」「インデント（字下げ）は2スペースで」といったルールを追加しておくと、以降のすべての作業でClaude Codeがそのルールに従ってくれます。\n\n下のプロンプトを貼り付けてください。",
            prompt:
              "CLAUDE.md に以下のルールを追加して：\n- コメントは常に日本語で書くこと\n- インデントは2スペース\n- 変数名は分かりやすい英語にする",
            afterNote:
              "CLAUDE.md にルールが追記されました。ファイルツリーでクリックして確認してみてください。\n\nこれ以降、このフォルダで Claude Code を使うと、これらのルールが自動で適用されます。たとえばコードを書かせると、コメントが日本語になり、インデントが2スペースになるはずです。\n\n【豆知識】\nCLAUDE.md はプロジェクトごとに作れます。「Aプロジェクトではこのルール」「Bプロジェクトでは別のルール」という使い分けが可能です。",
            why: "CLAUDE.md は「Claude Codeへの永続メモ」です。一度書いておけば毎回同じ指示を繰り返す必要がなくなります。プロジェクトのルールをここにまとめておくと、Claude Codeが常にそのルールに従ってくれるので、作業効率がグンと上がります。",
            hint: "CLAUDE.md ファイルにルールが追記されます",
            verification: {
              type: "file_contains",
              path: "CLAUDE.md",
              content: "日本語",
            },
          },
        ],
      },
      {
        id: "read-and-edit",
        title: "既存ファイルを読んで編集させる",
        description:
          "すでにあるファイルをClaude Codeに読ませて、「ここだけ変えて」と指示する方法を学びます。ゼロから作るだけでなく、既存のものを理解・修正できるのがClaude Codeの強みです。",
        category: "ファイル操作",
        templateDir: "read-and-edit",
        estimatedMinutes: 10,
        prerequisite: "Claude Codeに指示を出してみよう",
        steps: [
          {
            id: "step-1",
            title: "ファイルの中身を説明させる",
            description:
              "右のファイルツリーに config.json というファイルがあります。クリックして中身を見てみてください。\n\nJSON（ジェイソン）は設定ファイルなどでよく使われるデータの書き方です。見慣れない人も多いと思いますが、Claude Codeに「これ何？」と聞けば分かりやすく教えてくれます。\n\n下のプロンプトを貼り付けてみましょう。",
            prompt: "config.json を読んで、内容を初心者にも分かるように説明して",
            afterNote:
              "Claude Code が config.json の中身を読み取って、各項目が何を意味するのか日本語で解説してくれました。\n\n「port: 3000」は「このアプリは3000番のポート（窓口）で動きますよ」、「debug: false」は「デバッグモード（開発中の詳細表示）はOFFですよ」といった具合に、専門用語をかみ砕いて説明してくれたはずです。\n\nこのように、自分で書いていないファイルでもClaude Codeに聞けば理解できます。",
            why: "実際の仕事では「誰かが書いたファイルを理解する」場面がとても多いです。Claude Codeなら「このファイル何？」と聞くだけで、専門用語を噛み砕いて説明してくれます。知らないファイルに出会っても怖くありません。",
            hint: "Claude Code が config.json の構造と各項目の意味を分かりやすく説明してくれます",
            verification: { type: "file_exists", path: "config.json" },
          },
          {
            id: "step-2",
            title: "ファイルの一部だけ変更させる",
            description:
              "config.json の内容が分かったところで、一部だけ変更してみましょう。\n\nファイル全体を書き直すのではなく「ここだけ変えて」と伝えれば、Claude Codeがその部分だけを正確に変更してくれます。他の部分はそのまま残ります。\n\n下のプロンプトで、ポート番号とデバッグ設定を変更してみましょう。",
            prompt:
              "config.json の port を 8080 に変更して、debug を true に変更して",
            afterNote:
              "config.json の port が 3000 → 8080 に、debug が false → true に変わりました。ファイルツリーでクリックして確認してみてください。\n\n重要なのは、変更していない部分（appName, version, database, features など）はそのまま残っているということです。Claude Codeは「変えてほしい部分」だけを正確に変更してくれます。\n\nこれは手作業でファイルを編集するよりも安全です。間違えて関係ない部分を消してしまう心配がありません。",
            why: "「全部作り直す」のではなく「一部だけ直す」ことができるのは、実際の作業で非常に重要です。Claude Codeは変更すべき箇所を正確に理解して、他の部分を壊さずに修正してくれます。",
            hint: "port と debug の値だけが変わり、他は元のままです",
            verification: {
              type: "file_contains",
              path: "config.json",
              content: "8080",
            },
          },
        ],
      },
    ],
  },

  // ===== 中級 =====
  {
    id: "intermediate",
    title: "中級",
    subtitle: "Claude Codeの機能を活用する",
    description:
      "初級で基本操作を覚えたら、次はClaude Codeに備わっている便利な機能を使ってみましょう。スラッシュコマンド、計画モード、デバッグなど、作業効率を大きく上げる機能を体験します。",
    icon: "rocket",
    color: "yellow",
    lessons: [
      {
        id: "slash-commands",
        title: "スラッシュコマンドを使いこなす",
        description:
          "Claude Codeには /（スラッシュ）で始まる便利なコマンドがたくさんあります。覚えておくと作業効率がグンと上がるコマンドを実際に使ってみましょう。",
        category: "スラッシュコマンド",
        templateDir: "slash-commands",
        estimatedMinutes: 15,
        steps: [
          {
            id: "step-1",
            title: "/plan で「まず計画を立てる」",
            description:
              "Claude Codeに大きな作業を頼むとき、いきなり実行されると不安ですよね。\n\n/plan を使うと、Claude Codeは「こういう手順でやろうと思いますが、いいですか？」と先に計画を見せてくれます。あなたが「OK」と言ってから初めて実行されるので安心です。\n\nこれは「計画モード」と呼ばれる機能です。下のコマンドを入力してみましょう。",
            prompt: "",
            command: "/plan Todoアプリのファイル構成と実装計画を立てて",
            afterNote:
              "Claude Codeが「Todoアプリを作るなら、こういうファイルが必要で、こういう順番で作っていきます」という計画を提示してくれました。\n\nこの時点ではまだファイルは作成されていません。計画を読んで「OK」「進めて」と言えば実行されます。「ちょっと違う」と思ったら「CSSはもっとシンプルにして」のように修正を伝えられます。\n\n【ポイント】\nShift+Tab を押すと権限モードを切り替えられます。「plan」モードにしておくと、すべての操作で先に計画を見せてくれるようになります。",
            why: "大きな変更をするとき、何が起こるか分からないまま実行されるのは怖いものです。/plan を使えば「やる前に確認」ができるので、意図しない変更を防げます。特に重要なプロジェクトでは、この習慣をつけておくと安心です。",
            hint: "Claude Codeが計画を提示します。承認すると実行に移ります",
            verification: { type: "file_exists", path: "index.html" },
          },
          {
            id: "step-2",
            title: "/diff で「何が変わったか」を確認",
            description:
              "前のステップでファイルが作成されましたね。\n\n/diff は「さっきから何が変わったか」を一覧表示してくれるコマンドです。\nどのファイルが作られたか、どの行が追加・変更されたかが色分けで表示されます。\n\n下のコマンドを入力してみましょう。",
            prompt: "",
            command: "/diff",
            afterNote:
              "緑色で表示された行が「追加された部分」です。ファイルの作成・変更がひと目で分かります。\n\n/diff は「レビュー（確認作業）」にとても便利です。Claude Codeにたくさん作業させた後、「ちゃんと意図通りにできてるかな？」と確認するときに使います。\n\n【豆知識】\n/diff の画面では矢印キーでスクロール、q で終了できます。",
            why: "Claude Codeがファイルを変更した後、「本当に正しく変わっているか？」を確認する習慣はとても大切です。/diff を使えば変更箇所がひと目で分かるので、間違いにすぐ気づけます。",
            hint: "変更内容が色分けで表示されます。緑が追加、赤が削除です",
            verification: { type: "file_exists", path: "index.html" },
          },
          {
            id: "step-3",
            title: "/compact で会話を整理する",
            description:
              "Claude Codeと長い会話をしていると、Claude Codeの「記憶容量」（コンテキストウィンドウと呼びます）がいっぱいになることがあります。\n\n/compact は、これまでの会話を要約して記憶容量を空けてくれるコマンドです。中身は要約されますが、重要な情報は保持されるので作業に支障はありません。\n\n下のコマンドを入力してみましょう。",
            prompt: "",
            command: "/compact",
            afterNote:
              "会話が要約されて、記憶容量に空きができました。\n\nClaude Codeは長い会話をすると徐々に応答が遅くなったり、前の方の話を忘れたりすることがあります。/compact を使うとこれを防げます。\n\n【目安】\nClaude Codeの応答が遅くなったり、前に話した内容を忘れているようなら /compact を実行しましょう。/context と入力すると、今どれくらい記憶容量を使っているかも確認できます。",
            why: "長時間の作業ではClaude Codeの記憶容量が足りなくなることがあります。/compact で定期的に整理することで、Claude Codeの応答品質を維持できます。「なんか最近Claude Codeの調子が悪いな」と思ったら、まず /compact を試してみてください。",
            hint: "会話が要約されて記憶容量が確保されます。作業内容は保持されます",
            verification: { type: "file_exists", path: "index.html" },
          },
        ],
      },
      {
        id: "build-and-iterate",
        title: "「まず作って、あとで直す」の実践",
        description:
          "Claude Codeの効率的な使い方は「まず大まかに作らせて、あとで細かく直していく」です。完璧な指示を考える必要はありません。会話しながら改善していくフローを体験しましょう。",
        category: "実践フロー",
        templateDir: "build-todo",
        estimatedMinutes: 15,
        prerequisite: "スラッシュコマンドを使いこなす",
        steps: [
          {
            id: "step-1",
            title: "大まかな指示でアプリ全体を作る",
            description:
              "Todoアプリ（やることリストのアプリ）を作ってみましょう。\n\n下のプロンプトには「3ファイル構成で」「追加・削除・完了切り替え」「モダンなデザイン」と書いてありますが、実はもっと短く「Todoアプリ作って」だけでもOKです。ただ、具体的に書いた方がより意図に近い結果が得られます。\n\nClaude Codeがファイルを作成する許可を求めてきたら「はい」「y」等で承認してください。",
            prompt:
              "Todoアプリを作って。index.html, style.css, app.js の3ファイル構成で。タスクの追加・削除・完了切り替えができるようにして。モダンなデザインで",
            afterNote:
              "3つのファイル（index.html, style.css, app.js）が作成されました！ファイルツリーで確認してみてください。\n\n・index.html → アプリの骨組み（画面の構造）\n・style.css → アプリの見た目（色やレイアウト）\n・app.js → アプリの動き（ボタンを押したときの処理）\n\n【試してみよう】\nブラウザで index.html を開くと、実際に動くTodoアプリが表示されます。タスクを追加したり削除したりしてみてください。\n\nたった一つの指示で、動くアプリケーションが完成しました。",
            why: "最初から完璧を目指す必要はありません。まず「動くもの」を作らせて、そこから「ここをこう変えて」と調整していくのがClaude Codeの効率的な使い方です。これは「イテレーション（繰り返し改善）」と呼ばれる、プロの開発者も使うやり方です。",
            hint: "3つのファイルが同時に生成されます",
            verification: { type: "file_exists", path: "app.js" },
          },
          {
            id: "step-2",
            title: "既存のアプリに機能を追加する",
            description:
              "作ったTodoアプリに一つ問題があります。ページをリロード（再読み込み）すると、追加したタスクが全部消えてしまいます。\n\nそこで、「ローカルストレージ」という仕組みを使って、ブラウザにデータを保存する機能を追加しましょう。ローカルストレージとは、ブラウザの中にデータを保存できる機能のことです。\n\n下のプロンプトを貼り付けてください。Claude Codeが既存の app.js を読んで、必要な部分だけ追加・変更してくれます。",
            prompt:
              "Todoアプリにローカルストレージ保存機能を追加して。ページをリロードしてもタスクが残るようにして",
            afterNote:
              "app.js が更新されて、ローカルストレージ保存機能が追加されました。\n\nClaude Codeは既存のコードを「壊さずに」新しい機能を追加してくれます。元々あったタスクの追加・削除・完了切り替え機能はそのまま残っていて、さらにデータ保存機能が加わっています。\n\n【確認してみよう】\nブラウザでTodoアプリを開いて、タスクを何個か追加した後、ページをリロード（F5キー）してみてください。タスクが残っていれば成功です。\n\nこのように「作る→試す→改善する」のサイクルを繰り返すのが、Claude Codeを使った開発の基本フローです。",
            why: "「今あるものに機能を足して」という指示は、実際の仕事で最もよく使うパターンです。Claude Codeは既存のコードを理解した上で、壊さないように注意しながら新しい機能を追加してくれます。",
            hint: "localStorage.setItem / getItem が app.js に追加されます",
            verification: {
              type: "file_contains",
              path: "app.js",
              content: "localStorage",
            },
          },
        ],
      },
      {
        id: "fix-bugs",
        title: "バグを見つけて直させる",
        description:
          "プログラムにはバグ（不具合）がつきものです。Claude Codeは「なんかおかしい」と伝えるだけでバグを発見し、修正してくれます。ここでは意図的にバグを仕込んだファイルを使って、その流れを体験します。",
        category: "デバッグ",
        templateDir: "fix-existing",
        estimatedMinutes: 10,
        steps: [
          {
            id: "step-1",
            title: "まず分析させる（いきなり直さない）",
            description:
              "右のファイルツリーに buggy.js というファイルがあります。クリックして中身を見てみてください。いくつかのバグ（間違い）が含まれています。\n\nここで大事なコツがあります。「直して」といきなり修正させるのではなく、まず「分析して」と問題点を洗い出させましょう。\n\nなぜなら、いきなり「直して」と言うと、Claude Codeが勝手に解釈して意図しない修正をしてしまうことがあるからです。「まず分析→内容を確認→修正」の2段階が安全です。",
            prompt:
              "buggy.js にバグがあるみたい。どこがおかしいか分析して、問題点をリストアップして",
            afterNote:
              "Claude Codeが buggy.js を読んで、いくつかのバグを見つけてくれました。\n\nたとえば「ループの範囲が1つ多い（off-by-one エラー）」「==を===にすべき（型の比較の問題）」「月の値が1ずれている」といった問題が報告されたはずです。\n\n中身がまだよく分からなくても大丈夫です。大事なのは「Claude Codeに分析させると問題点のリストが得られる」ということです。\n\n次のステップで実際に修正させましょう。",
            why: "「分析→確認→修正」の2段階アプローチは、Claude Codeを安全に使うための最も重要なコツの一つです。いきなり「全部直して」と言うより、まず「何が問題？」と聞いてから直す方が、意図しない変更を防げます。",
            hint: "off-by-one, 型比較, 月のズレ, 戻り値の間違い等が見つかります",
            verification: { type: "file_exists", path: "buggy.js" },
          },
          {
            id: "step-2",
            title: "分析結果を確認してから修正させる",
            description:
              "前のステップでClaude Codeが問題点をリストアップしてくれました。\n\n内容を確認して「なるほど」と思ったら、次は修正を指示しましょう。下のプロンプトを貼り付けてください。\n\n修正後、ファイルツリーで buggy.js をクリックして、どこがどう変わったか確認してみましょう。",
            prompt: "buggy.js のバグを全部修正して",
            afterNote:
              "buggy.js のバグが修正されました。ファイルツリーでクリックして、修正後のコードを確認してみてください。\n\nClaude Codeは問題のある行だけを直して、正しく動いていた部分はそのまま残しています。\n\n【この体験から学べること】\n「分析→確認→修正」の流れは、自分で書いたコードにもバグが見つからないときに使えます。エラーメッセージが出ている場合は、それもClaude Codeに貼り付けると、さらに正確に原因を特定してくれます。",
            why: "バグ修正は開発作業の大きな部分を占めます。Claude Codeを使えば、自分でコードの中身を完全に理解していなくても、バグの発見と修正ができます。エラーメッセージをそのまま貼り付けるとさらに精度が上がります。",
            hint: "問題のあった行だけが修正されます",
            verification: {
              type: "file_contains",
              path: "buggy.js",
              content: "function",
            },
          },
        ],
      },
      {
        id: "git-with-claude",
        title: "Git操作をClaude Codeに任せる",
        description:
          "Git（ギット）はファイルの変更履歴を記録するツールです。「セーブポイント」のようなもので、いつでも過去の状態に戻れます。Gitのコマンドは複雑ですが、Claude Codeに任せれば自然言語で操作できます。",
        category: "Git連携",
        templateDir: "git-with-claude",
        estimatedMinutes: 10,
        steps: [
          {
            id: "step-1",
            title: "Gitリポジトリを作る",
            description:
              "まず、このフォルダを「Gitで管理する場所」にしましょう。これを「リポジトリの初期化」と言います。\n\n同時に .gitignore（ギットイグノア）ファイルも作ります。これは「このファイルは記録しなくていいよ」というリストです。一時ファイルやパスワード情報など、記録したくないものを指定します。\n\n下のプロンプトを貼り付けてください。",
            prompt:
              "このフォルダをGitリポジトリにして。.gitignore も作って node_modules と .DS_Store を無視するようにして",
            afterNote:
              "2つのことが行われました：\n\n1. このフォルダがGitリポジトリになりました（git init コマンドが実行された）\n2. .gitignore ファイルが作成されました\n\nファイルツリーで .gitignore をクリックして中身を確認してみてください。node_modules と .DS_Store が書かれているはずです。\n\n【用語メモ】\n・node_modules：プログラムが使う外部ライブラリが入るフォルダ（とても大きいので記録しない）\n・.DS_Store：macOSが自動で作るファイル（不要）",
            why: "Gitは現代の開発に欠かせないツールですが、コマンドが複雑で挫折する人が多いです。Claude Codeなら「Gitリポジトリにして」「コミットして」と日本語で言うだけで全部やってくれます。Gitの仕組みを完全に理解していなくても、安全にバージョン管理を始められます。",
            hint: "git init と .gitignore 作成が自動で実行されます",
            verification: { type: "file_exists", path: ".gitignore" },
          },
          {
            id: "step-2",
            title: "ファイル作成からコミットまで一言で",
            description:
              "Git の「コミット」とは、現在のファイルの状態を記録することです。ゲームのセーブのようなもので、いつでもこの時点に戻ることができます。\n\n通常なら「ファイルを作る」→「変更をステージングする」→「コミットメッセージを書く」→「コミットする」と何段階もの手順が必要ですが、Claude Codeなら一言で全部やってくれます。",
            prompt:
              "app.js に Hello World と表示するスクリプトを作って、git にコミットして。コミットメッセージはいい感じにして",
            afterNote:
              "以下の一連の作業がすべて自動で行われました：\n\n1. app.js ファイルの作成\n2. console.log('Hello World') のようなコードの記述\n3. git add（変更をステージング = 記録対象にする）\n4. git commit（変更を記録する）+ 適切なメッセージの作成\n\n通常4ステップかかる作業が、一つの指示で完了しました。\n\n【コミットメッセージとは】\n「何を変更したか」のメモです。「いい感じにして」と言えば、Claude Codeが変更内容に合ったメッセージを自動で考えてくれます。",
            why: "GitはClaude Codeが特に得意な分野です。「作ってコミットして」の一言で、ファイル作成からGit操作まで全自動。コミットメッセージ（変更内容の説明文）も自動で作ってくれるので、「何て書けばいいか分からない」という悩みもなくなります。",
            hint: "ファイル作成 → git add → git commit が一気に実行されます",
            verification: { type: "file_exists", path: "app.js" },
          },
        ],
      },
      {
        id: "claude-config-files",
        title: "Claude Codeの設定ファイルを理解する",
        description:
          "Claude Codeには動作をカスタマイズするための設定ファイルがいくつかあります。CLAUDE.md、Rules、Skills、Agents、Settings など、種類と使い分けを実際に作りながら理解しましょう。",
        category: "設定・カスタマイズ",
        templateDir: "claude-config",
        estimatedMinutes: 20,
        prerequisite: "/init と CLAUDE.md を知ろう",
        steps: [
          {
            id: "step-1",
            title: "設定ファイルの全体像を知る",
            description:
              "Claude Codeの設定ファイルにはいくつかの種類があり、それぞれ「いつ読み込まれるか」が違います。まず全体像を把握しましょう。\n\n【主な設定ファイルの種類】\n\n1. CLAUDE.md → 毎回必ず読み込まれる「基本ルール」\n2. .claude/rules/ → 特定のファイルを触るときだけ読み込まれる「条件付きルール」\n3. .claude/skills/ → /コマンド名 で呼び出す「再利用可能な手順書」\n4. .claude/agents/ → 専門タスクを任せる「専門家AI」\n5. .claude/settings.json → 権限やHooksなどの「システム設定」\n\nまずは CLAUDE.md を作って、プロジェクトの基本ルールを定義しましょう。",
            prompt:
              "CLAUDE.md を作って。以下の内容にして：\n- このプロジェクトはJavaScript製のWebアプリ\n- コメントは日本語で書く\n- インデントは2スペース\n- console.log でのデバッグは本番コードに残さない",
            afterNote:
              "CLAUDE.md が作成されました。ファイルツリーでクリックして確認してみてください。\n\nこのファイルは Claude Code を起動するたびに自動で読み込まれます。つまり、ここに書いたルールは今後すべての作業で適用されます。\n\n【重要な注意点】\nCLAUDE.md に書く内容は「毎回必要な基本ルール」だけにしましょう。あれもこれもと書くと、Claude Code が読み込むテキスト量（コンテキスト）が増えて、応答品質が下がることがあります。\n\n「特定の作業のときだけ必要なルール」は、次のステップで学ぶ Rules に書くのが正解です。",
            why: "CLAUDE.md はClaude Codeの「基本設定」です。毎回読まれるので、プロジェクト全体に適用したいルール（コード規約、言語設定など）だけを書きます。書きすぎるとコンテキストを圧迫するので、本当に毎回必要なものだけに絞るのがコツです。",
            hint: "CLAUDE.md が作成されます",
            verification: { type: "file_exists", path: "CLAUDE.md" },
          },
          {
            id: "step-2",
            title: "Rules で条件付きルールを作る",
            description:
              "次は .claude/rules/ に「特定のファイルを触るときだけ読み込まれるルール」を作ります。\n\n【CLAUDE.md との違い】\n・CLAUDE.md → 毎回読まれる（全体ルール）\n・Rules → 指定したファイルを触るときだけ読まれる（部分ルール）\n\nたとえば「CSSファイルを編集するときだけ適用するデザインルール」を作ってみましょう。ファイル先頭の paths: で「どのファイルを触るときに読み込むか」を指定します。",
            prompt:
              ".claude/rules/css-guidelines.md を作って。先頭にフロントマター（---で囲む部分）を入れて paths: に \"**/*.css\" を指定して。本文には以下のルールを書いて：\n- BEM記法でクラス名を付ける\n- !important は禁止\n- カラーコードは変数化する\n- メディアクエリはモバイルファーストで書く",
            afterNote:
              ".claude/rules/css-guidelines.md が作成されました。ファイルツリーで確認してみてください。\n\nファイルの先頭に以下のような部分があるはずです：\n---\npaths:\n  - \"**/*.css\"\n---\n\nこの paths: の部分が「いつこのルールを読み込むか」の条件です。\"**/*.css\" は「プロジェクト内のすべてのCSSファイル」を意味します。\n\nつまり、このルールは：\n・CSSファイルを編集するとき → 自動で読み込まれる\n・JavaScriptやHTMLを編集するとき → 読み込まれない\n\nこうすることで、必要なときだけルールが適用され、コンテキストの無駄遣いを防げます。\n\n【使い分けの目安】\n・毎回必要 → CLAUDE.md に書く\n・特定ファイル限定 → .claude/rules/ に書く",
            why: "Rulesを使うと「CSSを触るときだけデザインルールを適用」「APIファイルを触るときだけセキュリティルールを適用」のように、状況に応じてルールを出し分けられます。CLAUDE.md に全部書くとコンテキストがパンクしますが、Rules なら必要なときだけ読み込まれるので効率的です。",
            hint: ".claude/rules/css-guidelines.md が paths 付きで作成されます",
            verification: {
              type: "file_exists",
              path: ".claude/rules/css-guidelines.md",
            },
          },
          {
            id: "step-3",
            title: "Skills で再利用可能な手順を定義する",
            description:
              "Skills（スキル）は「/コマンド名」で呼び出せる手順書です。\n\n【Rules との違い】\n・Rules → ファイルを触ると自動で読み込まれる（受動的）\n・Skills → /コマンド名 で自分から呼び出す（能動的）\n\nたとえば「新しいコンポーネントを作る手順」をスキルとして定義すれば、/new-component と打つだけで毎回同じ手順で作れます。\n\nコードレビュー用のスキルを作ってみましょう。",
            prompt:
              ".claude/skills/code-review/SKILL.md を作って。フロントマターに以下を設定：\n- description: 「コードレビューのチェックリストを実行する」\n- user-invocable: true\n\n本文には以下のチェック手順を書いて：\n1. 変更されたファイルを確認する\n2. セキュリティの問題がないかチェック\n3. パフォーマンスの問題がないかチェック\n4. コーディング規約に違反していないかチェック\n5. テストが書かれているかチェック\n6. 結果を一覧表にまとめて表示する",
            afterNote:
              ".claude/skills/code-review/SKILL.md が作成されました。\n\nこれで、Claude Code のセッション中に /code-review と入力するだけで、このチェックリストが実行されます。\n\n【Skills のフロントマターの意味】\n・description: Claude Code がスキル一覧に表示する説明文。Claude が「このスキルを使うべきか」を判断するときにも使います\n・user-invocable: true → /code-review のように手動で呼び出せる。false にすると Claude が自動判断でのみ使う\n\n【他にも使えるフロントマター】\n・model: \"sonnet\" → このスキル実行時だけ別モデルを使う\n・allowed-tools: \"Read Grep\" → このスキルで使えるツールを制限（安全性向上）\n・paths: → 特定ファイルを触ったとき自動で実行\n\n/skills と入力すると、現在使えるスキルの一覧が表示されます。",
            why: "スキルは「毎回同じ手順で実行したい作業」を定義するものです。たとえばコードレビュー、デプロイ手順、新規ファイル作成テンプレートなど。一度定義すれば /コマンド名 で即呼び出せるので、手順の漏れがなくなり、チーム全員が同じ品質で作業できます。",
            hint: ".claude/skills/code-review/SKILL.md が作成されます",
            verification: {
              type: "file_exists",
              path: ".claude/skills/code-review/SKILL.md",
            },
          },
          {
            id: "step-4",
            title: "ここまでの整理：いつ何を使う？",
            description:
              "ここまでで CLAUDE.md、Rules、Skills の3つを作りました。最後に settings.json も作って、全体の設定ファイルを完成させましょう。\n\n.claude/settings.json には、Claude Code の権限設定（どのコマンドを許可/禁止するか）や環境変数などを書けます。\n\n【全体の使い分けまとめ】\n・CLAUDE.md → 毎回読む基本ルール（コード規約等）\n・Rules → 特定ファイル限定のルール（CSS規約、API規約等）\n・Skills → 呼び出して使う手順書（/review, /deploy等）\n・Agents → 独立して動く専門家AI（上級で学びます）\n・Settings → 権限・Hooks等のシステム設定\n\n下のプロンプトで settings.json を作りましょう。",
            prompt:
              ".claude/settings.json を作って。以下の設定を入れて：\n- permissions の allow に \"Bash(npm *)\" と \"Bash(git *)\" を追加\n- permissions の deny に \"Bash(rm -rf *)\" を追加\n- env に NODE_ENV: \"development\" を設定",
            afterNote:
              ".claude/settings.json が作成されました。\n\n設定内容の意味：\n・allow: [\"Bash(npm *)\", \"Bash(git *)\"] → npm と git のコマンドは許可確認なしで実行OK\n・deny: [\"Bash(rm -rf *)\"] → rm -rf（全削除）は絶対に実行しない\n・env: { NODE_ENV: \"development\" } → 環境変数を自動設定\n\n【ここまでに作ったファイル一覧】\nファイルツリーで確認してみてください：\n\n📄 CLAUDE.md → 基本ルール（毎回読まれる）\n📁 .claude/\n  📁 rules/\n    📄 css-guidelines.md → CSSファイル限定ルール\n  📁 skills/\n    📁 code-review/\n      📄 SKILL.md → /code-review で呼べる手順書\n  📄 settings.json → 権限・環境変数の設定\n\nこれが Claude Code のカスタマイズの基本構成です。プロジェクトの規模が大きくなっても、この構成を拡張していけばOKです。",
            why: "Claude Code を「自分好みにカスタマイズする方法」を一通り体験しました。大事なのは使い分けです：\n\n・毎回必要？ → CLAUDE.md\n・特定ファイルだけ？ → Rules\n・手動で呼び出したい？ → Skills\n・自動で処理したい？ → Hooks（settings.json内）\n・専門タスクを委譲？ → Agents\n\nすべてをCLAUDE.mdに詰め込むとコンテキストがパンクします。適切に分散させるのがプロの使い方です。",
            hint: ".claude/settings.json が作成されます",
            verification: {
              type: "file_exists",
              path: ".claude/settings.json",
            },
          },
        ],
      },
    ],
  },

  // ===== 上級 =====
  {
    id: "advanced",
    title: "上級",
    subtitle: "Claude Codeを使い倒す",
    description:
      "Hooks、サブエージェント、セキュリティレビューなど、Claude Codeの高度な機能を扱います。中級までの知識がある前提です。",
    icon: "fire",
    color: "red",
    lessons: [
      {
        id: "security-review",
        title: "/security-review でセキュリティチェック",
        description:
          "Claude Codeには /security-review というセキュリティ専用のコマンドがあります。コードの脆弱性（セキュリティ上の弱点）を自動で検出し、修正方法も提案してくれます。",
        category: "セキュリティ",
        templateDir: "security-check",
        estimatedMinutes: 15,
        prerequisite: "スラッシュコマンドを使いこなす",
        steps: [
          {
            id: "step-1",
            title: "/security-review を実行する",
            description:
              "右のファイルツリーで app.js をクリックして中身を確認してください。これは意図的にセキュリティの問題を仕込んだサンプルコードです（学習用なので安全です）。\n\n/security-review は、Claude Codeに組み込まれたセキュリティチェック専用のコマンドです。コードの差分やファイルを分析して、セキュリティ上の危険な箇所を検出してくれます。\n\n下のコマンドを入力してみましょう。",
            prompt: "",
            command: "/security-review",
            afterNote:
              "Claude Codeがコードを分析して、セキュリティ上の問題点をリストアップしてくれました。\n\n検出される代表的な脆弱性：\n・SQLインジェクション：ユーザーの入力をそのままデータベースの命令に使っている（悪意のある入力でデータを盗まれる危険）\n・XSS（クロスサイトスクリプティング）：ユーザーの入力をそのまま画面に表示している（悪意のあるスクリプトが実行される危険）\n・パストラバーサル：ファイルパスの検証がない（サーバー上の任意のファイルを読まれる危険）\n・認証なしの管理画面：誰でもアクセスできてしまう\n\n/security-review はプロのセキュリティエンジニアが行うようなレビューを自動化してくれます。",
            why: "/security-review は、コードレビューの中でも特にセキュリティに焦点を当てた専用コマンドです。自分で書いたコードだけでなく、他の人が書いたコードのセキュリティチェックにも使えます。本番環境にデプロイする前に実行する習慣をつけると、セキュリティ事故を未然に防げます。",
            hint: "SQLインジェクション、XSS、パストラバーサル等が検出されます",
            verification: { type: "file_exists", path: "app.js" },
          },
          {
            id: "step-2",
            title: "脆弱性を修正させる",
            description:
              "問題点が分かったら修正しましょう。\n\nここでのポイントは「修正箇所にコメントで何を直したか書いて」という指示です。こうすることで、修正後のコードを読んだときに「なぜこの変更が必要だったのか」が分かります。",
            prompt:
              "app.js のセキュリティ問題をすべて修正して。修正箇所にはコメントで何を直したか、なぜ危険だったかを書いて",
            afterNote:
              "app.js が修正されました。ファイルツリーでクリックして確認してみてください。\n\n修正内容の例：\n・ユーザー入力のサニタイズ（無害化）処理が追加された\n・SQLクエリがパラメータ化された（入力値を安全に処理）\n・ファイルパスの検証が追加された\n・認証チェックが追加された\n\n各修正箇所にコメントがついているので、「何がなぜ危険だったのか」「どう直したのか」が理解できます。これはセキュリティの知識を身につける上でとても有効な学び方です。",
            why: "セキュリティの問題は、コードが動いているように見えても潜んでいることが多いです。/security-review → 分析確認 → 修正 の流れを習慣にすることで、安全なコードを書く力が身につきます。",
            hint: "各修正箇所にコメント付きで修正されます",
            verification: {
              type: "file_contains",
              path: "app.js",
              content: "sanitize",
            },
          },
        ],
      },
      {
        id: "secret-protection",
        title: "秘密情報を守る多重防御",
        description:
          "APIキーやパスワードなどの秘密情報を誤って公開してしまう事故は、実務で最も怖いセキュリティ事故の一つです。.gitignore、Claude Codeの権限設定、Gitフック、テンプレートファイルなど、複数の防御層を組み合わせて秘密情報を守る方法を実践します。",
        category: "秘密情報の保護",
        templateDir: "secret-protection",
        estimatedMinutes: 20,
        prerequisite: "Claude Codeの設定ファイルを理解する",
        steps: [
          {
            id: "step-1",
            title: ".gitignore で秘密ファイルを追跡除外する",
            description:
              "まず最初の防御層です。\n\n.env ファイルとは、APIキーやデータベースのパスワードなど「秘密の設定値」を書いておくファイルです。Cloudflareで使う .dev.vars も同じ役割です。\n\nこれらのファイルは絶対にGit（バージョン管理）に入れてはいけません。Gitに入ると、GitHubなどに公開されて全世界に秘密情報が漏れます。\n\n.gitignore に書いておけば「このファイルはGitで管理しない」と指定できます。まず秘密ファイルのサンプルと .gitignore を作りましょう。",
            prompt:
              "以下のファイルを作って：\n1. .env にダミーのAPIキーとDB接続情報を書いて（例：API_KEY=sk-dummy-1234）\n2. .dev.vars にダミーのCloudflare用シークレットを書いて\n3. .gitignore に .env, .env.*, .dev.vars を追加して",
            afterNote:
              "3つのファイルが作成されました。\n\n・.env → アプリ全般の秘密情報（APIキー、DB接続先など）\n・.dev.vars → Cloudflare Workers用の秘密情報\n・.gitignore → 「.env と .dev.vars はGitに入れないで」という宣言\n\n【.gitignore の書き方】\n・.env → .env という名前のファイルを除外\n・.env.* → .env.local, .env.production など .env で始まるファイルをすべて除外\n・.dev.vars → Cloudflare用の秘密ファイルを除外\n\nこれが第1の防御層です。しかし .gitignore だけでは不十分です。git add -f で強制的にステージングされると突破されてしまいます。次のステップでさらに防御を重ねましょう。",
            why: ".gitignore は「秘密情報保護の第1層」です。しかし .gitignore だけでは完全ではありません。開発者が git add -f .env で強制追加したり、Claude Code が間違って読み取ってしまう可能性があります。そのため、複数の防御層を重ねる「多重防御（Defense in Depth）」が大切です。",
            hint: ".env, .dev.vars, .gitignore が作成されます",
            verification: { type: "file_exists", path: ".gitignore" },
          },
          {
            id: "step-2",
            title: "Claude Code の権限で秘密ファイルへのアクセスをブロック",
            description:
              "第2の防御層です。\n\nClaude Code は強力なので、指示次第で .env を読んでしまう可能性があります。たとえば「.env の内容を教えて」と聞いたら、中身を表示できてしまいます。\n\n.claude/settings.json の deny 設定で、Claude Code 自体が秘密ファイルを読み書きできないようにブロックしましょう。これにより、Claude Codeが誤って秘密情報を含む回答を生成するリスクを防げます。",
            prompt:
              ".claude/settings.json を作って。以下の permissions 設定を入れて：\n- deny に以下を追加：\n  - \"Read(.env)\" \n  - \"Read(.env.*)\" \n  - \"Read(.dev.vars)\" \n  - \"Edit(.env)\" \n  - \"Edit(.env.*)\" \n  - \"Edit(.dev.vars)\" \n  - \"Bash(cat .env*)\" \n  - \"Bash(cat .dev.vars)\"",
            afterNote:
              ".claude/settings.json が作成されました。\n\n設定の意味：\n・Read(.env) → Claude Codeが .env ファイルを読むことを禁止\n・Edit(.env) → Claude Codeが .env ファイルを編集することを禁止\n・Bash(cat .env*) → cat コマンドで .env を表示することを禁止\n\nこれにより、たとえ「.env の中身を見せて」と指示しても、Claude Codeは拒否します。\n\n【なぜこれが重要？】\nClaude Codeの会話内容はログに残る場合があります。秘密情報が会話に混入すると、ログ経由で漏洩するリスクがあります。Read/Edit 自体をブロックすることで、そもそも秘密情報がClaude Codeの目に触れないようにできます。",
            why: "Claude Codeは指示があればファイルを読めてしまいます。deny設定で「そもそも読めなくする」のが第2の防御層です。.gitignore は「Gitに入れない」、deny は「Claude Code に見せない」。目的が違う2つの防御を重ねることで、安全性が大きく高まります。",
            hint: ".claude/settings.json に deny ルールが設定されます",
            verification: {
              type: "file_contains",
              path: ".claude/settings.json",
              content: "deny",
            },
          },
          {
            id: "step-3",
            title: "Git hookで秘密ファイルのコミットを阻止する",
            description:
              "第3の防御層です。\n\n.gitignore があっても、git add -f .env のように -f（force）オプションをつけると強制的にGitに追加できてしまいます。\n\nそこで Git hook（フック）を使います。これは「コミットしようとしたときに自動で実行されるチェックスクリプト」です。pre-commit フックを設定すると、コミット前に「秘密ファイルが含まれていないか」を自動でチェックして、含まれていたらコミットを拒否できます。",
            prompt:
              ".githooks/pre-commit を作って。以下の内容にして：\n- #!/bin/sh で始めて\n- git diff --cached --name-only でステージングされたファイル一覧を取得\n- .env, .env.*, .dev.vars がステージングされていたらエラーメッセージを出して exit 1 で中止\n- 実行権限もつけて\n- 最後に、「git config core.hooksPath .githooks で有効化してください」とコメントで書いて",
            afterNote:
              ".githooks/pre-commit が作成されました。\n\n【Git hook の仕組み】\npre-commit フックは、git commit を実行するたびに自動で実行されます。スクリプトが exit 1（異常終了）を返すと、コミットが中止されます。\n\n【有効化する方法】\nこのフックを有効にするには、以下のコマンドを一度実行する必要があります：\ngit config core.hooksPath .githooks\n\nこれにより、.githooks/ フォルダ内のスクリプトがGitフックとして認識されます。\n\n【テスト方法】\n試しに git add -f .env してから git commit してみてください。pre-commit フックがエラーを出してコミットが拒否されるはずです。\n\nこれで、-f で強制追加しても、コミット時点でブロックされます。",
            why: "Git hook は「最後の砦」です。.gitignore を無視して git add -f された場合でも、コミット時に検出してブロックします。3つの防御層（.gitignore → Claude Code deny → Git hook）を組み合わせることで、秘密情報の漏洩リスクを限りなくゼロに近づけられます。",
            hint: ".githooks/pre-commit が作成されます",
            verification: {
              type: "file_exists",
              path: ".githooks/pre-commit",
            },
          },
          {
            id: "step-4",
            title: ".env.example で安全にチーム共有する",
            description:
              "ここまでで「秘密ファイルを守る」仕組みが3層できました。でもチーム開発では「どんな環境変数が必要か」をメンバーに伝える必要がありますよね。\n\nそこで .env.example（テンプレートファイル）を作ります。実際の値は入れずに「こういう変数が必要ですよ」という情報だけを書いたファイルです。このファイルはGitにコミットしてOKです。\n\n新しいメンバーは .env.example をコピーして .env にリネームし、実際の値を自分で埋める、という流れです。",
            prompt:
              "以下のファイルを作って：\n1. .env.example に以下を書いて（値は空かダミーで）：\n   API_KEY=your-api-key-here\n   DATABASE_URL=postgresql://user:password@localhost:5432/mydb\n   OPENAI_API_KEY=sk-your-key-here\n   SECRET_KEY=generate-a-random-string\n2. .dev.vars.example にCloudflare用のテンプレートを書いて（値は空かダミー）\n\n各ファイルの先頭に「# このファイルをコピーして .env にリネームし、実際の値を入力してください」とコメントを入れて",
            afterNote:
              ".env.example と .dev.vars.example が作成されました。\n\n【チームでの運用フロー】\n1. .env.example はGitにコミットする（秘密の値が入っていないので安全）\n2. 新メンバーは cp .env.example .env でコピー\n3. .env に実際のAPIキーなどを記入\n4. .env は .gitignore で除外されているのでGitには入らない\n\nこれで「必要な環境変数の情報は共有」しつつ「実際の秘密の値は各自が管理」という安全な運用ができます。\n\n【ここまでのまとめ：多重防御の全体像】\n第1層：.gitignore → 秘密ファイルをGit追跡から除外\n第2層：settings.json deny → Claude Code から読み書きをブロック\n第3層：pre-commit hook → 強制追加されてもコミットを拒否\n第4層：.example テンプレート → 秘密の値なしで必要情報を共有\n\n一つの対策だけでは突破されるリスクがありますが、4つ重ねることで非常に堅牢になります。",
            why: "セキュリティは「多重防御（Defense in Depth）」が基本です。一つの対策に頼るのではなく、複数の層で守ることで、どこか一つが突破されても他の層が防いでくれます。今回作った4つの防御層は、実際のプロダクション環境でもそのまま使えるベストプラクティスです。",
            hint: ".env.example と .dev.vars.example が作成されます",
            verification: {
              type: "file_exists",
              path: ".env.example",
            },
          },
        ],
      },
      {
        id: "simplify-refactor",
        title: "/simplify でコード品質を改善",
        description:
          "/simplify は、Claude Codeがコードの品質を多角的にチェックして改善してくれるコマンドです。複数の観点（再利用性・効率・読みやすさ）で分析し、問題があれば自動で修正します。",
        category: "コード改善",
        templateDir: "refactoring",
        estimatedMinutes: 15,
        steps: [
          {
            id: "step-1",
            title: "/simplify でコードを分析・改善",
            description:
              "ファイルツリーで utils.js をクリックして中身を確認してください。\n\nこのファイルは「動くけど品質が低い」コードです。たとえば：\n・一つの関数が長すぎる（何十行もある）\n・同じような処理が繰り返し書かれている\n・変数名が i, j, u など分かりにくい\n\n/simplify を実行すると、Claude Codeが並列でエージェント（分析担当のAI）を動かし、複数の観点からコード品質をチェックして改善してくれます。",
            prompt: "",
            command: "/simplify",
            afterNote:
              "/simplify が完了しました。Claude Codeが複数の観点でコードを分析し、問題があれば修正を適用してくれました。\n\n【/simplify の3つの観点】\n1. 再利用性：同じコードが繰り返されていないか？共通化できないか？\n2. 品質：命名は分かりやすいか？構造は整理されているか？\n3. 効率：もっと簡潔に書ける箇所はないか？\n\n/simplify は内部で複数のサブエージェント（専門の分析AI）を並列に動かしているため、人間が一つずつ確認するより素早く広範囲をチェックできます。",
            why: "/simplify は「コードの健康診断」のようなものです。定期的に実行することで、コードの品質を高く保てます。特にチーム開発では、コードの品質を一定に保つために重要です。",
            hint: "複数の観点でコードが分析・改善されます",
            verification: { type: "file_exists", path: "utils.js" },
          },
          {
            id: "step-2",
            title: "手動プロンプトでさらに細かく指示する",
            description:
              "/simplify は自動で分析・修正してくれますが、もっと具体的な指示を出すこともできます。\n\n「元の機能は維持すること」という一言がとても重要です。リファクタリング（コードの整理）では「見た目を整えたら動かなくなった」が最悪のパターンです。この一言で、Claude Codeが動作テストを意識しながら修正してくれます。",
            prompt:
              "utils.js をリファクタリングして。長い関数は分割、重複は共通化、命名も改善して。元の機能は維持すること",
            afterNote:
              "utils.js が整理されました。ファイルツリーで確認してみてください。\n\nビフォー・アフターの違い：\n・長い関数 → 意味のある単位で小さな関数に分割\n・手書きのソート処理 → 標準の Array.sort() メソッドに置き換え\n・i, u, temp → user, sortedUsers, category のような分かりやすい名前\n・同じ処理の繰り返し → 共通関数に集約\n\n重要なのは、見た目は大きく変わっても「動作は同じ」ということです。「元の機能は維持して」と指示したことで、Claude Codeが機能を壊さないように注意して修正してくれました。",
            why: "リファクタリングは「動作を変えずに構造を改善する」作業です。Claude Codeに任せるときは「元の機能は維持して」と明示するのが重要です。この一言があるだけで、Claude Codeが慎重に修正してくれます。",
            hint: "関数分割、共通化、命名改善が行われます",
            verification: {
              type: "file_contains",
              path: "utils.js",
              content: "function",
            },
          },
        ],
      },
      {
        id: "hooks-setup",
        title: "Hooksで作業を自動化する",
        description:
          "中級の「設定ファイルを理解する」で settings.json を学びましたね。Hooksはその settings.json の中に書く「自動処理ルール」です。「ファイルを編集したら自動でコード整形する」「危険なコマンドをブロックする」など、Claude Codeの動きを自動で制御できます。",
        category: "Hooks",
        templateDir: "hooks-setup",
        estimatedMinutes: 15,
        prerequisite: "Claude Codeの設定ファイルを理解する",
        steps: [
          {
            id: "step-1",
            title: "Hooks設定ファイルを作成する",
            description:
              "Hooksの設定は .claude/settings.json というファイルに書きます。\n\n【Hooksのタイミング】\n・PreToolUse：ツール実行「前」に動く（危険な操作のブロックに使える）\n・PostToolUse：ツール実行「後」に動く（自動フォーマットに使える）\n・SessionStart：セッション開始時に動く\n・SessionEnd：セッション終了時に動く\n\nまずは簡単な例として、ファイル編集後にメッセージを表示するHookを作ってみましょう。",
            prompt:
              ".claude/settings.json を作って。以下のHooks設定を入れて：\n- PostToolUse で Edit ツール使用後に echo 'ファイルが編集されました！' と表示するフック\n- PreToolUse で Bash ツール使用時に、コマンドに rm -rf が含まれていたら echo '危険なコマンドです' と表示して exit 2 で中止するフック",
            afterNote:
              ".claude/settings.json が作成されました。ファイルツリーで確認してみてください。\n\n2つのHookが設定されています：\n\n1. PostToolUse（編集後フック）\n → Claude Codeがファイルを編集するたびに「ファイルが編集されました！」と表示されます\n → 実務では、ここにコード整形ツール（Prettier等）を設定すると、常にきれいなコードが保てます\n\n2. PreToolUse（実行前フック）\n → rm -rf（全削除）のような危険なコマンドをブロックします\n → うっかり重要なファイルを消してしまう事故を防げます\n\n【exit 2 って何？】\nexit 2 は「この処理を中止してください」という合図です。Hooksで exit 2 を返すと、Claude Codeはその操作を実行しません。",
            why: "Hooksを使うと、Claude Codeの動作をカスタマイズして「自分専用の安全ルール」を作れます。特にPreToolUseで危険な操作をブロックする設定は、本番環境で作業するときの安全装置として非常に有効です。",
            hint: ".claude/settings.json に hooks 設定が追加されます",
            verification: {
              type: "file_contains",
              path: ".claude/settings.json",
              content: "hooks",
            },
          },
          {
            id: "step-2",
            title: "/hooks で設定を確認する",
            description:
              "設定したHooksが正しく認識されているか確認しましょう。\n\n/hooks コマンドを実行すると、現在設定されているすべてのHookが一覧表示されます。どのタイミングで何が実行されるかがひと目で分かります。",
            prompt: "",
            command: "/hooks",
            afterNote:
              "設定済みのHook一覧が表示されました。\n\n実際にHookが動くか試すには、Claude Codeに何かファイルを編集させてみてください。\n例：「test.txt を作って適当な内容を書いて」\n\nファイルが作成された後に「ファイルが編集されました！」というメッセージが表示されれば、Hookが正常に動作しています。\n\n【さらに活用するなら】\n・ESLint（コード品質チェック）をPostToolUseに設定 → 常に高品質なコード\n・テスト自動実行をPostToolUseに設定 → 変更のたびにテストが走る\n・Slack通知をSessionEndに設定 → 作業完了を自動通知",
            why: "/hooks でHookの状態を確認できます。Hooksは一度設定すれば以降の全セッションで自動的に適用されます。チーム全員の .claude/settings.json を揃えれば、開発ルールの統一もできます。",
            hint: "設定済みのフック一覧が表示されます",
            verification: {
              type: "file_exists",
              path: ".claude/settings.json",
            },
          },
        ],
      },
      {
        id: "subagents",
        title: "サブエージェントを活用する",
        description:
          "中級の「設定ファイルを理解する」で .claude/agents/ を少し学びましたね。ここではもっと本格的に、ツール制限やモデル指定を使った実践的なエージェント定義を作ります。「専門家を呼び出す」感覚で、特定タスクに特化したAIを自分で設計できます。",
        category: "サブエージェント",
        templateDir: "subagents",
        estimatedMinutes: 15,
        prerequisite: "Claude Codeの設定ファイルを理解する",
        steps: [
          {
            id: "step-1",
            title: "カスタムエージェントを作成する",
            description:
              ".claude/agents/ フォルダにマークダウンファイルを作ると、それがカスタムエージェント（専門家AI）の定義になります。\n\n今回は「コードレビュー専門のエージェント」を作ります。このエージェントは、セキュリティ・パフォーマンス・可読性の3つの観点でコードをレビューするように設定します。\n\n【エージェント定義ファイルの構成】\n・フロントマター（先頭の --- で囲まれた部分）：使うモデルやツールの設定\n・本文：エージェントへの指示（何をどうレビューするか）",
            prompt:
              ".claude/agents/reviewer.md を作って。フロントマターで model: sonnet、tools: [Read, Grep] を指定して。本文には「コードレビューの専門エージェント。以下の3観点で必ずレビューすること：1.セキュリティ上の問題 2.パフォーマンスの問題 3.可読性の問題。各項目について重要度（高/中/低）と修正案を提示する」と書いて",
            afterNote:
              ".claude/agents/reviewer.md が作成されました。\n\nこのファイルがあると：\n・/agents コマンドでこのエージェントを手動で呼び出せる\n・Claude Codeが「これはレビューが必要だな」と判断したときに自動で呼び出すこともある\n・チームメンバー全員が同じレビュー基準を使える\n\n【フロントマターの意味】\n・model: sonnet → このエージェントが使うAIモデル（sonnetは高速モデル）\n・tools: [Read, Grep] → このエージェントが使えるツール（ファイル読み取りと検索のみ。編集はさせない = 安全）\n\nツールを制限することで「分析はするけど勝手に変更はしない」安全なエージェントになります。",
            why: "サブエージェントを使うと「この作業は必ずこの基準でチェックする」というルールをAIに組み込めます。人間が忘れがちなチェック項目も、エージェントなら毎回確実に実行します。チームでエージェント定義を共有すれば、レビュー品質の統一にもなります。",
            hint: ".claude/agents/reviewer.md が作成されます",
            verification: {
              type: "file_exists",
              path: ".claude/agents/reviewer.md",
            },
          },
          {
            id: "step-2",
            title: "エージェントが分析する対象ファイルを作る",
            description:
              "作ったエージェントに分析させるファイルを用意しましょう。\n\n複数のファイルを一度に作成させます。/batch というコマンドを使うと、大量のファイルに対する作業を並列（同時に複数）で実行できます。\n\nまずは対象のファイルを作りましょう。",
            prompt:
              "src フォルダを作って、その中に以下の3ファイルを作成して：\n- hello.js：ユーザーの名前を受け取って挨拶を表示する関数\n- utils.js：文字列のバリデーション関数（空文字チェック、長さチェック）\n- config.js：アプリの設定オブジェクト（ポート番号、DB接続先、ログレベル）",
            afterNote:
              "src フォルダに3つのファイルが作成されました。ファイルツリーで確認してみてください。\n\n【次のステップ】\nこのファイル群に対して、先ほど作った reviewer エージェントを使ってレビューさせることができます。\nClaude Codeに「src フォルダのコードをレビューして」と指示すると、reviewer エージェントが呼び出される場合があります。\n\n【/batch について】\n大量のファイルに同じような作業をさせたいとき（例：100ファイルのコード規約を統一する）は /batch コマンドが便利です。タスクを自動的に5〜30の小タスクに分解して並列実行してくれます。",
            why: "サブエージェントと /batch を組み合わせると、大規模なプロジェクトでも品質を維持しながら効率的に作業できます。エージェントは「専門家の目」として機能し、/batch は「大量作業の自動化」として機能します。",
            hint: "3ファイルが src フォルダ内に作成されます",
            verification: { type: "dir_exists", path: "src" },
          },
        ],
      },
      {
        id: "automation-scripts",
        title: "自動化スクリプトを作らせる",
        description:
          "繰り返しの作業を自動化するスクリプトをClaude Codeに作らせましょう。要件（何をしたいか）を伝えるだけで、実用レベルのスクリプトが出来上がります。シェルスクリプトを一から書ける必要はありません。",
        category: "自動化",
        templateDir: "shell-automation",
        estimatedMinutes: 10,
        steps: [
          {
            id: "step-1",
            title: "バックアップスクリプトを作る",
            description:
              "まずはファイルのバックアップを自動化するスクリプトを作りましょう。\n\n要件を箇条書きで伝えると、Claude Codeがより正確なスクリプトを生成してくれます。下のプロンプトでは「圧縮」「日付付き」「古いものは削除」「使い方のコメント」「実行権限」と5つの要件を指定しています。",
            prompt:
              "backup.sh を作って。以下の要件で：\n- 指定フォルダを日付付きでtar.gzに圧縮する\n- バックアップ先フォルダも指定できるようにする\n- 7日より古いバックアップは自動で削除する\n- 使い方のコメントをファイル先頭に入れる\n- 実行権限（chmod +x）もつけて",
            afterNote:
              "backup.sh が作成されました。ファイルツリーでクリックして中身を確認してみてください。\n\n中身の構成：\n・先頭のコメント：使い方の説明（# で始まる行）\n・#!/bin/bash：「このファイルはbashで実行してね」という宣言\n・日付取得：$(date +%Y%m%d) で今日の日付を取得\n・tar -czf：フォルダを圧縮するコマンド\n・find -mtime +7 -delete：7日以上前のファイルを自動削除\n\n5つの要件が全部満たされたスクリプトが、一つの指示で完成しました。\n\n【シェルスクリプトとは】\nコマンドの手順を書いておいたファイルのことです。実行すると書いてある順にコマンドが自動で実行されます。毎日の定型作業を自動化するのに使います。",
            why: "Claude Codeの真骨頂は「こういうのが欲しい」と伝えるだけで実用レベルのスクリプトが出てくること。シェルスクリプトの文法を知らなくても、要件を箇条書きで伝えれば適切なスクリプトが生成されます。",
            hint: "tar, find -mtime, chmod +x が含まれるスクリプト",
            verification: {
              type: "file_contains",
              path: "backup.sh",
              content: "#!/",
            },
          },
          {
            id: "step-2",
            title: "デプロイスクリプトを作る",
            description:
              "もう一つ、実務でよく使う「デプロイスクリプト」を作ってみましょう。\n\nデプロイとは「アプリを公開する」作業のことです。通常は「テスト→ビルド→公開」の3段階で行いますが、それぞれのステップが失敗したら途中で止めたいですよね。\n\n下のプロンプトでは「失敗したら止まる」「進捗を色付き表示」という要件を指定しています。",
            prompt:
              "deploy.sh を作って。以下の要件で：\n- テスト実行→ビルド→デプロイの3ステップ\n- 各ステップが失敗したら即座に中止する\n- 各ステップの開始・成功・失敗を色付きで表示する（成功は緑、失敗は赤、開始は青）\n- 使い方のコメントも入れて",
            afterNote:
              "deploy.sh が作成されました。\n\n中身のポイント：\n・set -e：コマンドが失敗したらスクリプト全体を即座に中止する宣言\n・ANSI カラーコード：ターミナルでテキストに色を付ける仕組み（\\033[32m が緑など）\n・各ステップの前後にメッセージ表示：「テスト開始...」「テスト成功！」など\n・trap：エラーが発生したときのクリーンアップ処理\n\n【CI/CDとは】\nContinuous Integration / Continuous Deployment の略で、「テスト・ビルド・デプロイを自動化する」考え方です。今作ったスクリプトはCI/CDの基本的な形そのものです。",
            why: "要件が複雑でも箇条書きで整理して伝えれば、Claude Codeが適切に構造化してくれます。色付き表示やエラーハンドリングなど、細かい実装も自動でやってくれるので、ゼロから書く何倍も速いです。",
            hint: "set -e, ANSI color codes, exit codes が含まれるスクリプト",
            verification: {
              type: "file_contains",
              path: "deploy.sh",
              content: "#!/",
            },
          },
        ],
      },
      {
        id: "deploy-platforms",
        title: "作ったものをインターネットに公開する",
        description:
          "ローカルで作ったWebサイトやアプリを、実際にインターネット上に公開する方法を学びます。GitHub Pages、Cloudflare Pages、Vercel の3つのサービスの違いと使い分けを、実際にデプロイしながら理解します。",
        category: "デプロイ",
        templateDir: "deploy-platforms",
        estimatedMinutes: 25,
        prerequisite: "「まず作って、あとで直す」の実践",
        steps: [
          {
            id: "step-1",
            title: "まず公開するサイトを作る",
            description:
              "まず公開するためのシンプルなWebサイトを作りましょう。\n\nこのステップでは HTML と CSS だけで構成された静的サイト（サーバー側の処理がないサイト）を作ります。静的サイトは GitHub Pages、Cloudflare Pages、Vercel のどれでも公開できます。\n\n下のプロンプトで、ポートフォリオサイト（自己紹介サイト）を作りましょう。",
            prompt:
              "ポートフォリオサイトを作って。以下の構成で：\n- index.html：自己紹介、スキル一覧、実績のセクション\n- style.css：モダンなデザイン、ダークテーマ、レスポンシブ対応\n- 1ファイルにまとめずに index.html と style.css を分けて\n- 名前は「Taro Yamada」、職業は「Web Developer」にして",
            afterNote:
              "index.html と style.css が作成されました。ブラウザで index.html を開いて確認してみてください。\n\nこのサイトは「静的サイト」です。静的サイトとは：\n・HTML、CSS、JavaScript だけで構成\n・サーバー側の処理がない（データベースなし、ログイン機能なし）\n・ファイルをそのまま配信するだけで動く\n\nブログ、ポートフォリオ、LP、ドキュメントサイトなどが静的サイトの代表例です。\n\nこの「静的サイト」はこれから学ぶ3つのサービスすべてで無料ホスティングできます。",
            why: "公開するコンテンツがないとデプロイの練習ができないので、まずシンプルなサイトを用意します。静的サイトは最もデプロイが簡単で、今回学ぶ3つのサービスすべてで無料で公開できます。",
            hint: "index.html と style.css が作成されます",
            verification: { type: "file_exists", path: "index.html" },
          },
          {
            id: "step-2",
            title: "3つのサービスの違いを理解する",
            description:
              "デプロイの前に、3つのサービスの違いを整理しましょう。Claude Codeに比較表を作ってもらいます。\n\n【3つのサービスの概要】\n\n・GitHub Pages：GitHubリポジトリから直接公開。最もシンプル。静的サイト専用。\n・Cloudflare Pages：高速CDN + Workers（サーバー処理）が使える。APIキーをサーバー側で安全に扱える。\n・Vercel：Next.js等のフレームワークと相性抜群。プレビュー環境が自動生成。\n\n下のプロンプトで、比較表をファイルとして生成しましょう。",
            prompt:
              "DEPLOY_GUIDE.md を作って。GitHub Pages、Cloudflare Pages、Vercel の比較表を書いて。以下の観点で比較：\n- 何に向いているか（ユースケース）\n- 料金（無料枠）\n- 対応サイトの種類（静的のみ？サーバーサイドもOK？）\n- カスタムドメイン対応\n- デプロイ方法（GitHubと連携？CLI？）\n- サーバーサイド処理（Functions/Workers/Serverless）\n- ビルドコマンドの設定\n- 環境変数の管理方法\n- それぞれの長所と短所\n\n表の後に「どれを選べばいい？」の判断フローチャートも書いて。初心者にも分かるように日本語で",
            afterNote:
              "DEPLOY_GUIDE.md が作成されました。ファイルツリーでクリックして確認してみてください。\n\n【選び方の目安】\n\n「HTML/CSSだけのシンプルなサイトを公開したい」\n→ GitHub Pages が最も簡単。GitHubにpushするだけ。\n\n「APIキーを使うアプリを安全にデプロイしたい」\n→ Cloudflare Pages + Workers。APIキーをサーバー側（環境変数）に置けるので、ブラウザに露出しない。\n\n「Next.jsやフレームワークを使ったアプリを公開したい」\n→ Vercel。ビルド設定が自動検出され、プレビュー環境も自動生成。\n\n「とにかく無料で速く公開したい」\n→ 3つとも無料枠あり。最も手軽なのは GitHub Pages。\n\n次のステップで、実際にGitHub Pagesにデプロイしてみましょう。",
            why: "「どのサービスを使えばいいか」は初心者が最も迷うポイントです。用途に応じた選び方を知っておくと、プロジェクトに合った最適なサービスを選べます。3つとも無料枠があるので、迷ったら試してみるのが一番です。",
            hint: "比較表と判断フローチャートが DEPLOY_GUIDE.md に生成されます",
            verification: { type: "file_exists", path: "DEPLOY_GUIDE.md" },
          },
          {
            id: "step-3",
            title: "GitHub Pages にデプロイする",
            description:
              "最もシンプルな方法から始めましょう。GitHub Pages は GitHub リポジトリから直接Webサイトを公開できるサービスです。\n\n【仕組み】\n1. GitHubリポジトリにHTMLファイルをpush\n2. リポジトリの設定でGitHub Pagesを有効化\n3. https://ユーザー名.github.io/リポジトリ名/ でアクセス可能に\n\nClaude Codeを使って、GitHub Pagesのデプロイに必要な設定ファイルを作りましょう。GitHub Actions（GitHubの自動実行機能）を使った自動デプロイの設定です。",
            prompt:
              "GitHub Pages 用の GitHub Actions ワークフローを作って。以下の要件で：\n- .github/workflows/deploy-pages.yml に配置\n- main ブランチに push されたら自動デプロイ\n- プロジェクトルートの index.html と style.css をそのまま公開\n- permissions と pages の設定も含めて\n- 初心者向けにコメントを各ステップにつけて",
            afterNote:
              ".github/workflows/deploy-pages.yml が作成されました。\n\n【GitHub Pages のデプロイの流れ】\n1. このファイルをGitHubにpush\n2. リポジトリの Settings → Pages → Source を「GitHub Actions」に設定\n3. main ブランチにpushするたびに自動でサイトが更新される\n4. https://ユーザー名.github.io/リポジトリ名/ でアクセス\n\n【GitHub Pages の特徴】\n・完全無料（publicリポジトリ）\n・設定がシンプル（YAMLファイル1つ）\n・GitHubにpushするだけで自動更新\n・ただし静的サイトのみ（サーバー側の処理はできない）\n・APIキーなどの秘密情報をブラウザ側に置くことになるため、外部APIを使うアプリには不向き\n\n【向いているもの】ポートフォリオ、ブログ、ドキュメント、LP\n【向いていないもの】ログイン機能、データベース、APIキーが必要なアプリ",
            why: "GitHub Pages は「最も手軽にWebサイトを公開する方法」です。GitHubにpushするだけで公開されるので、とにかく素早く公開したい場合に最適です。ただし静的サイト専用なので、サーバー側の処理が必要なアプリには向いていません。",
            hint: ".github/workflows/deploy-pages.yml が作成されます",
            verification: {
              type: "file_exists",
              path: ".github/workflows/deploy-pages.yml",
            },
          },
          {
            id: "step-4",
            title: "Cloudflare Pages の設定を作る",
            description:
              "次に Cloudflare Pages の設定です。GitHub Pages との大きな違いは：\n\n1. Workers（サーバーサイド処理）が使える → APIキーを安全にサーバー側で扱える\n2. CDN（世界中に配置されたサーバー）で超高速配信\n3. 環境変数でAPIキーを管理 → ブラウザに露出しない\n\n特に「APIキーをブラウザに露出させたくない」場合、Cloudflare Pages + Workers が最適解です。\n\nCloudflare Pages用の設定とサンプルのWorker関数を作りましょう。",
            prompt:
              "以下のファイルを作って：\n1. wrangler.toml（Cloudflare Pages の設定ファイル）：\n   - name は my-portfolio\n   - compatibility_date は今日の日付\n   - pages_build_output_dir は \"./\" に設定\n   - 日本語コメントで各設定の意味を説明\n2. functions/api/hello.js（Cloudflare Workers の関数）：\n   - GETリクエストに { message: \"Hello from server!\" } を返す\n   - env.API_KEY で環境変数を参照する例をコメントで示す\n   - 「この関数はサーバー側で実行されるので、APIキーがブラウザに漏れません」とコメント",
            afterNote:
              "wrangler.toml と functions/api/hello.js が作成されました。\n\n【Cloudflare Pages のデプロイの流れ】\n1. Cloudflareアカウントを作成（無料）\n2. ダッシュボードで「Pages」→「Connect to Git」でGitHubリポジトリを接続\n3. pushするたびに自動デプロイ\n4. CLIの場合：npx wrangler pages deploy ./\n\n【Workers（サーバーサイド関数）の仕組み】\nfunctions/ フォルダに置いたJSファイルは、サーバー側で実行されます。\n例：functions/api/hello.js → https://サイト名/api/hello でアクセス可能\n\nAPIキーを env.API_KEY のように環境変数から参照すれば、ブラウザのソースコードには一切現れません。これがGitHub Pagesとの最大の違いです。\n\n【環境変数の設定方法】\nCloudflareダッシュボード → Settings → Environment Variables で設定\nまたは .dev.vars ファイルでローカル開発用に設定（.gitignoreで除外すること！）\n\n【向いているもの】APIキーを使うアプリ、高速配信が必要なサイト、Edge Computing\n【向いていないもの】特になし（ほぼ万能だが、設定が GitHub Pages より少し複雑）",
            why: "Cloudflare Pages は「安全にAPIキーを扱いたい」場合の最適解です。Workers（サーバーサイド関数）を使えば、APIキーをサーバー側（環境変数）に置けるので、ブラウザのソースコードに露出しません。前のレッスン「秘密情報を守る多重防御」で学んだ知識の実践編です。",
            hint: "wrangler.toml と functions/api/hello.js が作成されます",
            verification: {
              type: "file_exists",
              path: "wrangler.toml",
            },
          },
          {
            id: "step-5",
            title: "Vercel の設定を作る",
            description:
              "最後に Vercel の設定です。Vercelは Next.js の開発元が提供するサービスで、フレームワークとの相性が抜群です。\n\n【Vercel の特徴】\n・フレームワーク自動検出（Next.js, React, Vue 等）\n・プレビュー環境の自動生成（PRごとに独自URLでプレビューできる）\n・Serverless Functions（サーバーサイド処理）対応\n・ビルドコマンドの自動設定\n\n今回は静的サイトですが、Vercel用の設定ファイルとServerless Functionのサンプルを作りましょう。",
            prompt:
              "以下のファイルを作って：\n1. vercel.json（Vercel の設定ファイル）：\n   - 静的ファイルの配信設定\n   - 日本語コメントは JSON なので入れられないので、設定内容は最小限でOK\n2. api/hello.js（Vercel の Serverless Function）：\n   - GETリクエストに { message: \"Hello from Vercel!\" } を返す\n   - process.env.API_KEY で環境変数を参照する例をコメントで示す\n3. DEPLOY_COMPARISON.md を更新して、3つのサービスの「デプロイコマンド」と「環境変数の設定方法」のクイックリファレンスを末尾に追加して",
            afterNote:
              "vercel.json と api/hello.js が作成されました。\n\n【Vercel のデプロイの流れ】\n1. Vercelアカウントを作成（無料）\n2. GitHubリポジトリをインポート\n3. 自動でフレームワークを検出してビルド＆デプロイ\n4. CLIの場合：npx vercel\n\n【Vercel Serverless Functions の仕組み】\napi/ フォルダに置いたJSファイルがサーバーサイド関数になります。\n例：api/hello.js → https://サイト名/api/hello でアクセス可能\nCloudflare Workers と似た仕組みですが、ランタイムがNode.jsベースです。\n\n【3つのサービスの最終まとめ】\n\n静的サイトをすぐ公開したい → GitHub Pages\n　最もシンプル、pushするだけ、無料\n\nAPIキーを安全に使いたい → Cloudflare Pages\n　Workers でサーバー処理、環境変数、超高速CDN\n\nNext.jsアプリを公開したい → Vercel\n　フレームワーク自動検出、PRプレビュー、Serverless Functions\n\n迷ったら → Cloudflare Pages が最もバランスが良い\n　（静的サイトもサーバー処理もカバー、無料枠も十分）",
            why: "GitHub Pages・Cloudflare Pages・Vercel の3つを実際に設定ファイルを作りながら比較しました。それぞれ得意分野が違うので、プロジェクトに合わせて選べるようになることが重要です。「静的ならGitHub Pages」「APIキー使うならCloudflare」「Next.jsならVercel」と覚えておけば、迷わず選べます。",
            hint: "vercel.json と api/hello.js が作成されます",
            verification: {
              type: "file_exists",
              path: "vercel.json",
            },
          },
        ],
      },
    ],
  },

  // ===== サクッとコース =====
  {
    id: "quick",
    title: "サクッと実践",
    subtitle: "5分で結果を出す",
    description:
      "時間がない人向け。「これを作りたい」を一つの指示で実現する方法を体験します。Claude Codeの即戦力を実感できます。技術的な知識は一切不要です。",
    icon: "zap",
    color: "purple",
    lessons: [
      {
        id: "quick-lp",
        title: "LPを一発で作る",
        description:
          "LP（ランディングページ）とは、商品やサービスを紹介する一枚もののWebページです。通常はデザイナーとエンジニアに依頼して何日もかかりますが、Claude Codeなら一つの指示で完成します。",
        category: "即戦力",
        templateDir: "quick-lp",
        estimatedMinutes: 5,
        steps: [
          {
            id: "step-1",
            title: "一発でLP生成",
            description:
              "下のプロンプトをコピーしてClaude Codeに貼り付けるだけです。\n\n何が起きるか：Claude Codeが HTML（ページの構造）と CSS（見た目のデザイン）を一つのファイルにまとめて作成してくれます。レスポンシブ（スマホでもPCでも見やすく自動調整される）デザインです。\n\n完成したら、ファイルツリーで index.html をクリックしてコードを見たり、ブラウザで直接開いて完成品を確認できます。",
            prompt:
              "レスポンシブなランディングページを作って。以下の構成で：\n- ヒーローセクション（大きなキャッチコピーとCTAボタン）\n- 特徴紹介（3つのカード形式）\n- お客様の声（2-3件の口コミ）\n- フッター（著作権表示）\nテーマカラーは青系で。HTML・CSSは1ファイルにまとめて index.html にして",
            afterNote:
              "index.html が作成されました！\n\n【確認方法】\n1. ファイルツリーで index.html をクリック → コードが表示されます\n2. ブラウザで開く → 完成品のページが表示されます\n   （ターミナルで open index.html と入力するか、ファイルをブラウザにドラッグ&ドロップ）\n\n【もし気に入らなかったら？】\nClaude Codeに追加で指示を出せばOKです：\n・「色をもっと濃い青にして」\n・「ヒーローセクションに背景画像のスペースを追加して」\n・「CTAボタンをもっと目立たせて」\n\nこのように「まず作る→見て確認→調整」のサイクルが Claude Code の基本的な使い方です。",
            why: "Claude Codeなら「こんなページが欲しい」と伝えるだけでOK。HTML、CSS、デザインの知識は不要です。気に入らなければ「ここをこうして」と追加指示するだけ。外注に依頼するよりも圧倒的に速く、自分のイメージに近いものが作れます。",
            hint: "1ファイルで完結するレスポンシブLP",
            verification: {
              type: "file_contains",
              path: "index.html",
              content: "<html",
            },
          },
        ],
      },
      {
        id: "quick-data",
        title: "データをサクッと整理",
        description:
          "CSVファイル（Excelのような表形式のデータ）の集計・分析を、一つの指示でClaude Codeに任せます。手作業で集計する時間がゼロになります。",
        category: "即戦力",
        templateDir: "quick-data",
        estimatedMinutes: 5,
        steps: [
          {
            id: "step-1",
            title: "データ集計を丸投げ",
            description:
              "右のファイルツリーに sales.csv があります。クリックして中身を確認してください。日付・商品名・カテゴリ・金額・数量が入った売上データです。\n\n通常、このデータを集計するには Excel で関数を組んだり、ピボットテーブルを作ったりする必要がありますが、Claude Codeなら「こう集計して」と伝えるだけで、集計スクリプトの作成から実行まで全自動です。\n\n下のプロンプトを貼り付けてください。",
            prompt:
              "sales.csv を読み込んで、以下を集計して report.json に出力して：\n- 月別の売上合計\n- 商品カテゴリ別の売上ランキング\n- 最も売れた商品\nスクリプトを作って実行もして",
            afterNote:
              "以下のことが自動で行われました：\n\n1. sales.csv の内容を分析\n2. 集計用のスクリプトを作成\n3. スクリプトを実行\n4. 結果を report.json に出力\n\nファイルツリーで report.json をクリックして、集計結果を確認してみてください。月別の売上推移やカテゴリ別のランキングが整理されているはずです。\n\n【ポイント】\nExcelで何十分もかかる集計作業が、一つの指示で完了しました。しかも、同じスクリプトを翌月のデータにも使えるので、一度作れば繰り返し使えます。\n\nデータの形式が違っても（JSON、TSV、XMLなど）、Claude Codeに「このデータを集計して」と伝えるだけで対応してくれます。",
            why: "Excelでの手作業を一つの指示に置き換えられます。スクリプトが残るので翌月以降も再利用可能。データ分析の専門知識がなくても「こう集計して」と日本語で伝えるだけでOKです。",
            hint: "スクリプト生成→実行→結果出力が一連で行われます",
            verification: { type: "file_exists", path: "report.json" },
          },
        ],
      },
      {
        id: "quick-email",
        title: "テンプレートを一括作成",
        description:
          "業務で使うメールテンプレートを、フォルダ構造ごと一括生成します。同じようなメールを何通も書く手間がなくなります。",
        category: "即戦力",
        templateDir: "quick-email",
        estimatedMinutes: 5,
        steps: [
          {
            id: "step-1",
            title: "テンプレート一式を生成",
            description:
              "業務用メールテンプレートを3種類まとめて作ります。\n\nプレースホルダー（{{name}} のような部分）を入れておくことで、使うときに名前や商品名を差し替えるだけでメールが完成します。\n\n下のプロンプトを貼り付けてください。",
            prompt:
              "templates フォルダを作って、以下のメールテンプレートを作成して：\n1. welcome.txt - 新規顧客向け歓迎メール（自社サービスの紹介を含む）\n2. follow-up.txt - 商談後のフォローアップ（次のステップの提案を含む）\n3. thank-you.txt - 購入御礼（関連商品の案内を含む）\n\n各ファイルに {{name}}（顧客名）、{{company}}（会社名）、{{product}}（商品名）のプレースホルダーを入れて、ビジネスライクだけど温かみのある文面にして",
            afterNote:
              "templates フォルダに3つのメールテンプレートが作成されました。ファイルツリーで各ファイルをクリックして中身を確認してみてください。\n\n各テンプレートには {{name}} などのプレースホルダーが入っているので、使うときは：\n・{{name}} → 田中太郎\n・{{company}} → 株式会社ABC\n・{{product}} → クラウドサービスプラン\nのように置き換えるだけでメールが完成します。\n\n【さらに活用するなら】\nClaude Codeに「welcome.txt の {{name}} を田中太郎に、{{company}} を株式会社ABCに置き換えて、送信用メールとして output.txt に保存して」と指示すれば、実際のメール文面も自動で作れます。",
            why: "定型メールの作成は時間がかかる割にクリエイティブな作業ではありません。Claude Codeにテンプレートを一括生成させれば、その時間を本来の仕事に使えます。テンプレートは一度作れば何度でも再利用できます。",
            hint: "3ファイルが templates フォルダ内に作成されます",
            verification: {
              type: "file_exists",
              path: "templates/welcome.txt",
            },
          },
        ],
      },
    ],
  },
];
