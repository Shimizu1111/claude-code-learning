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
  // ===== 入門 =====
  {
    id: "beginner",
    title: "入門",
    subtitle: "まずはここから",
    description:
      "Claude Codeに話しかけてファイルを作る、既存ファイルを読んで直す、プロジェクトのルールを覚えさせるなど、最初に知っておくべき基本操作をひとつずつ体験します。",
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
        title: "プロジェクトのルールを覚えさせる",
        description:
          "Claude Codeには「このプロジェクトではこういうルールで作業してね」と伝える仕組みがあります。一度設定すれば、次回以降は自動で覚えてくれます。毎回同じ説明をしなくて済むようになります。",
        category: "ルール設定",
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
        category: "ファイルの読み書き",
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

  // ===== 実践 =====
  {
    id: "intermediate",
    title: "実践",
    subtitle: "実際に使ってみる",
    description:
      "入門で基本を覚えたら、次は実際にアプリを作ったり、コードの間違いを直したり、バージョン管理を任せたり。Claude Codeで「仕事っぽいこと」を一通り体験します。",
    icon: "rocket",
    color: "yellow",
    lessons: [
      {
        id: "slash-commands",
        title: "便利なショートカット機能を使う",
        description:
          "Claude Codeには /（スラッシュ）で始まる便利なショートカットがたくさんあります。「計画を立ててから実行」「変更点を一覧表示」「会話を整理」など、覚えておくと作業効率がグンと上がります。",
        category: "ショートカット",
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
        category: "アプリを作る",
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
        title: "コードの間違いを見つけて直してもらう",
        description:
          "プログラムには間違い（バグ）がつきものです。Claude Codeは「なんかおかしい」と伝えるだけで間違いを発見し、修正してくれます。ここでは意図的に間違いを仕込んだファイルを使って、その流れを体験します。",
        category: "間違い修正",
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
        title: "ファイルの変更履歴を管理する",
        description:
          "Git（ギット）はファイルの変更履歴を記録するツールです。「セーブポイント」のようなもので、いつでも過去の状態に戻れます。Gitのコマンドは複雑ですが、Claude Codeに任せれば日本語で操作できます。",
        category: "変更履歴の管理",
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
        title: "設定ファイルの使い分けをマスターする",
        description:
          "Claude Codeには「ルールを書くファイル」がいくつもあって、最初は混乱しがちです。でも実は、それぞれ「いつ読み込まれるか」と「誰に共有されるか」が違うだけ。この2つの軸が分かれば迷いません。実際にファイルを作りながら、使い分けの感覚をつかみましょう。",
        category: "カスタマイズ",
        templateDir: "claude-config",
        estimatedMinutes: 20,
        prerequisite: "/init と CLAUDE.md を知ろう",
        steps: [
          {
            id: "step-1",
            title: "CLAUDE.md ＝ 毎回読まれる「社訓」",
            description:
              "Claude Code の設定ファイルは、会社の書類にたとえると分かりやすいです。\n\n・CLAUDE.md → 「社訓」。出社したら（起動したら）必ず目に入る\n・Rules → 「部署マニュアル」。経理部の人は経理マニュアルだけ見る\n・Skills → 「業務手順書」。必要なときだけ棚から出して見る\n・settings.json → 「入退室カード」。誰に何の権限を与えるか\n\nまずは「社訓」にあたる CLAUDE.md を作りましょう。ここには、どんな作業でも毎回守ってほしいルールだけを書きます。\n\n【ポイント】CLAUDE.md は起動するたびに丸ごと読み込まれます。つまり、ここに書いた分だけ Claude Code の「記憶容量」を使います。公式の推奨は200行以下。書きすぎると応答が鈍くなるので、本当に毎回必要な情報だけに絞りましょう。",
            prompt:
              "CLAUDE.md を作って。以下の内容にして：\n- このプロジェクトはJavaScript製のWebアプリ\n- コメントは日本語で書く\n- インデントは2スペース\n- console.log でのデバッグは本番コードに残さない",
            afterNote:
              "CLAUDE.md が作成されました。ファイルツリーでクリックして中身を確認してみてください。\n\nこのファイルは Claude Code を起動するたびに自動で読み込まれます。ここに書いたルールは、今後このフォルダでの全ての作業に適用されます。\n\n【なぜ書きすぎてはダメなの？】\nClaude Code には「一度に覚えていられる量」に限りがあります（コンテキストウィンドウと呼びます）。CLAUDE.md の内容は毎回まるごとこの枠を使うので、ここが長いと肝心の作業に使える枠が減ってしまいます。\n\n「じゃあ、CSSのルールとかAPIのルールとかはどこに書けばいいの？」→ 次のステップで学ぶ Rules に書きます。",
            why: "CLAUDE.md に書くべきなのは「どんな作業でも毎回必要なルール」だけです。コード規約や言語設定など、プロジェクト全体に関わることだけをここに書きましょう。「CSSの書き方」「テストの方針」など特定の場面でしか使わないルールは、ここではなく Rules に分けた方がClaude Codeの性能を最大限活かせます。",
            hint: "CLAUDE.md が作成されます",
            verification: { type: "file_exists", path: "CLAUDE.md" },
          },
          {
            id: "step-2",
            title: "Rules ＝ 必要なときだけ自動で出てくる「部署マニュアル」",
            description:
              "CLAUDE.md に全部書くと「社訓が100ページ」みたいな状態になってしまいます。そこで使うのが Rules です。\n\nRules は .claude/rules/ フォルダに置くファイルで、2つの使い方があります：\n\n1. paths なし → CLAUDE.md と同じく毎回読まれる。CLAUDE.md が長くなったときのファイル分割用\n2. paths あり → 指定したファイルを触るときだけ読まれる。これが Rules の真価！\n\n今回は paths ありの方を試します。「CSSファイルを編集するときだけ適用されるデザインルール」を作ってみましょう。\n\n【ファイル先頭の paths: とは？】\nファイルの一番上に --- で囲んだ部分（フロントマターと呼びます）を書き、そこで「どのファイルを触ったとき読み込むか」を指定します。",
            prompt:
              ".claude/rules/css-guidelines.md を作って。先頭にフロントマター（---で囲む部分）を入れて paths: に \"**/*.css\" を指定して。本文には以下のルールを書いて：\n- BEM記法でクラス名を付ける\n- !important は禁止\n- カラーコードは変数化する\n- メディアクエリはモバイルファーストで書く",
            afterNote:
              ".claude/rules/css-guidelines.md が作成されました。ファイルツリーで確認してみてください。\n\nファイルの先頭にこのような部分があるはずです：\n---\npaths:\n  - \"**/*.css\"\n---\n\nこれで、このルールは：\n・CSSファイルを編集するとき → 自動で読み込まれる\n・JavaScriptやHTMLを編集するとき → 読み込まれない（記憶容量を節約）\n\n【「自動で」がポイント】\nRules は条件が合えば勝手に読み込まれます。あなたが「CSSルールを読んで」と言う必要はありません。CSSファイルに触った瞬間、Claude Code が自動でこのマニュアルを参照します。\n\n【整理のコツ】\nRulesは1ファイル＝1トピックで作りましょう。ファイル名を見ただけで「何のルールか」分かるようにすると管理しやすくなります。\n例：css-guidelines.md、api-security.md、testing-rules.md",
            why: "Rules を使うと、必要なルールが必要なタイミングで自動的に適用されます。「CSSを触るときだけデザインルール」「APIを触るときだけセキュリティルール」のように分けることで、Claude Code の記憶容量を無駄遣いせずに、たくさんのルールを管理できます。",
            hint: ".claude/rules/css-guidelines.md が paths 付きで作成されます",
            verification: {
              type: "file_exists",
              path: ".claude/rules/css-guidelines.md",
            },
          },
          {
            id: "step-3",
            title: "Skills ＝ 自分で棚から出す「業務手順書」",
            description:
              "CLAUDE.md と Rules は、条件に合えば「勝手に読み込まれる」ものでした。\n\nSkills は違います。自分で「/コマンド名」と打って、能動的に呼び出すものです。\n\n【読み込みタイミングの比較】\n・CLAUDE.md → 起動したら毎回、全文が読まれる\n・Rules（paths あり）→ 対象ファイルを触ったら自動で全文が読まれる\n・Skills → 「説明文」だけは常にClaude Codeに見えている。「本文（手順の中身）」は呼び出したときだけ読まれる\n\nつまり Skills は「こんな手順書がありますよ」というタイトルだけ普段見せておいて、実際に使うときだけ中身を開く仕組みです。会社で言えば、棚に手順書のタイトルが貼ってあって、必要なときだけ引き出して読むイメージです。\n\nSkills が便利なのは「たまにしか使わないけど、使うときは毎回同じ手順でやりたい」作業です。たとえば：\n・/code-review → コードレビューのチェックリスト\n・/deploy → デプロイ（公開）の手順\n・/new-page → 新しいページのテンプレ作成\n\nコードレビュー用のスキルを作ってみましょう。",
            prompt:
              ".claude/skills/code-review/SKILL.md を作って。フロントマターに以下を設定：\n- description: 「コードレビューのチェックリストを実行する」\n- user-invocable: true\n\n本文には以下のチェック手順を書いて：\n1. 変更されたファイルを確認する\n2. セキュリティの問題がないかチェック\n3. パフォーマンスの問題がないかチェック\n4. コーディング規約に違反していないかチェック\n5. テストが書かれているかチェック\n6. 結果を一覧表にまとめて表示する",
            afterNote:
              ".claude/skills/code-review/SKILL.md が作成されました。\n\nこれで、Claude Code のセッション中に /code-review と入力するだけで、このチェックリストが実行されます。\n\n【フロントマターの意味】\n・description → スキル一覧に表示される説明文\n・user-invocable: true → /code-review で手動呼び出し可能。false にすると Claude が自動判断でのみ使う\n\n【CLAUDE.md に書くべきか、Skills にすべきか？】\n迷ったらこう考えてください：\n・「毎回の作業で自然に必要になる情報」→ CLAUDE.md\n  例：コード規約、プロジェクト構成、使用言語\n・「特定の作業をするときだけ必要な手順」→ Skills\n  例：レビュー手順、デプロイ手順、リリース作業\n\nCLAUDE.md は全文が毎回読み込まれますが、Skills は説明文だけが常時読まれ、本文は使うときだけ読まれます。CLAUDE.md に手順書まで全部書くと記憶容量がもったいないので、長い手順はSkillsに分けるのがコツです。",
            why: "Skills は「必要なときだけ中身が読まれる手順書」です。説明文だけは常に見えていますが、本文は呼び出すまで記憶容量を使いません。一方 CLAUDE.md は全文が毎回読まれます。「常に必要な基本ルール」と「たまに使う手順」を分けることで、Claude Code の記憶容量を効率よく使えます。",
            hint: ".claude/skills/code-review/SKILL.md が作成されます",
            verification: {
              type: "file_exists",
              path: ".claude/skills/code-review/SKILL.md",
            },
          },
          {
            id: "step-4",
            title: "settings.json ＝ 権限を管理する「入退室カード」",
            description:
              "最後は settings.json です。これまでの3つは「Claude Code にどう振る舞ってほしいか」のルールでした。settings.json は「何を許可し、何を禁止するか」の権限設定です。\n\n【settings.json にできること】\n・コマンドの許可/禁止（例：npm は OK、rm -rf は NG）\n・環境変数の設定（例：開発モードか本番モードか）\n\n【置く場所で「誰に適用されるか」が変わる】\nsettings.json は3つの場所に置けます：\n\n1. ~/.claude/settings.json → 自分のPC全体に適用（どのプロジェクトでも有効）\n   例：「自分はいつも npm を許可したい」\n\n2. .claude/settings.json → このプロジェクトの全員に適用（Gitで共有）\n   例：「チーム全員に rm -rf を禁止したい」\n\n3. .claude/settings.local.json → このプロジェクトの自分だけに適用（Git共有しない）\n   例：「自分だけデバッグモードをONにしたい」\n\nチームで共有したいルールは 2 に、個人の好みは 1 か 3 に書きます。\nプロジェクト用の settings.json を作ってみましょう。",
            prompt:
              ".claude/settings.json を作って。以下の設定を入れて：\n- permissions の allow に \"Bash(npm *)\" と \"Bash(git *)\" を追加\n- permissions の deny に \"Bash(rm -rf *)\" を追加\n- env に NODE_ENV: \"development\" を設定",
            afterNote:
              ".claude/settings.json が作成されました。ファイルツリーで確認してみてください。\n\n設定内容の意味：\n・allow: [\"Bash(npm *)\", \"Bash(git *)\"] → npm と git のコマンドは許可確認なしで実行OK\n・deny: [\"Bash(rm -rf *)\"] → rm -rf（フォルダの全削除）は絶対に実行しない\n・env: { NODE_ENV: \"development\" } → 環境変数（アプリに渡すメモ書き）を自動設定\n\n【ここまでに作った設定ファイルの全体像】\n\nCLAUDE.md → 毎回読まれる基本ルール（社訓）\n.claude/rules/css-guidelines.md → CSSを触るときだけ読まれるルール（部署マニュアル）\n.claude/skills/code-review/SKILL.md → /code-review で呼び出す手順書（業務手順書）\n.claude/settings.json → 権限と環境の設定（入退室カード）\n\n【迷ったときの判断チャート】\n「毎回必要？」→ はい → CLAUDE.md\n「毎回必要？」→ いいえ →「特定ファイルを触るとき必要？」→ はい → Rules\n「毎回必要？」→ いいえ →「特定ファイルを触るとき必要？」→ いいえ →「自分で呼び出して使う？」→ はい → Skills\n「権限や環境の設定？」→ はい → settings.json",
            why: "Claude Code の設定ファイルの使い分けは「いつ読み込まれるか」と「誰に共有されるか」の2軸で考えるとスッキリします。\n\n・毎回自動 → CLAUDE.md（200行以下に抑える）\n・条件付き自動 → Rules（対象ファイルに応じて）\n・手動で呼ぶ → Skills（/コマンドで必要なときだけ）\n・権限管理 → settings.json（置く場所で共有範囲が変わる）\n\nすべてを CLAUDE.md に詰め込まず、適切に分散させるのが快適に使うコツです。",
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
    title: "応用",
    subtitle: "もっと便利に使う",
    description:
      "セキュリティチェック、自動化設定、専門家AIなど、Claude Codeをさらに便利に使う方法を学びます。実践コースまでの知識がある前提です。",
    icon: "fire",
    color: "red",
    lessons: [
      {
        id: "security-review",
        title: "コードの安全性をチェックする",
        description:
          "Claude Codeには /security-review というセキュリティ専用のコマンドがあります。コードの脆弱性（セキュリティ上の弱点）を自動で検出し、修正方法も提案してくれます。",
        category: "安全性チェック",
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
        category: "秘密情報を守る",
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
            title: "settings.json の deny で秘密ファイルへのアクセスをブロック",
            description:
              "第2の防御層です。\n\nClaude Code は強力なので、指示次第で .env を読んでしまう可能性があります。たとえば「.env の内容を教えて」と聞いたら、中身を表示できてしまいます。\n\n.claude/settings.json の deny 設定で、Claude Code 自体が秘密ファイルを読み書きできないようにブロックしましょう。\n\nポイントは、Read と Edit だけでなく Bash コマンド経由のアクセスも塞ぐことです。cat 以外にも head, tail, less, source など、ファイルの中身を表示できるコマンドはたくさんあります。抜け道を一つずつ塞いでいきます。",
            prompt:
              ".claude/settings.json を作って。以下の permissions 設定を入れて：\n- deny に以下を追加：\n  - \"Read(.env)\", \"Read(.env.*)\", \"Read(.dev.vars)\"\n  - \"Edit(.env)\", \"Edit(.env.*)\", \"Edit(.dev.vars)\"\n  - \"Read(credentials.json)\", \"Edit(credentials.json)\"\n  - \"Bash(*cat .env*)\", \"Bash(*cat .dev.vars*)\", \"Bash(*cat credentials.json*)\"\n  - \"Bash(*head .env*)\", \"Bash(*head .dev.vars*)\"\n  - \"Bash(*tail .env*)\", \"Bash(*tail .dev.vars*)\"\n  - \"Bash(*less .env*)\", \"Bash(*less .dev.vars*)\"\n  - \"Bash(*more .env*)\", \"Bash(*more .dev.vars*)\"\n  - \"Bash(*source .env*)\", \"Bash(*source .dev.vars*)\"\n  - \"Bash(*< .env*)\", \"Bash(*< .dev.vars*)\"\n  - \"Bash(printenv*)\"\n- allow に以下を追加（.example ファイルは読み書きOK）：\n  - \"Read(**/*.example)\", \"Edit(**/*.example)\"\n  - \"Read(**/*.example.*)\", \"Edit(**/*.example.*)\"",
            afterNote:
              ".claude/settings.json が作成されました。\n\n【deny 設定の意味】\n・Read(.env) → Claude Codeの読み取りツールで .env を読むことを禁止\n・Edit(.env) → Claude Codeの編集ツールで .env を編集することを禁止\n・Bash(*cat .env*) → cat コマンドで .env を表示することを禁止（* は前後に何が付いても一致）\n・Bash(*head .env*), Bash(*tail .env*) ... → cat 以外の表示コマンドも全てブロック\n・Bash(*source .env*) → シェルに .env を読み込ませることを禁止\n・Bash(*< .env*) → リダイレクトで読み取ることを禁止\n・Bash(printenv*) → 環境変数の一覧表示を禁止\n\n【allow 設定の意味】\n・Read(**/*.example) → .env.example などテンプレートファイルは読み書きOK\nテンプレートには秘密の値が入っていないので、安全にアクセスできます。\n\n【なぜこれが重要？】\nClaude Codeの会話内容はログに残る場合があります。秘密情報が会話に混入すると、ログ経由で漏洩するリスクがあります。deny でそもそもアクセスできなくすることで、秘密情報がClaude Codeの目に触れない仕組みを作れます。\n\n【注意】deny はハードブロック（Claude Code が絶対に無視できない制限）です。これが settings.json で設定する最大のメリットです。",
            why: "settings.json の deny は「ハードブロック」です。CLAUDE.md のルールは指示なので状況次第で破られる可能性がありますが、deny に設定したアクセスは Claude Code が物理的に実行できません。cat だけでなく head, tail, less, source, リダイレクトなど、ファイルを読み取れるコマンドを網羅的にブロックすることで、抜け道のない防御になります。",
            hint: ".claude/settings.json に deny ルールが設定されます",
            verification: {
              type: "file_contains",
              path: ".claude/settings.json",
              content: "deny",
            },
          },
          {
            id: "step-3",
            title: "CLAUDE.md にルールを書いて「意図」を伝える",
            description:
              "第3の防御層です。\n\nsettings.json の deny は強力ですが、すべてのパターンを網羅するのは難しいです。たとえば新しいコマンドや巧妙な書き方で読み取ろうとするケースまでは防ぎきれません。\n\nそこで CLAUDE.md（プロジェクトのルールファイル）に「秘密情報の扱い方」を明文化します。CLAUDE.md のルールは Claude Code が会話の最初に必ず読む指示書です。deny が「物理的にブロックする鍵」なら、CLAUDE.md は「やってはいけないことを理解させる教育」です。両方あることで防御が厚くなります。",
            prompt:
              "CLAUDE.md に以下の「秘密情報」セクションを追加して：\n\n## 秘密情報\n- 秘密情報は `.env` 等に書いてもらい、`.env.example` をテスト値入りで用意する\n- `.env*` `.dev.vars` `credentials.json` は deny 済み＆ `.gitignore` 必須（Read/Edit/Bash すべてハードブロック）\n- Bash経由でも読まない（cat, head, tail, less, more, source, リダイレクト等すべて禁止）\n- コードには環境変数参照で書く。ハードコード・ログ出力しない",
            afterNote:
              "CLAUDE.md に秘密情報のルールが追加されました。\n\n【settings.json と CLAUDE.md の役割の違い】\n・settings.json の deny → 「ハードブロック」。設定されたパターンは物理的に実行不可能\n・CLAUDE.md のルール → 「ソフトルール」。Claude Code が指示として理解し従う\n\n【なぜ両方必要？】\nsettings.json の deny は「Bash(*cat .env*)」のようにパターンを一つずつ指定します。しかし、ファイルを読む方法は無数にあり、すべてを deny で網羅するのは困難です。\n\nCLAUDE.md に「Bash経由でも読まない」と書いておけば、deny で漏れたパターン（たとえば新しいコマンド）も Claude Code が自主的に避けてくれます。\n\n逆に、CLAUDE.md だけでは「うっかり」や「指示の解釈ミス」で破られるリスクがあるので、主要なパターンは deny でハードブロックしておきます。\n\n【例え】\n・deny = 玄関の鍵（物理的に入れない）\n・CLAUDE.md = 「関係者以外立入禁止」の看板（理解して従う）\nどちらか一方だけより、両方あった方が安全です。",
            why: "セキュリティは「ハードブロック（deny）」と「ルールによる理解（CLAUDE.md）」の組み合わせが最強です。deny は確実だけどパターン漏れの可能性があり、CLAUDE.md は柔軟だけど絶対ではない。お互いの弱点を補い合うことで、より堅牢な防御になります。",
            hint: "CLAUDE.md に秘密情報セクションが追加されます",
            verification: {
              type: "file_contains",
              path: "CLAUDE.md",
              content: "秘密情報",
            },
          },
          {
            id: "step-4",
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
            id: "step-5",
            title: ".env.example で安全にチーム共有する",
            description:
              "ここまでで「秘密ファイルを守る」仕組みが4層できました。でもチーム開発では「どんな環境変数が必要か」をメンバーに伝える必要がありますよね。\n\nそこで .env.example（テンプレートファイル）を作ります。実際の値は入れずに「こういう変数が必要ですよ」という情報だけを書いたファイルです。このファイルはGitにコミットしてOKです。\n\n新しいメンバーは .env.example をコピーして .env にリネームし、実際の値を自分で埋める、という流れです。",
            prompt:
              "以下のファイルを作って：\n1. .env.example に以下を書いて（値は空かダミーで）：\n   API_KEY=your-api-key-here\n   DATABASE_URL=postgresql://user:password@localhost:5432/mydb\n   OPENAI_API_KEY=sk-your-key-here\n   SECRET_KEY=generate-a-random-string\n2. .dev.vars.example にCloudflare用のテンプレートを書いて（値は空かダミー）\n\n各ファイルの先頭に「# このファイルをコピーして .env にリネームし、実際の値を入力してください」とコメントを入れて",
            afterNote:
              ".env.example と .dev.vars.example が作成されました。\n\n【チームでの運用フロー】\n1. .env.example はGitにコミットする（秘密の値が入っていないので安全）\n2. 新メンバーは cp .env.example .env でコピー\n3. .env に実際のAPIキーなどを記入\n4. .env は .gitignore で除外されているのでGitには入らない\n\nこれで「必要な環境変数の情報は共有」しつつ「実際の秘密の値は各自が管理」という安全な運用ができます。\n\n【ここまでのまとめ：多重防御の途中経過】\n第1層：.gitignore → 秘密ファイルをGit追跡から除外\n第2層：settings.json deny → Claude Code から読み書きをハードブロック\n第3層：CLAUDE.md ルール → deny で漏れたパターンも指示で防御\n第4層：pre-commit hook → 強制追加されてもコミットを拒否\n第5層：.example テンプレート → 秘密の値なしで必要情報を共有\n\nあと1つ、最も重要な防御層が残っています。",
            why: "セキュリティは「多重防御（Defense in Depth）」が基本です。一つの対策に頼るのではなく、複数の層で守ることで、どこか一つが突破されても他の層が防いでくれます。.example テンプレートは「秘密の値を安全に共有する仕組み」として、多重防御の重要な一部です。",
            hint: ".env.example と .dev.vars.example が作成されます",
            verification: {
              type: "file_exists",
              path: ".env.example",
            },
          },
          {
            id: "step-6",
            title: "環境変数をコードから安全に参照する",
            description:
              "防御の仕組みが整いました。最後に一番大事なことを実践します。\n\nコードの中にAPIキーやパスワードを直接書くこと（ハードコード）は絶対にNGです。たとえば以下のようなコードは危険です：\n\n```\nconst apiKey = \"sk-abc123-実際のキー\";\n```\n\nこれがGitHubに公開されると、世界中の誰でもあなたのAPIキーを使えてしまいます。実際に、GitHubにAPIキーを公開してしまい高額請求が来る事故は頻繁に起きています。\n\n代わりに .env に書いた値を「環境変数」として読み取る書き方をします。環境変数とは、アプリに外から渡すメモ書きのようなものです。",
            prompt:
              "app.js を作って。以下の内容にして：\n1. 最初に「悪い例」としてAPIキーをハードコードしたコードをコメントアウトで書いて\n2. 次に「良い例」として process.env.API_KEY で環境変数から読み取るコードを書いて\n3. 環境変数が設定されていない場合にエラーメッセージを出す処理も入れて\n4. 各行にコメントで「なぜこう書くのか」を説明して",
            afterNote:
              "app.js が作成されました。\n\n【悪い例と良い例の違い】\n・悪い例：const apiKey = \"sk-abc123\" → キーがコードに直接書かれている。GitHubに公開したら即漏洩\n・良い例：const apiKey = process.env.API_KEY → .env ファイルから読み取る。コードにはキーの値が一切含まれない\n\n【process.env とは？】\nNode.js で環境変数を読み取るための仕組みです。process.env.API_KEY と書くと、.env ファイルの API_KEY=xxx の xxx の部分が取得できます。\n\n【環境変数が未設定のときのチェック】\nif (!apiKey) で「環境変数が設定されていない」場合を検出してエラーにします。これにより、.env の設定忘れにすぐ気づけます。\n\n【多重防御の完成形】\n第1層：.gitignore → 秘密ファイルをGit追跡から除外\n第2層：settings.json deny → Claude Code から読み書きをハードブロック\n第3層：CLAUDE.md ルール → deny で漏れたパターンも指示で防御\n第4層：pre-commit hook → 強制追加されてもコミットを拒否\n第5層：.example テンプレート → 秘密の値なしで必要情報を共有\n第6層：環境変数参照 → コードに秘密の値を一切書かない\n\nこの6層すべてを組み合わせることで、秘密情報が漏洩する経路をほぼ完全に塞げます。",
            why: "秘密情報の漏洩事故の多くは「コードにAPIキーを直接書いてしまった」ことが原因です。防御の仕組みをいくら作っても、コード自体にキーが書かれていたら意味がありません。環境変数で参照する書き方を習慣にすることが、秘密情報保護の最も基本的で最も重要なルールです。",
            hint: "app.js に process.env を使った環境変数の参照コードが作成されます",
            verification: {
              type: "file_exists",
              path: "app.js",
            },
          },
        ],
      },
      {
        id: "simplify-refactor",
        title: "コードを読みやすく整理してもらう",
        description:
          "/simplify は、Claude Codeがコードの品質を多角的にチェックして改善してくれるコマンドです。複数の観点（再利用性・効率・読みやすさ）で分析し、問題があれば自動で修正します。",
        category: "コード整理",
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
        title: "「ファイル保存したら自動で○○」を設定する",
        description:
          "中級の「設定ファイルを理解する」で settings.json を学びましたね。Hooksはその settings.json の中に書く「自動処理ルール」です。「ファイルを編集したら自動でコード整形する」「危険なコマンドをブロックする」など、Claude Codeの動きを自動で制御できます。",
        category: "自動化設定",
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
        title: "専門家AIを自分で作る",
        description:
          "中級の「設定ファイルを理解する」で .claude/agents/ を少し学びましたね。ここではもっと本格的に、ツール制限やモデル指定を使った実践的なエージェント定義を作ります。「専門家を呼び出す」感覚で、特定タスクに特化したAIを自分で設計できます。",
        category: "専門家AI",
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
        title: "面倒な繰り返し作業を自動化する",
        description:
          "繰り返しの作業を自動化するスクリプトをClaude Codeに作らせましょう。要件（何をしたいか）を伝えるだけで、実用レベルのスクリプトが出来上がります。シェルスクリプトを一から書ける必要はありません。",
        category: "作業の自動化",
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
          "今まではパソコンの中だけで動いていたサイトを、世界中の人がアクセスできるようにインターネット上に公開（デプロイ）します。公開に使える3つの無料サービスの違いを、実際に設定ファイルを作りながら理解しましょう。",
        category: "インターネット公開",
        templateDir: "deploy-platforms",
        estimatedMinutes: 25,
        prerequisite: "「まず作って、あとで直す」の実践",
        steps: [
          {
            id: "step-1",
            title: "まず公開するサイトを作る",
            description:
              "インターネットに公開するためのWebサイトを作りましょう。\n\nここで作るのは「静的サイト」と呼ばれるタイプのサイトです。\n\n【静的サイトって何？】\n会社のパンフレットのようなものです。誰がいつ見ても同じ内容が表示されます。HTMLファイル（ページの構造）とCSSファイル（見た目のデザイン）だけで動くので、公開がとても簡単です。\n\n例：会社紹介サイト、ポートフォリオ、ブログ、LP（商品紹介ページ）\n\n反対に「動的サイト」は、ログインした人によって表示が変わるサイトです（Amazon、Twitter等）。こちらはもう少し複雑な仕組みが必要です。\n\nまずは下のプロンプトでポートフォリオサイト（自己紹介サイト）を作りましょう。",
            prompt:
              "ポートフォリオサイトを作って。以下の構成で：\n- index.html：自己紹介、スキル一覧、実績のセクション\n- style.css：モダンなデザイン、ダークテーマ、レスポンシブ対応\n- 1ファイルにまとめずに index.html と style.css を分けて\n- 名前は「Taro Yamada」、職業は「Web Developer」にして",
            afterNote:
              "index.html と style.css が作成されました。\n\n【確認してみよう】\nブラウザで index.html を開いてみてください（ファイルをブラウザにドラッグ&ドロップでOK）。自己紹介サイトが表示されるはずです。\n\nただし、今の状態ではあなたのパソコンからしか見れません。友達や取引先に「このサイト見てください」とURLを送ることはできません。\n\n次のステップから、このサイトを世界中からアクセスできるようにする方法を学びます。",
            why: "今の段階では、サイトはあなたのパソコンの中だけに存在しています。インターネット上に「置き場所」を用意して、そこにファイルをアップロードすることで、初めて世界中の人がアクセスできるようになります。その「置き場所」を提供してくれるのが、次に学ぶ3つのサービスです。",
            hint: "index.html と style.css が作成されます",
            verification: { type: "file_exists", path: "index.html" },
          },
          {
            id: "step-2",
            title: "3つの公開サービスの違いを知る",
            description:
              "サイトを公開できる無料サービスは代表的に3つあります。「全部無料ならどれでもいいじゃん」と思うかもしれませんが、無料枠の大きさ、できることの範囲、使いやすさが全然違います。\n\n【GitHub Pages（ギットハブ ページズ）】\n一言で言うと：「チラシ置き場」\n・できること：HTMLファイルをそのまま公開するだけ\n・できないこと：フォーム送信、ログイン、外部API連携\n・無料枠：容量1GB、月間100GB転送。個人サイトなら十分すぎる\n・向いている場面：LP（商品紹介の1枚ページ）、ポートフォリオ、ドキュメント\n・設定の手軽さ：★★★ 最も簡単。ファイルを置くだけ\n\n【Cloudflare Pages（クラウドフレア ページズ）】\n一言で言うと：「万能型の無料サーバー」\n・できること：GitHub Pagesにできること全部＋裏側の処理（フォーム送信、API連携等）\n・無料枠が圧倒的に太い：月500回のデプロイ、帯域制限なし、Workers（裏側処理）は1日10万リクエスト無料\n・向いている場面：個人〜小規模ビジネスのほぼすべて。APIキーを安全に使いたいとき\n・設定の手軽さ：★★☆ GitHub Pagesより少し手順が多いが難しくはない\n\n【Vercel（ヴァーセル）】\n一言で言うと：「Next.js専門の高級サーバー」\n・できること：フレームワーク自動認識、プレビュー環境自動生成、サーバー処理\n・注意点：無料枠がかなり小さい。商用利用は月$20〜のProプランがほぼ必須。帯域100GB/月、Serverless実行時間100GB-hrs/月\n・向いている場面：Next.jsアプリをチームで開発するとき（それ以外ならCloudflareで十分）\n・設定の手軽さ：★★★ Next.jsなら最も簡単。それ以外は普通\n\nClaude Codeに比較ガイドを作ってもらいましょう。",
            prompt:
              "DEPLOY_GUIDE.md を作って。GitHub Pages、Cloudflare Pages、Vercel の比較ガイドを以下の構成で書いて：\n\n■ 各サービスの説明（日常の例えで）\n■ 料金比較表（具体的な数字で）：\n  - GitHub Pages：無料（容量1GB、転送100GB/月）\n  - Cloudflare Pages：無料（デプロイ500回/月、帯域無制限、Workers 10万リクエスト/日）\n  - Vercel：無料（帯域100GB/月、Serverless 100GB-hrs/月）。商用はProプラン$20/月がほぼ必須\n■ できること・できないことの比較表\n■ こんなときはコレを選べ：\n  - 会社紹介サイトやLP → GitHub Pages（最も手軽、無料で十分）\n  - お問い合わせフォーム付きサイト → Cloudflare Pages（裏側処理＋APIキー安全管理）\n  - 個人や小規模ビジネスのWebアプリ → Cloudflare Pages（無料枠が太い）\n  - Next.jsアプリのチーム開発 → Vercel（ただし商用はProプラン推奨）\n  - とにかくコストを抑えたい → Cloudflare Pages（帯域無制限＋無料枠最大）\n■ 独自ドメインは3つとも使える（全部無料で設定可能）\n■ 結論：迷ったらCloudflare Pages。GitHub Pagesは固定ページ専用。Vercelは Next.js + チーム開発のときだけ\n\n非エンジニアにも分かるように、専門用語にはすべて説明をつけて",
            afterNote:
              "DEPLOY_GUIDE.md が作成されました。ファイルツリーでクリックして読んでみてください。\n\n【結局どれを選ぶ？ 本音の使い分け】\n\nLPや会社紹介など「見せるだけ」のページ\n→ GitHub Pages 一択。5分で公開できて完全無料。これ以上のものは不要。\n\n個人や小規模ビジネスの大半のケース\n→ Cloudflare Pages がベスト。無料枠が圧倒的に太く（帯域無制限！）、裏側の処理もできるので将来フォームやAPI連携が必要になっても対応できる。コスパ最強。\n\nNext.jsアプリをチームで開発する場合だけ\n→ Vercel。フレームワーク自動認識とプレビュー環境は便利。ただし無料枠が小さいので、商用なら月$20のProプランが必要になる可能性が高い。\n\n【よくある間違い】\n「Vercelが一番高機能だからVercelがいい」→ 無料枠が小さいので、個人〜小規模ビジネスではむしろCloudflareの方が使いやすい\n「GitHub Pagesで全部やりたい」→ フォーム送信やAPI連携が必要になったら限界が来る。最初からCloudflareにしておく方が後で楽",
            why: "3つのサービスは「無料」という点は同じですが、無料枠の大きさと得意分野が全然違います。GitHub Pagesは「チラシ」専用で最もシンプル。Cloudflareは無料枠が太くて万能型。Vercelは Next.js に特化した高級品で無料枠は小さい。この違いを理解しておくと「とりあえずVercelにしたけど無料枠が足りなくなった…」という失敗を防げます。",
            hint: "比較ガイドが DEPLOY_GUIDE.md に生成されます",
            verification: { type: "file_exists", path: "DEPLOY_GUIDE.md" },
          },
          {
            id: "step-3",
            title: "GitHub Pages で公開する（一番シンプルな方法）",
            description:
              "まず一番シンプルな GitHub Pages から体験しましょう。\n\n【GitHub Pages の仕組み（簡単に言うと）】\n普段 GitHub にファイルを保存していますよね。GitHub Pages をONにすると、そのファイルがそのまま Web サイトとして公開されます。追加の作業はほぼありません。\n\n公開されたサイトには https://あなたのユーザー名.github.io/リポジトリ名/ というURLでアクセスできます。\n\nここでは「GitHub Actions」という自動化の仕組みを使って、「ファイルを保存（push）したら自動でサイトが更新される」設定を作ります。\n\n【GitHub Actions って何？】\nGitHub が提供する「自動お手伝いロボット」です。「ファイルが更新されたらこの作業をやってね」と設定しておくと、毎回自動で実行してくれます。",
            prompt:
              "GitHub Pages 用の GitHub Actions ワークフローを作って。以下の要件で：\n- .github/workflows/deploy-pages.yml に配置\n- main ブランチに push されたら自動デプロイ\n- プロジェクトルートの index.html と style.css をそのまま公開\n- permissions と pages の設定も含めて\n- 各ステップに「これは何をしている処理です」と日本語コメントを入れて",
            afterNote:
              ".github/workflows/deploy-pages.yml が作成されました。\n\n【実際に公開するまでの手順】\n1. このプロジェクトを GitHub にアップロード（push）する\n2. GitHub のリポジトリページで Settings → Pages → Source を「GitHub Actions」に変更\n3. これだけ！以降は push するたびに自動でサイトが更新されます\n4. https://あなたのユーザー名.github.io/リポジトリ名/ でアクセス\n\n【GitHub Pages の良いところ】\n・完全無料\n・設定がとにかく簡単（ファイルを1つ追加するだけ）\n・ファイルを更新すればサイトも自動で更新\n\n【GitHub Pages の限界】\n・パンフレットのような「固定ページ」しか公開できない\n・お問い合わせフォームの送信処理や、ログイン機能は作れない\n・APIキー（外部サービスの利用鍵）をブラウザに直接書くことになるので、安全に使えない\n\nこの限界を超えたい場合は、次のCloudflare Pagesを使います。",
            why: "GitHub Pages は「一番シンプルにサイトを公開する方法」です。「とにかく今すぐ公開したい！」という場合に最適。ただし固定ページ専用なので、フォーム送信やログイン機能など「裏側の処理」が必要になったら、Cloudflare Pages やVercel に移行します。",
            hint: ".github/workflows/deploy-pages.yml が作成されます",
            verification: {
              type: "file_exists",
              path: ".github/workflows/deploy-pages.yml",
            },
          },
          {
            id: "step-4",
            title: "Cloudflare Pages で公開する（安全に裏側の処理もできる）",
            description:
              "次は Cloudflare Pages です。GitHub Pages との一番の違いは「裏側の処理ができる」ことです。\n\n【裏側の処理って何？】\nたとえば、お問い合わせフォームの「送信」ボタンを押したとき、入力された内容をメールで送ったり、データベースに保存したりする処理です。この処理はブラウザ（お客さんの画面）ではなく、サーバー（あなたの貸しロッカー）側で行います。\n\nCloudflare では、この裏側の処理を「Workers（ワーカーズ）」と呼びます。\n\n【なぜこれが重要？】\n外部サービス（メール送信サービス、AI APIなど）を使うとき、APIキー（利用するための鍵）が必要です。この鍵をブラウザに書くと、誰でも見えてしまいます（右クリック→「ページのソースを表示」で見られます）。Workers を使えば、鍵をサーバー側に安全に保管できます。",
            prompt:
              "以下のファイルを作って：\n1. wrangler.toml（Cloudflare の設定ファイル）：\n   - name は my-portfolio\n   - compatibility_date は今日の日付\n   - pages_build_output_dir は \"./\" に設定\n   - 各設定が何を意味するか日本語コメントで説明\n2. functions/api/hello.js（サーバー側で動く処理の例）：\n   - アクセスすると { message: \"サーバーから返しています\" } を返す\n   - 「env.API_KEY のように環境変数からAPIキーを読み取れます。この値はブラウザからは絶対に見えません」とコメントで説明",
            afterNote:
              "wrangler.toml と functions/api/hello.js が作成されました。\n\n【Cloudflare Pages で公開するまでの手順】\n1. Cloudflare のアカウントを作成（無料、クレジットカード不要）\n2. ダッシュボードで「Pages」→「GitHubと連携」を選択\n3. 自分のリポジトリを選ぶ\n4. push するたびに自動でサイトが更新される\n\n【Workers（裏側の処理）の仕組み】\nfunctions/ フォルダにファイルを置くと、自動でサーバー側の処理として認識されます。\n\n例：functions/api/hello.js を置くと\n→ https://あなたのサイト/api/hello というURLでアクセスできる\n→ このプログラムはサーバー側で実行されるので、中に書いた APIキーはブラウザから見えない\n\n【GitHub Pages との違い まとめ】\n・GitHub Pages = パンフレット（見るだけ）\n・Cloudflare Pages = パンフレット ＋ 受付窓口（裏側の処理もできる）\n\n【環境変数（APIキーの安全な渡し方）】\nCloudflare のダッシュボードで Settings → Environment Variables に値を入力します。コードには値を直接書かず、env.API_KEY のように「変数名」だけを書きます。こうすれば秘密の値がコードに残りません。",
            why: "Cloudflare Pages を使えば、「お問い合わせフォーム」「外部APIとの連携」「会員限定コンテンツ」などの仕組みも作れます。しかも APIキーなどの秘密情報をブラウザに露出させず安全に管理できます。GitHub Pages の「固定ページしか公開できない」という制限を超えたいときの次のステップです。",
            hint: "wrangler.toml と functions/api/hello.js が作成されます",
            verification: {
              type: "file_exists",
              path: "wrangler.toml",
            },
          },
          {
            id: "step-5",
            title: "Vercel で公開する（本格的な開発向け）",
            description:
              "最後に Vercel です。Vercel は Next.js（このダッシュボード自体もNext.jsで作られています）の開発元が運営するサービスで、本格的な Web アプリの公開に向いています。\n\n【Vercel の特徴を簡単に言うと】\n\n・自動認識：プロジェクトをアップロードすると「これはNext.jsだな」と自動で判別して、必要な設定を勝手にやってくれます\n・プレビュー機能：チームで開発するとき、変更のたびに確認用のURLが自動で作られます。「このURLを見てください」とチームメンバーに共有できます\n・サーバー処理もできる：Cloudflare と同じく、裏側の処理も書けます\n\nVercel用の設定ファイルとサーバー側処理のサンプルを作りましょう。",
            prompt:
              "以下のファイルを作って：\n1. vercel.json（Vercelの設定ファイル）：\n   - 静的ファイルの配信設定（最小限でOK）\n2. api/hello.js（Vercelのサーバー側処理の例）：\n   - アクセスすると { message: \"Vercelのサーバーから返しています\" } を返す\n   - process.env.API_KEY で環境変数を読み取る例をコメントで説明\n3. DEPLOY_GUIDE.md を更新して、末尾に「3つのサービスの早見表」を追加して：\n   - 各サービスの公開コマンド\n   - 環境変数の設定方法\n   - おすすめの用途\n   - 非エンジニアにも分かる言葉で",
            afterNote:
              "vercel.json と api/hello.js が作成されました。\n\n【Vercel で公開するまでの手順】\n1. Vercel のアカウントを作成（無料、GitHub アカウントでログインできる）\n2. 「Import Project」で GitHub リポジトリを選ぶ\n3. Vercel が自動で認識してデプロイ完了\n4. push するたびに自動更新 ＋ 変更確認用のURLも自動生成\n\n【3つのサービスの最終まとめ】\n\n★ 固定ページをサクッと公開したい\n→ GitHub Pages（一番簡単、設定ほぼ不要）\n\n★ フォーム送信や外部サービス連携が必要\n→ Cloudflare Pages（APIキーを安全に管理できる）\n\n★ 本格的なWebアプリをチームで開発\n→ Vercel（自動認識、プレビューURL、高度な機能）\n\n★ 迷ったら\n→ Cloudflare Pages（固定ページにも本格アプリにも対応、一番バランスが良い）\n\n3つとも無料で始められます。まずは GitHub Pages で公開体験をして、必要に応じて Cloudflare や Vercel にステップアップするのがおすすめです。",
            why: "3つのサービスを比較しながら設定ファイルを作ることで、「自分の用途にはどれが合うか」を判断できるようになりました。すべてを覚える必要はありません。「固定ページ→GitHub Pages」「裏側の処理が必要→Cloudflare」「本格開発→Vercel」。この3つの判断基準だけ覚えておけば、迷わず選べます。",
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
        category: "Webページ作成",
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
        category: "データ整理",
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
        category: "文書作成",
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
