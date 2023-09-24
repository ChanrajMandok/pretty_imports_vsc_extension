function prettyImports(text: string): string {
    const MAX_LINE_LENGTH = 80;
    const directImports: string[] = [];
    const externalPackageImports: string[] = [];
    const projectSpecificImports: string[] = [];
    const nonHandled: string[] = [];

    text.split('\n').forEach(line => {
        try {
            if (line.includes('import')) {
                const importIndex = line.lastIndexOf('import');
                const preImport = line.substring(0, importIndex).trim();
                const postImport = line.substring(importIndex + 7).trim();

                if (preImport === '') { 
                    directImports.push(`import ${postImport}`);
                } else if (preImport.startsWith('from')) {
                    const splitPreImport = preImport.split(' ');

                    if (splitPreImport.length === 2 && !splitPreImport[1].includes('.')) {
                        externalPackageImports.push(line); 
                    } else { 
                        if (postImport.startsWith('(') && postImport.endsWith(')')) {
                            const importsInParentheses = postImport.slice(1, -1).split(',').map(str => str.trim());
                            importsInParentheses.forEach(imp => {
                                projectSpecificImports.push(`${preImport} import ${imp}`);
                            });
                        } else {
                            if (preImport.length + 7 + postImport.length > MAX_LINE_LENGTH) {
                                const slashIndex = preImport.length + 7;
                                const paddingLength = slashIndex - postImport.length + 1; 
                                projectSpecificImports.push(`${preImport} import \\ \n${' '.repeat(paddingLength)}${postImport}`);
                            } else {
                                projectSpecificImports.push(`${preImport} import ${postImport}`);
                            }
                        }
                    }
                }
            } else {
                nonHandled.push(line);
            }
        } catch (error) {
            console.error("Error handling line: ", line, error);
            nonHandled.push(line);
        }
    });

    directImports.sort((a, b) => a.length - b.length);
    externalPackageImports.sort((a, b) => a.length - b.length);
    projectSpecificImports.sort((a, b) => a.split('\n')[0].length - b.split('\n')[0].length);

    const groupedImports = [directImports, externalPackageImports, projectSpecificImports, nonHandled]
        .map(group => group.join('\n'))
        .filter(group => group.trim() !== ''); 

    let resultString = groupedImports.join('\n\n');
    resultString = resultString.replace(/ \\ \n/g, ' \\\n');
    
    return resultString;
}


import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "pretty-imports" is now active!');

    let disposable = vscode.commands.registerCommand('extension.prettyImports', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const text = document.getText(selection);
            const formattedText = prettyImports(text);
            editor.edit(editBuilder => {
                editBuilder.replace(selection, formattedText);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
