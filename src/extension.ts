import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Регистрируем команду, указанную в package.json
    let disposable = vscode.commands.registerCommand('my-first-extension.openRandomGenerator', () => {
        
        // Создаем и показываем новую вкладку (Webview Panel)
        const panel = vscode.window.createWebviewPanel(
            'randomGenerator', // Внутренний идентификатор
            'Генератор случайных чисел', // Заголовок вкладки
            vscode.ViewColumn.One, // В какой колонке редактора открыть
            {
                enableScripts: true // Разрешаем выполнение JavaScript внутри окна
            }
        );

        // Устанавливаем HTML-содержимое для окна
        panel.webview.html = getWebviewContent();
    });

    context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Генератор случайных чисел</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-editor-foreground);
            background-color: var(--vscode-editor-background);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }
        .card {
            background-color: var(--vscode-sideBar-background);
            padding: 24px 32px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            text-align: center;
            border: 1px solid var(--vscode-panel-border);
            min-width: 280px;
        }
        .inputs {
            display: flex;
            gap: 12px;
            margin-bottom: 16px;
            justify-content: center;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            text-align: left;
            font-size: 12px;
        }
        input {
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border, #ccc);
            padding: 6px 8px;
            border-radius: 4px;
            width: 90px;
            margin-top: 4px;
            font-size: 14px;
        }
        button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            font-weight: 600;
        }
        button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        .result {
            margin-top: 24px;
            font-size: 48px;
            font-weight: bold;
            color: var(--vscode-textLink-foreground);
            min-height: 58px;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Случайное число</h2>
        <div class="inputs">
            <div class="input-group">
                <label for="min">От (Min)</label>
                <input type="number" id="min" value="1">
            </div>
            <div class="input-group">
                <label for="max">До (Max)</label>
                <input type="number" id="max" value="100">
            </div>
        </div>
        <button id="generateBtn">Сгенерировать</button>
        <div class="result" id="result">—</div>
    </div>

    <script>
        const btn = document.getElementById('generateBtn');
        const res = document.getElementById('result');
        const minInput = document.getElementById('min');
        const maxInput = document.getElementById('max');

        btn.addEventListener('click', () => {
            const min = Math.ceil(Number(minInput.value));
            const max = Math.floor(Number(maxInput.value));

            if (min > max) {
                res.style.fontSize = '16px';
                res.textContent = 'Ошибка: Min > Max';
                return;
            }

            res.style.fontSize = '48px';
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            res.textContent = randomNum;
        });
    </script>
</body>
</html>`;
}

export function deactivate() {}